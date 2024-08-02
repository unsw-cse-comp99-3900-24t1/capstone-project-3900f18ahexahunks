require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { validateUBL, generatePDFReport } = require('./validateUBL');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5003;

// Setup Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Connect to MongoDB
connectDB().then(client => {
  const db = client.db();
  const validationsCollection = db.collection('validations');

  // Endpoint to validate UBL file
  app.post('/validate/validate-ubl', upload.single('ublFile'), async (req, res) => {
    try {
      const ublFile = req.file;
      const userId = req.body.userId;
      const name = req.body.name;

      if (!ublFile || !userId || !name) {
        return res.status(400).json({ error: 'UBL file, userId, and name are required' });
      }

      const ublContent = ublFile.buffer.toString();
      const originalFileName = ublFile.originalname; // Get the original file name

      // Validate the UBL file
      const validationResult = await validateUBL(ublContent, originalFileName);

      // Generate PDF Report
      const reportPath = generatePDFReport(validationResult, originalFileName);

      // Save validation details to MongoDB
      const validationRecord = {
        userId,
        name,
        date: new Date(),
        reportPath,
        validationResult,
      };

      const result = await validationsCollection.insertOne(validationRecord);

      res.status(200).json({
        message: 'UBL file uploaded, validated, and user updated successfully!',
        ublId: result.insertedId,
        validatorId: result.insertedId,
        newObjectId: result.insertedId,
        name: name,
        date: new Date().toISOString(),
        validationHtml: '<html>Validation Report</html>',
        validationJson: validationResult,
      });
    } catch (error) {
      console.error('Error validating UBL:', error);
      res.status(500).json({ error: 'Server error, please try again later' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
