const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const connectDB = require('./db');
const validateUbl = require('./validation/validateUbl'); // import the validation logic
const rerunValidation = require('./validation/reRunValidation'); // import the rerun validation logic

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT || 3005;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// add the new validation endpoint
app.post('/validate-ubl', (req, res) => {
    const ublContent = req.body;
    if (!ublContent) {
        return res.status(400).json({ error: 'UBL content is required' });
    }
    try {
        const validationResult = validateUbl(ublContent);
        res.status(200).json(validationResult);
    } catch (error) {
        res.status(500).json({ error: 'Validation failed', details: error.message });
    }
});

// add the rerun validation endpoint
app.put('/rerun-validation', (req, res) => {
    const { ublId } = req.body;
    if (!ublId) {
        return res.status(400).json({ error: 'UBL ID is required' });
    }
    try {
        const validationResult = rerunValidation(ublId);
        res.status(200).json(validationResult);
    } catch (error) {
        res.status(500).json({ error: 'Rerun validation failed', details: error.message });
    }
});

const server = http.createServer(app);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log('Server running on port:', PORT);
  });
}).catch(error => {
  console.error('Database connection failed:', error.message);
});

module.exports = app;
