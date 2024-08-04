// This file imports several controller functions from different modules related to user authentication and account management.
const postLogin = require('./postLogin');
const postRegister = require('./postRegister');
const deleteUser = require('./deleteUser');
const putUpdatePassword = require('./putUpdatePassword')
const putUpdateUsername = require('./putUpdateUsername')
const postTwilio = require('./postTwilio');
const verifyOtp = require('./verifyOpt');

// It exports these functions as part of a 'controllers' object, wchih can be used in other parts of the application.
exports.controllers = {
  postLogin,
  postRegister,
  deleteUser,
  putUpdatePassword,
  putUpdateUsername,
  postTwilio,
  verifyOtp,
};