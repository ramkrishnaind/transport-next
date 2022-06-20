import React, { useEffect, useState } from "react";
import Card from "../Card";

const Step3 = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Success!");
  };
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
          NEXT
        </button>
      </div>
      <div className="flex justify-end mr-5  mb-5 text-sm ">
        <p>Do you know you can save this progress</p>
      </div>

      <form className="max-w-screen-xl m-auto py-10 px-5">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="px-4 py-4  ">
            <h3 className="text-2xl text-center text-gray-600">Furniture</h3>
          </div>
          <div className="px-4 py-4 ">
            <h3 className="text-2xl text-center text-gray-600">Electronic</h3>
          </div>
          <div className="px-4 py-4  ">
            <h3 className="text-2xl text-center text-gray-600">Vehicle</h3>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-5">
          <Card image={"images/sofa-24.png"} item={"Sofasets"} itemCount={0} />
          <Card image={"images/retro-tv-24.png"} item={"TVs"} itemCount={0} />
          <Card image={"images/bike-24.png"} item={"Bikes"} itemCount={0} />
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-5">
          <Card image={"images/table-24.png"} item={"Tables"} itemCount={0} />
          <Card
            image={"images/refrigerator-24.png"}
            item={"Refrigerators"}
            itemCount={0}
          />
          <Card image={"images/cars-24.png"} item={"Cars"} itemCount={0} />
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-5">
          <Card
            image={"images/office-chair-24.png"}
            item={"Chairs"}
            itemCount={0}
          />
          <Card
            image={"images/washing-machine-24.png"}
            item={"Washing Machines"}
            itemCount={0}
          />
          <Card image={"images/cycle-24.png"} item={"Cycles"} itemCount={0} />
        </div>
        <div className="grid gap-8  md:grid-cols-3 mt-5">
          <Card image={"images/bed-24.png"} item={"Cots"} itemCount={0} />
          <Card
            image={"images/microwave-24.png"}
            item={"Ovens"}
            itemCount={0}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-5">
          <Card
            image={"images/mattress-24.png"}
            item={"Mattress"}
            itemCount={0}
          />
          <Card
            image={"images/air-conditioner-24.png"}
            item={"Air Conditioners"}
            itemCount={0}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-5">
          <Card
            image={"images/bureau-24.png"}
            item={"Cupboards"}
            itemCount={0}
          />
          <Card
            image={"images/ceiling-fan-off-24.png"}
            item={"Fans/Coolers"}
            itemCount={0}
          />
        </div>
      </form>
    </div>
  );
};

export default Step3;
