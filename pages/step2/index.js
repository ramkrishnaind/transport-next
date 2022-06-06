import React, { useEffect, useState } from "react";
import Select from "react-select";

const floorOptions = [
  { value: "1st", label: "1st" },
  { value: "2nd", label: "2nd" },
  { value: "3rd", label: "3rd" },
  { value: "4th", label: "4th" },
  { value: "5th", label: "5th" },
  { value: "6th", label: "6th" },
  { value: "7th", label: "7th" },
  { value: "8th", label: "8th" },
  { value: "9th", label: "9th" },
  { value: "10th", label: "10th" },
  { value: "11th", label: "11th" },
  { value: "12th", label: "12th" },
];

const liftOptions = [
  { value: "available", label: "available" },
  { value: "not available", label: "not available" },
];

const Step2 = () => {
  const [fromFloorType, setFromFloorType] = useState(null);
  const [toFloorType, setToFloorType] = useState(null);
  const [fromLift, setFromLift] = useState(null);
  const [toLift, setToLift] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    alert(
      "Success!" +
        fromFloorType.value +
        fromLift.value +
        toFloorType.value +
        toLift.value
    );
  };
  return (
    <form class="max-w-screen-xl m-auto py-10 mt-10 px-5 border">
      <div class="flex items-center mb-5 justify-center items-center">
        <label for="name" class="inline-block mr-2 text-gray-600">
          I currently live on
        </label>
        <Select
          className="block appearance w-40 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
          defaultValue={fromFloorType}
          onChange={setFromFloorType}
          options={floorOptions}
        />

        <label for="name" class="inline-block w-50 mr-1 text-gray-600">
          floor with service lift
        </label>
        <Select
          className="block appearance-none w-60 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
          defaultValue={fromLift}
          onChange={setFromLift}
          options={liftOptions}
        />
        <label for="name" class="inline-block w-30 mr-1 text-gray-600">
          for shifting.
        </label>
      </div>
      <div class="flex items-center mb-5  justify-center items-center">
        <label for="name" class="inline-block w-30 mr-2 text-gray-600">
          I'm moving to
        </label>
        <Select
          className="block appearance w-40 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
          defaultValue={toFloorType}
          onChange={setToFloorType}
          options={floorOptions}
        />
        <label class="inline-block w-50 mr-1 text-gray-600 text-right">
          floor with service lift
        </label>
        <Select
          className="block appearance-none w-60 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
          defaultValue={toLift}
          onChange={setToLift}
          options={liftOptions}
        />
        <label for="name" class="inline-block w-30 mr-1 text-gray-600">
          for shifting.
        </label>
      </div>
      <div class="flex justify-center items-center">
        <button
          class="mt-4 bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-4 font-semibold text-lg rounded"
          type="submit"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
