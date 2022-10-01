import React from "react";
import LeftNavigation from "../../LeftNavigation";
import Header from "../../Header/appHeader";
import Footer from "../../Footer/appFooter";
const index = (props) => {
  return (
    <div className="flex flex-col">
      <div className="grid">
        <Header />
      </div>
      <div
        className="grid grid-cols-12 flex-1"
        style={{ minHeight: "80vh" }}
      >
        <div className="bg-blue-100 col-span-2">
          <LeftNavigation />
        </div>
        <div className="layoutBG col-span-10 p-4">{props.children}</div>
      </div>
      <div className="grid">
        <Footer />
      </div>
    </div>
  );
};

export default index;
