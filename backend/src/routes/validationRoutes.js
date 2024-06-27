const express = require('express');
const router = express.Router();
const validationController = require('../controllers/validationController');

router.post('/validate-ubl', validationController.validateUbl);

module.exports = router;
