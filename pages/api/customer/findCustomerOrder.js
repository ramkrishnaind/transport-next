// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import UtilityItemDB from "../../../database/Schemas/utilityItem";
import BookingDB from "../../../database/Schemas/booking";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const booking_itemSchema = Joi.object({
    bookingId: Joi.objectId().required(),
    customerId: Joi.objectId().required(),
});
async function billnumfunc(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }
    let validateData = booking_itemSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let booking_itemData = _.pick(req.body, ['bookingId','customerId']);
    //let findData = await Cu stomerDB.findOne({ mobile: customerData.mobile });
    let findData1 = await BookingDB.findOne({ customerId: booking_itemData.customerId });
     let findData = await UtilityItemDB.findOne({customerId : booking_itemData.customerId });
    if ((findData) || (findData1)) {
      return res.json({ status: true, error: false, message: "Data." + findData+findData1 })
    }
    else{
        return res.json({ status: false, error: false, message: "Data not found." }) 
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(billnumfunc);
