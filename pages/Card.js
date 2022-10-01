import React from "react";
import Image from "next/image";
const Card = ({ image, item, itemCount, onClick, onDecrement }) => {
  console.log("itemCount", itemCount);
  return (
    <div
      onClick={onClick}
      className="flex relative justify-start align-top px-2 py-3  rounded  bg-slate-100 hover:shadow-md card"
    >
      <div className="mr-5 max-h-10 max-w-10" style={{ maxWidth: 30 }}>
        <img src={image} alt="" className="object-cover w-full h-full " />
      </div>
      <div className="text-gray-500">{item}</div>
      <div
        className="steps_detail_text_color  rounded-full w-7 h-7 text-center border border-sky-500 absolute top-2 mr-0.5 right-1 cursor-pointer "
        onClick={(e) => {
          e.stopPropagation();
          onDecrement();
        }}
      >
        -
      </div>
      <div className="text-gray-500 ml-auto mr-9">{itemCount}</div>
    </div>
  );
};

export default Card;
