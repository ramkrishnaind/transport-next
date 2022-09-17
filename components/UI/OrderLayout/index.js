import React from "react";
import LeftNavigation from "../../LeftNavigation";
import Header from "../../Header/orderHeader";
import Footer from "../../Footer/orderFooter";
const index = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-1">
        <Header />
      </div>
      <div className="flex-1 h-full order_layout_bg">{props.children}</div>
      <div className="grid grid-cols-1 m-0">
        <Footer />
      </div>
    </div>
  );
};

export default index;
