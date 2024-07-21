const postLogin = require('./postLogin');
const postRegister = require('./postRegister');
const deleteUser = require('./deleteUser');
const putUpdatePassword = require('./putUpdatePassword')
const putUpdateUsername = require('./putUpdateUsername')

exports.controllers = {
  postLogin,
  postRegister,
  deleteUser,
  putUpdatePassword,
  putUpdateUsername
};