# 💳 Credit Card Fraud Detection System

An end-to-end Machine Learning web application that detects fraudulent credit card transactions using a trained Random Forest model.  
The system supports CSV uploads, real-time predictions, model performance visualization, and a modern dark/light themed UI.

---

## 🚀 Live Demo

- **Frontend (Vercel):**  
  👉 https://credit-card-fraud-detection-ka75fa1le.vercel.app

- **Backend API (Render):**  
  👉 https://fraud-detection-backend-i8k2.onrender.com

---

## 🧠 Problem Statement

Credit card fraud causes significant financial losses and requires fast, accurate detection systems.  
This project aims to classify transactions as **fraudulent** or **legitimate** using Machine Learning while handling highly **imbalanced data**.

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React (Vite + TypeScript)
- Tailwind CSS + shadcn/ui
- Dark / Light Theme Toggle
- CSV Upload & Result Visualization

### 🔹 Backend
- Python
- Flask + Flask-CORS
- REST API (`/predict` endpoint)

### 🔹 Machine Learning
- Scikit-learn
- Random Forest Classifier
- StandardScaler
- Imbalanced data handling
- Model persistence with `joblib`

---

## 📊 Model Performance (Test Set)

| Metric      | Value |
|------------|-------|
| Precision  | 0.95  |
| Recall     | 0.75  |
| F1-Score   | 0.84  |

**Confusion Matrix:**
