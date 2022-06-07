import React from "react";

const Card = ({ image, item, itemCount }) => (
  <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-2 border-gray-100 rounded justify-between shadow-md">
    <div><img src={image} alt=""/></div>
    <div className="text-gray-500">{item}</div>
    <button className="text-gray-500">{itemCount}</button>
  </div>
);

export default Card;
