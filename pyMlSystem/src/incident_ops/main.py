import logging
import secrets
import time
from contextlib import asynccontextmanager
from pathlib import Path
from uuid import UUID

from fastapi import Depends, FastAPI, Header, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi.staticfiles import StaticFiles
from prometheus_client import CONTENT_TYPE_LATEST, CollectorRegistry, Counter, Histogram, generate_latest
from sqlalchemy import func, select, text
from sqlalchemy.exc import SQLAlchemyError

from incident_ops.config import Settings
from incident_ops.db import Feedback, Incident, Runbook, make_database
from incident_ops.model import Classifier
from incident_ops.recommendations import recommend
from incident_ops.retrieval import retrieve
from incident_ops.schemas import FeedbackInput, IncidentInput

logger = logging.getLogger(__name__)


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or Settings()
    engine, sessions = make_database(settings.database_url)
    registry = CollectorRegistry()
    requests = Counter(
        "http_requests_total", "HTTP requests", ["method", "route", "status"], registry=registry
    )
    latency = Histogram("http_request_duration_seconds", "HTTP duration", ["route"], registry=registry)
    triages = Counter("incident_triages_total", "Triage results", ["category", "mode"], registry=registry)

    @asynccontextmanager
    async def lifespan(app):
        app.state.classifier = None
        try:
            app.state.classifier = Classifier(settings.model_path)
        except (OSError, ValueError, KeyError):
            logger.error("Model missing or invalid; run incident-train before serving")
        yield
        engine.dispose()

    app = FastAPI(
        title="IncidentOps API",
        version="0.1.0",
        lifespan=lifespan,
        docs_url="/docs" if settings.app_env != "production" else None,
        redoc_url=None,
        openapi_url="/openapi.json" if settings.app_env != "production" else None,
    )
    app.state.sessions = sessions
    app.state.settings = settings
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_methods=["GET", "POST", "PUT"],
        allow_headers=["Content-Type", "X-API-Key"],
    )

    @app.middleware("http")
    async def observe(request: Request, call_next):
        start = time.perf_counter()
        status = 500
        try:
            response = await call_next(request)
            status = response.status_code
            return response
        finally:
            route = getattr(request.scope.get("route"), "path", "unmatched")
            if route not in {"/metrics", "/health/live", "/health/ready"}:
                requests.labels(request.method, route, status).inc()
                latency.labels(route).observe(time.perf_counter() - start)

    def authenticate(x_api_key: str = Header(default="")):
        expected = settings.api_key.get_secret_value()
        if expected and not secrets.compare_digest(expected.encode(), x_api_key.encode()):
            raise HTTPException(401, "Invalid API key")

    def database():
        with sessions() as session:
            yield session

    @app.get("/health/live")
    def live():
        return {"status": "alive"}

    @app.get("/health/ready")
    def ready():
        if app.state.classifier is None:
            raise HTTPException(503, "Model not loaded; run incident-train")
        try:
            with sessions() as session:
                session.execute(text("SELECT 1"))
                if not session.scalar(select(func.count()).select_from(Runbook)):
                    raise HTTPException(503, "Runbooks missing; run incident-seed")
        except SQLAlchemyError:
            raise HTTPException(503, "Database not ready; run migrations") from None
        return {
            "status": "ready",
            "model_version": app.state.classifier.version,
            "recommendation_provider": settings.llm_provider,
        }

    @app.get("/metrics", include_in_schema=False)
    def metrics():
        return Response(generate_latest(registry), media_type=CONTENT_TYPE_LATEST)

    auth = [Depends(authenticate)]

    def serialize(row):
        return {
            "id": row.id,
            "title": row.title,
            "description": row.description,
            "service": row.service,
            "severity": row.severity,
            "created_at": row.created_at.isoformat(),
            **row.result,
        }

    @app.post("/api/v1/incidents", status_code=201, dependencies=auth)
    def triage(payload: IncidentInput, session=Depends(database)):
        if app.state.classifier is None:
            raise HTTPException(503, "Model not loaded")
        text_input = f"{payload.title}\n{payload.description}"
        prediction = app.state.classifier.predict(text_input, settings.classification_threshold)
        books = retrieve(session, text_input, settings.retrieval_threshold)
        recommendation = recommend(text_input, books, settings)
        result = {"prediction": prediction, "recommendation": recommendation, "runbooks": books}
        row = Incident(**payload.model_dump(), result=result)
        session.add(row)
        session.commit()
        triages.labels(prediction["category"], recommendation["mode"]).inc()
        return serialize(row)

    @app.get("/api/v1/incidents", dependencies=auth)
    def list_incidents(
        limit: int = Query(25, ge=1, le=100), offset: int = Query(0, ge=0), session=Depends(database)
    ):
        return [
            serialize(row)
            for row in session.scalars(
                select(Incident).order_by(Incident.created_at.desc()).offset(offset).limit(limit)
            )
        ]

    @app.get("/api/v1/incidents/{incident_id}", dependencies=auth)
    def get_incident(incident_id: UUID, session=Depends(database)):
        row = session.get(Incident, str(incident_id))
        if row is None:
            raise HTTPException(404, "Incident not found")
        result = serialize(row)
        feedback = session.scalar(select(Feedback).where(Feedback.incident_id == str(incident_id)))
        result["feedback"] = (
            None
            if feedback is None
            else {
                "helpful": feedback.helpful,
                "correct_category": feedback.correct_category,
                "notes": feedback.notes,
            }
        )
        return result

    @app.put("/api/v1/incidents/{incident_id}/feedback", dependencies=auth)
    def feedback(incident_id: UUID, payload: FeedbackInput, session=Depends(database)):
        if session.get(Incident, str(incident_id)) is None:
            raise HTTPException(404, "Incident not found")
        # Serialize writes on PostgreSQL; SQLite is a single-process local development path.
        session.execute(select(Incident).where(Incident.id == str(incident_id)).with_for_update())
        row = session.scalar(select(Feedback).where(Feedback.incident_id == str(incident_id)))
        if row is None:
            row = Feedback(incident_id=str(incident_id), **payload.model_dump())
            session.add(row)
        else:
            for key, value in payload.model_dump().items():
                setattr(row, key, value)
        session.commit()
        return {"status": "saved", **payload.model_dump()}

    @app.get("/api/v1/runbooks", dependencies=auth)
    def runbooks(session=Depends(database)):
        return [
            {"id": b.id, "title": b.title, "category": b.category, "content": b.content, "steps": b.steps}
            for b in session.scalars(select(Runbook).order_by(Runbook.id))
        ]

    if settings.otel_exporter_otlp_endpoint:
        from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
        from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
        from opentelemetry.sdk.resources import Resource
        from opentelemetry.sdk.trace import TracerProvider
        from opentelemetry.sdk.trace.export import BatchSpanProcessor

        provider = TracerProvider(resource=Resource.create({"service.name": "incident-ops"}))
        provider.add_span_processor(
            BatchSpanProcessor(
                OTLPSpanExporter(endpoint=settings.otel_exporter_otlp_endpoint.rstrip("/") + "/v1/traces")
            )
        )
        FastAPIInstrumentor.instrument_app(
            app, tracer_provider=provider, excluded_urls="health/live,health/ready,metrics"
        )
    if Path("frontend/dist").is_dir():
        app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")
    return app


app = create_app()
