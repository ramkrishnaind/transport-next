// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import UserDB from "../../../database/Schemas/user";
import withProtect from "../../../middlewares/withProtect";
import SendEmail from "../../../helperFunction/nodeMail/sendEmail";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userSignUpSchema = Joi.object({
  uid: Joi.objectId(),
  userName: Joi.string().trim().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  mobile: Joi.string().trim().required(),
  roleValue: Joi.string().required(),
});

const generatePassword = async () => {
  var length = 10,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

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
      "firstName",
      "lastName",
      "mobile",
      "email",
      "roleValue",
    ]);
    if (!userData.uid) {
      let findData = await UserDB.findOne({
        $or: [{ mobile: userData.mobile }, { email: userData.email }],
      });

      if (findData) {
        return res.json({
          status: false,
          error: true,
          message: "Email or Mobile Already Exits",
        });
      }
    }
    let setData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: userData.userName,
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
          message: "User Updated Succesfully!!",
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
      // send password to mobile
      const randomPassword = await generatePassword();
      userData.password = randomPassword;
      SendEmail(
        userData.email,
        "White Glove New User Details",
        "Hello, " +
          userData.firstName +
          " This is your Login User Name = " +
          userData.userName +
          "  And Password = " +
          userData.password +
          " Please use this Password to Login."
      );

      const addData = await UserDB.create(userData);

      if (addData) {
        return res.json({
          status: true,
          error: false,
          message: "User Created Succesfully and Password Send to EMail !!!",
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
