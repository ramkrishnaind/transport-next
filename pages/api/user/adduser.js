// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import UserDB from "../../../database/Schemas/user";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const userSignUpSchema = Joi.object({
  uid: Joi.objectId(),
  userName: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  mobile: Joi.string().trim().required(),
  roleValue: Joi.number().required(),
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
    let userData = _.pick(req.body, [
      "uid",
      "userName",
      "password",
      "firstName",
      "lastName",
      "mobile",
      "email",
      "roleValue",
    ]);

    let setData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: userData.userName,
      password: userData.password,
      email: userData.email,
      mobile: userData.mobile,
      roleValue: userData.roleValue,
    };

    if (userData.uid) {
      const editData = await UserDB.findOneAndUpdate(
        { _id: userData.uid },
        { $set: setData }
      );
      if (editData) {
        return res.json({
          status: true,
          error: false,
          message: "User Updated!!",
          statusCode: 200,
        });
      } else {
        return res.json({
          status: false,
          error: true,
          message: "Unable to update!",
          adminDisable: true,
          statusCode: 401,
        });
      }
    } else {
      const addData = await UserDB.create(userData);

      if (addData) {
        return res.json({
          status: true,
          error: false,
          message: "User Added!!!",
          statusCode: 200,
        });
      } else {
        return res.json({
          status: false,
          error: true,
          message: "Unable to Update. Please contact admin",
          adminDisable: true,
          statusCode: 401,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
export default withProtect(createUserHandler);
