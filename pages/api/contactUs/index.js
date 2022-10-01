// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import ContactUsDB from "../../../database/Schemas/contact_us";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");

const ContactUsSchema = Joi.object({
  name: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  message: Joi.string().trim().required(),
  actionTaken: Joi.string().trim().required(),
  contactStatus: Joi.string().trim().required(),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createContact_usHandler(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }

    let validateData = ContactUsSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let userData = _.pick(req.body, [
      "name",
      "phone",
      "email",
      "message",
      "actionTaken",
      "contactStatus",
    ]);

    const addData = await ContactUsDB.create(userData);
    if (addData) {
      return res.json({
        status: true,
        error: false,
        message: "Contact Us Added!!!",
        statusCode: 200,
      });
    } else {
      return res.json({
        status: false,
        error: true,
        message: "Unable to create. Please contact admin",
        adminDisable: true,
        statusCode: 401,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
export default withProtect(createContact_usHandler);
