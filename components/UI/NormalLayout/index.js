import React from "react";
import LeftNavigation from "../../LeftNavigation";
import Header from "../../Header";
import Footer from "../../Footer";
const index = (props) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-12">
        <Header />
      </div>
      <div className="grid grid-cols-12" style={{ minHeight: "80vh" }}>
        <div className="bg-red-100">{props.children}</div>
      </div>
      <div className="grid grid-cols-12">
        <Footer />
      </div>
    </div>
  );
};

export default index;
