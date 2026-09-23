import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import GradientBoostingClassifier


# =========================
# 1. LOAD DATASET
# =========================

file_path = "dataset/student_placement_synthetic.csv"

df = pd.read_csv(file_path)

print("Dataset loaded successfully!")


# =========================
# 2. REMOVE TARGET-LEAKING COLUMN
# =========================

df = df.drop(columns=["salary_package_lpa"])


# =========================
# 3. SEPARATE INPUT AND TARGET
# =========================

X = df.drop(columns=["placement_status"])
y = df["placement_status"]


# =========================
# 4. DEFINE FEATURES
# =========================

categorical_features = [
    "branch",
    "college_tier"
]

numerical_features = [
    "cgpa",
    "backlogs",
    "coding_skills",
    "dsa_score",
    "aptitude_score",
    "communication_skills",
    "ml_knowledge",
    "system_design",
    "internships",
    "projects_count",
    "certifications",
    "hackathons",
    "open_source_contributions",
    "extracurriculars"
]


# =========================
# 5. PREPROCESSING
# =========================

categorical_transformer = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("encoder", OneHotEncoder(handle_unknown="ignore"))
    ]
)

numerical_transformer = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="median"))
    ]
)

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            categorical_transformer,
            categorical_features
        ),
        (
            "numerical",
            numerical_transformer,
            numerical_features
        )
    ]
)


# =========================
# 6. TRAIN-TEST SPLIT
# =========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


# =========================
# 7. CREATE MODEL
# =========================

model = GradientBoostingClassifier(
    n_estimators=100,
    random_state=42
)


# =========================
# 8. CREATE PIPELINE
# =========================

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model)
    ]
)


# =========================
# 9. TRAIN MODEL
# =========================

print("\nTraining Gradient Boosting model...")

pipeline.fit(X_train, y_train)

print("Training completed!")


# =========================
# 10. SAVE MODEL
# =========================

model_path = "model/placement_model.joblib"

joblib.dump(pipeline, model_path)

print("\nModel saved successfully!")
print("Model path:", model_path)