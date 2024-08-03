const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});
const authController = require('../controllers/auth/authController');
const joi = require('joi');

// Defines Joi schema for validating the data required to send an OTP.
const phoneSchema = joi.object({
  toEmail: joi.string().required(),
});

// Defines Joi schema for validating the data required to verify an OTP.
const verifyEmailOtpSchema = joi.object({
  toEmail: joi.string().required(),
  otp: joi.string().required(),
});

// Route for sending an OTP to the user's email with validation.
router
  .route('/send-otp')
  .post(
  validator.body(phoneSchema),
  authController.controllers.postTwilio
);

// Route for verifying an OTP with validation.
router
  .route('/verify-otp')
  .post(
  validator.body(verifyEmailOtpSchema),
  authController.controllers.verifyOtp
);

module.exports = router;
