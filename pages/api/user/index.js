import { runMiddleware } from "../middle/_middleware";
import withProtect from "../../../middlewares/withProtect";

async function handler(req, res) {
  res.json({ user: req.user });
  // Run the auth middleware if you want to add authorization check
  // Rest of the API logic
}

export default withProtect(handler);
