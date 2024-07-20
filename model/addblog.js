const mongoose = require("mongoose");

const blogschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  sta: {
    type: String,
    default: "Pending",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("blog", blogschema);
