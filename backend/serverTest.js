const express = require('express');
const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

// Initialize Express app
const app = express();

// Mongo URI and connection
const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
client.connect((err) => {
  if (err) throw err;
  const db = client.db();
  gfs = new GridFSBucket(db, { bucketName: 'uploads' });
  console.log('Connected to MongoDB');
});

// Setup GridFsStorage for PDFs
const storagePdf = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const userId = req.body.userId;
      if (!ObjectId.isValid(userId)) {
        return reject(new Error('Invalid userId'));
      }

      const filename = `pdf-${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        metadata: { userId: new ObjectId(userId) },
        bucketName: 'uploads',
        contentType: file.mimetype,
      };
      resolve(fileInfo);
    });
  },
});

// Setup GridFsStorage for XMLs
const storageXml = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const userId = req.body.userId;
      if (!ObjectId.isValid(userId)) {
        return reject(new Error('Invalid userId'));
      }

      const filename = `xml-${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        metadata: { userId: new ObjectId(userId) },
        bucketName: 'uploads',
        contentType: file.mimetype,
      };
      resolve(fileInfo);
    });
  },
});

const uploadPdf = multer({ storage: storagePdf });
const uploadXml = multer({ storage: storageXml });

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API to upload PDF
app.post('/upload/pdf', uploadPdf.single('file'), (req, res) => {
  const userId = req.body.userId;

  if (!req.file) {
    return res.status(400).json({ error: 'PDF file is required' });
  }

  console.log('Uploaded PDF file:', req.file);

  res.status(201).json({
    message: 'PDF file uploaded successfully',
    pdfFile: req.file,
  });
});

// API to upload XML
app.post('/upload/xml', uploadXml.single('file'), (req, res) => {
  const userId = req.body.userId;

  if (!req.file) {
    return res.status(400).json({ error: 'XML file is required' });
  }

  console.log('Uploaded XML file:', req.file);

  res.status(201).json({
    message: 'XML file uploaded successfully',
    xmlFile: req.file,
  });
});

// Start the server
const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
