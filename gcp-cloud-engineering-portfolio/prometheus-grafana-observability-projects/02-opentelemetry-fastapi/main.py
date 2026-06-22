from fastapi import FastAPI
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

app = FastAPI(title="OpenTelemetry FastAPI Demo")
FastAPIInstrumentor.instrument_app(app)


@app.get("/healthz")
def healthz() -> dict:
    return {"status": "healthy"}

