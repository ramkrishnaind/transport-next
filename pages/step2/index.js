import React, { useEffect, useState, useContext } from "react";
import data1 from "../../data/bikeList.json";
import Select from "react-select";
import TransportContext from "../../context";
import { useRouter } from "next/router";
import { liftAvailability } from "../../services/customer-api-service";

const data = data1;
//debugger;
console.log(data[0]["Item Name"]);
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
  { value: true, label: "available" },
  { value: false, label: "not available" },
];

const Step2 = () => {
  const router = useRouter();
  const context = useContext(TransportContext);
  const { booking, setBooking } = context;
  const { step1State, setStep1State} = context;
  const [fromFloorType, setFromFloorType] = useState(null);
  const [toFloorType, setToFloorType] = useState(null);
  const [fromLift, setFromLift] = useState(null);
  const [toLift, setToLift] = useState(null);
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    console.log("booking in step 2 is", booking);
    console.log("step1State is ", step1State);
    setBookingData(booking);
  }, [booking, step1State]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    let result = await callApi();
    if (result.data.status) {
      console.log("liftAvailability result is", result);
      setBooking(result.data);
      const formData = {
        currentFloor: fromFloorType.value,
        isLiftAvailableOnCurrentFloor: fromLift.value,
        movingOnFloor: toFloorType.value,
        isLiftAvailableOnMovingFloor: toLift.value,
      };
      context.setStep2State(formData);
      console.log(formData);
      router.push("/step3");
    }
    console.log("step 2 result is", result);
  };
  const callApi = async () => {
    return await liftAvailability({
      bookingId: booking?.bookingId,
      currentFloor: fromFloorType.value,
      isLiftAvailableOnCurrentFloor: fromLift.value,
      movingOnFloor: toFloorType.value,
      isLiftAvailableOnMovingFloor: toLift.value,
    });
  };
  const disabled = !(fromFloorType && fromLift && toFloorType && toLift);
  return (
    <form className="max-w-screen-xl m-auto py-10 mt-10 px-5 border">
      <div className="flex items-center mb-5 justify-center">
        <label htmlFor="name" className="inline-block mr-2 text-gray-600">
          I currently live on
        </label>
        <Select
          className="block appearance w-40 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
          defaultValue={fromFloorType}
          onChange={setFromFloorType}
          options={floorOptions}
        />

        <label htmlFor="name" className="inline-block w-50 mr-1 text-gray-600">
          floor with service lift
        </label>
        <Select
          className="block appearance-none w-60 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
          defaultValue={fromLift}
          onChange={setFromLift}
          options={liftOptions}
        />
        <label htmlFor="name" className="inline-block w-30 mr-1 text-gray-600">
          for shifting.
        </label>
      </div>
      <div className="flex items-center mb-5  justify-center">
        <label htmlFor="name" className="inline-block w-30 mr-2 text-gray-600">
          I&apos;m moving to
        </label>
        <Select
          className="block appearance w-40 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
          defaultValue={toFloorType}
          onChange={setToFloorType}
          options={floorOptions}
        />
        <label className="inline-block w-50 mr-1 text-gray-600 text-right">
          floor with service lift
        </label>
        <Select
          className="block appearance-none w-60 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
          defaultValue={toLift}
          onChange={setToLift}
          options={liftOptions}
        />
        <label htmlFor="name" className="inline-block w-30 mr-1 text-gray-600">
          for shifting.
        </label>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-8 font-semibold text-lg rounded shadow-lg disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
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

export default Step2;
