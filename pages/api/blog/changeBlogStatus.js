// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import BlogDB from "../../../database/Schemas/blog";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const status_blogSchema = Joi.object({
  blogId: Joi.objectId().required(),
  blogStatus: Joi.boolean(),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function status_blog(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }
    let validateData = status_blogSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let status_blogData = _.pick(req.body, ["blogId", "blogStatus"]);

    let setData = {
      blogStatus: status_blogData.blogStatus,
    };

    // update data from req.body
    let findData = await BlogDB.findOneAndUpdate(
      { _id: status_blogData.blogId },
      { $set: setData }
    );
    if (findData) {
      return res.json({
        status: true,
        error: false,
        message: "Blog Status Updated For " + status_blogData.blogId,
      });
    } else {
      const blogData = await BlogDB.create(setData);
      return res.json({
        status: true,
        error: false,
        message: "Blog Item Insert Successfully For " + status_blogData.blogId,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(status_blog);
