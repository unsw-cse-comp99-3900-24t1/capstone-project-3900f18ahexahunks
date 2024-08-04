const mongoose = require('mongoose');

// Defines the schema for the User model.
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('User', userSchema);
