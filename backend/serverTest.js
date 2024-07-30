const express = require('express');
// const emailRoutes = require('./email');
const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const bodyParser = require('body-parser');
const { convertPdfToJson } = require('./src/conversion');
const { convertJsonToUbl } = require('./src/jsonToUbl');
require('dotenv').config();

// Initialize Express app
const app = express();

// Mongo URI and connection
const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI);

let db, gfs;
client.connect((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
  db = client.db();
  gfs = new GridFSBucket(db, { bucketName: 'uploads' });
  console.log('Connected to MongoDB');
});

// Generate file URL
const generateFileUrl = (req, fileId) => {
  return `${req.protocol}://${req.get('host')}/files/${fileId}`;
};

// Setup GridFsStorage for PDFs
const storagePdf = new GridFsStorage({
  url: mongoURI,
  file: async (req, file) => {
    try {
      const userId = req.body.userId;
      if (!ObjectId.isValid(userId)) {
        throw new Error('Invalid userId');
      }

      const filename = `pdf-${Date.now()}-${file.originalname}`;
      const fileId = new ObjectId();
      const fileUrl = generateFileUrl(req, fileId);

      const fileInfo = {
        _id: fileId,
        filename: filename,
        metadata: {
          userId: new ObjectId(userId),
          url: fileUrl
        },
        bucketName: 'uploads',
        contentType: file.mimetype,
      };

      // Log the details for verification
      console.log('PDF storage fileInfo:', fileInfo);
      console.log('Generated fileId:', fileId.toHexString());
      console.log('Generated fileUrl:', fileUrl);

      return fileInfo;
    } catch (error) {
      console.error('Error in storagePdf:', error);
      throw error;
    }
  },
});

// Setup GridFsStorage for XMLs
const storageXml = new GridFsStorage({
  url: mongoURI,
  file: async (req, file) => {
    try {
      const userId = req.body.userId;
      if (!ObjectId.isValid(userId)) {
        throw new Error('Invalid userId');
      }

      const filename = `xml-${Date.now()}-${file.originalname}`;
      const fileId = new ObjectId();
      const fileUrl = generateFileUrl(req, fileId);

      const fileInfo = {
        _id: fileId,
        filename: filename,
        metadata: {
          userId: new ObjectId(userId),
          url: fileUrl
        },
        bucketName: 'uploads',
        contentType: file.mimetype,
      };

      // Log the details for verification
      console.log('XML storage fileInfo:', fileInfo);
      console.log('Generated fileId:', fileId.toHexString());
      console.log('Generated fileUrl:', fileUrl);

      return fileInfo;
    } catch (error) {
      console.error('Error in storageXml:', error);
      throw error;
    }
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

  const fileInfo = {
    id: req.file.id,
    length: req.file.size,
    timestamp: new Date(),
    filename: req.file.filename,
    url: req.file.metadata.url,
    userId: userId
  };

  console.log('Uploaded PDF file:', req.file);

  res.status(201).json({
    message: 'PDF file uploaded successfully',
    pdfFile: fileInfo,
  });
});

// API to upload XML
app.post('/upload/xml', uploadXml.single('file'), (req, res) => {
  const userId = req.body.userId;

  if (!req.file) {
    return res.status(400).json({ error: 'XML file is required' });
  }

  const fileInfo = {
    id: req.file.id,
    length: req.file.size,
    timestamp: new Date(),
    filename: req.file.filename,
    url: req.file.metadata.url,
    userId: userId
  };

  console.log('Uploaded XML file:', req.file);

  res.status(201).json({
    message: 'XML file uploaded successfully',
    xmlFile: fileInfo,
  });
});

// API to serve files
app.get('/files/:id', (req, res) => {
  const fileId = req.params.id;

  try {
    const _id = new ObjectId(fileId);
    gfs.openDownloadStream(_id).pipe(res);
  } catch (err) {
    res.status(400).json({ error: 'Invalid file ID' });
  }
});

app.use(bodyParser.json());


const upload = multer();
// Endpoint to convert PDF to UBL XML
app.post('/convert-pdf-to-ubl', uploadP.single('file'), async (req, res) => {
    try {
        const fileBuffer = req.file.buffer; // Get the file buffer


        const jsonResult = await convertPdfToJson(fileBuffer);
        const ublXml = convertJsonToUbl(jsonResult);
        
        res.set('Content-Type', 'application/xml; charset=utf-8');
        res.send(ublXml);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            res.status(400).json({
                error: 'Insufficient data in the PDF, please add more information',
                requiredInformation: error.response.data.requiredInformation || [],
            });
        } else if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Failed to convert PDF to UBL' });
        } else {
            res.status(500).json({ error: 'Server error, please try again later' });
        }
    }
});

// Start the server
const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
