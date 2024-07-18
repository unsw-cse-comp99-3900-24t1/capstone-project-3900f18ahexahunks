const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
  // CREATE A TRANSPORTER
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD
    }
  });

  // DEFINE EMAIL OPTIONS
  const emailOptions = {
    from: 'Cineflix support<support@cineflix.com>',
    to: option.email,
    subject: option.subject,
    text: option.message
  };

  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
