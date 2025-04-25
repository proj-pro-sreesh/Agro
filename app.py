from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import cv2
import os

print("Working in: ", os.getcwd())
app = Flask(__name__)
modelfilelocation = " " #your model file location
model = load_model(modelfilelocation)

target_size = (200, 200)
CATEGORIES=["Wheat__Brown_Rust","Wheat__Healthy","Wheat__Yellow_Rust"]
def predict_image(img_path):
    img = cv2.imread(img_path)
    img =cv2.resize(img,target_size)
    img = img.astype('float32')/255.0
    img = np.expand_dims(img,axis=0)

    predictions = model.predict(img)
    predicted_class = np.argmax(predictions[0])
    return CATEGORIES[predicted_class]

@app.route('/predict', methods=['POST'])
def predict():

    
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']
    file_name = file.filename
    temp_dir = os.path.join(os.getcwd(), 'uploads')
    os.makedirs(temp_dir, exist_ok=True)  

    file_path = os.path.join(temp_dir, file_name)
    file.save(file_path)
    prediction = predict_image(file_path)
    os.remove(file_path)
    return prediction
if __name__ == '__main__':
    app.run(debug=True)