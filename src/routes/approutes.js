const express = require("express"),
  loginRoutes = require("./loginRoutes"),
  app = express();

app.use(loginRoutes);
