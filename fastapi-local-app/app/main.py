from fastapi import FastAPI


app = FastAPI(
    title="FastAPI Local App",
    description="A small local FastAPI starter project.",
    version="0.1.0",
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "FastAPI project is running locally"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/hello/{name}")
def say_hello(name: str) -> dict[str, str]:
    return {"message": f"Hello, {name}!"}
