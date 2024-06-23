const express = require('express');
const cors = require('cors');
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

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log('Server running on port:', PORT);
  });
});

module.exports = app;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to upload PDF, JSON, and XML files
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(201).json({ file: req.file });
});

// Route to upload JSON directly
app.post('/upload-json', async (req, res) => {
  try {
    const jsonBuffer = Buffer.from(JSON.stringify(req.body));
    const writeStream = gfs.createWriteStream({
      filename: `${Date.now()}-data.json`,
      contentType: 'application/json',
    });
    writeStream.write(jsonBuffer);
    writeStream.end();
    res.status(201).json({ message: 'JSON file uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload JSON file' });
  }
});

// Route to upload XML directly
app.post('/upload-xml', async (req, res) => {
  try {
    const xmlBuffer = Buffer.from(req.body.xml);
    const writeStream = gfs.createWriteStream({
      filename: `${Date.now()}-data.xml`,
      contentType: 'application/xml',
    });
    writeStream.write(xmlBuffer);
    writeStream.end();
    res.status(201).json({ message: 'XML file uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload XML file' });
  }
});

// Route to get a file by filename
app.get('/file/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  });
});

// Route to get all files
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No files found' });
    }
    res.json(files);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
