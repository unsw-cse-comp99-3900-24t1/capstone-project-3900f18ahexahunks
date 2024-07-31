const { connectDB, getGfs } = require('./db');
const { Readable } = require('stream');

const saveToMongo = (xml, filename) => {
  console.log('111');
  try {
    const gfs = getGfs();
    const stream = Readable.from(xml);
    console.log('abc');
    const upload = gfs.openUploadStream(filename);
    console.log('def');
    return new Promise((resolve, reject) => {
      stream
        .pipe(upload)
        .on('error', (err) => {
          console.log('HERHEIURHEHREHRUEHURH', err);
          reject(err);
        })
        .on('finish', () => {
          console.log('uploaded');
          resolve(upload.id);
        });
    });
  } catch (err) {
    console.log('HERHEIURHEHREHRUEHURH', err);
    throw new Error(err);
  }
};

module.exports = { saveToMongo };
