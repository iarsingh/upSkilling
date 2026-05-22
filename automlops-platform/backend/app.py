import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

from fastapi import FastAPI
import joblib
import numpy as np
import mlflow.pyfunc


app = FastAPI()

model = mlflow.pyfunc.load_model("models:/churn-model/Production")
@app.get("/")
def home():
    logging.info("Health check endpoint called")
    return {"message": "AutoMLOps API Running"}

@app.post("/predict")
def predict(age: int, salary: int):
    data = np.array([[age, salary]])
    prediction = model.predict(data)[0]
    
    return {
        "prediction": int(prediction)
    }

from pydantic import BaseModel

class UserInput(BaseModel):
    age: int
    salary: int

@app.post("/predict")
def predict(user: UserInput):
    logging.info(f"Received request: age={user.age}, salary={user.salary}")
    
    data = np.array([[user.age, user.salary]])
    prediction = model.predict(data)[0]
    
    logging.info(f"Prediction result: {prediction}")
    
    return {"prediction": int(prediction)}
