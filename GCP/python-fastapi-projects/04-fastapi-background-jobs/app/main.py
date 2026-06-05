import time
from uuid import uuid4

from fastapi import BackgroundTasks, FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="FastAPI Background Jobs", version="0.1.0")


class JobRequest(BaseModel):
    task: str = Field(min_length=2)
    target: str = Field(min_length=2)


class Job(BaseModel):
    id: str
    task: str
    target: str
    status: str


jobs: dict[str, Job] = {}


def run_job(job_id: str) -> None:
    jobs[job_id].status = "running"
    time.sleep(2)
    jobs[job_id].status = "succeeded"


@app.post("/jobs", response_model=Job)
def create_job(payload: JobRequest, background_tasks: BackgroundTasks) -> Job:
    job = Job(id=str(uuid4()), task=payload.task, target=payload.target, status="queued")
    jobs[job.id] = job
    background_tasks.add_task(run_job, job.id)
    return job


@app.get("/jobs", response_model=list[Job])
def list_jobs() -> list[Job]:
    return list(jobs.values())


@app.get("/jobs/{job_id}", response_model=Job)
def get_job(job_id: str) -> Job:
    return jobs[job_id]

