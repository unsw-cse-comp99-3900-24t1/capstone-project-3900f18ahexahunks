const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  metadata: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    url: { type: String, required: true },
    contentType: { type: String, required: true }
  },
  contentType: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);