const express = require('express');
const router = express.Router();
const authController = require('../authController');
const joi = require('joi');
const validater = require('express-joi-validation').createValidator({});
const auth = require('../auth');

const SchemaRegister = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});

router.route('/register').post(
    validater.body(SchemaRegister),
    authController.controller.registerPost
);

router.route('/test').get(auth, (req, res) => {
    res.send('request passed');
});

module.exports = router;
