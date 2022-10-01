// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import ContactUsDB from "../../../database/Schemas/contact_us";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createContactUsHandler(req, res) {
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
    let findData = await ContactUsDB.find();

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
export default withProtect(createContactUsHandler);
