import React, { useEffect, useState } from "react";
import Select from "react-select";

const Step3 = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Success!");
  };
  return (
    <form class="max-w-screen-xl m-auto py-10 mt-5 px-5 border">
      <div class="grid gap-8 space-x-1 lg:grid-cols-3">
        <div class="px-4 py-4  ">
          <h3 class="text-2xl text-center text-gray-600">Furniture</h3>
        </div>
        <div class="px-4 py-4 ">
          <h3 class="text-2xl text-center text-gray-600">Electronic</h3>
        </div>
        <div class="px-4 py-4  ">
          <h3 class="text-2xl text-center text-gray-600">Vehicle</h3>
        </div>
      </div>

      <div class="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
        <img  src="/assets/sofa-64.png"/>
          <p class="text-gray-500">Sofasets</p>
          <button class="text-gray-800">0</button>
        </div>
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">TVs</p>
          <button class="text-gray-800">0</button>
        </div>
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Bikes</p>
          <button class="text-gray-800">0</button>
        </div>
      </div>

      <div class="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Tables</p>
          <button class="text-gray-800">0</button>
        </div>
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Refrigerators</p>
          <button class="text-gray-800">0</button>
        </div>
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Cars</p>
          <button class="text-gray-800">0</button>
        </div>
      </div>

      <div class="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Chairs</p>
          <button class="text-gray-800">0</button>
        </div>
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Washing Machines</p>
          <button class="text-gray-800">0</button>
        </div>
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Cycles</p>
          <button class="text-gray-800">0</button>
        </div>
      </div>
      <div class="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Cots</p>
          <button class="text-gray-800">0</button>
        </div>
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Ovens</p>
          <button class="text-gray-800">0</button>
        </div>
      </div>

      <div class="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Mattress</p>
          <button class="text-gray-800">0</button>
        </div>
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Air Conditioners</p>
          <button class="text-gray-800">0</button>
        </div>
      </div>

      <div class="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Cupboards</p>
          <button class="text-gray-800">0</button>
        </div>
        <div class="flex flex-row space-x-3 px-2 py-4 bg-white border-1 border-gray-400 rounded justify-between shadow-lg">
          <p class="text-gray-500">Image</p>
          <p class="text-gray-500">Fans/Coolers</p>
          <button class="text-gray-800">0</button>
        </div>
      </div>
    </form>
  );
};

export default Step3;
