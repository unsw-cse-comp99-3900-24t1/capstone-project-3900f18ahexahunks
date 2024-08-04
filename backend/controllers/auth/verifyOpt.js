const otpModel = require('../../models/optModel');

// This function handles the verification of a user's OTP (One-Time Password).
const verifyOtp = async (req, res) => {
  // Extracts 'toEmail' and 'otp' from the request body.
  const email = req.body.toEmail;
  const inputOtp = req.body.otp;

  // Searches the database for an OTP record associated with the provided email.
  const record = await otpModel.findOne({ email });

  // Checks if the record exists and if the provided OTP matches the stored OTP.
  if (!record || record.otp !== inputOtp) {
    // If the record is not found or the OTP does not match, respond with a 403 status and send 'false'.
    res.status(403).send(false);
  } else {
    // If the OTP matches, respond with a 200 status and send 'true'.
    res.status(200).send(true);
  }
};

// Exports the verifyOtp function for use in 'authController'.
module.exports = verifyOtp;
