require('dotenv').config();
const nodemailer = require('nodemailer');
const otpModel = require('../../models/optModel');

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

const postTwilio = async (req, res) => {
  const toEmail = req.body.toEmail;

  const record = await otpModel.findOne({ email: toEmail });

  if (record) {
    res.status(400).send(record.createdAt);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const otp = generateOTP();
  await otpModel.create({ email: toEmail, otp });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: toEmail,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`,
    html: `<div><img src="https://images.pexels.com/photos/15107263/pexels-photo-15107263/free-photo-of-night-sky-above-the-trees.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"/><h1>Your OTP</h1><p>Your one-time password (OTP) is: <strong>${otp}</strong></p></div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).send(`OTP SENT TO ${toEmail}`);
  } catch (error) {
    console.error('Failed to send email', error);
    res.status(403).send('Unable to send email error: ' + error);
  }
};

module.exports = postTwilio;
