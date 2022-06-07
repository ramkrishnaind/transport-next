import React, { useEffect, useState } from "react";

const FewItems = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Success!");
  };
  return (
    <form className="max-w-screen-xl m-auto py-10 mt-5 px-5 border">
      <div className="grid gap-8 space-x-1 lg:grid-cols-4">
        <div className="px-4 py-4  ">
          <h3 className="text-2xl text-center text-gray-600">Utility</h3>
        </div>
        <div className="px-4 py-4 ">
          <h3 className="text-2xl text-center text-gray-600">Home Appliances</h3>
        </div>
        <div className="px-4 py-4  ">
          <h3 className="text-2xl text-center text-gray-600">Special Care Items</h3>
        </div>
        <div className="px-4 py-4  ">
          <h3 className="text-2xl text-center text-gray-600">Fun and Fitness</h3>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <img src="/assets/sofa-64.png" />
          <p className="text-gray-500">Carton boxes</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Wet grinders</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Painting/frames</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Swings</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Water drums</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Water purifiers</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Cockery sets</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Excercise cycles</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Cribes</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Vacum cleaners</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Home theatres</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Tread mils</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Lpg cylinders</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Dish washers</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Show pieces</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Infant cycles</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Trunks/Suitcases</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Desktops</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Bar cabinets</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Flower pot small</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Inverter+batteries</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Swing machines</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Lamps</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Flower pot large</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-4 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Kitchen racks</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Stoves</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Temples</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Bean bags</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>
    </form>
  );
};

export default FewItems;
