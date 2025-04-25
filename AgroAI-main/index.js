const express = require('express');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const app = express();
const FormData = require('form-data');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

const GOOGLE_API_KEY = "XXXXXXXXX"; //include your api key here
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

app.get('/', (req, res) => {
  res.render('land/home.ejs');
});

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = req.file.path;

  try {

    // Create form data and append the file
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    // Use axios to send the image file to Flask
    const response = await axios.post('http://localhost:5000/predict', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Process the prediction result and clean up
    const result = await run(response.data);
    return res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error occurred during prediction.');
  }
});

async function run(e) {
    const generationConfig={
        stopSequences: ["red"],
        maxOutputTokens: 200,
        temperature:1,
        topP:0.1,
        topK:16
    };
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", generationConfig });
  const result = await model.generateContent(`Provide detailed information on the causes and prevention methods for the plant disease called ${e}.`);
  return result.response.text();
}

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});