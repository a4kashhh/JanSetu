# 🇮🇳 JanSetu AI

![JanSetu Banner](https://img.shields.io/badge/Powered_by-PyTorch_Deep_Learning-emerald?style=for-the-badge&logo=pytorch)
![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)

**JanSetu AI** (translated: *The People's Bridge*) is a next-generation AI Eligibility Intelligence Platform. It acts as an intelligent bridge between Indian citizens and the thousands of government schemes, subsidies, scholarships, and welfare programs they rightfully qualify for but struggle to discover.

Built for the hackathon, this platform abandons the standard "chatbot" approach and instead leverages a true **Deep Learning Neural Network** architecture to probabilistically match users with a curated database of real-world Indian government programs.

---

## ✨ Key Features

- 🧠 **PyTorch Deep Learning Engine:** A custom multi-layer Neural Network (FastAPI microservice) that calculates exact probabilistic match scores based on dynamic user features.
- ⚡ **Lightning Fast Frontend:** Built with Next.js 14, Tailwind CSS, and Framer Motion for a stunning, glassmorphism-inspired UI.
- 📊 **Dynamic Adaptive Wizard:** An intelligent onboarding flow that adapts its questions based on your profile (e.g., asking "Business Stage" for startups, or bypassing irrelevant questions for jobseekers).
- 🔍 **Explainable AI:** Complete transparency on *why* a scheme was matched with you (e.g., matching occupation, satisfying income thresholds, etc.).
- 🚀 **1,500+ Real Schemes:** Mapped directly from official Kaggle government datasets, with fully automated NLP parsing that extracts states, eligibility rules, and official application portals.

---

## 🛠️ Architecture

The project utilizes a highly scalable, dual-stack microservice architecture:

1. **The Core Web App (Next.js)**: Handles the UI, state management, and the adaptive user flow.
2. **The AI Engine (Python / FastAPI)**: A dedicated microservice running PyTorch. Upon startup, it mathematically embeds the 1,500+ schemes and runs real-time matrix multiplication against user vectors to score eligibility.

---

## 🚀 Getting Started

### 1. Start the Frontend (Next.js)
```bash
npm install
npm run dev
```
*The app will be available at `http://localhost:3000`*

### 2. Start the AI Engine (PyTorch / FastAPI)
```bash
pip install torch torchvision torchaudio fastapi uvicorn pydantic pandas
cd ai_engine
uvicorn main:app --reload --port 8001
```
*The AI Engine will train its Neural Network on boot and listen on `http://127.0.0.1:8001`*

---

### Data Pipeline
If you wish to re-parse the raw `updated_data.csv` from Kaggle:
```bash
python3 scripts/parse_local_dataset.py
```
*This will execute the NLP pipeline and rebuild `lib/db/real_schemes.json`.*

---

## 🎯 The Vision
Navigating government welfare portals is notoriously complex, highly fragmented, and buried in bureaucratic jargon. **JanSetu AI** solves this by demanding zero research from the user. You just provide your basic parameters, and our Neural Network instantly bridges the gap to the exact financial benefits you deserve. 

## Features
- AI Scheme Matching
- Secure Authentication

## Getting Started
1. Clone repo
2. npm install
3. npm run dev
