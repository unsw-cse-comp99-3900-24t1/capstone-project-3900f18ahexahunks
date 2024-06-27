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

// Setup GridFsStorage
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const userId = req.body.userId;
      if (!ObjectId.isValid(userId)) {
        return reject(new Error('Invalid userId'));
      }

      const filename = `${Date.now()}-${file.originalname}`;
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

const upload = multer({ storage });

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API to upload files
app.post('/upload', upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'xml', maxCount: 1 }]), (req, res) => {
  const userId = req.body.userId;

  if (!req.files || !req.files['pdf'] || !req.files['xml']) {
    return res.status(400).json({ error: 'PDF and XML files are required' });
  }

  console.log('Uploaded PDF file:', req.files['pdf'][0]);
  console.log('Uploaded XML file:', req.files['xml'][0]);

  res.status(201).json({
    message: 'Files uploaded successfully',
    pdfFile: req.files['pdf'][0],
    xmlFile: req.files['xml'][0],
  });
});

// Start the server
const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
