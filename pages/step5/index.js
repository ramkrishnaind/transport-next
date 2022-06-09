import React, { useEffect, useState } from "react";
import Card from "../Card";

const Step5 = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Success!");
  };
  return (
    <div>
        <div className="flex justify-end mr-5 mt-5 mb-2 space-x-5">
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
    <form className="max-w-screen-xl m-auto py-10 mt-5 px-5">
      <div className="grid gap-8 space-x-1 lg:grid-cols-4">
        <div className="px-4 py-4  ">
          <h3 className="text-2xl text-center text-gray-600">Utility</h3>
        </div>
        <div className="px-4 py-4 ">
          <h3 className="text-2xl text-center text-gray-600">
            Home Appliances
          </h3>
        </div>
        <div className="px-4 py-4  ">
          <h3 className="text-2xl text-center text-gray-600">
            Special Care Items
          </h3>
        </div>
        <div className="px-4 py-4  ">
          <h3 className="text-2xl text-center text-gray-600">
            Fun and Fitness
          </h3>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card image={"images/car.png"} item={"Carton boxes"} itemCount={0} />
        <Card image={"images/car.png"} item={"Wet grinders"} itemCount={0} />
        <Card image={"images/car.png"} item={"Painting/frames"} itemCount={0} />
        <Card image={"images/car.png"} item={"Swings"} itemCount={0} />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card image={"images/car.png"} item={"Water drums"} itemCount={0} />
        <Card image={"images/car.png"} item={"Water purifiers"} itemCount={0} />
        <Card image={"images/car.png"} item={"Cockery sets"} itemCount={0} />
        <Card
          image={"images/car.png"}
          item={"Excercise cycles"}
          itemCount={0}
        />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card image={"images/car.png"} item={"Cribes"} itemCount={0} />
        <Card image={"images/car.png"} item={"Vacum cleaners"} itemCount={0} />
        <Card image={"images/car.png"} item={"Home theatres"} itemCount={0} />
        <Card image={"images/car.png"} item={"Tread mils"} itemCount={0} />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card image={"images/car.png"} item={"Lpg cylinders"} itemCount={0} />
        <Card image={"images/car.png"} item={"Dish washers"} itemCount={0} />
        <Card image={"images/car.png"} item={"Show pieces"} itemCount={0} />
        <Card image={"images/car.png"} item={"Infant cycles"} itemCount={0} />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card
          image={"images/car.png"}
          item={"Trunks/Suitcases"}
          itemCount={0}
        />
        <Card image={"images/car.png"} item={"Desktops"} itemCount={0} />
        <Card image={"images/car.png"} item={"Bar cabinets"} itemCount={0} />
        <Card
          image={"images/car.png"}
          item={"Flower pot small"}
          itemCount={0}
        />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card
          image={"images/car.png"}
          item={"Inverter+batteries"}
          itemCount={0}
        />
        <Card image={"images/car.png"} item={"Swing machines"} itemCount={0} />
        <Card image={"images/car.png"} item={"Lamps"} itemCount={0} />
        <Card
          image={"images/car.png"}
          item={"Flower pot large"}
          itemCount={0}
        />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card image={"images/car.png"} item={"Kitchen racks"} itemCount={0} />
        <Card image={"images/car.png"} item={"Stoves"} itemCount={0} />
        <Card image={"images/car.png"} item={"Temples"} itemCount={0} />
        <Card image={"images/car.png"} item={"Bean bags"} itemCount={0} />
      </div>
    </form>
    </div>
  );
};

export default Step5;
