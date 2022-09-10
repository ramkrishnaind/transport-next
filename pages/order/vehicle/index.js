import React, { useEffect, useState } from "react";
import Card from "../Card";

const Vehicle = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Success!");
  };
  return (
    <form className="max-w-xs m-auto py-2 mt-5 px-4 border">
      <div className="grid space-x-1 grid-cols-1">
        <div className="px-4 py-4  ">
          <h3 className="text-2xl text-center text-gray-600">Vehicle</h3>
        </div>
      </div>
      <div className="grid space-x-1 md:grid-cols-1 mt-5">
        <Card image={"/images/bike-24.png"} item={"Bikes"} itemCount={10} />
      </div>
      <div className="grid space-x-1 md:grid-cols-1 mt-5">
        <Card image={"/images/car.png"} item={"Cars"} itemCount={10} />
      </div>
      <div className="grid space-x-1 md:grid-cols-1 mt-5">
        <Card image={"/images/cycle-24.png"} item={"Cycles"} itemCount={10} />
      </div>
    </form>
  );
};

export default Vehicle;
