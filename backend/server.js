const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { convertPdfToUbl } = require('./src/conversion');
require('dotenv').config();
const { connectDB, getDb, getGfs } = require('./db');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const http = require('http');
const { ObjectId } = require('mongodb');
const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

connectDB();

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Middleware to log request headers and body
app.use((req, res, next) => {
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

const extractFileAndUserId = (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  req.body = {};
  const fileInfo = {};

  busboy.on('field', (fieldname, val) => {
    if (fieldname === 'userId') {
      req.body.userId = val;
    }
  });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (fieldname === 'file') {
      const saveTo = path.join(__dirname, 'uploads', path.basename(filename));
      file.pipe(fs.createWriteStream(saveTo));
      fileInfo.filename = filename;
      fileInfo.path = saveTo;
      fileInfo.mimetype = mimetype;
    }
  });

  busboy.on('finish', () => {
    if (!req.body.userId || !ObjectId.isValid(req.body.userId)) {
      return res.status(400).json({ error: 'Invalid or missing userId' });
    }
    if (!fileInfo.path) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    req.fileInfo = fileInfo;
    next();
  });

  req.pipe(busboy);
};


// Middleware to validate userId before file upload
const validateUserId = (req, res, next) => {

  console.log('Request body before uploadPdf:', req.body);
  const userId = req.body.userId;
  console.log('Received userId:', userId);
  if (!userId || !ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid or missing userId' });
  }
  next();
};

// GridFS storage engine for PDF files
const storagePdf = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    console.log('Inside storagePdf file function');
    return new Promise((resolve, reject) => {
      const userId = req.body.userId;
      console.log('UserId in storagePdf:', userId);

      if (!ObjectId.isValid(userId)) {
        console.error('Invalid userId:', userId);
        return reject(new Error('Invalid userId'));
      }

      const filename = `pdf-${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        metadata: { userId: new ObjectId(userId) },
        bucketName: 'uploads',
        contentType: 'application/pdf',
      };
      console.log('File info to be stored:', fileInfo);
      resolve(fileInfo);
    });
  },
});

// GridFS storage engine for XML files
const storageXml = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const userId = req.body.userId;

      if (!ObjectId.isValid(userId)) {
        console.error('Invalid userId:', userId);
        return reject(new Error('Invalid userId'));
      }

      const filename = `xml-${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        metadata: { userId: new ObjectId(userId) },
        bucketName: 'uploads',
        contentType: 'application/xml',
      };
      resolve(fileInfo);
    });
  },
});

const uploadPdf = multer({ storage: storagePdf });
const uploadXml = multer({ storage: storageXml });

// Route to upload a PDF file
app.post('/upload/pdf', extractFileAndUserId, (req, res, next) => {
  console.log('Request body after extracting userId:', req.body);
  console.log('Extracted file info:', req.fileInfo);

  // Now you can use multer or any other logic to handle the file
  uploadPdf.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(500).json({ error: 'Multer error occurred when uploading.', details: err.message });
    } else if (err) {
      console.error('Unknown error:', err);
      return res.status(500).json({ error: 'An unknown error occurred when uploading.', details: err.message });
    }

    if (!req.file) {
      console.error('No file uploaded:', req.file);
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    console.log('Uploaded file:', req.file);
    res.status(201).json({ file: req.file });
  });
});

// Route to upload an XML file
app.post('/upload/xml', validateUserId, (req, res, next) => {
  uploadXml.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: 'Multer error occurred when uploading.', details: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'An unknown error occurred when uploading.', details: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    res.status(201).json({ file: req.file });
  });
});

// Route to convert a local PDF file to UBL XML and save to MongoDB
app.post('/convert-pdf-to-ubl', async (req, res) => {
  const { pdfFilePath } = req.body;

  if (!pdfFilePath) {
    return res.status(400).json({ error: 'PDF file path is required' });
  }

  try {
    const ublXml = await convertPdfToUbl(pdfFilePath);
    const gfs = getGfs();
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
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Retrieve files by userId
app.get('/files/:userId', async (req, res) => {
  const { userId } = req.params;
  const db = getDb();
  try {
    const files = await db.collection('uploads.files').find({ 'metadata.userId': new ObjectId(userId) }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No files found' });
    }
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve a specific file by filename
app.get('/file/:filename', async (req, res) => {
  const { filename } = req.params;
  const db = getDb();
  const gfs = getGfs();
  try {
    const file = await db.collection('uploads.files').findOne({ filename });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    const readstream = gfs.openDownloadStreamByName(file.filename);
    readstream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
