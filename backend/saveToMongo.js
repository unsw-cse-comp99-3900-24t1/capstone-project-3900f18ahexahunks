const { getGfs } = require('./db');
const { Readable } = require('stream');

const saveToMongo = (xml, filename) => {
  try {
    const gfs = getGfs();
    const stream = new Readable();
    stream.push(xml);

    const upload = gfs.openUploadStream(filename);

    return new Promise((resolve, reject) => {
      stream
        .pipe(upload)
        .on('error', (err) => {
          reject(err);
        })
        .on('finish', () => {
          resolve(upload.id);
        });
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = saveToMongo;
