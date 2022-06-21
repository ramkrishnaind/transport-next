import React from "react";

const ItemCard = ({ image, itemCount }) => (
  <div className="px-4 py-4 bg-white border-2 border-gray-200 justify-center rounded">
    <div className="px-3">
      <img src={image} alt="" />
    </div>
    <div className="px-5 mt-2 hover:bg-blue-100">
      <button className="text-gray-500 text-center">{itemCount}</button>
    </div>
  </div>
);

export default ItemCard;
