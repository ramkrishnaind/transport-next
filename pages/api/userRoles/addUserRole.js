// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import RoleDB from "../../../database/Schemas/userRole";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");

const userRoleSchema = Joi.object({
  roleName: Joi.string().trim().required(),
  roleValue: Joi.number().required(),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createRoleHandler(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }

    let validateData = userRoleSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let roleData = _.pick(req.body, ["roleName", "roleValue"]);

    const addData = await RoleDB.create(roleData);

    if (addData) {
      return res.json({
        status: true,
        error: false,
        message: "Role Added!!!",
        adminDisable: true,
        statusCode: 401,
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
export default withProtect(createRoleHandler);
