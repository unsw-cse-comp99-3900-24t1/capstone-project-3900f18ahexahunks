const { required } = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    passwordCheck: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
