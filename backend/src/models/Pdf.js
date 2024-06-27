const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Pdf', PdfSchema);
