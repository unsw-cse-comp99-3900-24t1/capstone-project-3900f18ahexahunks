const { connectDB, getGfs } = require("./db");
const { Readable } = require("stream");

const saveToMongo = (
  data,
  filename,
  metadata,
  contentType = "application/xml"
) => {
  try {
    const gfs = getGfs();
    const stream = Readable.from(data);
    const upload = gfs.openUploadStream(filename, {
      metadata,
      contentType: contentType,
    });
    return new Promise((resolve, reject) => {
      stream
        .pipe(upload)
        .on("error", (err) => {
          reject(err);
        })
        .on("finish", () => {
          resolve(upload.id);
        });
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { saveToMongo };
