const express = require('express');
const { sendFile } = require('../controllers/email/emailController');

const router = express.Router();

router.post('/sendFile', sendFile);

module.exports = router;