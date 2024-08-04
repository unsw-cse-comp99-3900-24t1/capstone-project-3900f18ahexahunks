const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

// Defines Joi schemas for validating incoming request data.

// Schema for validating registration data.
const registerSchema = joi.object({
  username: joi.string(),
  password: joi.string(),
  email: joi.string().email(),
  passwordCheck: joi.string()
});

// Schema for validating login data.
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required()
});

// Schema for validating delete user data.
const deleteSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(8).required()
});

// Schema for validating update password data.
const updatePasswordSchema = joi.object({
  'user-id': joi.string().required(),
  newPassword: joi.string().min(8).required()
});

// Schema for validating update username data.
const updateUsernameSchema = joi.object({
  newUsername: joi.string().required(),
  'user-id': joi.string().required(),
  password: joi.string().min(8).required()
});

// Define routes with validation and corresponding controller methods.

// Route for user registration with validation.
router
  .route('/register')
  .post(
    validator.body(registerSchema),
    authController.controllers.postRegister
  );

// Route for user login with validation.
router
  .route('/login')
  .post(
    validator.body(loginSchema),
    authController.controllers.postLogin
);

// Route for deleting a user with validation.
router
  .route('/delete')
  .delete(
    validator.body(deleteSchema),
    authController.controllers.deleteUser
);

// Route for updating a user's password with validation.
router
  .route('/user/update-password')
  .put(
    validator.body(updatePasswordSchema),
    authController.controllers.putUpdatePassword
);

// Route for updating a user's username with validation.
router
  .route('/user/update-username')
  .put(
    validator.body(updateUsernameSchema),
    authController.controllers.putUpdateUsername
);

module.exports = router;