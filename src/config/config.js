require("dotenv").config();

const config = {
  development: {
    mongodb: process.env.MONGO_URI,
  },
  staging: {
    mongodb: process.env.MONGO_URI,
  },

  production: {
    mongodb: process.env.MONGO_URI,
  },
};
module.exports = config;
