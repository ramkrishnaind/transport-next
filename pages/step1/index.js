import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const houseTypeOptions = [
  { value: "1 BHK", label: "1 BHK" },
  { value: "2 BHK", label: "2 BHK" },
  { value: "3 BHK", label: "3 BHK" },
  { value: "3+ BHK", label: "3+ BHK" },
  { value: "duplex villa", label: "duplex villa" },
  { value: "vehicle", label: "vehicle" },
  { value: "few items", label: "few items" },
];

const cityOptions = [
  { value: "Bangalore", label: "Bangalore" },
  { value: "Chennai", label: "Chennai" },
  { value: "Delhi", label: "Delhi" },
  { value: "Pune", label: "Pune" },
];

const Step1 = () => {
  const [houseType, setHouseType] = useState(null);
  const [fromState, setFromState] = useState(null);
  const [toState, setToState] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    alert(
      "Success!" +
        houseType.value +
        startDate.getDate() +
        "/" +
        startDate.getMonth() +
        "/" +
        startDate.getFullYear() +
        toState.value +
        fromState.value
    );
  };
  return (
    <form class="max-w-screen-xl m-auto py-10 mt-10 px-5 border">
      <div class="flex items-center mb-5 justify-center items-center">
        <label for="name" class="inline-block ml-20 mr-2 text-gray-600">
          I am shifting my
        </label>
        <Select
          className="block appearance w-60 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
          defaultValue={houseType}
          onChange={setHouseType}
          options={houseTypeOptions}
        />

        <label for="name" class="inline-block w-10 mr-1 text-gray-600">
          from
        </label>
        <Select
          className="block appearance-none w-80 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
          defaultValue={fromState}
          onChange={setFromState}
          options={cityOptions}
        />
      </div>
      <div class="flex items-center mb-5  justify-center items-center">
        <label for="name" class="inline-block w-10 ml-20 mr-2 text-gray-600">
          to
        </label>

        <Select
          className="block appearance-none w-80 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
          defaultValue={toState}
          onChange={setToState}
          options={cityOptions}
        />
        <label class="inline-block w-5 ml-5 mr-6 text-gray-600 text-right">
          on
        </label>
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
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

export default Step1;
