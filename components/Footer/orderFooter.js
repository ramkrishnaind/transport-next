import React from "react";

const Footer = () => {
  return (
    <>
      <div className="orderFooter grid grid-flow-col grid-cols-6 pl-16 pr-16 pb-4 pt-4">
        <div className="col-start-1 col-span-2 orderFooter">
          Made with <span className="orderFooter heartColor  ">💝</span> By Infinity Coder`s
        </div>

        <div className="col-start-5 col-span-2 text-right orderFooter">
          © 2022 White Glove, All Rights Reserved
        </div>
      </div>
    </>
  );
};

export default Footer;
