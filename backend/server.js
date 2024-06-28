const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');
const { connectDB, getBucket } = require('./db');
const { validateUBL } = require('./validation');
const xml2js = require('xml2js');
const pdfParser = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.fields([{ name: 'xml' }, { name: 'pdf' }]), async (req, res) => {
  const files = req.files;
  if (!files || !files.xml || !files.pdf) {
    return res.status(400).send('Both XML and PDF files are required.');
  }

  const client = await connectDB();
  const bucket = getBucket(client);

  const xmlUploadStream = bucket.openUploadStream(files.xml[0].originalname);
  const pdfUploadStream = bucket.openUploadStream(files.pdf[0].originalname);

  xmlUploadStream.end(files.xml[0].buffer);
  pdfUploadStream.end(files.pdf[0].buffer);

  res.status(200).send('Files uploaded successfully.');
});

app.post('/validate-ubl', upload.single('file'), async (req, res) => {
  const fileData = req.file.buffer.toString();
  const fileName = req.file.originalname;
  xml2js.parseString(fileData, { explicitArray: false }, (err, result) => {
    if (err) {
      return res.status(400).json({ error: 'Invalid XML format' });
    }
    try {
      console.log('Parsed XML:', result);
      const validationResults = validateUBL(fileData, fileName);
      res.status(200).json({ validationResults });
    } catch (error) {
      console.error('Error during UBL validation:', error);
      res.status(500).json({ error: 'Validation failed due to internal error' });
    }
  });
});

app.put('/rerun-validation', async (req, res) => {
  const { UBLid } = req.body;
  const client = await connectDB();
  const bucket = getBucket(client);

  const downloadStream = bucket.openDownloadStream(new ObjectId(UBLid));
  let fileData = '';

  downloadStream.on('data', (chunk) => {
    fileData += chunk;
  });

  downloadStream.on('error', (err) => {
    res.status(404).send('File not found.');
  });

  downloadStream.on('end', () => {
    xml2js.parseString(fileData, { explicitArray: false }, (err, result) => {
      if (err) {
        return res.status(400).json({ error: 'Invalid XML format' });
      }
      try {
        console.log('Parsed XML:', result);
        const validationResults = validateUBL(fileData);
        res.status(200).json({ validationResults });
      } catch (error) {
        console.error('Error during UBL validation:', error);
        res.status(500).json({ error: 'Validation failed due to internal error' });
      }
    });
  });
});

app.get('/validation-report/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  console.log(`Received request for type: ${type}, id: ${id}`);
  const client = await connectDB();
  const bucket = getBucket(client);

  try {
    const file = await bucket.find({ _id: new ObjectId(id) }).toArray();
    if (file.length === 0) {
      return res.status(404).json({ error: 'File not found.' });
    }

    const { filename, uploadDate } = file[0];

    const downloadStream = bucket.openDownloadStream(new ObjectId(id));
    let fileData = [];

    downloadStream.on('data', (chunk) => {
      console.log('Reading chunk of size:', chunk.length);
      fileData.push(chunk);
    });

    downloadStream.on('error', (err) => {
      console.error('Download stream error:', err);
      res.status(404).send('File not found.');
    });

    downloadStream.on('end', async () => {
      console.log('Download stream ended');
      const buffer = Buffer.concat(fileData);
      console.log('Total buffer length:', buffer.length);

      const savedFilePath = path.join(__dirname, 'downloaded_file.pdf');
      fs.writeFileSync(savedFilePath, buffer);

      if (type === 'ubl') {
        xml2js.parseString(buffer.toString(), { explicitArray: false }, (err, result) => {
          if (err) {
            console.error('XML parse error:', err);
            return res.status(400).json({ error: 'Invalid XML format' });
          }
          try {
            console.log('Parsed XML:', result);
            const validationResults = validateUBL(buffer.toString(), filename);
            validationResults.fileDetails.fileName = filename;
            validationResults.fileDetails.submissionDate = uploadDate.toISOString();
            res.status(200).json({ validationResults });
          } catch (error) {
            console.error('Error during UBL validation:', error);
            res.status(500).json({ error: 'Validation failed due to internal error' });
          }
        });
      } else if (type === 'pdf') {
        try {
          const data = await pdfParser(buffer);
          const validationResults = {
            validationStatus: data.numpages > 0 ? 'Passed' : 'Failed',
            detailedFindings: {
              pages: data.numpages,
              text: data.text.slice(0, 100)
            }
          };
          validationResults.fileDetails = {
            fileName: filename,
            fileType: 'PDF Document',
            submissionDate: uploadDate.toISOString(),
            checkedBy: 'DB_CEO_TC'
          };
          validationResults.reportGeneratedBy = 'DB_CEO_TC';
          validationResults.reportDate = new Date().toISOString().split('T')[0];
          res.status(200).json({ validationResults });
        } catch (err) {
          console.error('PDF parse error:', err);
          res.status(400).json({ error: 'Invalid PDF format' });
        }
      } else {
        res.status(400).json({ error: 'Unsupported file type' });
      }
    });
  } catch (error) {
    console.error('Error in processing request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/files/:userId', async (req, res) => {
  const { userId } = req.params;
  const result = await getPdfUbl(userId);
  res.status(result.status).json(result.json);
});

app.delete('/files', async (req, res) => {
  const { pdfId, ublId } = req.body;
  const result = await deletePdfUbl(pdfId, ublId);
  res.status(result.status).json(result.json);
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

module.exports = app;
