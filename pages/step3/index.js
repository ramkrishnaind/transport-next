import React, { useEffect, useState } from "react";
import Select from "react-select";

const Step3 = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Success!");
  };
  return (
    <form className="max-w-screen-xl m-auto py-10 mt-5 px-5 border">
      <div className="grid gap-8 space-x-1 lg:grid-cols-3">
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

      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <img src="/assets/sofa-64.png" />
          <p className="text-gray-500">Sofasets</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">TVs</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Bikes</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Tables</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Refrigerators</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Cars</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Chairs</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Washing Machines</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Cycles</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>
      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Cots</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Ovens</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Mattress</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Air Conditioners</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Cupboards</p>
          <button className="text-gray-800">0</button>
        </div>
        <div className="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p className="text-gray-500">Image</p>
          <p className="text-gray-500">Fans/Coolers</p>
          <button className="text-gray-800">0</button>
        </div>
      </div>
    </form>
  );
};

export default Step3;
