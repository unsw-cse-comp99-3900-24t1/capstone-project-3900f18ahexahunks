const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    token: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);
