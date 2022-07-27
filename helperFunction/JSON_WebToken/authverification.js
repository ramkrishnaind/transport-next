// import connectMongo from "../../../database/connection";
import dbConnect from "../../database/lib/dbConnect";
import JsonTokenDB from "../../database/Schemas/authToken";
import jwt from "jsonwebtoken";

module.exports = createToken;

async function createToken(user_id) {
  await dbConnect();
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  console.log("Token function", jwtSecretKey, user_id);

  let data = {
    customerId: user_id,
    expireTime: "2h",
  };
  const token = jwt.sign(data, jwtSecretKey);
  let authData = { customerId: user_id, token: token, expireTime: "2" };
  const auth = await JsonTokenDB.create(authData);

  console.log("auth data", auth);
}
