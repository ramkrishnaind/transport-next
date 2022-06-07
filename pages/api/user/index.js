import connectMongo from "../../../database/connection";
import UserDB from "../../../database/Schemas/user";
import withProtect from "../../../middlewares/withProtect";
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function createUserHandler(req, res) {
  try {
    // console.log('CONNECTING TO MONGO');
    // await connectMongo();
    // console.log('CONNECTED TO MONGO');

    // console.log('CREATING DOCUMENT');
    const user = new UserDB({
      firstName: "Sita",
      lastName: "Ram",
      mobile: "9876545766",
    });
    // res.json({ user: req.user });
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
export default withProtect(createUserHandler);
// export default handler
