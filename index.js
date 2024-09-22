// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

// Initialize the Express app
const app = express();

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON requests
app.use(bodyParser.json());

// POST Endpoint for /bfhl
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  // Separate numbers and alphabets from the input data
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));

  // Get highest lowercase alphabet
  const lowerAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
  const highestLowercase = lowerAlphabets.length ? [lowerAlphabets.sort().pop()] : [];

  // File handling logic
  const fileValid = file_b64 ? true : false;
  const fileMimeType = fileValid ? 'image/png' : null; // Adjust logic based on file type
  const fileSizeKb = fileValid ? Buffer.from(file_b64, 'base64').length / 1024 : 0;

  // Send response
  res.json({
    is_success: true,
    user_id: "mimansa_de_15082002", 
    email: "md8671@srmist.edu.in",
    roll_number: "RA2111026030172", 
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb
  });
});

// GET Endpoint for /bfhl
app.get('/bfhl', (req, res) => {
  // Hardcoded response for GET request
  res.status(200).json({ operation_code: 1 });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
