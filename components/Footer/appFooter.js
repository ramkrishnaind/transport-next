import React from "react";

const Footer = () => {
  return (
    <>
      <div className="appFooter grid grid-flow-col grid-cols-6 pl-16 pr-16 pb-4 pt-4">
        <div className="col-start-1 col-span-2 ">
          Made with <span className="heartColor">❤</span> By Infinity Coder`s
        </div>

        <div className="col-start-5 col-span-2 text-right">
          © 2021 White Glove, All Rights Reserved
        </div>
      </div>
    </>
  );
};

export default Footer;
