// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log("user", req.user);
  res.status(200).json({ name: req.user || "" });
}
