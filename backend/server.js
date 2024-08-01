const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { generatePDFReport, mockValidateUBL } = require('./ubl'); // Adjust as needed

const app = express();
const PORT = process.env.PORT || 5003;

// Setup Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to validate UBL file
app.post('/validate/validate-ubl', upload.single('ublFile'), async (req, res) => {
  try {
    const ublFile = req.file;
    if (!ublFile) {
      return res.status(400).json({ error: 'UBL file is required' });
    }

    const ublContent = ublFile.buffer.toString();

    // Mock validation
    const validationResult = mockValidateUBL(ublContent);

    // Generate PDF Report
    const reportPath = generatePDFReport(validationResult);

    res.status(200).json({ message: 'Validation successful', report: reportPath });
  } catch (error) {
    console.error('Error validating UBL:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
