const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the File Schema
const FileSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
});

// Export the File model
module.exports = mongoose.model('File', FileSchema);