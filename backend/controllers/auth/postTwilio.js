require('dotenv').config();
const nodemailer = require('nodemailer');
const otpModel = require('../../models/optModel');

// This function generates a 6-digit OTP (One-Time Password).
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

// This function implements the process of sending an OTP email using the Twilio service.
const postTwilio = async (req, res) => {
  const toEmail = req.body.toEmail;

  // Checks if an OTP record already exists for the provided email.
  const record = await otpModel.findOne({ email: toEmail });

  if (record) {
    // If an OTP record exists, respond with a 400 status and the creation timestamp.
    res.status(400).send(record.createdAt);
    return;
  }

  // Creates a transporter object using nodemailer for sending emails via Gmail.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const otp = generateOTP(); // Generates a new OTP.
  await otpModel.create({ email: toEmail, otp }); // Stores the OTP in the database associated with the recipient's email.

  // Defines the email options.
  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: toEmail,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`,
    html: `<div><img src="https://images.pexels.com/photos/15107263/pexels-photo-15107263/free-photo-of-night-sky-above-the-trees.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"/><h1>Your OTP</h1><p>Your one-time password (OTP) is: <strong>${otp}</strong></p></div>`,
  };

  try {
    // Sends the email using the configured transporter.
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).send(`OTP SENT TO ${toEmail}`);
  } catch (error) {
    // Catches and logs any errors that occur during the email sending process.
    console.error('Failed to send email', error);
    res.status(403).send('Unable to send email error: ' + error);
  }
};

// Exports the postTwilio function for use in 'authController'.
module.exports = postTwilio;
