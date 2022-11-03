// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import CustomerDB from "../../../database/Schemas/customer";
import withProtect from "../../../middlewares/withProtect";
import JsonFind from "json-find";
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

    // pick data from req.body
    let findData = await CustomerDB.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "customerId",
          as: "listbooking",
        },
      },
    ]);

    console.log(findData.lostbooking);
    if (findData) {
      return res.json({
        status: true,
        error: false,
        message: findData,
      });
    } else {
      return res.json({
        status: false,
        error: true,
        message: "Your account has been disabled. Please contact admin",
        adminDisable: true,
        statusCode: 401,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
export default withProtect(createCustomerHandler);
