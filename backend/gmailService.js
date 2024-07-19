const { google } = require('googleapis');
const nodemailer = require('nodemailer');

async function sendEmail(accessToken, recipient, subject, text, attachment) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'bzzzz19322@gmail.com',
      clientId: '953169530538-uamtvuq43l3bvegac98lddok9k502fti.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//0g1f4hQ0xuFwZCgYIARAAGBASNwF-L9IrCT7XeVx9ikdD9fLKjDOJzPlt7DPtEwvwCt_IRgPca5Ivqq-DvuF7AoxtghnEEmYdUmw',
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: 'bzzzz19322@gmail.com',
    to: recipient,
    subject: subject,
    text: text,
    attachments: [{
      filename: 'invoice.pdf',
      path: attachment,
      contentType: 'application/pdf'
    }]
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
