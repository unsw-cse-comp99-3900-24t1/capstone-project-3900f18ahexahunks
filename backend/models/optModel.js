const mongoose = require('mongoose');

// Defines the schema for the OTP (One-Time Password) model.
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 90 }, // OTP expires after 5 minutes
});

module.exports = mongoose.model('OTP', otpSchema);
