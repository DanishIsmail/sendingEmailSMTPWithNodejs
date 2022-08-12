const mongoose = require("mongoose"),
  userAccount = mongoose.model("userAccount"),
  usersPaswords = mongoose.model("usersPasword"),
  crypto = require("crypto"),
  result = require("../response/result"),
  messages = require("../utilities/errormessages");

const isUserExist = async (req, res, next) => {
  const user = await userAccount.findOne({
    email: req.body.email,
  });
  if (!user && user == null) {
    result.isError = true;
    result.message = messages.userDoesNotExist;
    return res.status(404).send(result);
  }
  next();
};

const isRestPaswordTokenValid = async (req, res, next) => {
  if (!req.params.token) {
    result.isError = true;
    result.message = messages.tokenProvideMessage;
    return res.status(404).send(result);
  }

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  //Checking the token expiration....
  const userData = await usersPaswords.findOne({
    token: resetPasswordToken,
    tokenExpire: { $gt: Date.now() },
  });

  if (!userData && userData == null) {
    result.isError = true;
    result.message = messages.tokeExpired;
    return res.status(404).send(result);
  }
  next();
};

module.exports = {
  isUserExist,
  isRestPaswordTokenValid,
};
