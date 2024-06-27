const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

router.post('/convert-pdf-to-ubl', pdfController.convertPdfToUbl);
router.get('/pdfs-ubls/:userId', pdfController.getPdfsAndUbls);
router.delete('/delete-pdf-ubl', pdfController.deletePdfUbl);

module.exports = router;
