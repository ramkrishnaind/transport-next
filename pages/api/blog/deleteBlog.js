// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import BlogDB from "../../../database/Schemas/blog";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const delete_blogSchema = Joi.object({
  blogId: Joi.objectId().required(),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function delete_blog(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }
    let validateData = delete_blogSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let delete_blogData = _.pick(req.body, ["blogId"]);

    // delete data from req.body
    let findData = await BlogDB.deleteOne({ _id: delete_blogData.blogId });

    if (findData) {
      return res.json({
        status: true,
        error: false,
        message: "Blog Deleted Successfully " + delete_blogData.blogId,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      error: true,
      errorMessage: "Blog does not exits",
    });
  }
}
export default withProtect(delete_blog);
