const express = require('express');
const sendEmail = require('./gmailService');
const router = express.Router();

router.post('/send-invoice', async (req, res) => {
  const { recipient, subject, text, attachment } = req.body;

  try {
    const accessToken = 'ya29.a0AXooCgsINySrvTWdnpwxO9hBd6co6wSTZbHOF0J51KY5TbzktGLH7tfhSt3robr_vv7_trRG-AWAg326Etrio2hTO1M05QpwH21o3cWb6nmbmdE13uA-dRSIUScSC_CVxGawyfOMsLeW_VOlyVFo_rsHIp5taFItaNIuaCgYKAT0SARMSFQHGX2MipLSf5dd2JAmuSESKbf2ulA0171'; // Obtain this dynamically
    await sendEmail(accessToken, recipient, subject, text, attachment);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

module.exports = router;
