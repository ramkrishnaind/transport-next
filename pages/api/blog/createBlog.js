// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import BlogDB from "../../../database/Schemas/blog";
import withProtect from "../../../middlewares/withProtect";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const create_blogSchema = Joi.object({
    userId: Joi.objectId().required(),
    blogCategoryTitle: Joi.string().trim().required(),
    blogImage: Joi.string().trim().required(),
    blogDate: Joi.string().trim().required(),
    blogTitle:Joi.string().trim().required(),
    blogTitlePara:Joi.string().trim().required(),
    blogSubTitle: Joi.string().trim().required(),
    blogSubTitlePara: Joi.string().trim().required(),
    blogContentFirst:Joi.string().trim().required(),
    blogContentFirstPara: Joi.string().trim().required(),
    blogContentSecond: Joi.string().trim().required(),
    blogContentSecondPara: Joi.string().trim().required(),
    blogContentThird:Joi.string().trim().required(),
    blogContentThirdPara: Joi.string().trim().required(),
    blogContentFourth: Joi.string().trim().required(),
    blogContentFourthPara: Joi.string().trim().required(),
    blogContentFifth:Joi.string().trim().required(),
    blogContentFifthPara: Joi.string().trim().required(),
    blogCategory:Joi.string().trim().required(),
    blogAuthor: Joi.string().trim().required(),
    blogStatus:Joi.boolean(),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function create_blog(req, res) {
  await dbConnect();
  try {
    if (req.method != 'POST') {
      return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    let validateData = create_blogSchema.validate(req.body);
    if (validateData.error) {
      return res.json({ status: false, error: validateData, message: "Invalid data" });
    }

    // pick data from req.body
    let create_blogData = _.pick(req.body, ['userId','blogCategoryTitle','blogImage','blogDate','blogTitle',
    'blogTitlePara','blogSubTitle','blogSubTitlePara','blogContentFirst','blogContentFirstPara',
    'blogContentSecond','blogContentSecondPara','blogContentThird','blogContentThirdPara','blogContentFourth',
    'blogContentFourthPara','blogContentFifth','blogContentFifthPara','blogCategory','blogAuthor','blogStatus']);


    let setData = {
        userId:create_blogData.userId,
        blogCategoryTitle:create_blogData.blogCategoryTitle,
        blogImage:create_blogData.blogImage,
        blogDate:create_blogData.blogDate,
        blogTitle:create_blogData.blogTitle,
        blogTitlePara:create_blogData.blogTitlePara,
        blogSubTitle:create_blogData.blogSubTitle,
        blogSubTitlePara:create_blogData.blogSubTitlePara,
        blogContentFirst:create_blogData.blogContentFirst,
        blogContentFirstPara:create_blogData.blogContentFirstPara,
        blogContentSecond:create_blogData.blogContentSecond,
        blogContentSecondPara:create_blogData.blogContentSecondPara,
        blogContentThird:create_blogData.blogContentThird,
        blogContentThirdPara:create_blogData.blogContentThirdPara,
        blogContentFourth:create_blogData.blogContentFourth,
        blogContentFourthPara:create_blogData.blogContentFourthPara,
        blogContentFifth:create_blogData.blogContentFifth,
        blogContentFifthPara:create_blogData.blogContentFifthPara,
        blogCategory:create_blogData.blogCategory,
        blogAuthor:create_blogData.blogAuthor,
        blogStatus:create_blogData.blogStatus
      }

    // insert data from req.body
    const blog = await BlogDB.create(setData);
    return res.status(200).send({ status: true, error: false, message: "Blog created", blogId: blog._id });
   } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
   }
}
export default withProtect(create_blog);