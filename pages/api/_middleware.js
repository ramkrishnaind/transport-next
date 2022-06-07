// import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
const connect = async () => {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    console.log("CREATING DOCUMENT");

    // res.json({ user: req.user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
connect();
// In rewrite method you pass a page folder name(as a string). which // you create to handle underConstraction  functionalty.
export function middleware(req, ev) {
  //   return NextResponse.rewrite("/underConstraction");
  //   return NextResponse.json({ message: "Hi" });
  //   console.log("hello");
  //   req.user = "Ram";
  //   // return NextResponse.json({ user: req.user });
  //   // console.log("user", req.user);
  //   return new Response(JSON.stringify({ message: "Not authenticated." }), {
  //     status: 401,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  return NextResponse.next();
  //   return NextResponse.redirect()
}
