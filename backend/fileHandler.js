const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const storageXml = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const userId = req.body.userId || req.query.userId;

      if (!ObjectId.isValid(userId)) {
        console.error('Invalid userId:', userId);
        return reject(new Error('Invalid userId'));
      }

      const filename = `xml-${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        metadata: { userId: new ObjectId(userId) },
        bucketName: 'uploads',
        contentType: 'application/xml',
      };
      resolve(fileInfo);
    });
  },
});

const uploadXml = multer({ storage: storageXml });

module.exports = {
  uploadXml
};
