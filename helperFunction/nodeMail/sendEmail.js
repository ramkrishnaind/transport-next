const _ = require("lodash");

const nodemailer = require('nodemailer');
const config = require('./mailconfig.json');

module.exports = sendEmail;

async function sendEmail(from,to,subject,html) 
{
  console.log("email function",config.smtpOptions);

  const transporter = nodemailer.createTransport(config.smtpOptions);
  await transporter.sendMail({from,to,subject,html}, function(err, info) {
  if (err) {
    console.log(err)
  } else {
    console.log(info);
  }
  });
  //await transporter.sendMail(emailOption);
}