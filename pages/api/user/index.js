// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import UserDB from "../../../database/Schemas/user";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");

const userSignUpSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required()
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createUserHandler(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }

    let validateData = userSignUpSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let userData = _.pick(req.body, ["username", "password"]);

    let findData = await UserDB.findOne({
      userName: userData.username,
      password: userData.password,
      active: 1,
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
      return res.json({
        status: true,
        error: false,
        message: "OTP Sent to ",
        login: true,
      });
    } else {
      //const customer = await UserDB.create(userData);
      return res.json({
        status: false,
        error: true,
        message: "Your account has been disabled. Please contact admin",
        adminDisable: true,
        statusCode: 401,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
export default withProtect(createUserHandler);