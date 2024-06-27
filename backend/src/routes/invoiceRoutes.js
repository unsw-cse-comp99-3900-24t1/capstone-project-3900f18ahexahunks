const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.get('/e-invoicing-rules', invoiceController.getEInvoicingRules);

module.exports = router;
