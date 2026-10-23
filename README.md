# Assessment-Driven Student Placement Prediction and Personalized Skill-Gap Recommendation System

## About the Project

The **Assessment-Driven Student Placement Prediction and Personalized Skill-Gap Recommendation System** is a machine learning-based web application designed to help students understand their placement readiness and identify the skills they need to improve.

The system provides two prediction workflows: a general student placement prediction based on student profile features and an assessment-driven prediction based on aptitude, coding, and other assessment-related scores. It also identifies skill gaps and provides recommendations to support continuous improvement.

The project follows an assessment-based learning cycle:

**Assess → Predict → Identify Skill Gaps → Recommend → Improve → Reassess**

## Objectives

- Predict a student's placement outcome using machine learning.
- Conduct aptitude and technical multiple-choice assessments.
- Evaluate coding submissions using test cases.
- Generate assessment scores and student skill profiles.
- Identify areas where students need improvement.
- Provide personalized skill-gap recommendations.
- Maintain assessment history where database support is configured.
- Help students monitor their placement preparation progress.

## Key Features

### 1. Student Placement Prediction
Uses student profile information to estimate whether a student is likely to be placed.

### 2. Aptitude and Technical Assessments
Allows students to attempt assessment questions and obtain scores based on their responses.

### 3. Coding Assessment
Supports coding submissions and evaluation using test cases.

### 4. Assessment-Driven Prediction
Uses assessment-related features to estimate placement readiness through a separate machine learning model.

### 5. Skill-Gap Identification
Identifies areas that may require improvement based on available student profile and assessment information.

### 6. Personalized Recommendations
Provides suggestions to help students improve their identified skill gaps.

### 7. Assessment History
Supports saving and retrieving assessment records through the backend database functionality when configured.

### 8. Web-Based Interface
Provides a frontend for interacting with the prediction, assessment, and recommendation features.

## Technology Stack

| Technology | Purpose |
|---|---|
| Python | Backend development and machine learning |
| Pandas | Dataset processing and analysis |
| NumPy | Numerical operations |
| Scikit-learn | Model training, preprocessing, and evaluation |
| Joblib | Saving and loading trained models |
| Matplotlib | Model evaluation visualization |
| FastAPI | Backend API development |
| Uvicorn | Running the FastAPI application |
| HTML | Frontend structure |
| CSS | Frontend styling |
| JavaScript | Frontend interactions and API communication |
| SQLite | Assessment-history storage, where configured |

## Project Structure

```text
StudentPlacementML/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── code_runner.py
│   └── test_cases.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── assessment.html
│   ├── assessment.css
│   └── assessment.js
│
├── dataset/
│   └── student_placement_synthetic.csv
│
├── model/
│   ├── placement_model.joblib
│   ├── assessment_placement_model.joblib
│   ├── confusion_matrix.png
│   └── feature_importance.csv
│
├── archive/
│   ├── train_assessment_model_backup.py
│   └── train_expanded_assessment_model.py
│
├── train_model.py
├── train_assessment_model.py
├── evaluate_model.py
├── skill_gap.py
├── requirements.txt
├── .gitignore
└── README.md
```

**Note:** This structure lists the main project files and archived training scripts. The `database/` directory and `student_assessments.db` file are not shown as guaranteed files because their current presence has not been verified. They may be created when the database initialization functionality runs.

## System Architecture

The application follows a frontend-backend-machine learning architecture.

```text
                  STUDENT
                     |
                     v
             FRONTEND WEB UI
           HTML, CSS, JavaScript
                     |
          +----------+----------+
          |                     |
          v                     v
   Student Profile       Assessment Module
          |              Aptitude / Technical
          |              MCQ / Coding Tests
          |                     |
          +----------+----------+
                     |
                     v
              FASTAPI BACKEND
                     |
          +----------+----------+
          |                     |
          v                     v
  General Prediction     Assessment-Driven
       Workflow           Prediction Workflow
          |                     |
          v                     v
  Placement Model        Assessment Model
  Gradient Boosting      Random Forest
          |                     |
          +----------+----------+
                     |
                     v
             PREDICTION OUTPUT
                     |
                     v
             SKILL-GAP ANALYSIS
                     |
                     v
          PERSONALIZED SUGGESTIONS
                     |
                     v
           STUDENT IMPROVEMENT
                     |
                     v
               REASSESSMENT

      Assessment History / Database
          (when configured)
```

The two prediction workflows use separate trained models. The general placement model processes student profile features, while the assessment-driven model uses assessment-related features. Their outputs should be interpreted according to the inputs used by each workflow.

## System Flow

### Step 1: Student Input
The student enters the required profile information or starts an assessment through the frontend.

### Step 2: Assessment
The student attempts aptitude and technical MCQs and, where available, coding questions.

### Step 3: Score Generation
The application evaluates responses and generates scores based on the configured assessment logic.

