// import connectMongo from "../../../database/connection";
import { array } from "joi";
import dbConnect from "../../../database/lib/dbConnect";
import BookingDB from "../../../database/Schemas/booking";
import withProtect from "../../../middlewares/withProtect";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const booking_itemSchema = Joi.object({
    bookingId: Joi.objectId().required(),
    sofaSets: Joi.array(),
    tables: Joi.array(),
    chairs: Joi.array(),
    cots: Joi.array(),
    mattress: Joi.array(),
    cupBoards: Joi.array(),
    tvs: Joi.array(),
    refrigerators: Joi.array(),
    washingMachines: Joi.array(),
    ovens: Joi.array(),
    airConditioners: Joi.array(),
    fansCoolers:Joi.array(),
    bikes:Joi.array(),
    cars:Joi.array(),
    cycles:Joi.array(),
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
    let booking_itemData = _.pick(req.body, ['bookingId','sofaSets','tables','chairs','cots','mattress','cupBoards','tvs','refrigerators','washingMachines','ovens','airConditioners','fansCoolers','bikes','cars','cycles']);
    
   var sofaData = {
      sofa:"5",
      sofaDesc:[{
        qty:"1",
        capcity:"3",
        type:"2+1",
        storage:"with",
        mateial:"lather",
        property:"reclner"
      },
      {
        qty:"4",
        capcity:"3",
        type:"2+1",
        storage:"without",
        mateial:"lather",
        property:"reclner"
      }]
    };

    let setData = {
        sofaSets:sofaData,
        tables:sofaData,
        chairs:booking_itemData.chairs,
        cots:booking_itemData.cots,
        mattress:booking_itemData.mattress,
        cupBoards:booking_itemData.cupBoards,
        tvs:booking_itemData.tvs,
        refrigerators:booking_itemData.refrigerators,
        washingMachines:booking_itemData.washingMachines,
        ovens:booking_itemData.ovens,
        airConditioners:booking_itemData.airConditioners,
        fansCoolers:booking_itemData.fansCoolers,
        bikes:booking_itemData.bikes,
        cars:booking_itemData.cars,
        cycles:booking_itemData.cycles
      }

    // update data from req.body
    // console.log("Value updated",sofaData);
    let booking_item = await BookingDB.findOneAndUpdate({ _id: booking_itemData.bookingId },  { $set: setData });
    return res.json({ status: true, error: false, message: "Booking updated.", bookingId:  booking_itemData.bookingId });

   } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
   }
}
export default withProtect(booking_item);