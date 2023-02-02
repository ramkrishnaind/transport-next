// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import BookingDB from "../../../database/Schemas/booking";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const step4_itemSchema = Joi.object({
  bookingId: Joi.objectId().required(),
  step4: Joi.object().required(),
});
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function step4_item(req, res) {
  await dbConnect();
  try {
    let validateData = step4_itemSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let step4_itemData = _.pick(req.body, ["step4", "bookingId"]);

    let setData = {
      step4: step4_itemData.step4,
    };

    // update data from req.body
    // console.log("Value updated",sofaData);
    await BookingDB.findOneAndUpdate(
      { _id: step4_itemData.bookingId },
      { $set: setData }
    );
    return res.json({
      status: true,
      error: false,
      message: "Booking updated.",
      bookingId: step4_itemData.bookingId,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(step4_item);
