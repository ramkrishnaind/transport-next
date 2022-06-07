// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import BookingDB from "../../../database/Schemas/booking";
import withProtect from "../../../middlewares/withProtect";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const bookingSchema = Joi.object({
  customerId: Joi.objectId().required(),
  shiftingFor: Joi.string().trim().required(),
  shiftingFrom: Joi.string().trim().required(),
  shiftingTo: Joi.string().trim().required(),
  shiftingOn: Joi.string().trim().required()
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createBooking(req, res) {
  await dbConnect();
  try {
    let validateData = bookingSchema.validate(req.body);
    if (validateData.error) {
      return res.json({ status: false, error: validateData, message: "Invalid data" });
    }

    // pick data from req.body
    let bookingData = _.pick(req.body, ['customerId', 'shiftingFor', 'shiftingFrom', 'shiftingTo', 'shiftingOn']);

    const booking = await BookingDB.create(bookingData);
    return res.json({ status: true, error: false, message: "Booking created", bookingId: booking._id });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(createBooking);
