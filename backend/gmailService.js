const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const { OAuth2 } = google.auth;
const fs = require('fs');

// Load OAuth2 credentials from the JSON file you downloaded
const credentials = require('./credentials.json');

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new OAuth2(
  client_id,
  client_secret,
  redirect_uris[0] // First redirect URI
);

// Set the access and refresh tokens obtained from the OAuth 2.0 Playground
oAuth2Client.setCredentials({
  refresh_token: '1//04k5zCpeH1hThCgYIARAAGAQSNwF-L9Ir8t6WABDxLl_KMcTJ15Uzp0Y6RhdhNvssiep43Gccx_O-ad2wnQL3Q_E4cFymJiiqd_U',
  //access_token:"ya29.a0AXooCgtGHqlFaW9Wt5NGTFm_nCCMp94eIUTbR6iDTSJqlF1HTNWAjiz-9PMow4dcGFiZY1HGsUJAAI2pE8-cIusYUM-bCkOH0xljna0ROYdhhK6mhI8z2AQvVFYU4lxZ_58mZH9mys_sYTKzpJqVsVgJOfnG9oKgWqGnaCgYKAbkSARMSFQHGX2MiEyizpBWnl-Y7aaP7E6V2Ww0171"
});

async function refreshAccessToken() {
  try {
    const { credentials } = await oAuth2Client.refreshAccessToken();
    oAuth2Client.setCredentials(credentials);
    return credentials.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw new Error('Failed to refresh access token');
  }
}

async function sendEmail() {
  try {
    // const accessToken = await oAuth2Client.getAccessToken();
		const accessToken = await refreshAccessToken(); // Get a fresh access token
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'bzzzz19322@gmail.com',
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: '1//04k5zCpeH1hThCgYIARAAGAQSNwF-L9Ir8t6WABDxLl_KMcTJ15Uzp0Y6RhdhNvssiep43Gccx_O-ad2wnQL3Q_E4cFymJiiqd_U',
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Bernard Zhou <bzzzz19322@gmail.com>',
      to: '1293465052@qq.com',
      subject: 'Test Email with Attachment',
      text: 'Hello from Node.js using Gmail API and OAuth2!',
      attachments: [
        {
          filename: 'example.pdf',
          path: './src/testPDFs/example.pdf',
        },
      ],
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendEmail();
