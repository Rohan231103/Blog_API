const mongoose = require("mongoose");

const catschema = new mongoose.Schema({
  category: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("category", catschema);
