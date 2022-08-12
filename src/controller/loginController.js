const mongoose = require("mongoose"),
  userAccount = mongoose.model("userAccount"),
  usersPaswords = mongoose.model("usersPasword"),
  crypto = require("crypto"),
  sgMail = require("@sendgrid/mail"),
  result = require("../response/result"),
  messages = require("../utilities/errormessages");

const getResetPasswordToken = async (req, res) => {
  //Create Token......
  const resetToken = crypto.randomBytes(20).toString("hex");

  //HASH THE TOKEN...
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const resetTokenExpire = Date.now() + 30 * 60 * 1000; //30 Minutes Expiration time......

  return { resetToken, resetPasswordToken, resetTokenExpire };
};

const forgetPassword = async (req, res) => {
  const userData = await userAccount.findOne({
    email: req.body.email,
  });
  if (userData && userData != null) {
    const token = await getResetPasswordToken();
    const resetUrl = `http://localhost:3000//forgot/${token.resetToken}`;
    const message = `
        <h1>Hi,${userData.firstName}</h1>
        <p>you are recieving this email because  (you or someone else) has reuqested the reset of the password.</p>
        <p>Please click this link to reset your password</p><a href=${resetUrl}>${resetUrl}</a><br><br> 
        <p>if you did'nt request reset password,please ignore this email or reply us to let us know.This password reset
        is only valid for next 30 minutes.</p> <br>
        <p>Thanks</p>
        <h2>Dash Daniel</h2>
        <p>Contact us through email: dashdaniel717@gmail.com</p>
    `;
    const msg = {
      to: req.body.email, // Change to your recipient
      from: "abcd@gmail.com", // Change to your verified sender
      subject: "RESET PASSWORD",
      html: message,
    };
    try {
      sgMail.send(msg).then(() => {
        console.log("Email sent");
      });
      const usersPasword = new usersPaswords({
        email: req.body.email,
        token: token.resetPasswordToken,
        tokenExpire: token.resetTokenExpire,
      });
      const response = await usersPasword.save();
      result.isError = false;
      result.message = messages.forgetPasswordMessage;
    } catch (err) {
      result.isError = true;
      result.message = messages.forgetPasswordError;
    }
    return res.send({ result });
  }
};

const updateNewPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const userData = await usersPaswords
    .findOne({
      token: resetPasswordToken,
    })
    .select({ email: 1 });
  if (userData && userData != null) {
    const user = await userAccount
      .findOne({
        email: userData.email,
      })
      .select({ email: 1, password: 1 });
    user.password = req.body.password;
    const data = await user.save();
    const response = await usersPaswords.deleteOne({ email: userData.email });
    result.isError = false;
    result.message = messages.updatePasswordMessage;
    return res.send({ result });
  }
};

const getHello = async (req, res) => {
  return res.send("hello");
};
module.exports = {
  forgetPassword,
  getHello,
  updateNewPassword,
  getResetPasswordToken,
};
