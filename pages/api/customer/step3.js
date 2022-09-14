// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import BookingDB from "../../../database/Schemas/booking";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const step5_itemSchema = Joi.object({
  bookingId: Joi.objectId().required(),
  step3: Joi.array().required(),
});
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function step3_item(req, res) {
  await dbConnect();
  try {
    let validateData = step3_itemSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let step3_itemData = _.pick(req.body, ["step3", "bookingId"]);

    let setData = {
      step3: step3_itemData.step3,
    };

    // update data from req.body
    // console.log("Value updated",sofaData);
    await BookingDB.findOneAndUpdate(
      { _id: step3_itemData.bookingId },
      { $set: setData }
    );
    return res.json({
      status: true,
      error: false,
      message: "Booking updated.",
      bookingId: step3_itemData.bookingId,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(step3_item);
