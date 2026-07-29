# ⚽ Mission 2038 — AI-Powered Football Coaching & Scout Platform

> **Empowering Grassroots Talent with Premier League-Level Computer Vision & LLM Intelligence.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Pose_Tracking-00C9FF?style=for-the-badge)](https://mediapipe.dev/)
[![YOLOv8](https://img.shields.io/badge/YOLOv8-Object_Tracking-FF6F00?style=for-the-badge)](https://ultralytics.com/)

---

## 🎯 Vision & Problem Statement

Access to elite football coaching and professional scouting is often limited by geography and high financial costs. **Mission 2038** bridges this gap by turning any smartphone video into a **biomechanical performance lab and AI scout**. 

Using lightweight computer vision (MediaPipe Pose & YOLOv8) combined with **Google Gemini AI**, Mission 2038 delivers frame-by-frame mechanical analysis, metric scoring, and personalized tactical feedback to young players anywhere in the world.

---

## ✨ Key Features

### ⚽ 1. Shooting Biomechanics Coach (`ai_Coach.py`)
* **Knee Flexion & Backswing Tracking**: Measures plant-foot & kick-leg knee backswing angles to grade shot power and posture.
* **Flexion Classification**: Categorizes form into **World Class (<60°)**, **Pro Level (<85°)**, or **Amateur Form (>85°)**.
* **Pro Shooting Verdict**: Generates instant technical adjustments (e.g., body lean, hip torque) powered by **Google Gemini AI**.

### ⚡ 2. Dribbling & Ball Control Coach (`dribbling_coach.py`)
* **YOLOv8 Ball & Keypoint Tracking**: Tracks close-control touches, direction changes, and ball distance relative to stance.
* **Agility & Precision Scoring**: Measures touch frequency, turn agility time, and overall control precision percentage.
* **Center-of-Gravity Guidance**: Advises players on stride length and stance balance during sharp cuts.

### 🧤 3. Goalkeeper Reaction & Span Coach (`goalkeeper_coach.py`)
* **Reaction Speed Measurement**: Computes exact millisecond response time from shot trigger to keeper movement initiation.
* **Diving Reach & Limb Span**: Calculates lateral diving reach in centimeters using 33 MediaPipe pose keypoints.
* **Set-Position Posture Feedback**: Evaluates knee bend readiness before shot release.

### 🛡️ 4. Pre-Analysis Content Classifier
* Automatically validates uploaded video clips to verify authentic player movement and filter out non-football videos prior to executing full model pipelines.

### 🚀 5. Live SSE Video Streaming & Futuristic UI
* **Server-Sent Events (SSE)** stream real-time skeleton overlay frames directly to a dark-mode glassmorphism dashboard built with **Next.js** and **Tailwind CSS**.

---

## 🏗️ System Architecture

```
                               ┌────────────────────────────────┐
                               │       Next.js Frontend         │
                               │  (Dashboard, Live SSE Stream)  │
                               └───────────────┬────────────────┘
                                               │
                                       HTTP / SSE Stream
                                               │
                               ┌───────────────▼────────────────┐
                               │      Node.js Express Proxy     │
                               │   (Auth JWT, Cloudinary, DB)   │
                               └───────────────┬────────────────┘
                                               │
                                       Multipart Payload
                                               │
                               ┌───────────────▼────────────────┐
                               │       FastAPI AI Server        │
                               │ (OpenCV, MediaPipe & YOLOv8)   │
                               └───────────────┬────────────────┘
                                               │
                                      Prompt Data Payload
                                               │
                               ┌───────────────▼────────────────┐
                               │     Google Gemini AI Brain     │
                               │  (gemini-flash-latest Engine)  │
                               └────────────────────────────────┘
```

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 14, React, Lucide Icons, Tailwind CSS, SSE (Server-Sent Events) Streaming.
* **Node Proxy API**: Node.js, Express, JWT Authentication, Cloudinary SDK, MongoDB Atlas.
* **AI Computer Vision**: Python 3.11, FastAPI, OpenCV, MediaPipe Pose, Ultralytics YOLOv8.
* **LLM Intelligence**: Google GenAI SDK (`google-genai`), `gemini-flash-latest`, `gemini-pro-latest`.
* **Resilience Layer**: Dual-model cascade with automated fallback to local **Pro Coaching Rule Engine** for zero-downtime offline execution.

---

## ⚡ Quick Start Guide

### Prerequisites
* **Node.js**: `v18.x` or higher
* **Python**: `v3.10` or `v3.11`
* **Google Gemini API Key**: Obtain from [Google AI Studio](https://aistudio.google.com/app/apikey)

---

### 1. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Config
PORT=5000
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:5000/api
FASTAPI_URL=http://127.0.0.1:8000

# Database & Auth
MONGODB_URI=mongodb+srv://<your_connection_string>
JWT_SECRET=your_super_secret_jwt_key

# Google Gemini AI Key
GEMINI_API_KEY=AIzaSy...your_gemini_api_key

# Cloud Storage (Optional / Local Fallback Enabled)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 2. Install & Start FastAPI Backend

```bash
cd P_03-main/backend

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload --port 8000
```

---

### 3. Install & Start Express API Proxy

```bash
# From workspace root
npm install

# Start Express server
node server.js
```

---

### 4. Start Next.js Frontend

```bash
# From workspace root
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start analyzing drills!

---

## 🛡️ Zero-Downtime Resilience & Fallback Engine

Network disruptions or rate limits will **never break your experience**. 

Mission 2038 uses a 3-tier fallback hierarchy:
1. **Primary**: Google Gemini AI (`gemini-flash-latest`)
2. **Secondary**: Google Gemini Pro (`gemini-pro-latest`)
3. **Tertiary (Offline)**: Built-in **Pro Coaching Rule Engine** (calculates Scout Grades and technical action plans locally based on MediaPipe kinematic telemetry).

---

## 👥 Hackathon Submission

Built for **Mission 2038 Hackathon**. 

* **Team**: Mission 2038 AI Developers
* **License**: MIT
