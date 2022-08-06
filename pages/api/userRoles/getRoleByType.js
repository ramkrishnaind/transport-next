// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import RoleDB from "../../../database/Schemas/userRole";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");

const userRoleSchema = Joi.object({
  roleValue: Joi.number().required(),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

async function getRoleByType(req, res) {
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

    let userRoleData = _.pick(req.body, ["roleValue"]);

    let findData = await RoleDB.find({ roleValue: userRoleData.roleValue });

    if (findData) {
      return res.json({ status: true, error: false, message: findData });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(getRoleByType);
