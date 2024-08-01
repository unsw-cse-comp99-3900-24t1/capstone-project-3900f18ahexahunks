const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  length: { type: Number, required: true },
  uploadDate: { type: Date, required: true },
  metadata: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  }
});

module.exports = mongoose.model('File', fileSchema);
