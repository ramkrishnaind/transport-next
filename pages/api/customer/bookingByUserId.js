// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import CustomerDB from "../../../database/Schemas/customer";
import UtilityItemDB from "../../../database/Schemas/misItem";
import BookingDB from "../../../database/Schemas/booking";
import withProtect from "../../../middlewares/withProtect";
const _ = require("lodash");

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createCustomerHandler(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }

    let customerData = _.pick(req.body, ["bookingId"]);
  //  console.log("book=", customerData.bookingId);
    let findData1 = await BookingDB.findOne({ _id: customerData.bookingId });
  //  console.log("aaaa", findData1);
    let findData3 = await UtilityItemDB.findOne({
      bookingId: customerData.bookingId,
    });

    let findData2 = await CustomerDB.findOne({ _id: findData1.customerId });

    return res.json({
      status: true,
      error: false,
      bookingdata: findData1,
      customerdata: findData2,
      utilityitem: findData3,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}

export default withProtect(createCustomerHandler);
