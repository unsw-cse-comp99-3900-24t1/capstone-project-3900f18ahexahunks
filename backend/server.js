const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});

// Initialize data
let data = {
  ubls: [{ ublId: '123' }],
  pdfs: [{ pdfId: '456' }]
};

// Use getData to access the data
function getData() {
  if (fs.existsSync('./application.json')) {
    const storedData = fs.readFileSync('./application.json', { flag: 'r' });
    data = JSON.parse(storedData.toString());
  }
  return data;
}

// Use setData to pass in the entire data object, with modifications made
function setData(newData) {
  data = newData;
  fs.writeFileSync('./application.json', JSON.stringify(data), { flag: 'w' });
}

// Load initial data
let dataStore = getData();

// Helper functions for validation
function checkUblId(ublId) {
  return dataStore.ubls.some(item => item.ublId === ublId);
}

function checkPdfId(pdfId) {
  return dataStore.pdfs.some(item => item.pdfId === pdfId);
}

// DELETE /delete-ubl endpoint
app.delete('/delete-ubl', (req, res) => {
  const { "UBL-id": ublId, "PDF-id": pdfId } = req.body;

  // Validate UBL and PDF IDs
  if (!ublId || !pdfId) {
    return res.status(400).json({
      error: ['UBL Id and PDF Id are required'],
      details: "As errors"
    });
  }

  if (!checkUblId(ublId)) {
    return res.status(400).json({
      error: ['UBL Id does not exist'],
      details: "As errors"
    });
  }

  if (!checkPdfId(pdfId)) {
    return res.status(400).json({
      error: ['PDF Id does not exist'],
      details: "As errors"
    });
  }

  // Perform the delete operation
  dataStore.ubls = dataStore.ubls.filter(item => item.ublId !== ublId);
  dataStore.pdfs = dataStore.pdfs.filter(item => item.pdfId !== pdfId);

  // Simulate a possible server error
  if (Math.random() > 0) {
    return res.status(500).json({
      error: "Server error, please try again later"
    });
  }

  // Send success response
  res.status(200).json({
    "UBL-id": ublId,
    "PDF-id": pdfId,
    message: 'Successfully deleted UBL and PDF references'
  });

  // Update the data store
  setData(dataStore);
});

// Example data initialization (if no application.json exists)
// This is useful for initial server setup
if (!fs.existsSync('./application.json')) {
  setData(data);
}
