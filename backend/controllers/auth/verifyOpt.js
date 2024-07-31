const otpModel = require('../../models/optModel');

const verifyOtp = async (req, res) => {
  const email = req.body.toEmail;
  const inputOtp = req.body.otp;
  const record = await otpModel.findOne({ email });
  if (!record || record.otp !== inputOtp) {
    res.status(403).send(false);
  } else {
    res.status(200).send(true);
  }
};

module.exports = verifyOtp;
