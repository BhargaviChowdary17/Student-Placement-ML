# ML-Based Student Placement Prediction and Personalized Skill-Gap Recommendation System

An educational machine learning web application that predicts a student's placement status based on academic, technical, aptitude, communication, and extracurricular attributes. The system also identifies skill gaps and provides personalized improvement recommendations.

## 📌 Project Overview

The system combines Machine Learning, FastAPI, and a web-based frontend to provide an interactive student placement prediction system.

A student enters their profile details through a web form. The backend processes the information and uses a trained Gradient Boosting classification model to estimate the likelihood of placement.

The system also compares selected skill scores against dataset-based baseline values and provides recommendations for improvement.

## 🎯 Objectives

- Predict student placement status using Machine Learning.
- Estimate the model's placement probability.
- Identify important skill areas that need improvement.
- Provide personalized skill development recommendations.
- Build an easy-to-use web application.
- Demonstrate the practical integration of ML with a FastAPI backend.

## 🧠 Machine Learning

### Algorithm Used

Gradient Boosting Classifier

### Input Features

- Branch
- College Tier
- CGPA
- Backlogs
- Coding Skills
- DSA Score
- Aptitude Score
- Communication Skills
- ML Knowledge
- System Design
- Internships
- Projects Count
- Certifications
- Hackathons
- Open Source Contributions
- Extracurriculars

### Target

`placement_status`

Where:

- `1` = Placed
- `0` = Not Placed

### Data Preprocessing

The project uses a preprocessing pipeline:

- Categorical missing-value handling
- Numerical missing-value handling
- One-Hot Encoding for categorical features
- Median imputation for numerical features
- Train-test split with stratification

### Model Evaluation

The current Gradient Boosting model achieved approximately:

**Accuracy: 69.81%**

The model is evaluated using:

- Accuracy
- Precision
- Recall
- F1-score
- Confusion Matrix

> Note: The dataset used in this educational prototype is synthetic. The reported performance should not be interpreted as real-world college placement performance.

## 🎯 Skill-Gap Recommendation

The system compares selected student skill scores against dataset-based baseline values.

Skill areas include:

- Coding Skills
- DSA
- Aptitude
- Communication
- ML Knowledge
- System Design

If a student's score is below the corresponding dataset baseline, the system identifies it as a potential area for improvement and provides a recommendation.

These baselines are dataset-relative and are not universal industry standards.

## 🏗️ System Architecture

```text
Student
   ↓
Web Form
   ↓
HTML / CSS / JavaScript
   ↓
FastAPI Backend
   ↓
Data Preprocessing
   ↓
Trained Gradient Boosting Model
   ↓
Placement Prediction
   ↓
Skill-Gap Analysis
   ↓
Personalized Recommendations
   ↓
Web Dashboard