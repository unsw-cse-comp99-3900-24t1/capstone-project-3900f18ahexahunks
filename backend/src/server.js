const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const { getPdfUbl, deletePdfUbl } = require('./ubl');
const PORT = 5003;
const app = express();

let isServerBusy = false;
connectDB();

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
    res.json({ message: 'Hello World!' });
});

// Route for fetching PDFs and UBLs
app.get('/get-pdf-ubl/:userId', async (req, res) => {
  if (isServerBusy) {
    return res.status(500).json({ error: "Please try again later" });
  }

  const { userId } = req.params;
  const response = await getPdfUbl(userId);

  return res.status(response.status).json(response.json);
});

// Route for deleting PDFs and UBLs
app.delete('/delete-pdf-ubl', async (req, res) => {
  if (isServerBusy) {
    return res.status(500).json({ error: "Please try again later" });
  }

  const { "UBL-id": ublId, "PDF-id": pdfId } = req.body;
  const response = await deletePdfUbl(ublId, pdfId);

  return res.status(response.status).json(response.json);
});

const server = app.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});

module.exports = { app, server };
