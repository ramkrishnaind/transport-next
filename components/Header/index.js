import React from "react";
import { Divider } from "antd";
import Link from "next/link";
import Image from "next/image";
import Hamburger from "./hamburger";

const Header = () => {
  return (
    <>
      <div className="hidden md:bg-black md:text-white md:grid md:grid-flow-col md:grid-cols-6 lg:bg-black lg:text-white lg:grid lg:grid-flow-col lg:grid-cols-6 pl-16 pr-16 pb-2 pt-2">
        <div>1800-547-6842</div>
        <div>inquiry@whiteglove.co.in</div>
        <div className="col-start-5">Support 24/7</div>
        <div className="col-start-6">Track and Trace</div>
      </div>
      <div className="mainHeader grid grid-flow-col grid-cols-8 pl-16">
        <div>
          <Link href="/">
            {/* <img
            className="w-96"
            src="/images/home/logo/logo.png"
            itemProp="image"
            alt="main BannerImage"
          /> */}
            <img
              className="w-96"
              src="/images/home/logo/logo.png"
              itemProp="image"
              alt="main BannerImage"
            />
          </Link>
        </div>
        <div className="col-start-3 col-span-4 self-center">
          <div className="hidden md:grid md:grid-flow-col md:grid-cols-5 lg:grid lg:grid-flow-col lg:grid-cols-5 ">
            <div>
              <Link href="/">Home</Link>
            </div>
            <div>About Us</div>
            <div>Services</div>
            <div>Blog</div>
            <div>Contact</div>
          </div>
        </div>
        <div className="hamburger md:col-start-7 md:col-span-2 md:grid md:grid-flow-col md:grid-cols-5 lg:col-start-7 lg:col-span-2 lg:grid lg:grid-flow-col lg:grid-cols-5">
          <div className="col-span-4 headTrack self-center">
            Track Your Order
          </div>
          <div style={{ marginRight: 25 }}>
            <Hamburger />
          </div>
        </div>
      </div>
      <Divider className="hederDivider" />
    </>
  );
};

export default Header;
