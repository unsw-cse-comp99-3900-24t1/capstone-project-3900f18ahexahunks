const express = require('express');
const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { convertPdfToJson } = require('./src/conversion');
const { convertJsonToUbl } = require('./src/jsonToUbl');
const { connectDB, getGfs } = require('./db');
require('dotenv').config();

// Initialize Express app
const app = express();


// Mongo URI and connection
const mongoURI = process.env.MONGO_URI;
/*
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
  // Start the server only after the MongoDB connection is established
  const PORT = process.env.BACKEND_SERVER_PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
*/

// Middleware to parse JSON bodies
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
      console.log(userId);
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



// API to upload PDF
app.post('/upload/pdf', uploadPdf.single('file'), (req, res) => {
  const userId = req.body.userId;

  console.log('userId of Pdf:', userId);

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
  console.log('userId of Xml:', userId);
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

// Endpoint to convert PDF to UBL XML
app.post('/convert-pdf-to-ubl', uploadPdf.single('file'), async (req, res) => {
    const userId = req.body.userId;

    console.log('userId of conversion:', userId);
    if (!req.file) {
        return res.status(400).json({ error: 'No PDF file uploaded.' });
    }

    try {
        const gfs = getGfs();
        const fileId = req.file.id;
        console.log(fileId);

        // Retrieve the PDF file buffer from GridFS
        const pdfFile = await new Promise((resolve, reject) => {
            const chunks = [];
            gfs.openDownloadStream(fileId)
                .on('data', (chunk) => chunks.push(chunk))
                .on('error', reject)
                .on('end', () => resolve(Buffer.concat(chunks)));
        });
        console.log("pdfFile: ", pdfFile);

        // Process the PDF file buffer to convert it to UBL XML
        const jsonResult = await convertPdfToJson(pdfFile);
        const ublXml = convertJsonToUbl(jsonResult);
        console.log('Successfully converted');

        // Save the XML to a temporary file
        const tempXmlPath = path.join(__dirname, 'temp', `temp-${Date.now()}.xml`);
        fs.writeFileSync(tempXmlPath, ublXml);

        // Read the XML file buffer
        const xmlFileBuffer = fs.readFileSync(tempXmlPath);
        
        // Set up a new Multer instance with memory storage
        const storage = multer.memoryStorage();
        const upload = multer({ storage });

        // Create a new request object with the XML file buffer
        const xmlReq = {
            ...req,
            file: {
                buffer: xmlFileBuffer,
                originalname: `converted-${req.file.originalname.replace('.pdf', '.xml')}`,
                mimetype: 'application/xml',
            }
        };

        upload.single('file')(xmlReq, res, async function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to process the file.' });
            }

            // Save the XML file to GridFS using storageXml
            const storageResult = await storageXml.file(xmlReq, xmlReq.file);
            
            if (!storageResult) {
                return res.status(500).json({ error: 'Failed to upload XML file.' });
            }

            // Clean up the temporary XML file
            fs.unlinkSync(tempXmlPath);

            const fileInfo = {
                id: storageResult._id,
                length: xmlReq.file.size,
                timestamp: new Date(),
                filename: storageResult.filename,
                url: storageResult.metadata.url,
                userId: userId
            };

            res.status(201).json({
                message: 'PDF file converted and XML file uploaded successfully',
                xmlFile: fileInfo,
            });
        });
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

/*
// Start the server
const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

// Connect to the database and start the server
connectDB().then(() => {
    const PORT = process.env.BACKEND_SERVER_PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to connect to the database', err);
  });