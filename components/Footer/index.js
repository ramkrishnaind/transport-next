import React from "react";
import { Divider } from "antd";

const Footer = () => {
  return (
    <>
      <div className="footerLayout">
        <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6 footerSpan">
          <div className="col-span-2 mb-8">
            <img
              className="w-96"
              src="/images/home/logo/logo-white.png"
              itemProp="image"
              alt="main BannerImage"
            />
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4">
              <div>
                <div className="footerTitle mb-16">Our Divisions</div>
                <div className="footerLink mb-4">White Glove</div>
                <div className="footerLink mb-16">FLITTE Logistics</div>
              </div>
              <div>
                <div className="footerTitle mb-16">Career</div>
                <div className="footerLink mb-4">Available Positions</div>
                <div className="footerLink mb-16">Job Application</div>
              </div>
              <div>
                <div className="footerTitle mb-16">Contact Us</div>
                <div className="footerLink mb-4">Get In Touch</div>
                <div className="footerLink mb-4">FAQ Page</div>
                <div className="footerLink mb-16">Global Network</div>
              </div>
              <div>
                <div className="footerTitle mb-16">Latest News</div>
                <div className="footerLink mb-4">Facing Problem While Moving?</div>
                <div className="footerLink mb-4">A Sustainable Future</div>
                <div className="footerLink mb-16">Fresh Start</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="copyRight grid  grid-cols-6 p-8">
        <div className="col-start-1 col-span-2 ">
          Made with <span className="heartColor">❤</span> By Infinity Coder`s
        </div>
        <div className="col-start-3 col-span-3 ml-16">
          © 2021 White Glove, All Rights Reserved
        </div>
        <div className="col-start-6">
          <div>F</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
