const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.connect(url, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
