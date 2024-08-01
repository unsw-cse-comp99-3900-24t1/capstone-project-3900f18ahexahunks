const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  length: {
    type: Number,
    required: true
  },
  chunkSize: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  metadata: {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}, { collection: 'uploads.files' });

module.exports = mongoose.model('File', fileSchema);
