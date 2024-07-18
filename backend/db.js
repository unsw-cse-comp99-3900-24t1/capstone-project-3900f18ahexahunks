const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect("mongodb+srv://ChengTong:e4Uu1ExS9L58jDIu@comp3900-hexahunks.db0uu6n.mongodb.net/?retryWrites=true&w=majority&appName=comp3900-HEXAHUNKS", {
        useNewUrlParser:true,
        useUnifiedTopology: true
      }).then(() => {
        console.log("DB connected")
      }).catch((error) => console.log(error))
