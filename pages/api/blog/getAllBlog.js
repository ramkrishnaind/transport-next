// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import BlogDB from "../../../database/Schemas/blog";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function list_blog(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }

    let findData = await BlogDB.find({});
    if (findData) {
      return res.json({ status: true, error: false, message: findData });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(list_blog);
