import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Dummy dataset (replace later with real dataset)
data = pd.DataFrame({
    "age": [22, 45, 25, 35, 52],
    "salary": [20000, 80000, 30000, 50000, 90000],
    "churn": [0, 1, 0, 1, 1]
})

X = data[["age", "salary"]]
y = data["churn"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier()
model.fit(X_train, y_train)

joblib.dump(model, "model/model.joblib")

print("Model trained and saved!")