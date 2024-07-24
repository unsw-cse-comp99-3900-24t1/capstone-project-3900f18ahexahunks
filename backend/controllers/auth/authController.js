const postLogin = require('./postLogin');
const postRegister = require('./postRegister');
const deleteUser = require('./deleteUser');
const putUpdatePassword = require('./putUpdatePassword')
const putUpdateUsername = require('./putUpdateUsername')
const postTwilio = require('./postTwilio');
const verifyOtp = require('./verifyOpt');

exports.controllers = {
  postLogin,
  postRegister,
  deleteUser,
  putUpdatePassword,
  putUpdateUsername,
  postTwilio,
  verifyOtp,
};