// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import RoleDB from "../../../database/Schemas/userRole";
import UserDB from "../../../database/Schemas/user";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function delroleHandler(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }

    // pick data from req.body
    let roleData = _.pick(req.body, ["roleid"]);
    let findroleValue = await UserDB.findOne({ roleValue: roleData.roleid });

    if (!findroleValue) {
      let findData = await RoleDB.deleteOne({ roleName: roleData.roleid });
      if (findData) {
        return res.json({
          status: true,
          error: false,
          message: "User Deleted Successfully!",
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
    } else {
      return res.json({
        status: false,
        error: true,
        message: "Role value assigned to user.",
        adminDisable: true,
        statusCode: 401,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
export default withProtect(delroleHandler);
