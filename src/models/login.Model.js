const mongoose = require("mongoose"),
  crypto = require("crypto");

const userAccount = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userObject = mongoose.model("userAccount", userAccount);

const userFind = async () => {
  let user = await userObject.findOne({
    email: "admin@admin.com",
  });
  if (!user || user == null) {
    const createUserObject = userObject({
      email: "admin@admin.com",
      name: "Super",
      password: "admin123",
      isActive: true,
    });
    const result = await createUserObject.save();
  }
};
userFind();
