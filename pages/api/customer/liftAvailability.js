import dbConnect from "../../../database/lib/dbConnect";
import BookingDB from "../../../database/Schemas/booking";
import withProtect from "../../../middlewares/withProtect";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const bookingSchema = Joi.object({
    bookingId: Joi.objectId().required(),
    currentFloor: Joi.string().trim().required(),
    isLiftAvailableOnCurrentFloor: Joi.boolean().required(),
    movingOnFloor: Joi.string().trim().required(),
    isLiftAvailableOnMovingFloor: Joi.boolean().required()
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function updateBooking(req, res) {
    await dbConnect();
    try {
        let validateData = bookingSchema.validate(req.body);
        if (validateData.error) {
            return res.json({ status: false, error: validateData, message: "Invalid data" });
        }

        // pick data from req.body
        let bookingData = _.pick(req.body, ['bookingId', 'currentFloor', 'isLiftAvailableOnCurrentFloor', 'movingOnFloor', 'isLiftAvailableOnMovingFloor']);

        let setData = {
            currentFloor: bookingData.currentFloor,
            isLiftAvailableOnCurrentFloor: bookingData.isLiftAvailableOnCurrentFloor,
            movingOnFloor: bookingData.movingOnFloor,
            isLiftAvailableOnMovingFloor: bookingData.isLiftAvailableOnMovingFloor,
        }
        let updatedData = await BookingDB.findOneAndUpdate({ _id: bookingData.bookingId }, { $set: setData });
        return res.json({ status: true, error: false, message: "Booking updated." });
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
}
export default withProtect(updateBooking);
