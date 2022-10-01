// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import MenuDB from "../../../database/Schemas/menu";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const menuSignUpSchema = Joi.object({
  key: Joi.string().trim().required(),
  icon: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  link: Joi.string().trim().required(),
  rel: Joi.string().trim().required(),
  active: Joi.boolean(),
});

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

    let validateData = menuSignUpSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let menuData = _.pick(req.body, [
      "key",
      "icon",
      "name",
      "link",
      "rel",
      "active",
    ]);

    const addData = await MenuDB.create(menuData);
    console.log(addData);
    if (addData) {
      return res.json({
        status: true,
        error: false,
        message: "Menu Added!!!",
        statusCode: 200,
      });
    } else {
      return res.json({
        status: false,
        error: true,
        message: "Unable to create. Please contact admin",
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
