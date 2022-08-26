// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import RoleDB from "../../../database/Schemas/userRole";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const userRoleSchema = Joi.object({
  roleId:Joi.objectId(),
  roleName: Joi.string().trim().required(),
  roleValue: Joi.number().required(),
  permission: Joi.array(),
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
    let roleData = _.pick(req.body, ["roleId","roleName", "roleValue","permission"]);
    console.log("role for update",roleData);
    let addData=0 ;
    
    if(roleData.roleId)
    {
      let setData = {
        roleName:roleData.roleName,
        roleValue:roleData.roleValue,
        permission:roleData.permission,
      };
      addData= await RoleDB.findOneAndUpdate({_id:roleData.roleId}, { $set: setData });
    }
    else
    {
    addData= await RoleDB.create(roleData);
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
