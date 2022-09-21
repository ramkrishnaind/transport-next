import React from "react";
import Image from "next/image";
const Card = ({ image, item, itemCount, onClick, onDecrement }) => {
  console.log("itemCount", itemCount);
  return (
    <div
      onClick={onClick}
      className="flex relative justify-start align-top px-2 py-2 step3_card border-2 border-gray-200 rounded  hover:bg-slate-100 hover:shadow-md "
    >
      <div className="mr-5 max-h-10 max-w-10" style={{ maxWidth: 30 }}>
        <img src={image} alt="" className="object-cover w-full h-full " />
      </div>
      <div className="text-gray-500">{item}</div>
      <div
        className="text-gray-700 font-bold rounded-full w-7 h-7 text-center border border-sky-500 absolute top-1 right-1 cursor-pointer mt-0.5"
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
