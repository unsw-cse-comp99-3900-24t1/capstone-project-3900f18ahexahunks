const { ObjectId } = require('mongodb');
const { convertPdfToJson } = require('../conversion');
const { convertJsonToUbl } = require('../jsonToUbl');
const { getGfs } = require('../../db');
const { saveToMongo } = require('../../saveToMongo');
const path = require('path');
const fs = require('fs');

// Generate file url for fetching
const generateFileUrl = (req, fileId) => {
  return `${req.protocol}://${req.get('host')}/files/${fileId}`;
};

// Function for upload pdf directly
const uploadPdf = async (req, res) => {
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
    userId: userId,
  };

  res.status(201).json({
    message: 'PDF file uploaded successfully',
    pdfFile: fileInfo,
  });
};

// Fuction for uploading xml directly
const uploadXml = async (req, res) => {
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
    userId: userId,
  };

  res.status(201).json({
    message: 'XML file uploaded successfully',
    xmlFile: fileInfo,
  });
};

// Uploads PDF, converts PDF to JSON, converts JSON to UBL, and finally uploads UBL
const convertPdfToUbl = async (req, res) => {
  const userId = req.body.userId;

  if (!req.file) {
    return res.status(400).json({ error: 'No PDF file uploaded.' });
  }

  try {
    const gfs = getGfs();
    const fileId = req.file.id;

    // Retrieve the PDF file buffer from GridFS
    const pdfFile = await new Promise((resolve, reject) => {
      const chunks = [];
      gfs
        .openDownloadStream(fileId)
        .on('data', (chunk) => chunks.push(chunk))
        .on('error', reject)
        .on('end', () => resolve(Buffer.concat(chunks)));
    });

    // Process the PDF file buffer to convert it to UBL XML
    const jsonResult = await convertPdfToJson(pdfFile);
    const ublXml = convertJsonToUbl(jsonResult);

    // Save the XML
    const filename = `xml-${Date.now()}-converted-${req.file.filename}.xml`;
    const fileUrl = generateFileUrl(req, new ObjectId());

    // Metadata for the XML file
    const metadata = {
      userId: new ObjectId(userId),
      url: fileUrl,
    };
    const ublId = await saveToMongo(ublXml, filename, metadata);
    // Prepare the response data
    const responseData = {
        message: 'File converted and user updated successfully!',
        pdfId: fileId.toString(),
        ublId: ublId.toString(),
        name: 'validationName', // TODO
        newObjectId: new ObjectId().toString(),
        date: new Date().toISOString(),
        validatorId: new ObjectId().toString(), // TODO
        validationHtml: '<html>Validation Report</html>', // TODO
        validationJson: {}, // TODO
      };
    res.status(200).json(responseData);
  } catch (error) {
    if (error.message.includes('Failed to connect to MongoDB')) {
        res.status(500).json({ error: 'Server error, including MongoDB connection errors' });
      } else if (error.message.includes('Failed to validate UBL')) {
        res.status(402).json({ error: 'Failed to validate UBL' });
      } else if (error.message.includes('User not found')) {
        res.status(404).json({ error: 'User not found' });
      } else if (error.message.includes('Validation object with the same name already exists')) {
        res.status(401).json({ error: 'Validation object with the same name already exists' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
  }
};

// Uploads GUI, converts GUI to XML, and uploads XML
const convertGuiToUbl = async (req, res) => {
    const userId = req.body.userId;
    const guiData = req.body.invoice;
  
    if (!guiData) {
      return res.status(400).json({ error: 'Bad request, no GUI data provided or missing fields' });
    }
  
    try {
      // Save the GUI data to MongoDB
      const guiFilename = `gui-${Date.now()}.json`;
      const guiFileUrl = generateFileUrl(req, new ObjectId());
  
      // Metadata for the GUI file
      const guiMetadata = {
        userId: new ObjectId(userId),
        url: guiFileUrl,
      };
      const guiId = await saveToMongo(JSON.stringify(guiData), guiFilename, guiMetadata, 'application/json');
  
      // Convert the GUI data to UBL XML
      const ublXml = convertJsonToUbl(guiData);
  
      // Save the XML
      const xmlFilename = `xml-${Date.now()}-converted-gui.xml`;
      const xmlFileUrl = generateFileUrl(req, new ObjectId());
  
      // Metadata for the XML file
      const xmlMetadata = {
        userId: new ObjectId(userId),
        url: xmlFileUrl,
      };
      const ublId = await saveToMongo(ublXml, xmlFilename, xmlMetadata, 'application/xml');
  
      // Prepare the response data
      const responseData = {
        message: 'GUI data converted and user updated successfully!',
        guiId: guiId.toString(),
        ublId: ublId.toString(),
        name: 'validationName', // TODO
        newObjectId: new ObjectId().toString(),
        date: new Date().toISOString(),
        validatorId: new ObjectId().toString(), // TODO
        validationHtml: '<html>Validation Report</html>', // TODO
        validationJson: {}, // TODO
      };
  
      res.status(201).json(responseData);
    } catch (error) {
      console.error(error);
  
      if (error.message.includes('Failed to connect to MongoDB')) {
        res.status(500).json({ error: 'Server error, including MongoDB connection errors' });
      } else if (error.message.includes('Failed to validate UBL')) {
        res.status(402).json({ error: 'Failed to validate UBL' });
      } else if (error.message.includes('User not found')) {
        res.status(404).json({ error: 'User not found' });
      } else if (error.message.includes('Validation object with the same name already exists')) {
        res.status(401).json({ error: 'Validation object with the same name already exists' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

// Fetch file
const serveFile = (req, res) => {
  const fileId = req.params.id;

  try {
    const gfs = getGfs();
    const _id = new ObjectId(fileId);
    gfs.openDownloadStream(_id).pipe(res);
  } catch (err) {
    res.status(400).json({ error: 'Invalid file ID' });
  }
};

module.exports = {
  uploadPdf,
  uploadXml,
  convertPdfToUbl,
  serveFile,
  convertGuiToUbl,
  generateFileUrl
};