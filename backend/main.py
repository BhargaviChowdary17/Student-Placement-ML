from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

from backend.code_runner import run_code
from backend.test_cases import problem1_tests, problem2_tests


app = FastAPI(
    title="Student Placement Prediction API",
    description="ML based student placement prediction and coding assessment API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


model = joblib.load("model/placement_model.joblib")
assessment_model = joblib.load(
    "model/assessment_placement_model.joblib"
)


skill_baselines = {
    "coding_skills": 6.00,
    "dsa_score": 5.50,
    "aptitude_score": 64.99,
    "communication_skills": 5.99,
    "ml_knowledge": 4.51,
    "system_design": 4.01
}


recommendations = {
    "coding_skills": "Practice Python, Java, C or C++ coding problems regularly.",
    "dsa_score": "Practice arrays, strings, searching, sorting, linked lists and graphs.",
    "aptitude_score": "Practice quantitative aptitude, logical reasoning and verbal ability.",
    "communication_skills": "Practice communication, self-introduction and interview questions.",
    "ml_knowledge": "Learn machine learning fundamentals and practice small ML projects.",
    "system_design": "Learn basic system design concepts and architecture."
}


class CodeRequest(BaseModel):
    code: str
    input: str = ""
    language: str = "python"


class EvaluateCodeRequest(BaseModel):
    problem_id: int
    code: str
    language: str = "python"

class AssessmentPredictionRequest(BaseModel):
    branch: str
    cgpa: float
    backlogs: int
    coding_skills: float
    dsa_score: float
    aptitude_score: float


@app.get("/")
def root():
    return {
        "message": "Student Placement Prediction API is running."
    }


@app.post("/predict")
def predict(data: dict):

    input_data = pd.DataFrame([data])

    prediction = int(model.predict(input_data)[0])

    probability = float(
        model.predict_proba(input_data)[0][1] * 100
    )

    skill_gaps = []

    for skill, baseline in skill_baselines.items():

        if skill in data:

            try:
                score = float(data[skill])

                if score < baseline:

                    skill_gaps.append({
                        "skill": skill,
                        "current_score": score,
                        "target_score": baseline,
                        "recommendation": recommendations[skill]
                    })

            except (ValueError, TypeError):
                pass

    return {
        "prediction": prediction,
        "status": (
            "Likely to be Placed"
            if prediction == 1
            else "Not Likely to be Placed"
        ),
        "placement_probability": round(probability, 2),
        "skill_gap_summary": f"{len(skill_gaps)} skill gap(s) identified.",
        "skill_gaps": skill_gaps
    }


@app.post("/predict-assessment")
def predict_assessment(data: AssessmentPredictionRequest):

    input_data = pd.DataFrame([{
        "branch": data.branch,
        "cgpa": data.cgpa,
        "backlogs": data.backlogs,
        "coding_skills": data.coding_skills,
        "dsa_score": data.dsa_score,
        "aptitude_score": data.aptitude_score
    }])

    prediction = int(
        assessment_model.predict(input_data)[0]
    )

    probability = float(
        assessment_model.predict_proba(input_data)[0][1] * 100
    )

    # Identify skills that are below the configured baselines.
    assessed_scores = {
        "coding_skills": data.coding_skills,
        "dsa_score": data.dsa_score,
        "aptitude_score": data.aptitude_score
    }

    skill_gaps = []

    for skill, score in assessed_scores.items():
        baseline = skill_baselines[skill]

        if score < baseline:
            skill_gaps.append({
                "skill": skill,
                "current_score": round(score, 2),
                "target_score": baseline,
                "recommendation": recommendations[skill]
            })

    return {
        "prediction": prediction,
        "status": (
            "Likely to be Placed"
            if prediction == 1
            else "Not Likely to be Placed"
        ),
        "placement_probability": round(probability, 2),
        "skill_gap_summary": (
            f"{len(skill_gaps)} skill gap(s) identified."
        ),
        "skill_gaps": skill_gaps
    } 

@app.post("/run-code")
def execute_code(request: CodeRequest):

    result = run_code(
        request.code,
        request.language,
        request.input
    )

    return result

@app.post("/evaluate-code")
def evaluate_code(request: EvaluateCodeRequest):

    if request.problem_id == 1:
        tests = problem1_tests

    elif request.problem_id == 2:
        tests = problem2_tests

    else:
        return {
            "success": False,
            "message": "Invalid problem ID."
        }

    passed = 0
    results = []

    for index, test in enumerate(tests, start=1):

        result = run_code(
            request.code,
            request.language,
            test["input"]
        )

        actual_output = result["output"].strip()
        expected_output = test["expected"].strip()
 
        test_passed = (
            result["success"]
            and actual_output == expected_output
        )

        if test_passed:
            passed += 1

        results.append({
            "test_case": index,
            "passed": test_passed,
            "expected": expected_output,
            "actual": actual_output
        })

    score = round((passed / len(tests)) * 100, 2)

    return {
        "success": True,
        "passed": passed,
        "total": len(tests),
        "score": score,
        "language": request.language,
        "results": results
    }
from pathlib import Path
import sqlite3
import json
from typing import Optional
from backend.database import DB_PATH, init_db

init_db()

class SaveAssessmentRequest(BaseModel):
    student_name: Optional[str] = None
    branch: str
    college_tier: Optional[str] = None
    cgpa: float
    backlogs: int
    mcq_score: int
    total_mcq_questions: int
    mcq_percentage: float
    coding_problem1: float
    coding_problem2: float
    coding_average: float
    overall_assessment_score: float
    prediction_status: str
    placement_probability: float
    skill_gaps: list = []
    skill_profile: dict = {}
    completed_at: Optional[str] = None

@app.post("/save-assessment")
def save_assessment(data: SaveAssessmentRequest):
    with sqlite3.connect(DB_PATH) as connection:
        cursor = connection.execute("""
            INSERT INTO assessment_history (
                student_name, branch, college_tier, cgpa, backlogs,
                mcq_score, total_mcq_questions, mcq_percentage,
                coding_problem1, coding_problem2, coding_average,
                overall_assessment_score, prediction_status,
                placement_probability, skill_gaps, skill_profile,
                completed_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.student_name, data.branch, data.college_tier,
            data.cgpa, data.backlogs, data.mcq_score,
            data.total_mcq_questions, data.mcq_percentage,
            data.coding_problem1, data.coding_problem2,
            data.coding_average, data.overall_assessment_score,
            data.prediction_status, data.placement_probability,
            json.dumps(data.skill_gaps), json.dumps(data.skill_profile),
            data.completed_at
        ))
        record_id = cursor.lastrowid

    return {"success": True, "record_id": record_id}

@app.get("/assessment-history")
def get_assessment_history():
    import json
    import sqlite3

    with sqlite3.connect(DB_PATH) as connection:
        connection.row_factory = sqlite3.Row
        rows = connection.execute("""
            SELECT id, student_name, branch, cgpa,
                   mcq_percentage, coding_average,
                   overall_assessment_score,
                   prediction_status, placement_probability,
                   skill_gaps, completed_at, created_at
            FROM assessment_history
            ORDER BY id DESC
            LIMIT 20
        """).fetchall()

    history = []
    for row in rows:
        item = dict(row)
        try:
            item["skill_gaps"] = json.loads(item["skill_gaps"] or "[]")
        except (ValueError, TypeError):
            item["skill_gaps"] = []
        history.append(item)

    return {"success": True, "count": len(history), "history": history}

