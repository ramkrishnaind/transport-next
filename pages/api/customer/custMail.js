// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const nodemailer = require("nodemailer");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const sendMail_Schema = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  subject: Joi.string().required(),
  messageBody: Joi.string().required(),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function mailSend(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({status: false, error: true, message: "HTTP method not allowed",
      });
    }
    let validateData = sendMail_Schema.validate(req.body);
    if (validateData.error) {
      return res.json({status: false, error: validateData,  message: "Invalid data",});
    }

    // pick data from req.body
    let sendMailData = _.pick(req.body, ["from", "to", "subject", "messageBody"]);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "ashwani.kumar@rosmertaauto.com", // generated ethereal user
        pass: "rapl1234", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: sendMailData.from, // sender address
      to: sendMailData.to, // list of receivers
      subject: sendMailData.subject, // Subject line
      html: sendMailData.messageBody, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return res.json({status: true, error: false, response: "Email Send Successfully " + info.response,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(mailSend);