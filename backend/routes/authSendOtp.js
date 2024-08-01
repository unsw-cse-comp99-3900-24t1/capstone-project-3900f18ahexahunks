const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});
const authController = require('../controllers/auth/authController');
const joi = require('joi');

const phoneSchema = joi.object({
  toEmail: joi.string().required(),
});

const verifyEmailOtpSchema = joi.object({
  toEmail: joi.string().required(),
  otp: joi.string().required(),
});

router
  .route('/send-otp')
  .post(
  validator.body(phoneSchema),
  authController.controllers.postTwilio
);

router
  .route('/verify-otp')
  .post(
  validator.body(verifyEmailOtpSchema),
  authController.controllers.verifyOtp
);

module.exports = router;
