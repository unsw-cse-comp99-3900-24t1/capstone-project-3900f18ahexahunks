const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    username: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
