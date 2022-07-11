const _ = require("lodash");

const nodemailer = require("nodemailer");
const config = require("./mailconfig.json");

module.exports = sendEmail;

async function sendEmail(to, subject, html) {
  let mailFrom = config.smtpOptions.auth.user;
  const transporter = nodemailer.createTransport(config.smtpOptions);
  await transporter.sendMail({ mailFrom, to, subject, html }, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });
}