#🌿 AI-Powered Plant Disease Detection Web App

A web-based application that allows users to detect plant diseases through image uploads. The app uses a trained machine learning model to identify diseases and leverages Gemini AI to generate detailed content about the prediction.

---

## 🚀 Getting Started

Follow these steps to run the application locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Set Up the Backend

- Make sure you have Python and Flask installed.
- Load your trained ML model (`.h5` file) in `app.py`.

Start the Flask server:
```bash
python app.py
```

### 3. Set Up the Frontend

- Ensure Node.js and npm are installed.
- Add your Gemini AI API key in `index.js`.

Install dependencies and start the Node server:
```bash
npm install
node index.js
```

### 4. Launch the Application

Open your browser and go to:
```
http://localhost:3000
```

---

## 🧠 How It Works

1. Upload a plant image via the web interface.
2. The backend processes the image and uses a TensorFlow model to predict the disease.
3. The prediction is sent to Gemini AI to generate informative, human-readable content.
4. The result is displayed to the user on the frontend.

---

## 🛠️ Tech Stack

**Frontend**
- HTML (EJS templating)
- CSS (Bootstrap)
- JavaScript (Node.js, Express)

**Backend**
- Python (Flask)
- TensorFlow (for ML model prediction)

**External APIs**
- Gemini AI (for content generation)

---

## 👥 Team & Credits

Developed for the **Smart India Hackathon**.

**Team Members:**
- Gokul Ram K  
- Varun Krishnan  
- Yadeesh T  
- Aarthi G  
- Sreesh Jambulingam  
- Pranesh Shivaachalam

---

## ⭐ Support

If you find this project helpful, consider giving it a ⭐ and sharing it with others!

---
