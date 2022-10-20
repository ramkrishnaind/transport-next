import dbConnect from "../../../database/lib/dbConnect";
import BookingDB from "../../../database/Schemas/booking";
import withProtect from "../../../middlewares/withProtect";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const bookingSchema = Joi.object({
    bookingId: Joi.objectId().required(),
    cft: Joi.number().required()
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function updateBooking(req, res) {
    await dbConnect();
    try {
        if (req.method != 'PUT') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let validateData = bookingSchema.validate(req.body);
        if (validateData.error) {
            return res.json({ status: false, error: validateData, message: "Invalid data" });
        }

        // pick data from req.body
        let bookingData = _.pick(req.body, ['bookingId', 'cft']);

        let setData = {
            cft: bookingData.cft,
        }
        let updatedData = await BookingDB.findOneAndUpdate({ _id: bookingData.bookingId }, { $set: setData });
        return res.json({ status: true, error: false, message: "Booking updated." });
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
}
export default withProtect(updateBooking);
