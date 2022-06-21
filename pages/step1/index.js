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
  const [houseTypeBlur, setHouseTypeBlur] = useState(false);
  const [fromBlur, setFromBlur] = useState(false);
  const [toBlur, setToBlur] = useState(false);
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
      fromState.value +
      toState.value
    );
  };
  const disabled = !houseType || !fromState || !toState;
  return (
    <form className="max-w-screen-xl m-auto py-10 mt-10 px-5 border">
      <div className="flex items-top  mb-5 justify-center">
        <label
          htmlFor="name"
          className="inline-block ml-20 mr-2 mt-2  text-gray-600"
        >
          I am shifting my
        </label>
        <div className="flex flex-col align-top px-4 py-2">
          <Select
            className="w-60 bg-white  border-gray-400 hover:border-gray-500  focus:outline-none focus:shadow-outline"
            defaultValue={houseType}
            onChange={setHouseType}
            options={houseTypeOptions}
            onBlur={() => setHouseTypeBlur(true)}
          />
          {houseTypeBlur && !houseType && (
            <p className="text-red-400 pt-2">Please select a house type.</p>
          )}
        </div>
        <label
          htmlFor="name"
          className="inline-block mt-2 w-10 mr-1 text-gray-600"
        >
          from
        </label>
        <div className="flex flex-col align-top px-4 py-2">
          <Select
            className="w-80 bg-white  border-gray-400 hover:border-gray-500 px-4 focus:outline-none focus:shadow-outline"
            defaultValue={fromState}
            onChange={setFromState}
            options={cityOptions}
            onBlur={() => setFromBlur(true)}
          />
          {fromBlur && !fromState && (
            <p className="text-red-400 ml-4 py-2">
              Please select a from location.
            </p>
          )}
        </div>
      </div>
      <div className="flex items-top mb-5  justify-center">
        <label
          htmlFor="name"
          className="inline-block w-10 ml-20 mr-2 mt-2  text-gray-600"
        >
          to
        </label>
        <div className="flex flex-col align-top px-4 py-2">
          <Select
            className="block appearance-none w-80 bg-white  border-gray-400 hover:border-gray-500 px-4  focus:outline-none focus:shadow-outline"
            defaultValue={toState}
            onChange={setToState}
            options={cityOptions}
            onBlur={() => setToBlur(true)}
          />
          {toBlur && !toState && (
            <p className="text-red-400 ml-4 py-2">
              Please select a to location.
            </p>
          )}
        </div>
        <label className="inline-block w-5 ml-5 mr-6 mt-2 text-gray-600 text-right">
          on
        </label>

        <div>
          <DatePicker
            selected={startDate}
            className="border-2 p-2"
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-8 font-semibold text-lg rounded shadow-lg  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          type="submit"
          onClick={handleSubmit}
          disabled={disabled}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step1;
