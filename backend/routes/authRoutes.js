const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

// Two validator schemas to make sure the data we get fulfills our requirements
const registerSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
  passwordCheck: joi.string().required()
});

const loginSchema = joi.object({
	email: joi.string().email().required(),
  password: joi.string().min(8).required()
});

const deleteSchema = joi.object({
	username: joi.string().required(),
  password: joi.string().min(8).required()
});

const updatePasswordSchema = joi.object({
	'user-id': joi.string().required(),
  newPassword: joi.string().min(8).required()
});

const updateUsernameSchema = joi.object({
	newUsername: joi.string().required(),
	'user-id': joi.string().required(),
  password: joi.string().min(8).required()
});

// Checking the validator on route if the validator fails the post request will never be executed
router
  .route('/register')
  .post(
    validator.body(registerSchema),
    authController.controllers.postRegister
  );

router
	.route('/login')
  .post(
		validator.body(loginSchema),
    authController.controllers.postLogin
);

router
	.route('/delete')
  .delete(
		validator.body(deleteSchema),
    authController.controllers.deleteUser
);

router
	.route('/user/update-password')
  .put(
		validator.body(updatePasswordSchema),
    authController.controllers.putUpdatePassword
);

router
	.route('/user/update-username')
  .put(
		validator.body(updateUsernameSchema),
    authController.controllers.putUpdateUsername
);

module.exports = router;