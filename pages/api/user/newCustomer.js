import CustomerDB from "../../../database/Schemas/customer";
import withProtect from "../../../middlewares/withProtect";
const _ = require('lodash');
const Joi = require('joi');
import { customAlphabet } from 'nanoid';
const numbers = "0123456789";
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const customersignUpSchema = Joi.object({
    fullName: Joi.string().trim().required(),
    email: Joi.string().email().trim(),
    mobile: Joi.number().required(),
});

async function newCustomer(req, res) {
    try {
        let validateData = customersignUpSchema.validate(req.body);
        if (validateData.error) {
            res.send({ status: false, error: validateData, message: "Invalid data" });
        }

        // pick data from req.body
        let userData = _.pick(req.body, ['fullName', 'email', 'mobile']);
        let getHash = customAlphabet(numbers, 4)
        let otp = getHash();
        userData.otp = otp;
        console.log('otp is ', otp)
        const user = new CustomerDB(userData).save();
        res.send({ status: true, otp, user, message: "Verification mail has been sent to your registered email", mailSent: true })

    } catch (error) {
        console.log('in catch Error is ', error)
        res.send({ status: false, errorMessage: error })
    }
}
export default withProtect(newCustomer);