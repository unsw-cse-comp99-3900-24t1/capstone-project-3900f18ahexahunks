const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const { getPdfUbl, deletePdfUbl } = require('./ubl');
const PORT = 5003;
const app = express();
const { ObjectId, GridFSBucket } = require('mongodb');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

connectDB();

app.get('/test', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

// Add a route to handle file streaming
app.get('/file/:id', async (req, res) => {
  const { id } = req.params;
  const client = await connectDB();
  const db = client.db();

  try {
    const bucket = new GridFSBucket(db, {
      bucketName: 'uploads'
    });

    const objectId = new ObjectId(id);
    const downloadStream = bucket.openDownloadStream(objectId);

    downloadStream.on('data', chunk => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
      res.sendStatus(404);
    });

    downloadStream.on('end', () => {
      res.end();
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

// Route for fetching PDFs and UBLs
app.get('/get-pdf-ubl/:userId', async (req, res) => {
  const { userId } = req.params;
  const response = await getPdfUbl(userId);

  return res.status(response.status).json(response.json);
});

// Route for deleting PDFs and UBLs
app.delete('/delete-pdf-ubl', async (req, res) => {
  const { "PDF-id": pdfId, "UBL-id": ublId } = req.body;
  const response = await deletePdfUbl(pdfId, ublId);

  return res.status(response.status).json(response.json);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = { app };
