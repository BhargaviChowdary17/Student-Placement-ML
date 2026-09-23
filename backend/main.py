from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import os


# =========================
# CREATE FASTAPI APP
# =========================

app = FastAPI(
    title="Student Placement Prediction API",
    description="ML-based Student Placement Prediction and Skill-Gap Recommendation System",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# LOAD TRAINED ML MODEL
# =========================

MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "model",
    "placement_model.joblib"
)

model = joblib.load(MODEL_PATH)


# =========================
# SKILL BASELINES
# =========================

skill_baselines = {
    "coding_skills": 6.00,
    "dsa_score": 5.50,
    "aptitude_score": 64.99,
    "communication_skills": 5.99,
    "ml_knowledge": 4.51,
    "system_design": 4.01
}


# =========================
# RECOMMENDATIONS
# =========================

recommendations = {
    "coding_skills":
        "Practice Python, C, and Java programming, problem solving, and coding questions.",

    "dsa_score":
        "Practice arrays, strings, searching, sorting, linked lists, stacks, and queues.",

    "aptitude_score":
        "Practice percentages, ratios, number systems, time and work, speed and distance, and logical reasoning.",

    "communication_skills":
        "Practice self-introduction, technical explanations, group discussions, and mock interviews.",

    "ml_knowledge":
        "Learn basic Machine Learning concepts such as regression, classification, preprocessing, and model evaluation.",

    "system_design":
        "Learn basic system design concepts such as scalability, APIs, databases, and client-server architecture."
}


# =========================
# HOME ROUTE
# =========================

@app.get("/")
def home():

    return {
        "message": "Student Placement Prediction and Skill-Gap Recommendation API is running!"
    }


# =========================
# PREDICTION ROUTE
# =========================

@app.post("/predict")
def predict(data: dict):

    # -------------------------
    # Convert input to DataFrame
    # -------------------------

    input_data = pd.DataFrame([data])


    # -------------------------
    # ML Prediction
    # -------------------------

    prediction = model.predict(input_data)[0]

    probabilities = model.predict_proba(input_data)[0]

    placement_probability = probabilities[1] * 100


    # -------------------------
    # Convert prediction
    # -------------------------
    if prediction == 1:
        status = "Likely to be Placed"
    else:
        status = "Not Likely to be Placed"


    # -------------------------
    # Skill Gap Analysis
    # -------------------------

    skill_gaps = []

    for skill, baseline in skill_baselines.items():

        student_value = float(data[skill])

        if student_value < baseline:

            skill_gaps.append({
                "skill": skill,
                "student_score": student_value,
                "dataset_baseline": baseline,
                "status": "Needs Improvement",
                "recommendation": recommendations[skill]
            })


    # -------------------------
    # If no skill gaps
    # -------------------------

    if not skill_gaps:

        skill_message = "No major skill gaps identified based on the dataset baseline."

    else:

        skill_message = (
            f"{len(skill_gaps)} skill area(s) need improvement."
        )


    # -------------------------
    # Final Response
    # -------------------------

    return {
        "prediction": int(prediction),
        "status": status,
        "placement_probability": round(placement_probability, 2),
        "skill_gap_summary": skill_message,
        "skill_gaps": skill_gaps
    }