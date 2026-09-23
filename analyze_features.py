import pandas as pd

file_path = "dataset/student_placement_synthetic.csv"

df = pd.read_csv(file_path)

print("===== NUMERICAL FEATURE ANALYSIS =====")

numeric_columns = [
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

print("\n===== AVERAGE VALUES BY PLACEMENT STATUS =====")

average_values = (
    df.groupby("placement_status")[numeric_columns]
    .mean()
    .round(2)
    .T
)

print(average_values.to_string())


print("\n===== CATEGORICAL DISTRIBUTION =====")

print("\nBranch:")
print(
    pd.crosstab(
        df["branch"],
        df["placement_status"],
        normalize="index"
    ).round(3)
)


print("\nCollege Tier:")
print(
    pd.crosstab(
        df["college_tier"],
        df["placement_status"],
        normalize="index"
    ).round(3)
)