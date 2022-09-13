// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import MenuDB from "../../../database/Schemas/menu";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createMenuHandler(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }

    let mypermission = [];
    let menuData = _.pick(req.body, ["permission"]);

    let findData = [];
    if (menuData.permission) {
      mypermission = menuData.permission.split(",");
      findData = await MenuDB.find({ name: { $in: mypermission } });
    } else {
      findData = await MenuDB.find();
    }
    if (findData) {
      return res.json({
        status: true,
        error: false,
        data: findData,
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
export default withProtect(createMenuHandler);
