import React from "react";

const Card = ({ image, item, itemCount }) => (
  <div className="flex px-2 py-4 bg-white border-2 border-gray-100 rounded shadow-md">
    <div className="mr-5"><img src={image} alt=""/></div>
    <div className="text-gray-500">{item}</div>
    <button className="text-gray-500 ml-auto ">{itemCount}</button>
  </div>
);

export default Card;
