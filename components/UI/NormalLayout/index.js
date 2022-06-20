import React from "react";
import LeftNavigation from "../../LeftNavigation";
import Header from "../../Header";
import Footer from "../../Footer";
const index = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-1">
        <Header />
      </div>
      <div className="flex-1">{props.children}</div>
      <div className="grid grid-cols-1 m-0">
        <Footer />
      </div>
    </div>
    // <div className="grid grid-cols-12">
    //   <div className="grid grid-cols-12">
    //     <Header />
    //   </div>
    //   <div className="grid grid-cols-12" style={{ minHeight: "80vh" }}>
    //     <div className="grid bg-red-100 grid-cols-12">{props.children}</div>
    //   </div>
    //   <div className="grid grid-cols-12">
    //     <Footer />
    //   </div>
    // </div>
  );
};

export default index;
