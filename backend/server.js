const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB, getDb, getGfs } = require('./db');
const http = require('http');
const { ObjectId } = require('mongodb');
const axios = require('axios');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
const SWAGGER_UI_ENDPOINT = process.env.SWAGGER_UI_ENDPOINT || 'http://localhost:3000/validate-xml'; // Set your default endpoint here
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

connectDB();

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Function to generate the OAuth2 token
const generateToken = async () => {
  const tokenEndpoint = 'https://dev-eat.auth.eu-central-1.amazoncognito.com/oauth2/token';
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);
  params.append('scope', 'eat/read');

  const response = await axios.post(tokenEndpoint, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return response.data.access_token;
};

// Function to validate XML content
const validateXML = async (xmlContent) => {
  const token = await generateToken();
  const base64Content = Buffer.from(xmlContent).toString('base64');
  const checksum = crypto.createHash('md5').update(base64Content).digest('hex');

  const response = await axios.post(SWAGGER_UI_ENDPOINT, {
    filename: 'invoice.xml',
    content: base64Content,
    checksum: checksum
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};

// Route to validate UBL XML file
app.post('/validate-ubl', async (req, res) => {
  try {
    const { xmlFileId } = req.body;
    const db = getDb();
    const file = await db.collection('uploads.files').findOne({ _id: new ObjectId(xmlFileId) });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const gfs = getGfs();
    const readstream = gfs.openDownloadStream(file._id);
    let xmlContent = '';
    readstream.on('data', chunk => {
      xmlContent += chunk;
    });

    readstream.on('end', async () => {
      const validationResponse = await validateXML(xmlContent);
      await db.collection('uploads.files').updateOne({ _id: file._id }, { $set: { 'metadata.validationReport': validationResponse } });
      res.status(200).json(validationResponse);
    });

    readstream.on('error', (err) => {
      console.error('ReadStream Error:', err);
      res.status(500).json({ error: 'Failed to read file from database' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

// Route to rerun validation
app.put('/rerun-validation', async (req, res) => {
  try {
    const { UBLId } = req.body;
    const db = getDb();
    const file = await db.collection('uploads.files').findOne({ _id: new ObjectId(UBLId) });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const gfs = getGfs();
    const readstream = gfs.openDownloadStream(file._id);
    let xmlContent = '';
    readstream.on('data', chunk => {
      xmlContent += chunk;
    });

    readstream.on('end', async () => {
      const validationResponse = await validateXML(xmlContent);
      await db.collection('uploads.files').updateOne({ _id: file._id }, { $set: { 'metadata.validationReport': validationResponse } });
      res.status(200).json(validationResponse);
    });

    readstream.on('error', (err) => {
      console.error('ReadStream Error:', err);
      res.status(500).json({ error: 'Failed to read file from database' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

// Route to get validation report
app.get('/validation-report/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const db = getDb();
    const file = await db.collection('uploads.files').findOne({ _id: new ObjectId(id), 'metadata.contentType': `application/${type}` });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const validationReport = file.metadata.validationReport;

    if (!validationReport) {
      return res.status(404).json({ error: 'Validation report not found for the provided ID' });
    }

    res.status(200).json(validationReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

// Endpoint to test token generation
app.get('/test-token', async (req, res) => {
  try {
    const token = await generateToken();
    res.status(200).json({ token });
  } catch (error) {
    console.error('Token generation failed:', error);
    res.status(500).json({ error: 'Token generation failed' });
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
