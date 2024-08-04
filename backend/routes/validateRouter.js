const express = require('express');
const router = express.Router();
const validateControllers = require('../ublValidator/validateControllers');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .post(
    '/validate-ubl',
    auth,
    upload.single('file'),
    validateControllers.controllers.validateUblFile
  )
  .get('/getUbl/:userId', validateControllers.controllers.getUblPdf)
  .get(
    '/get-all-validation-data',
    validateControllers.controllers.getAllValidationData
  )
  .delete(
    '/delete-one-validation-data',
    validateControllers.controllers.deleteOneValidationData
  );

module.exports = router;
