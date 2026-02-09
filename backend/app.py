from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

@app.route("/", methods=["GET"])
def health():
    return {"status": "Backend is awake"}


app = Flask(__name__)
CORS(app)  # allow frontend to talk to backend

# Load model and scaler
model = joblib.load("rf_fraud_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    df = pd.read_csv(file)

    # ✅ RECREATE FEATURE USED DURING TRAINING
    if "Hour" not in df.columns:
        df["Hour"] = df["Time"] / 3600

    # ✅ EXACT feature order used during training
    feature_order = scaler.feature_names_in_

    X = df[feature_order]
    X_scaled = scaler.transform(X)

    preds = model.predict(X_scaled)

    return jsonify({
        "total_transactions": int(len(df)),
        "fraud_transactions": int(preds.sum())
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000,debug=True)
