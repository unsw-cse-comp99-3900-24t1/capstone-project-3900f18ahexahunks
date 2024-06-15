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

// Use get() to access the data
function getData() {
  if (fs.existsSync('./currentData.json')) {
    const storedData = fs.readFileSync('./currentData.json', { flag: 'r' });
    data = JSON.parse(storedData.toString());
  }
  return data;
}

// Use set(newData) to pass in the entire data object, with modifications made
function setData(newData) {
  data = newData;
  fs.writeFileSync('./currentData.json', JSON.stringify(data), { flag: 'w' });
}

// get data store
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
    return res.status(400).json({ error: ['UBL Id and PDF Id are required'] });
  }

  if (!checkUblId(ublId)) {
    return res.status(400).json({ error: ['UBL Id does not exist'] });
  }

  if (!checkPdfId(pdfId)) {
    return res.status(400).json({ error: ['PDF Id does not exist'] });
  }

// Simulate a possible server error
if (Math.random() < 0.1) {
  return res.status(500).json({
    error: "Server error, please try again later"
  });
}

  // Perform the delete operation
  dataStore.ubls = dataStore.ubls.filter(item => item.ublId !== ublId);
  dataStore.pdfs = dataStore.pdfs.filter(item => item.pdfId !== pdfId);

  // Send success response
  res.status(200).json({
    "UBL-id": ublId,
    "PDF-id": pdfId,
    message: 'Successfully deleted UBL and PDF'
  });

  setData(dataStore);
});

// Example data initialization
// dataStore = {
//   ubls: [{ ublId: '123' }],
//   pdfs: [{ pdfId: '456' }]
// };
