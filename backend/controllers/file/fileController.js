const { ObjectId, GridFSBucket } = require('mongodb');
const connectDB = require('../../db');

const streamFile = async (req, res) => {
  const { id } = req.params;
  const client = await connectDB();
  const db = client.db();

  try {
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
    const objectId = new ObjectId(id);
    const downloadStream = bucket.openDownloadStream(objectId);

    downloadStream.on('data', chunk => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
      res.sendStatus(404);
    });

    downloadStream.on('end', () => {
      res.end();
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

module.exports = { streamFile };
