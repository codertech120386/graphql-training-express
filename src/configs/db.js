const mongoose = require("mongoose");

module.exports = async () => {
  return new mongoose.connect("mongodb://127.0.0.1:27017/graphql-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
