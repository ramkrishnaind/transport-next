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
        <Card image={"images/carton-box-24.png"} item={"Carton boxes"} itemCount={0} />
        <Card image={"images/grinder-24.png"} item={"Wet grinders"} itemCount={0} />
        <Card image={"images/home-decorations-24.png"} item={"Painting/frames"} itemCount={0} />
        <Card image={"images/swings-24.png"} item={"Swings"} itemCount={0} />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card image={"images/sterilization-24.png"} item={"Water drums"} itemCount={0} />
        <Card image={"images/water-cooler-24.png"} item={"Water purifiers"} itemCount={0} />
        <Card image={"images/cookery-24.png"} item={"Cockery sets"} itemCount={0} />
        <Card
          image={"images/cyclist-24.png"}
          item={"Excercise cycles"}
          itemCount={0}
        />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card image={"images/crib-24.png"} item={"Cribes"} itemCount={0} />
        <Card image={"images/carpet-cleaning-24.png"} item={"Vacum cleaners"} itemCount={0} />
        <Card image={"images/home-theater-24.png"} item={"Home theatres"} itemCount={0} />
        <Card image={"images/treadmill-24.png"} item={"Tread mils"} itemCount={0} />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card image={"images/cylinder-24.png"} item={"Lpg cylinders"} itemCount={0} />
        <Card image={"images/sponge-24.png"} item={"Dish washers"} itemCount={0} />
        <Card image={"images/home-decorations-24.png"} item={"Show pieces"} itemCount={0} />
        <Card image={"images/bicycle-trailer-24.png"} item={"Infant cycles"} itemCount={0} />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card
          image={"images/suitcase-24.png"}
          item={"Trunks/Suitcases"}
          itemCount={0}
        />
        <Card image={"images/desktop-24.png"} item={"Desktops"} itemCount={0} />
        <Card image={"images/bureau-24.png"} item={"Bar cabinets"} itemCount={0} />
        <Card
          image={"images/bigpotted-plant-24.png"}
          item={"Flower pot small"}
          itemCount={0}
        />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card
          image={"images/inverter-24.png"}
          item={"Inverter+batteries"}
          itemCount={0}
        />
        <Card image={"images/sewing-machine-24.png"} item={"Swing machines"} itemCount={0} />
        <Card image={"images/lamp-24.png"} item={"Lamps"} itemCount={0} />
        <Card
          image={"images/potted-plant-24.png"}
          item={"Flower pot large"}
          itemCount={0}
        />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <Card image={"images/kitchen-room-24.png"} item={"Kitchen racks"} itemCount={0} />
        <Card image={"images/cooker-24.png"} item={"Stoves"} itemCount={0} />
        <Card image={"images/temple-24.png"} item={"Temples"} itemCount={0} />
        <Card image={"images/bean-bag-24.png"} item={"Bean bags"} itemCount={0} />
      </div>
    </form>
    </div>
  );
};

export default Step5;
