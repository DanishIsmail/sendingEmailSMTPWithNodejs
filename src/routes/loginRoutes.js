const express = require("express"),
  router = express.Router(),
  signup = require("../middleware/accounts.middleware"),
  loginController = require("../controller/loginController");

require("dotenv").config();
const app = express();

let baseUrl = process.env.SERVER_URL;

router.post(
  "/",
  // dashboard
  loginController.getHello
);

router.post(
  "/api/forgetPassword",
  // userMiddleWare.isUserExist,
  signup.isUserExist,
  // forgetPassword
  loginController.forgetPassword
);

router.put(
  "/api/updateNewPassword/:token",
  // userMiddleWare.isRestPaswordTokenValid,
  signup.isRestPaswordTokenValid,
  // updateNewPassword
  loginController.updateNewPassword
);

module.exports = router;
