// import connectMongo from "../../../database/connection";
import { stringify } from "postcss";
import dbConnect from "../../../database/lib/dbConnect";
import RoleDB from "../../../database/Schemas/userRole";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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

    let roleData = _.pick(req.body, ["roleId", "roleName", "permission"]);
    let addData = 0;
    console.log(roleData);
    if (roleData.roleId) {
      let setData = {
        roleName: roleData.roleName,
        permission: roleData.permission,
      };
      addData = await RoleDB.findOneAndUpdate(
        { _id: roleData.roleId },
        { $set: setData }
      );
    } else {
      const addroleData = {
        roleName: roleData.roleName,
        permission: roleData.permission,
      };
      addData = await RoleDB.create(addroleData);
    }

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
