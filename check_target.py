import pandas as pd

file_path = "dataset/student_placement_synthetic.csv"

df = pd.read_csv(file_path)

print("===== PLACEMENT STATUS COUNT =====")
print(df["placement_status"].value_counts())

print("\n===== PLACEMENT STATUS PERCENTAGE =====")
print(df["placement_status"].value_counts(normalize=True) * 100)

print("\n===== DUPLICATE ROWS =====")
print(df.duplicated().sum())