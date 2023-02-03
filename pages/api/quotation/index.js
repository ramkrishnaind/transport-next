// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import QuotationDB from "../../../database/Schemas/quotation";
import withProtect from "../../../middlewares/withProtect";
//const html_to_pdf = require('html-pdf-node');

const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const quotationSchema = Joi.object({
  customerId: Joi.objectId().required(),
  customerfullName: Joi.string(),
  customerMobileNo: Joi.string(),
  customerEmailId: Joi.string(),
  customerCarCharge: Joi.string(),
  typeOTransport: Joi.string(),
  totalTConveyance: Joi.string(),
  estimatedDeliveryTime: Joi.string(),
  packingMCost: Joi.string(),
  loadingCharges: Joi.string(),
  localTConveyance: Joi.string(),
  localTConveyance_yes: Joi.string(),
  unloadingCharges: Joi.string(),
  otherCharges: Joi.string(),
  otherCharges_yes: Joi.string(),
  notes: Joi.string(),
  totalCharges: Joi.number(),
  margin: Joi.number(),
  afterMarginTotalCharges: Joi.number(),
  quotationUserId: Joi.string(),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createquotationHandler(req, res) {
  await dbConnect();
  try {
    if (req.method != "POST") {
      return res.json({
        status: false,
        error: true,
        message: "HTTP method not allowed",
      });
    }

    let validateData = quotationSchema.validate(req.body);
    if (validateData.error) {
      return res.json({
        status: false,
        error: validateData,
        message: "Invalid data",
      });
    }

    // pick data from req.body
    let quotationData = _.pick(req.body, [
      "customerId",
      "customerfullName",
      "customerMobileNo",
      "customerEmailId",
      "customerCarCharge",
      "typeOTransport",
      "totalTConveyance",
      "estimatedDeliveryTime",
      "packingMCost",
      "loadingCharges",
      "localTConveyance",
      "localTConveyance_yes",
      "unloadingCharges",
      "otherCharges",
      "otherCharges_yes",
      "notes",
      "totalCharges",
      "margin",
      "afterMarginTotalCharges",
      "quotationUserId",
    ]);
    let addData = 0;
    if (quotationData) {
      addData = await QuotationDB.create(quotationData);
    }
    if (addData) {
      return res.json({
        status: true,
        error: false,
        message: "Quotation Added!!!",
        adminDisable: true,
        statusCode: 401,
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
export default withProtect(createquotationHandler);
