const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
  },
  born: {
    type: Number,
  },
  // bookCount: Number,
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model("Author", schema);
