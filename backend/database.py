import sqlite3
from pathlib import Path

DB_PATH = Path("database/student_assessments.db")
DB_PATH.parent.mkdir(parents=True, exist_ok=True)

def init_db():
    with sqlite3.connect(DB_PATH) as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS assessment_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_name TEXT,
                branch TEXT NOT NULL,
                college_tier TEXT,
                cgpa REAL,
                backlogs INTEGER,
                mcq_score INTEGER,
                total_mcq_questions INTEGER,
                mcq_percentage REAL,
                coding_problem1 REAL,
                coding_problem2 REAL,
                coding_average REAL,
                overall_assessment_score REAL,
                prediction_status TEXT,
                placement_probability REAL,
                skill_gaps TEXT,
                skill_profile TEXT,
                completed_at TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)

if __name__ == "__main__":
    init_db()
    print(f"SQLite database initialized: {DB_PATH.resolve()}")
