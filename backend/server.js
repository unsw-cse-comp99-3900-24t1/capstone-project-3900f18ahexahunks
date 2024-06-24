const express = require('express');
const cors = require('cors');
const { convertPdfToUbl } = require('./src/conversion');
require('dotenv').config();
const http = require('http');
const {connectDB, gfs} = require('./db');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

const server = http.createServer(app);

connectDB();

module.exports = app;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to convert a local PDF file to UBL XML and save to MongoDB
app.post('/convert', async (req, res) => {
    console.log('Received req.body:', req.body);
    const { pdfFilePath } = req.body;
  
    if (!pdfFilePath) {
      return res.status(400).json({ error: 'PDF file path is required' });
    }
  
    try {
      const ublXml = await convertPdfToUbl(pdfFilePath);
      
      // Save the UBL XML to MongoDB using GridFS
      const writeStream = gfs.createWriteStream({
        filename: `${Date.now()}-converted.xml`,
        contentType: 'application/xml',
      });
  
      writeStream.write(ublXml);
      writeStream.end();
  
      writeStream.on('close', (file) => {
        res.status(200).json({ message: 'File saved to MongoDB', file });
      });
  
      writeStream.on('error', (error) => {
        res.status(500).json({ error: 'Failed to save file to MongoDB', details: error });
      });
    } catch (error) {
      res.status(error.status || 500).json(error.message);
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
