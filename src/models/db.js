const mongoose = require("mongoose");
const user = require("./login.Model");
const userPaswordTokens = require("./usersPasword");

const DB = "mongodb://localhost/MyProjectDb";
const connectDatabase = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connected to database");
  } catch (error) {
    console.log("could not connect to database", error);
    process.exit(1);
  }
};

connectDatabase();
