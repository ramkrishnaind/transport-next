import React, { useEffect, useState } from "react";
import ItemCard from "../ItemCard";
import Card from "../Card";

const Step4 = () => {
  return (
    <div>
      <div className="flex justify-end mr-5 mt-5 mb-2 space-x-5">
        <button
          className="bg-gray-100 hover:bg-blue-400 text-white-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
          type="submit"
        >
          SKIP
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
          type="submit"
        >
          PROCEED
        </button>
      </div>
      <div className="flex justify-end mr-5  mb-5 text-sm ">
        <p>Do you know you can save this progress</p>
      </div>
      <div className=" max-w-screen-xl m-auto py-10 mt-5 px-5 border">
        <div className="grid space-x-1 lg:grid-cols-12">
          <ItemCard image={"images/sofa50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/table50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/chair50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/bed50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/mattress50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/cupboard50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/tv50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/fridge50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/washingmachine50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/microwave50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/air-conditioner50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/ceiling-fan-off50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/bike50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/cars50.png"} itemCount={"0/1"} />
          <ItemCard image={"images/bicycle50.png"} itemCount={"0/1"} />
        </div>
      </div>
    </div>
  );
};

export default Step4;
