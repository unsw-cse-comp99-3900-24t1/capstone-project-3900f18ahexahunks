import { getGfs } from './db';
import { Readable } from 'stream';

const saveToMongo = (xml, filename) => {
    console.log('111');
  try {
    const gfs = getGfs();
    const stream = new Readable();
    stream.push(xml);
    console.log('abc');
    const upload = gfs.openUploadStream(filename);
    console.log('def');
    return new Promise((resolve, reject) => {
      stream
        .pipe(upload)
        .on('error', (err) => {
          console.log(err);
          reject(err);
        })
        .on('finish', () => {
          console.log('uploaded');
          resolve(upload.id);
        });
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export default saveToMongo;
