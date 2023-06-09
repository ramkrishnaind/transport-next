// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import RoleDB from "../../../database/Schemas/userRole";
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
    let roleData = _.pick(req.body, ["roleId"]);
    let findData = 0;
    if (roleData.roleId) {
      findData = await RoleDB.find({ _id: roleData.roleId });
    } else {
      findData = await RoleDB.find();
    }
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
        message: "No Data found",
        statusCode: 401,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
export default withProtect(delroleHandler);
