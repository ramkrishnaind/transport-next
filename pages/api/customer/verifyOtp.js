// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import CustomerDB from "../../../database/Schemas/customer";
import withProtect from "../../../middlewares/withProtect";
const _ = require('lodash');
const Joi = require('joi');

const customersignUpSchema = Joi.object({
    otp: Joi.number().required(),
    mobile: Joi.number().required(),
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function verifyOtp(req, res) {
    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let validateData = customersignUpSchema.validate(req.body);
        if (validateData.error) {
            return res.json({ status: false, error: validateData, message: "Invalid data" });
        }

        // pick data from req.body
        let customerData = _.pick(req.body, ['otp', 'mobile']);

        let findData = await CustomerDB.findOne({ mobile: customerData.mobile }).lean();
        console.log('findData is', findData)
        if (findData) {
            if (findData.otp == customerData.otp) {
                if (!findData.verified) {
                    const verifyData = {
                        verified: true,
                        verificationDate: new Date(),
                    };
                    const verifyCustomer = await CustomerDB.findOneAndUpdate({ mobile: customerData.mobile }, { $set: verifyData })
                }
                return res.status(200).send({ status: true, error: false, message: "OTP Varified", customerData: findData });
            }
        } else {
            return res.status(500).send({ status: false, error: true, message: "Invalid OTP", });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ status: false, error: true, errorMessage: error });
    }
}
export default withProtect(verifyOtp);
