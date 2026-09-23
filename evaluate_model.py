import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

from sklearn.ensemble import GradientBoostingClassifier

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay
)


# ==========================================
# 1. LOAD DATASET
# ==========================================

file_path = "dataset/student_placement_synthetic.csv"

df = pd.read_csv(file_path)

print("Dataset loaded successfully!")


# ==========================================
# 2. REMOVE SALARY COLUMN
# ==========================================

df = df.drop(columns=["salary_package_lpa"])


# ==========================================
# 3. FEATURES AND TARGET
# ==========================================

X = df.drop(columns=["placement_status"])

y = df["placement_status"]


# ==========================================
# 4. COLUMN TYPES
# ==========================================

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


# ==========================================
# 5. PREPROCESSING
# ==========================================

categorical_transformer = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="most_frequent")
        ),
        (
            "encoder",
            OneHotEncoder(handle_unknown="ignore")
        )
    ]
)


numerical_transformer = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="median")
        )
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


# ==========================================
# 6. TRAIN / TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


# ==========================================
# 7. CREATE MODEL
# ==========================================

model = GradientBoostingClassifier(
    n_estimators=100,
    random_state=42
)


# ==========================================
# 8. PIPELINE
# ==========================================

pipeline = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor
        ),
        (
            "model",
            model
        )
    ]
)


# ==========================================
# 9. TRAIN
# ==========================================

print("\nTraining Gradient Boosting model...")

pipeline.fit(X_train, y_train)

print("Training completed!")


# ==========================================
# 10. PREDICTION
# ==========================================

y_pred = pipeline.predict(X_test)


# ==========================================
# 11. EVALUATION
# ==========================================

accuracy = accuracy_score(y_test, y_pred)

print("\n===== MODEL EVALUATION =====")

print(
    "Accuracy:",
    round(accuracy * 100, 2),
    "%"
)

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred
    )
)


# ==========================================
# 12. CONFUSION MATRIX
# ==========================================

cm = confusion_matrix(
    y_test,
    y_pred
)

print("\n===== CONFUSION MATRIX =====")
print(cm)


disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=[
        "Not Placed",
        "Placed"
    ]
)

disp.plot()

plt.title("Student Placement Prediction - Confusion Matrix")

plt.tight_layout()

plt.savefig(
    "model/confusion_matrix.png"
)




print(
    "\nConfusion matrix saved to:"
    " model/confusion_matrix.png"
)


# ==========================================
# 13. FEATURE IMPORTANCE
# ==========================================

feature_names = (
    pipeline
    .named_steps["preprocessor"]
    .get_feature_names_out()
)

importances = (
    pipeline
    .named_steps["model"]
    .feature_importances_
)


feature_importance_df = pd.DataFrame(
    {
        "Feature": feature_names,
        "Importance": importances
    }
)


feature_importance_df = (
    feature_importance_df
    .sort_values(
        by="Importance",
        ascending=False
    )
)


print("\n===== TOP 15 FEATURES =====")

print(
    feature_importance_df
    .head(15)
    .to_string(index=False)
)


# ==========================================
# 14. SAVE FEATURE IMPORTANCE
# ==========================================

feature_importance_df.to_csv(
    "model/feature_importance.csv",
    index=False
)

print(
    "\nFeature importance saved to:"
    " model/feature_importance.csv"
)