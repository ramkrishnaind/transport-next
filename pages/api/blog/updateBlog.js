// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import BlogDB from "../../../database/Schemas/blog";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const update_blogSchema = Joi.object({
  blogId: Joi.objectId().required(),
  userId: Joi.objectId().required(),
  blogCategoryTitle: Joi.string().trim().required(),
  blogImage: Joi.string().trim().required(),
  blogDate: Joi.string().trim().required(),
  blogTitle: Joi.string().trim().required(),
  blogTitlePara: Joi.string().trim().required(),
  blogSubTitle: Joi.string().trim().required(),
  blogSubTitlePara: Joi.string().trim().required(),
  blogContentFirst: Joi.string().trim().required(),
  blogContentFirstPara: Joi.string().trim().required(),
  blogContentSecond: Joi.string().trim().required(),
  blogContentSecondPara: Joi.string().trim().required(),
  blogContentThird: Joi.string().trim().required(),
  blogContentThirdPara: Joi.string().trim().required(),
  blogContentFourth: Joi.string().trim().required(),
  blogContentFourthPara: Joi.string().trim().required(),
  blogContentFifth: Joi.string().trim().required(),
  blogContentFifthPara: Joi.string().trim().required(),
  blogCategory: Joi.string().trim().required(),
  blogAuthor: Joi.string().trim().required(),
  blogStatus: Joi.boolean,
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function update_blog(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }
    let validateData = update_blogSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let update_blogData = _.pick(req.body, [
      "blogId",
      "userId",
      "blogCategoryTitle",
      "blogImage",
      "blogDate",
      "blogTitle",
      "blogTitlePara",
      "blogSubTitle",
      "blogSubTitlePara",
      "blogContentFirst",
      "blogContentFirstPara",
      "blogContentSecond",
      "blogContentSecondPara",
      "blogContentThird",
      "blogContentThirdPara",
      "blogContentFourth",
      "blogContentFourthPara",
      "blogContentFifth",
      "blogContentFifthPara",
      "blogCategory",
      "blogAuthor",
      "blogStatus"
    ]);

    let setData = {
      userId: update_blogData.userId,
      blogCategoryTitle: update_blogData.blogCategoryTitle,
      blogImage: update_blogData.blogImage,
      blogDate: update_blogData.blogDate,
      blogTitle: update_blogData.blogTitle,
      blogTitlePara: update_blogData.blogTitlePara,
      blogSubTitle: update_blogData.blogSubTitle,
      blogSubTitlePara: update_blogData.blogSubTitlePara,
      blogContentFirst: update_blogData.blogContentFirst,
      blogContentFirstPara: update_blogData.blogContentFirstPara,
      blogContentSecond: update_blogData.blogContentSecond,
      blogContentSecondPara: update_blogData.blogContentSecondPara,
      blogContentThird: update_blogData.blogContentThird,
      blogContentThirdPara: update_blogData.blogContentThirdPara,
      blogContentFourth: update_blogData.blogContentFourth,
      blogContentFourthPara: update_blogData.blogContentFourthPara,
      blogContentFifth: update_blogData.blogContentFifth,
      blogContentFifthPara: update_blogData.blogContentFifthPara,
      blogCategory: update_blogData.blogCategory,
      blogAuthor: update_blogData.blogAuthor,
      blogStatus:update_blogData.blogStatus,
    };

    // update data from req.body
    let findData = await BlogDB.findOneAndUpdate(
      { _id: update_blogData.blogId },
      { $set: setData }
    );
    if (findData) {
      return res.json({
        status: true,
        error: false,
        message: "Blog Updated For " + update_blogData.blogId,
      });
    } else {
      const blogData = await BlogDB.create(setData);
      return res.json({
        status: true,
        error: false,
        message: "Blog Item Insert Successfully For " + update_blogData.blogId,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(update_blog);
