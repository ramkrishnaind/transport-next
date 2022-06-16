// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import BookingDB from "../../../database/Schemas/booking";
import withProtect from "../../../middlewares/withProtect";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const booking_itemSchema = Joi.object({
  bookingId: Joi.objectId().required(),
    Sofasets: Joi.number(),
    Tables: Joi.number(),
    Chairs: Joi.number(),
    Cots: Joi.number(),
    Mattress: Joi.number(),
    Cupboards: Joi.number(),
    TVs: Joi.number(),
    Refrigerators: Joi.number(),
    WashingMachines: Joi.number(),
    Ovens: Joi.number(),
    AirConditioners: Joi.number(),
    FansCoolers:Joi.number(),
    Bikes:Joi.number(),
    Cars:Joi.number(),
    Cycles:Joi.number(),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function booking_item(req, res) {
  await dbConnect();
  try {
    if (req.method != 'POST') {
      return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    let validateData = booking_itemSchema.validate(req.body);
    if (validateData.error) {
      return res.json({ status: false, error: validateData, message: "Invalid data" });
    }

    // pick data from req.body
    let booking_itemData = _.pick(req.body, ['bookingId','Sofasets','Tables','Chairs','Cots','Mattress','Cupboards','TVs','Refrigerators','WashingMachines','Ovens','AirConditioners','FansCoolers','Bikes','Cars','Cycles']);
    
    let setData = {
        Sofasets:booking_itemData.Sofasets,
        Tables:booking_itemData.Tables,
        Chairs:booking_itemData.Chairs,
        Cots:booking_itemData.Cots,
        Mattress:booking_itemData.Mattress,
        Cupboards:booking_itemData.Cupboards,
        TVs:booking_itemData.TVs,
        Refrigerators:booking_itemData.Refrigerators,
        WashingMachines:booking_itemData.WashingMachines,
        Ovens:booking_itemData.Ovens,
        AirConditioners:booking_itemData.AirConditioners,
        FansCoolers:booking_itemData.FansCoolers,
        Bikes:booking_itemData.Bikes,
        Cars:booking_itemData.Cars,
        Cycles:booking_itemData.Cycles
      }

    // update data from req.body
    let booking_item = await BookingDB.findOneAndUpdate({ _id: booking_itemData.bookingId },  { $set: setData });
    return res.json({ status: true, error: false, message: "Booking updated." });

   } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
   }
}
export default withProtect(booking_item);
