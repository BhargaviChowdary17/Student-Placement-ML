import pandas as pd


# =========================
# 1. LOAD DATASET
# =========================

file_path = "dataset/student_placement_synthetic.csv"

df = pd.read_csv(file_path)

print("Dataset loaded successfully!\n")


# =========================
# 2. DATASET BASELINES
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
# 3. RECOMMENDATIONS
# =========================

recommendations = {
    "coding_skills":
        "Practice Python/C/Java programming, problem solving, and coding questions.",

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
# 4. FUNCTION TO FIND SKILL GAPS
# =========================

def find_skill_gaps(student_data):

    skill_gaps = []

    for skill, baseline in skill_baselines.items():

        student_value = student_data[skill]

        if student_value < baseline:
            skill_gaps.append({
                "skill": skill,
                "student_score": student_value,
                "baseline": baseline,
                "status": "Needs Improvement",
                "recommendation": recommendations[skill]
            })

    return skill_gaps


# =========================
# 5. TEST STUDENT
# =========================

student = {
    "coding_skills": 5,
    "dsa_score": 4,
    "aptitude_score": 60,
    "communication_skills": 7,
    "ml_knowledge": 3,
    "system_design": 5
}


# =========================
# 6. DISPLAY RESULTS
# =========================

print("===== SKILL GAP ANALYSIS =====")

gaps = find_skill_gaps(student)

if gaps:

    for gap in gaps:

        print(f"\nSkill: {gap['skill']}")
        print(f"Student Score: {gap['student_score']}")
        print(f"Dataset Baseline: {gap['baseline']}")
        print(f"Status: {gap['status']}")
        print(f"Recommendation: {gap['recommendation']}")

else:

    print("No major skill gaps identified!")
