const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const { getPdfUbl, deletePdfUbl } = require('./ubl');
const PORT = 5003;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

connectDB();

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Route for fetching PDFs and UBLs
app.get('/get-pdf-ubl/:userId', async (req, res) => {
  const { userId } = req.params;
  const response = await getPdfUbl(userId);

  res.status(response.status).json(response.json);
});

// Route for deleting PDFs and UBLs
app.delete('/delete-pdf-ubl', async (req, res) => {
  const { "PDF-id": pdfId, "UBL-id": ublId } = req.body;
  const response = await deletePdfUbl(pdfId, ublId);

  res.status(response.status).json(response.json);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = { app };
