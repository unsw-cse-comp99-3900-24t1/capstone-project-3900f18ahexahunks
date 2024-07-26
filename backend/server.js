const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const connectDB = require('./db');
const validateUBL = require('./validateUBL'); // Import the validation function

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Endpoint to validate UBL
app.post('/validate-ubl', async (req, res) => {
  const xmlContent = req.body;
  try {
    const validationResult = await validateUBL(xmlContent);
    res.status(200).json(validationResult);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : 'Server error, please try again later',
    });
  }
});

const server = http.createServer(app);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log('Server running on port:', PORT);
  });
});

module.exports = app;
