const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ChengTong:e4Uu1ExS9L58jDIu@comp3900-hexahunks.db0uu6n.mongodb.net/?retryWrites=true&w=majority&appName=comp3900-HEXAHUNKS",
      // {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true
      // }
  );
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
