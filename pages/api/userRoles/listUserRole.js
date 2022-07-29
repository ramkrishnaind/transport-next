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
    //  let userData = _.pick(req.body, ["username", "password"]);

    let findData = await RoleDB.find();
    if (findData) {
      return res.json({
        status: true,
        error: false,
        message: findData,
      });
    } else {
      //const customer = await UserDB.create(userData);
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
