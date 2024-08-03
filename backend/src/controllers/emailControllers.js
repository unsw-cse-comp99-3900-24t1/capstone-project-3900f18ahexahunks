const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const { PDFDocument } = require('pdf-lib');

// Load client secrets from a local file.
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const sendEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText('This is a PDF document.');

    const pdfBytes = await pdfDoc.save();
    const pdfPath = path.join(__dirname, '../uploads/document.pdf');
    fs.writeFileSync(pdfPath, pdfBytes);

    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: SCOPES,
    });

    const gmail = google.gmail({ version: 'v1', auth });

    const messageParts = [
      `From: 'me'`,
      `To: ${email}`,
      'Subject: PDF Document',
      '',
      'Here is your PDF document.',
    ];

    const message = messageParts.join('\n');
    const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const raw = Buffer.from(encodedMessage).toString('base64');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw,
      },
    });

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
};

module.exports = { sendEmail };
