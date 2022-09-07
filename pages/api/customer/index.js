// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import CustomerDB from "../../../database/Schemas/customer";
import withProtect from "../../../middlewares/withProtect";
import SendEmail from "../../../helperFunction/nodeMail/sendEmail";
const _ = require('lodash');
const Joi = require('joi');
import { customAlphabet } from 'nanoid';
const numbers = "0123456789";

const customersignUpSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  mobile: Joi.number().required(),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createCustomer(req, res) {
  await dbConnect();
  try {
    if (req.method != 'POST') {
      return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    let validateData = customersignUpSchema.validate(req.body);
    if (validateData.error) {
      return res.json({ status: false, error: validateData, message: "Invalid data" });
    }

    // pick data from req.body
    let customerData = _.pick(req.body, ['fullName', 'email', 'mobile']);
    let getHash = customAlphabet(numbers, 4)
    let otp = getHash();
    customerData.otp = otp;
    //
    let findData = await CustomerDB.findOne({ $or: [{ mobile: customerData.mobile }, { email: customerData.email }] });
    if (findData) {
      if (!findData.active) {
        return res.json({ status: false, error: true, message: "Your account has been disabled. Please contact admin", adminDisable: true, statusCode: 401 });
      }
      SendEmail(customerData.email, 'Customer Login OTP', customerData.otp + " is the TPIN for your White Glove transaction Please use this pin to complete your transaction");
      return res.json({ status: true, error: false, message: "OTP Sent to " + customerData.mobile, OTP: customerData.otp, alreadyAUser: true })
    } else {
      const customer = await CustomerDB.create(customerData);
      SendEmail(customerData.email, 'New Customer Login OTP', customerData.otp + " is the TPIN for your White Glove transaction. Please use this PIN to complete your transaction.");
      return res.json({ status: true, error: false, message: "OTP Sent to " + customerData.mobile, OTP: customerData.otp });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(createCustomer);