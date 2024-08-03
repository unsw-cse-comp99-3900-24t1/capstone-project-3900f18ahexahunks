const express = require('express');
const { sendFile } = require('../controllers/emailController');

const router = express.Router();

router.post('/sendFile', sendFile);

module.exports = router;