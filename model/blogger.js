const mongoose = require("mongoose");

const bloggerschema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("blogger", bloggerschema);
