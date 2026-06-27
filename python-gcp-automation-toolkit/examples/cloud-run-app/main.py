from fastapi import FastAPI


app = FastAPI(title="Toolkit Cloud Run Demo")


@app.get("/")
def root() -> dict:
    return {"service": "toolkit-cloud-run-demo", "status": "ok"}


@app.get("/health")
def health() -> dict:
    return {"status": "healthy"}
