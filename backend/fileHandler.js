const xml2js = require('xml2js');
const axios = require('axios');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const { getDb, getGfs } = require('./db');

const validateUBLFileHandler = async (req, res) => {
  try {
    const xmlContent = req.body;

    xml2js.parseString(xmlContent, { explicitArray: false }, async (err, result) => {
      if (err) {
        return res.status(400).json({ error: 'Invalid XML format' });
      }
      try {
        const validationResults = await validateXML(result);
        const pdfContent = JSON.stringify(validationResults, null, 2);
        pdf.create(pdfContent).toBuffer(async (err, buffer) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to create PDF' });
          }

          // Save PDF to MongoDB
          await connectDB();
          const db = getDb();
          const gfs = getGfs();
          const uploadStream = gfs.openUploadStream(`${new Date().toISOString()}_Validation_Report.pdf`);
          uploadStream.end(buffer);

          res.status(200).json({ validationResults, pdfBuffer: buffer.toString('base64') });
        });
      } catch (error) {
        console.error('Error during UBL validation:', error);
        res.status(500).json({ error: 'Validation failed due to internal error' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

const validateXML = async (xmlContent) => {
  const response = await axios.post(process.env.SWAGGER_UI_ENDPOINT, xmlContent, {
    headers: { 'Content-Type': 'application/xml' }
  });

  return response.data;
};

module.exports = { validateUBLFileHandler };
