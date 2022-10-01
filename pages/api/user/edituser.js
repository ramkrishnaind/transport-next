// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import UserDB from "../../../database/Schemas/user";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userSchema = Joi.object({
  userId: Joi.objectId().required(),
  firstname: Joi.string(),
  username: Joi.string(),
  password: Joi.string(),
  email: Joi.string(),
  mobile: Joi.string(),
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

    let validateData = userSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let userData = _.pick(req.body, [
      "userId",
      "firstname",
      "username",
      "password",
      "email",
      "mobile",
    ]);

    let setData = {
      firstName: userData.firstname,
      userName: userData.username,
      password: userData.password,
      email: userData.email,
      mobile: userData.mobile,
    };
    let findData = await UserDB.findOneAndUpdate(
      { _id: userData.userId },
      { $set: setData }
    );
    if (findData) {
      return res.json({
        status: true,
        error: false,
        message: findData,
      });
    } else {
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
