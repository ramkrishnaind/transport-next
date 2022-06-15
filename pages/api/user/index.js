// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import UserDB from "../../../database/Schemas/user";
import withProtect from "../../../middlewares/withProtect";

const Joi = require('joi');

const userSignUpSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().email().trim(),
  mobile: Joi.number().required(),
});


/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createUserHandler(req, res) {
  await dbConnect();
  try {

    if (req.method != 'POST') {
      return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    let validateData = userSignUpSchema.validate(req.body);
    if (validateData.error) {
      return res.json({ status: false, error: validateData, message: "Invalid data" });
    }


     // pick data from req.body
     let userData = _.pick(req.body, ['fullName', 'email', 'mobile']);
     let getHash = customAlphabet(numbers, 4)
     let otp = getHash();
     userData.otp = otp;
     //
     let findData = await UserDB.findOne({ mobile: userData.mobile });
     if (findData) {
       if (!findData.active) {
         return res.json({ status: false, error: true, message: "Your account has been disabled. Please contact admin", adminDisable: true, statusCode: 401 });
       }
       return res.json({ status: true, error: false, message: "OTP Sent to " + userData.mobile, OTP: userData.otp, alreadyAUser: true })
     } else {
       const customer = await UserDB.create(userData);
       return res.json({ status: true, error: false, message: "OTP Sent to " + userData.mobile, OTP: userData.otp });
     }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
export default withProtect(createUserHandler);
// export default handler
