import dbConnect from "../../../../database/lib/dbConnect";
import BookingDB from "../../../../database/Schemas/booking";
import CustomerDB from "../../../../database/Schemas/customer";
import withProtect from "../../../../middlewares/withProtect";

// async function booking_item_get(req, res) {
//   await dbConnect();
//   try {
//     if (req.method === "GET") {
//       const data = await BookingDB.findById(req.query.id);
//       let custData;
//       if (data) {
//         custData = await BookingDB.findByOne({
//           customerId: data.customerId,
//         })
//           .populate("customerId")
//           .sort({ createdAt: -1 });
//       }
//       res.json({ status: true, error: false, data, customerData: custData });
//     }
//   } catch {}
// }
// export default withProtect(booking_item_get);
export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  // id = "632065644c2214f9df0ab61d";
  const data = await BookingDB.findById(id);
  let custData;
  if (data) {
    custData = await BookingDB.find({
      customerId: data.customerId,
    })
      .populate("customerId")
      .sort({ createdAt: -1 });
  }
  res.json({ status: true, error: false, data, customerData: custData });
  // res.end(`Post: ${pid}`);
}
