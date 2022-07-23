// import connectMongo from "../../../database/connection";
import dbConnect from "../../../database/lib/dbConnect";
import UserDB from "../../../database/Schemas/user";
import withProtect from "../../../middlewares/withProtect";

const _ = require('lodash');
const Joi = require('joi');
import { customAlphabet } from 'nanoid';
const numbers = "0123456789";


/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createCustomer(req, res) {
  await dbConnect();
  try {
    if (req.method != 'POST') {
      return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    
    // pick data from req.body
    
    //
    let findData = await UserDB.find({});
    if (findData) {
      
      return res.json({ status: true, error: false, message:findData   });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }
}
export default withProtect(createCustomer);