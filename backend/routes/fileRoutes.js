const express = require('express');
const { getPdfUbl, deletePdfUbl } = require('../controllers/file/pdfUblController');
const { streamFile, uploadPdf, uploadXml, convertPdfToUbl, serveFile, convertGuiToUbl, generateFileUrl } = require('../controllers/file/fileController');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { ObjectId } = require('mongodb');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const router = express.Router();


// Setup GridFsStorage for PDFs
const storagePdf = new GridFsStorage({
    url: mongoURI,
    file: async (req, file) => {
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
          url: fileUrl,
        },
        bucketName: 'uploads',
        contentType: file.mimetype,
      };
  
      return fileInfo;
    },
  });
  
  // Setup GridFsStorage for XMLs
  const storageXml = new GridFsStorage({
    url: mongoURI,
    file: async (req, file) => {
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
          url: fileUrl,
        },
        bucketName: 'uploads',
        contentType: file.mimetype,
      };
  
      return fileInfo;
    },
  });
  
  const uploadPdfMiddleware = multer({ storage: storagePdf });
  const uploadXmlMiddleware = multer({ storage: storageXml });
  
// Define routes and their corresponding controller functions
router.get('/getFile', streamFile);
router.get('/get-pdf-ubl/:userId', getPdfUbl);
router.delete('/delete-pdf-ubl', deletePdfUbl);
router.post('/upload/pdf', uploadPdfMiddleware.single('file'), uploadPdf);
router.post('/upload/xml', uploadXmlMiddleware.single('file'), uploadXml);
router.post('/upload-pdf', uploadPdfMiddleware.single('file'), convertPdfToUbl); // This route includes convertion
router.post('/gui-form', convertGuiToUbl); // This route also includes convertion
router.get('/files/:id', serveFile);

module.exports = router;
