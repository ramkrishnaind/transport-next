import React, { useEffect, useState, useContext } from "react";
import data1 from "../../../data/bikeList.json";
import Select from "react-select";
import TransportContext from "../../../context";
import { useRouter } from "next/router";
import { liftAvailability } from "../../../services/customer-api-service";

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
  const { step1State, setStep1State } = context;
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
        bookingId: booking?.bookingId,
        currentFloor: fromFloorType.value,
        isLiftAvailableOnCurrentFloor: fromLift.value,
        movingOnFloor: toFloorType.value,
        isLiftAvailableOnMovingFloor: toLift.value,
      };
      context.setStep2State(formData);
      console.log(formData);
      router.push("/order/step3");
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

    <>
      <div className="b1">

        <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 h-16 r4 bg-white rounded-lg ">
          <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">Set up 0% complete</div>
          <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">5 Step left: About 8 min</div>
        </div>

                                                                {/* DETAILS */}

        <div className="flex flex-col items-left p-0 gap-2.5 r1 top-36 bg-white r4 rounded-lg pl-12 container ">
          <div className="bg-white text-9xl pl-10">
            <img
              className="stepimage"
              src="/images/movingthings.jpeg"
              itemProp="image"
              alt="Image"
            />
          </div>
          <form>
            <div className="bg-white form_content">

              <label htmlFor="name" className="bg-white w-20 mr-2 text-right font-bold text-gray-600 detailquestions">I currently live on</label>
              <input type="text" id="name" name="name" placeholder="Floor"
                className="bg-white  border-b-2 border-gray-400  focuspt text-gray-600 placeholder-gray-400 outline-none w-28 bg-white detailfill pl-2"
              />
              <label htmlFor="name" className="bg-white  w-20 mr-2 text-right font-bold  detailquestions text-gray-600">floor with service lift</label>
              <input
                type="text" id="name" name="name" placeholder="Lift"
                className="bg-white  border-b-2  border-gray-400 focuspt text-gray-600 placeholder-gray-400 outline-none detailfill w-96 pl-6"
              />
            </div>


            <div className="bg-white form_content">

              <label htmlFor="name" className="bg-white  w-20 mr-2 text-right font-bold text-gray-600   detailquestions">for shifting. I&apos; m moving to</label>
              <input type="text" id="name" name="name" placeholder="Floor"
                className="bg-white  border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none w-96 detailfill pl-6" />

              <label htmlFor="name" className="bg-white  w-20 mr-2 text-right font-bold text-gray-600 detailquestions">floor with service lift</label>
            </div>
              <div className="bg-white">
                <input type="text" id="name" name="name" placeholder="lift"
                  className="bg-white  border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none w-24  detailfill w-52 pl-7" />
                <label htmlFor="name" className="bg-white  w-20 mr-2 text-right font-bold text-gray-600 detailquestions">for shifting.</label>
              </div>

                                                                  {/* button */}

            <div className="bg-white ">
              <button className=" px-10 py-4 button_1 rounded-m ">
                Next
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
    // <form className="max-w-screen-xl m-auto py-10 mt-10 px-5 border">
    //   <div className="flex items-center mb-5 justify-center">
    //     <label htmlFor="name" className="inline-block mr-2 text-gray-600">
    //       I currently live on
    //     </label>
    //     <Select
    //       className="block appearance w-40 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
    //       defaultValue={fromFloorType}
    //       onChange={setFromFloorType}
    //       options={floorOptions}
    //     />

    //     <label htmlFor="name" className="inline-block w-50 mr-1 text-gray-600">
    //       floor with service lift
    //     </label>
    //     <Select
    //       className="block appearance-none w-60 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
    //       defaultValue={fromLift}
    //       onChange={setFromLift}
    //       options={liftOptions}
    //     />
    //     <label htmlFor="name" className="inline-block w-30 mr-1 text-gray-600">
    //       for shifting.
    //     </label>
    //   </div>
    //   <div className="flex items-center mb-5  justify-center">
    //     <label htmlFor="name" className="inline-block w-30 mr-2 text-gray-600">
    //       I&apos;m moving to
    //     </label>
    //     <Select
    //       className="block appearance w-40 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
    //       defaultValue={toFloorType}
    //       onChange={setToFloorType}
    //       options={floorOptions}
    //     />
    //     <label className="inline-block w-50 mr-1 text-gray-600 text-right">
    //       floor with service lift
    //     </label>
    //     <Select
    //       className="block appearance-none w-60 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
    //       defaultValue={toLift}
    //       onChange={setToLift}
    //       options={liftOptions}
    //     />
    //     <label htmlFor="name" className="inline-block w-30 mr-1 text-gray-600">
    //       for shifting.
    //     </label>
    //   </div>
    //   <div className="flex justify-center items-center">
    //     <button
    //       className="mt-4 bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-8 font-semibold text-lg rounded shadow-lg disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
    //       type="submit"
    //       onClick={handleSubmit}
    //       disabled={disabled}
    //     >
    //       Next
    //     </button>
    //   </div>
    // </form>
  );
};

export default Step2;
