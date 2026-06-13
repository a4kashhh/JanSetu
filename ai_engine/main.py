import os
import json
import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.neural_network import MLPRegressor
import numpy as np

app = FastAPI(title="JanSetu AI Deep Learning Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load real schemes
SCHEMES_PATH = os.path.join(os.path.dirname(__file__), "..", "lib", "db", "real_schemes.json")
try:
    with open(SCHEMES_PATH, "r") as f:
        SCHEMES = json.load(f)
except FileNotFoundError:
    print("WARNING: real_schemes.json not found. Using empty array.")
    SCHEMES = []

def encode_features(user_profile, scheme):
    def norm(val, m):
        if val is None: return 0.5
        return min(float(val) / m, 1.0)
        
    u_inc = norm(user_profile.get("income"), 1000000)
    u_land = norm(user_profile.get("landHolding"), 10)
    u_occ = str(user_profile.get("occupation", "")).lower()
    u_is_student = 1.0 if "student" in u_occ else 0.0
    u_is_farmer = 1.0 if "farmer" in u_occ else 0.0
    u_is_business = 1.0 if "business" in u_occ else 0.0
    u_state = str(user_profile.get("state", "")).lower()
    
    reqs = scheme.get("eligibility", {})
    s_inc = norm(reqs.get("maxIncome"), 1000000) if reqs.get("maxIncome") else 1.0
    s_land = norm(reqs.get("maxLandHolding"), 10) if reqs.get("maxLandHolding") else 1.0
    
    s_reqs_occ = [str(o).lower() for o in reqs.get("occupation", [])]
    s_req_student = 1.0 if any("student" in o for o in s_reqs_occ) else 0.0
    s_req_farmer = 1.0 if any("farmer" in o for o in s_reqs_occ) else 0.0
    s_req_business = 1.0 if any("business" in o for o in s_reqs_occ) else 0.0
    
    s_states = [str(s).lower() for s in reqs.get("states", [])]
    # State match feature: 1.0 if explicit match, 0.5 if "all", 0.0 if mismatch
    if "all" in s_states:
        s_req_state_match = 0.5
    elif u_state and any(u_state in s for s in s_states):
        s_req_state_match = 1.0
    else:
        s_req_state_match = 0.0
    
    return [u_inc, u_land, u_is_student, u_is_farmer, u_is_business, 
            s_inc, s_land, s_req_student, s_req_farmer, s_req_business, s_req_state_match]

def compute_knn_label(features):
    u_inc, u_land, u_is_student, u_is_farmer, u_is_business, s_inc, s_land, s_req_student, s_req_farmer, s_req_business, s_req_state_match = features
    
    # Base score for generic schemes
    score = 0.5 
    
    # Penalties for violating explicit rules
    if u_inc > s_inc: score -= 0.5
    if u_land > s_land: score -= 0.5
    if s_req_student > 0 and u_is_student == 0: score -= 0.8
    if s_req_farmer > 0 and u_is_farmer == 0: score -= 0.8
    if s_req_business > 0 and u_is_business == 0: score -= 0.8
    if s_req_state_match == 0.0: score -= 0.8 # Explicit state mismatch
    
    # MASSIVE REWARDS for explicit matches (this pushes highly relevant schemes to the top!)
    if s_req_student > 0 and u_is_student == 1: score += 0.5
    if s_req_farmer > 0 and u_is_farmer == 1: score += 0.5
    if s_req_business > 0 and u_is_business == 1: score += 0.5
    if s_req_state_match == 1.0: score += 0.5
    
    return min(1.0, max(0.0, score))

# Define the Deep Learning Model (Multi-Layer Perceptron)
# Architecture: 11 Input -> 32 Hidden (ReLU) -> 16 Hidden (ReLU) -> 1 Output
model = MLPRegressor(hidden_layer_sizes=(32, 16), activation='relu', solver='adam', max_iter=200)

if SCHEMES:
    print("Synthetically training Deep Neural Network on startup...")
    X_train = []
    Y_train = []
    
    # Generate Synthetic Dataset
    for _ in range(3000):
        u = {
            "income": random.randint(0, 1000000), 
            "occupation": random.choice(["Student", "Farmer", "Business", "Worker"]),
            "state": random.choice(["Maharashtra", "Chhattisgarh", "Karnataka", "Delhi"])
        }
        s = random.choice(SCHEMES)
        features = encode_features(u, s)
        label = compute_knn_label(features)
        
        X_train.append(features)
        Y_train.append(label)

    # Train Model
    model.fit(np.array(X_train), np.array(Y_train))
    print("Training Complete! Ready for Neural Network Inference.")

@app.post("/predict")
def predict_schemes(payload: dict):
    user = payload.get("profile", {})
    results = []
    
    X_inference = [encode_features(user, scheme) for scheme in SCHEMES]
    if X_inference:
        predictions = model.predict(np.array(X_inference))
        
        for i, scheme in enumerate(SCHEMES):
            prediction = float(predictions[i])
            
            # Deterministic Explainable AI filters
            is_eligible = True
            reasons = []
            
            reqs = scheme.get("eligibility", {})
            
            # Hard filter out strict mismatches for the UI so they don't look dumb
            if reqs.get("occupation") and "All" not in reqs["occupation"]:
                if not any(user.get("occupation", "").lower() in str(o).lower() for o in reqs["occupation"]):
                    is_eligible = False
                else:
                    reasons.append(f"✓ Matches exact occupation: {reqs['occupation'][0]}")
                    
            if reqs.get("states") and "All" not in reqs["states"]:
                if str(user.get("state", "")).lower() not in [str(s).lower() for s in reqs["states"]]:
                    is_eligible = False
                else:
                    reasons.append(f"✓ Matches state: {user.get('state')}")
                    
            if user.get("income") is not None and reqs.get("maxIncome"):
                if user["income"] > reqs["maxIncome"]:
                    is_eligible = False
                else:
                    reasons.append(f"✓ Income below ₹{reqs['maxIncome']}")
                    
            if len(reasons) == 0:
                reasons.append("✓ General scheme open to all citizens")
                    
            if is_eligible and prediction > 0.4:
                # Calculate a good looking UI score based on the raw NN prediction
                ui_score = int(prediction * 100)
                ui_score = min(99, max(75, ui_score))
                
                results.append({
                    "scheme": scheme,
                    "score": ui_score,
                    "reasons": reasons,
                    "missingInfo": [],
                    "isEligible": True
                })
                
    results.sort(key=lambda x: x["score"], reverse=True)
    return {"recommendations": results[:10], "profile": user}
