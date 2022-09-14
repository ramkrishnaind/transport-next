// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import BookingDB from "../../../database/Schemas/booking";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const booking_itemSchema = Joi.object({
  bookingId: Joi.objectId().required(),
  sofaSets: Joi.array().allow(null),
  tables: Joi.array().allow(null),
  chairs: Joi.array().allow(null),
  cots: Joi.array().allow(null),
  mattress: Joi.array().allow(null),
  cupBoards: Joi.array().allow(null),
  tvs: Joi.array().allow(null),
  refrigerators: Joi.array().allow(null),
  washingMachines: Joi.array().allow(null),
  ovens: Joi.array().allow(null),
  airConditioners: Joi.array().allow(null),
  fansCoolers: Joi.array().allow(null),
  bikes: Joi.array().allow(null),
  cars: Joi.array().allow(null),
  cycles: Joi.array().allow(null),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function booking_item(req, res) {
  await dbConnect();
  try {
    if (req.method != "GET") {
      let validateData = booking_itemSchema.validate(req.body);
      // if (validateData.error) {
      //   return res.json({
      //     status: false,
      //     error: validateData,
      //     message: "Invalid data",
      //   });
      // }

      // pick data from req.body

      let booking_itemData = _.pick(req.body, [
        "bookingId",
        "sofaSets",
        "table",
        "chair",
        "cots",
        "mattress",
        "cupboard",
        "tvs",
        "refrigerators",
        "washingMachines",
        "ovens",
        "airConditioners",
        "fansCooler",
        "bikes",
        "cars",
        "cycles",
      ]);
      const { bookingId, ...remaining } = booking_itemData;
      //  var sofaData = [
      //     {
      //       capcity:3,
      //       name:"2+1",
      //       storage:true,
      //       mateial:"lather",
      //       reclyner:true,
      //       CFT:120
      //     },
      //     {
      //       capcity:3,
      //       name:"2+1",
      //       storage:true,
      //       mateial:"lather",
      //       reclyner:true,
      //       CTF:150
      //     }
      //   ];

      let setData = {
        ...remaining,
      };

      // update data from req.body
      // console.log("Value updated",sofaData);
      await BookingDB.findOneAndUpdate({ _id: bookingId }, { $set: setData });
      return res.json({
        status: true,
        error: false,
        message: "Booking updated.",
        bookingId: booking_itemData.bookingId,
      });
    } else {
      const data = await BookingDB.findById(req.body.bookingId);
      res.json({ status: true, error: false, data });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(booking_item);
