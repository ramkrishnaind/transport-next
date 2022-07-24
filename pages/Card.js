import React from "react";
import Image from "next/image";
const Card = ({ image, item, itemCount, onClick, onDecrement }) => {
  console.log("itemCount", itemCount);
  return (
    <div
      onClick={onClick}
      className="flex relative justify-start align-top px-2 py-4 mb-2 bg-white border-2 border-gray-200 rounded shadow-md hover:bg-slate-100 hover:font-bold"
    >
      <div className="mr-5" style={{ maxWidth: 30 }}>
        <img src={image} alt="" />
      </div>
      <div className="text-gray-500">{item}</div>
      <div
        className="text-gray-700 font-bold rounded-full w-7 h-7 text-center border border-sky-500 absolute top-1 right-1 cursor-pointer"
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
