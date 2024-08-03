const nodemailer = require('nodemailer');
const { getGfs } = require('../../db');
const { ObjectId } = require('mongodb');
require('dotenv').config();

// Function to fetch file from GridFS
const fetchFile = async (gfs, fileId) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    gfs.openDownloadStream(new ObjectId(fileId))
      .on('data', (chunk) => chunks.push(chunk))
      .on('error', reject)
      .on('end', () => resolve(Buffer.concat(chunks)));
  });
};

// Core function to send file
const sendFile = async (req, res) => {
  const { to, subject, text, html, xmlId, pdfId, validatorPdfId } = req.body;

  if (!to || !subject || (!xmlId && !pdfId && !validatorPdfId)) {
    return res.status(400).json({ error: 'Failed to send email or no valid file IDs provided' });
  }

  try {
    const gfs = getGfs();
    const attachments = [];

    if (xmlId) {
      const xmlFile = await fetchFile(gfs, xmlId);
      attachments.push({ filename: 'file.xml', content: xmlFile });
    }

    if (pdfId) {
      const pdfFile = await fetchFile(gfs, pdfId);
      attachments.push({ filename: 'file.pdf', content: pdfFile });
    }

    if (validatorPdfId) {
      const validatorPdfFile = await fetchFile(gfs, validatorPdfId);
      attachments.push({ filename: 'validator.pdf', content: validatorPdfFile });
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'qq',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
      attachments,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent with attachments successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { sendFile };