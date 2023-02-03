// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import CustomerDB from "../../../database/Schemas/customer";
import withProtect from "../../../middlewares/withProtect";
import SendEmail from "../../../helperFunction/nodeMail/sendEmail";
import sendOTP from "../../../helperFunction/sendSMS";
const _ = require("lodash");
const Joi = require("joi");
import { customAlphabet } from "nanoid";
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
  debugger;
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }
    debugger;
    let validateData = customersignUpSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let customerData = _.pick(req.body, ["fullName", "email", "mobile"]);
    let getHash = customAlphabet(numbers, 4);
    let otp = getHash();
    customerData.otp = otp;

    let findData = await CustomerDB.findOne({
      $or: [{ mobile: customerData.mobile }, { email: customerData.email }],
    });
    if (findData) {
      if (!findData.active) {
        return res.json({
          status: false,
          error: true,
          message: "Your account has been disabled. Please contact admin",
          adminDisable: true,
          statusCode: 401,
        });
      }
      await CustomerDB.updateOne(
        {
          $or: [{ mobile: customerData.mobile }, { email: customerData.email }],
        },
        { $set: { otp: customerData.otp } }
      );
      SendEmail(
        customerData.email,
        "Customer Login OTP",
        "WG-"+customerData.otp +" is the OTP to login into White Glove Virtual Survey Engine. Please use this OTP to proceed."
      );
      console.log("New Customer Login OTP");
      sendOTP(
        customerData.mobile,
        customerData.otp
      )
      return res.json({
        status: true,
        error: false,
        message: "OTP Sent to " + customerData.mobile,
        OTP: customerData.otp,
        alreadyAUser: true,
        customerData: findData
      });
    } else {
      const customer = await CustomerDB.create(customerData);
      SendEmail(
        customerData.email,
        "New Customer Login OTP",
        "WG-"+customerData.otp +" is the OTP to login into White Glove Virtual Survey Engine. Please use this OTP to proceed."
      );
      console.log("New Customer Login OTP");
      sendOTP(
        customerData.mobile,
        customerData.otp
      )
      return res.json({
        status: true,
        error: false,
        message: "OTP Sent to " + customerData.mobile,
        OTP: customerData.otp,
        customerData: customer
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(createCustomer);
