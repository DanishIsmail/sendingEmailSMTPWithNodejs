const express = require("express"),
  formData = require("express-form-data"),
  cors = require("cors"),
  db = require("./src/models/db"),
  loginroutes = require("./src/routes/loginRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse());
app.use(cors());
app.use(loginroutes);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`running on port ${port}`));
