const express = require('express');
const { getPdfUbl, deletePdfUbl } = require('../controllers/file/pdfUblController');
const { streamFile } = require('../controllers/file/fileController');

const router = express.Router();

// Define routes and their corresponding controller functions
router.get('/getFile', streamFile);
router.get('/get-pdf-ubl/:userId', getPdfUbl);
router.delete('/delete-pdf-ubl', deletePdfUbl);

module.exports = router;
