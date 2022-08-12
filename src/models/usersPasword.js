const mongoose = require("mongoose");

const usersPasword = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  tokenExpire: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const usersPaswordObject = mongoose.model("usersPasword", usersPasword);
