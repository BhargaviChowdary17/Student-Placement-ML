import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

data = pd.read_csv(
    "dataset/student_placement_synthetic.csv"
)

print(data[["coding_skills", "dsa_score", "aptitude_score"]].describe())
features = [
    "branch",
    "cgpa",
    "backlogs",
    "coding_skills",
    "dsa_score",
    "aptitude_score"
]

target = "placement_status"

print(data[target].value_counts())
print(data[target].value_counts(normalize=True) * 100)

print("\nPlacement rate by CGPA:")
print(data.groupby(pd.cut(data["cgpa"], bins=5), observed=False)["placement_status"].mean())

print("\nPlacement rate by coding skills:")
print(data.groupby(pd.cut(data["coding_skills"], bins=5), observed=False)["placement_status"].mean())

print("\nPlacement rate by DSA score:")
print(data.groupby(pd.cut(data["dsa_score"], bins=5), observed=False)["placement_status"].mean())

print("\nPlacement rate by aptitude score:")
print(data.groupby(pd.cut(data["aptitude_score"], bins=5), observed=False)["placement_status"].mean())

X = data[features]
y = data[target]

categorical_features = [
    "branch"
]

numerical_features = [
    "cgpa",
    "backlogs",
    "coding_skills",
    "dsa_score",
    "aptitude_score"
]

categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])

numerical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median"))
])

preprocessor = ColumnTransformer([
    ("categorical", categorical_pipeline, categorical_features),
    ("numerical", numerical_pipeline, numerical_features)
])

from sklearn.ensemble import RandomForestClassifier

model = Pipeline([
    ("preprocessor", preprocessor),
    (
        "classifier",
        RandomForestClassifier(
            n_estimators=30,
            max_depth=12,
            class_weight="balanced",
            min_samples_leaf=5,
            random_state=42,
            n_jobs=1
        )
    )
])

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

model.fit(X_train, y_train)

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    balanced_accuracy_score
)

predictions = model.predict(X_test)

print("\nAssessment-Driven Model")
print("-----------------------")
print(f"Accuracy: {accuracy_score(y_test, predictions) * 100:.2f}%")
print(
    f"Balanced Accuracy: "
    f"{balanced_accuracy_score(y_test, predictions) * 100:.2f}%"
)
print("\nClassification Report:")
print(classification_report(
    y_test,
    predictions,
    target_names=["Not Placed", "Placed"],
    zero_division=0
))
print("Confusion Matrix:")
print(confusion_matrix(y_test, predictions))

joblib.dump(
    model,
    "model/assessment_placement_model_lite.joblib"
)
print("\nLite model saved: model/assessment_placement_model_lite.joblib")