### Step 4: Skill Profile Generation
The backend prepares the relevant student features from the profile or assessment results.

### Step 5: Placement Prediction
The appropriate trained model generates a placement prediction and associated probability or confidence-related output.

### Step 6: Skill-Gap Analysis
The system compares available student skill information with its configured criteria to identify possible improvement areas.

### Step 7: Recommendations
The application provides suggestions related to the identified skill gaps.

### Step 8: Improvement and Reassessment
Students can work on the suggested areas and take assessments again to review their progress.

## Machine Learning Approach

The project uses two separate machine learning workflows.

### 1. General Placement Prediction

- **Algorithm:** Gradient Boosting Classifier
- **Input:** Student profile and academic or skill-related features supported by the model.
- **Output:** Predicted placement category and model-derived probability.

### 2. Assessment-Driven Placement Prediction

- **Algorithm:** Random Forest Classifier
- **Input:** Assessment-related features supported by the trained model, such as coding, aptitude, and other configured indicators.
- **Output:** Predicted placement category and model-derived probability.

The models are trained and saved as Joblib files so that the FastAPI backend can load them for predictions.

### Model Training and Evaluation

The project uses Scikit-learn tools for data preprocessing, training, and evaluation. The training workflow includes splitting data into training and testing sets, preparing input features, training classifiers, and evaluating predictions using suitable metrics.

Evaluation can include:

- Accuracy
- Precision
- Recall
- F1-score
- Confusion matrix
- Feature importance, where supported by the model

The dataset currently used for model development is synthetic. Therefore, the model's results demonstrate the implementation and evaluation of the system on that dataset; they do not guarantee real-world placement outcomes.

## Skill-Gap Recommendation Process

The recommendation workflow uses available student skill information and configured criteria to identify areas that may need improvement.

The general process is:

1. Obtain the student's relevant skill scores.
2. Compare scores against the configured criteria.
3. Identify skills that fall below the defined benchmarks.
4. Generate recommendations associated with those skills.
5. Encourage the student to improve and reassess.

Recommendations depend on the rules and benchmarks implemented in the application. They should be treated as guidance rather than a guarantee of placement.

## API Endpoints

The FastAPI backend provides the following endpoints.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Root endpoint |
| POST | `/predict` | General placement prediction |
| POST | `/predict-assessment` | Assessment-driven placement prediction |
| POST | `/run-code` | Coding execution workflow |
| POST | `/evaluate-code` | Coding evaluation workflow |
| POST | `/save-assessment` | Save assessment data |
| GET | `/assessment-history` | Retrieve assessment history |

For the request formats and response schemas, run the backend and open the interactive API documentation at `/docs`.

## Installation and Setup

### Prerequisites

- Python installed
- pip package manager
- A code editor such as Visual Studio Code
- A web browser

### 1. Open the Project Folder

Open a terminal in the `StudentPlacementML` project directory.

### 2. Create and Activate a Virtual Environment

**Windows PowerShell:**

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

If the virtual environment already exists, activate it instead of creating it again.

### 3. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 4. Start the Backend

From the project root, run:

```powershell
uvicorn backend.main:app --reload
```

The backend should be available at:

`http://127.0.0.1:8000`

Interactive API documentation:

`http://127.0.0.1:8000/docs`

### 5. Start the Frontend

Open a second terminal in the project root. If the virtual environment is active in the first terminal, activate it in the second terminal only if required for your workflow.

Run:

```powershell
python -m http.server 5501
```

Open the frontend in your browser:

`http://127.0.0.1:5501/frontend/index.html`

Keep the backend and frontend servers running while using the application.

**Setup note:** The trained model files and dataset must be available at the paths expected by the backend. Database initialization and assessment-history features must also be configured for their related functionality to work.

## Limitations

- The current training dataset is synthetic and may not represent real student placement outcomes.
- Predictions depend on the quality, relevance, and distribution of the training data.
- A predicted placement probability is a model estimate, not a guarantee.
- Skill-gap recommendations depend on the configured benchmarks and implemented logic.
- Coding execution must be appropriately isolated and secured before the application is exposed to untrusted users or deployed publicly.
- Real-world performance should be validated using suitable real data before practical deployment.

## Future Enhancements

- Validate the models using suitable real-world placement datasets.
- Improve prediction reliability through further model evaluation and feature engineering.
- Add student dashboards to visualize assessment performance over time.
- Improve personalized learning recommendations.
- Expand assessment question banks and coding test coverage.
- Improve data privacy and database management.
- Securely isolate coding execution.
- Deploy the application in a suitable hosting environment after security and performance testing.

## Conclusion

The **Assessment-Driven Student Placement Prediction and Personalized Skill-Gap Recommendation System** combines student assessment, machine learning-based prediction, skill-gap identification, and personalized recommendations in a single web application.

Its goal is to help students understand their current preparation level, identify areas for improvement, and follow a continuous assessment and improvement process.
