import React, { useEffect, useState, useContext } from "react";
import data1 from "../../../data/bikeList.json";
import Select from "react-select";
import TransportContext from "../../../context";
import { Button } from "antd";
import { useRouter } from "next/router";
import { liftAvailability } from "../../../services/customer-api-service";
const { Option } = Select;
import useAuth from "../../../hooks/useAuth";

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
  { value: true, label: "Available" },
  { value: false, label: "Not available" },
];

const Step2 = () => {
  const { bookingInfo, saveBooking, customer } = useAuth();
  const router = useRouter();
  const context = useContext(TransportContext);
  const { booking, setBooking } = context;
  const { step1State, setStep1State } = context;
  const [fromFloorType, setFromFloorType] = useState();
  const [toFloorType, setToFloorType] = useState();
  const [fromLift, setFromLift] = useState(true);
  const [toLift, setToLift] = useState(true);
  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("booking in step 2 is", booking);
    console.log("step1State is ", step1State);
    console.log("booking from local storage in step 2 is",customer, bookingInfo);
    setBookingData(booking);
  }, [booking, step1State, bookingInfo, customer]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    console.log("fromFloorType is -", fromFloorType);
    console.log("fromLift is -", fromLift);
    console.log("toFloorType is -", toFloorType);
    console.log("toLift is -", toLift);

    let result = await callApi();
    if (result.data.status) {
      console.log(" result is", result);
      setBooking(result.data);
      const formData = {
        bookingId: booking?.bookingId,
        currentFloor: fromFloorType,
        isLiftAvailableOnCurrentFloor: fromLift,
        movingOnFloor: toFloorType,
        isLiftAvailableOnMovingFloor: toLift,
      };
      context.setStep2State(formData);
      console.log(formData);
      saveBooking({ ...bookingInfo,
        step2:formData
      });
      router.push("/order/step3");
    }
    console.log("step 2 result is", result);
  };
  const callApi = async () => {
    console.log("fromFloorType is -", fromFloorType);
    return await liftAvailability({
      bookingId: booking?.bookingId,
      currentFloor: fromFloorType,
      isLiftAvailableOnCurrentFloor: fromLift,
      movingOnFloor: toFloorType,
      isLiftAvailableOnMovingFloor: toLift,
    });
  };

  const fromFloorChangeHandler = (event) => {
    setFromFloorType(event.target.value);
  };

  const toFloorChangeHandler = (event) => {
    setToFloorType(event.target.value);
  };

  const fromLiftChangeHandler = (event) => {
    setFromLift(event.target.value);
  };
  const toLiftChangeHandler = (event) => {
    setToLift(event.target.value);
  };

  const disabled = !(fromFloorType && fromLift && toFloorType && toLift);
  return (
    <>
      {/* completeBAR */}
      <div>
        <div className="hidden md:block lg:block xl:block">
          <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 md:mt-3 lg:mt-3 xl:mt-3  bg-white rounded-lg h-12">
            <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
              Set up 20% complete
            </div>
            <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
              4 Step left • About 7 min
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4  bg-white rounded-lg ">
          <div>
            <hr className="step2-line hidden md:block lg:block xl:block" />
          </div>
        </div>
        <div className=" flex flex-col items-center  gap-2.5 py-5  bg-white MoblieCompletePersentage md:hidden lg:hidden xl:hidden">
          <div className="completepersentage  font-semibold text-3xl completing_bar_text">
            Set up 20% complete
          </div>
          <div className="not-italic ">
            <span className=" font-semibold">4 Step left •</span>
            <span> About 7 min</span>
          </div>
        </div>
      </div>

      {/* FORM */}

      <div className="bg-white r1_Detail ">
        <div className=" bg-white rounded-2xl mt-9 md:mt-4 sm:mt-4 lg:mt-4 xl:mt-4 mx-4 lg:p-9 ">
          <div className=" pt-10 pb-5 md:pt-0 sm:pt-0 lg:pt-0 xl:pt-0">
            <img
              className="pl-8"
              src="/images/movingthings.png"
              itemProp="image"
              alt="Image"
            />
          </div>
          <div className="grid gap-7  h-full">
            <form className="px-5">
              <div className="flex flex-col  ">
                <div className="grid1_step2">
                  <div className=" text-gray-600 detailquestions  shifting_text">
                    I currently live in
                  </div>
                  <div className=" text-left  text-gray-600 md:mt-0 lg:mt-0 xl:mt-0 ">
                    {/* <Select
                      className="houseTypeOptions-select py-2 font-semibold"
                      defaultValue={fromFloorType}
                      onChange={setFromFloorType}
                      options={floorOptions}
                    /> */}

                    {/* <Select
                      className="border-0 focuspt text-green-600 placeholder-green-600 outline-none  border-b-2 widthSlect"

                      bordered={false}
                      defaultValue={fromFloorType}
                      onChange={setFromFloorType}
                      options={floorOptions}
                    /> */}

                    <select
                      className="houseTypeOptions-select py-2 font-semibold"
                      required
                      onChange={fromFloorChangeHandler}
                    >
                      <option value="" disabled selected hidden className="step1_select_hidden_option">1st</option>
                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                      <option value="3rd">3rd</option>
                      <option value="4th">4th</option>
                      <option value="5th">5th</option>
                      <option value="6th">6th</option>
                      <option value="7th">7th</option>
                      <option value="8th">8th</option>
                      <option value="9th">9th</option>
                      <option value="10th">10th</option>
                      <option value="11th">11th</option>
                      <option value="12th">12th</option>
                    </select>
                  </div>
                  <div className=" mt-5 md:mt-0 lg:mt-0 xl:mt-0 text-gray-600 detailquestions ">
                    floor with service lift
                  </div>
                  <div className=" text-left  text-gray-600 ">
                    {/* <Select
                      className="block appearance-none w-60 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
                      defaultValue={fromLift}
                      onChange={setFromLift}
                      options={liftOptions}
                    /> */}
                    <select
                      className="liftOptions-select py-2 font-semibold"
                      required
                      onChange={fromLiftChangeHandler}
                    >
                      <option value="" disabled selected hidden className="step1_select_hidden_option">Available</option>
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>

                    {/* <Select
                      className="border-0 focuspt text-green-600 placeholder-green-600 outline-none widthSlect2 widthSlect border-b-2 "
                      bordered={false}
                      defaultValue={fromLift}
                      onChange={setFromLift}
                      options={liftOptions}
                    />*/}
                  </div>
                </div>
                <div className="grid2_step2">
                  <div className=" mt-5 md:mt-0 lg:mt-0 xl:mt-0 text-gray-600 detailquestions ">
                    for shifting. I&apos;m moving to
                  </div>
                  <div className=" text-left  text-gray-600 ">
                    {/* <Select
                      className="block appearance w-40 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
                      defaultValue={toFloorType}
                      onChange={setToFloorType}
                      options={floorOptions}
                    /> */}
                    <select
                      className="houseTypeOptions-select py-2 font-semibold"
                      required
                      onChange={toFloorChangeHandler}
                    >
                      <option value="" disabled selected hidden className="step1_select_hidden_option">1st</option>
                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                      <option value="3rd">3rd</option>
                      <option value="4th">4th</option>
                      <option value="5th">5th</option>
                      <option value="6th">6th</option>
                      <option value="7th">7th</option>
                      <option value="8th">8th</option>
                      <option value="9th">9th</option>
                      <option value="10th">10th</option>
                      <option value="11th">11th</option>
                      <option value="12th">12th</option>
                    </select>

                    {/* <Select
                      className="border-0 focuspt text-green-600 placeholder-green-600 outline-none  border-b-2 widthSlect "
                      bordered={false}
                      defaultValue={toFloorType}
                      onChange={setToFloorType}
                      options={floorOptions}
                    /> */}

                    {/* <Select
                      className="border-0 focuspt text-green-600 placeholder-green-600 outline-none  border-b-2 widthSlect"
                      bordered={false}
                      defaultValue={fromFloorType}
                      onChange={setFromFloorType}
                      options={floorOptions}
                    /> */}
                  </div>
                  <div className=" text-gray-600 mt-5 md:mt-0 lg:mt-0 xl:mt-0 detailquestions ">
                    floor with service lift
                  </div>
                </div>
                <div className="grid3_step2">
                  <div className=" text-left  text-gray-600 ">
                    {/* <Select
                      className="block appearance-none w-60 bg-white  border-gray-400 hover:border-gray-500 px-4 py-2 focus:outline-none focus:shadow-outline"
                      defaultValue={toLift}
                      onChange={setToLift}
                      options={liftOptions}
                    /> */}
                    <select
                      className="liftOptions-select py-2 font-semibold"
                      required
                      onChange={toLiftChangeHandler}
                    >
                      <option value="" disabled selected hidden className="step1_select_hidden_option">Available</option>
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>

                    {/* <Select
                        className="border-0 focuspt text-green-600 placeholder-green-600 outline-none widthSlect2 border-b-2 "

                        bordered={false}
                        defaultValue={toLift}
                        onChange={setToLift}
                        options={liftOptions}
                      /> */}
                  </div>
                  <div className=" text-gray-600 mt-5 md:mt-0 lg:mt-0 xl:mt-0 detailquestions ">
                    for shifting.
                  </div>
                </div>
              </div>
              <div className=" mt-5 mb-5 flex flex-row gap-2">
                <Button
                  className=" px-5 py-4  buttonMobile_grey rounded-m "
                  type="submit"
                  onClick={() => router.push("/order/step1")}
                  loading={loading}
                  //disabled={disabled}
                >
                  Back
                </Button>
                <Button
                  className=" px-5 py-4  buttonMobile2 rounded-m "
                  type="submit"
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={disabled}
                >
                  Next
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
    // <div className="b1">

    //   <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 h-16 r4 bg-white rounded-lg ">
    //     <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">Set up 20% complete</div>
    //     <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">4 Step left • About 7 min</div>
    //   </div>

    //   {/* DETAILS */}

    //   <div className="flex flex-col items-left p-0 gap-2.5 r1 top-36 bg-white r4 rounded-lg pl-12 container ">
    //     <div className="bg-white text-9xl pl-10">
    //       <img
    //         className="stepimage"
    //         src="/images/movingthings.jpeg"
    //         itemProp="image"
    //         alt="Image"
    //       />
    //     </div>
    //     <form>
    //       <div className="grid step2grid1 bg-white form_content wrapper">

    //         <div className="bg-white w-20 mr-2 text-right font-bold text-gray-600 detailquestions whitespace-nowrap">
    //           I currently live on
    //         </div>

    //         <div className="step2_container1">
    //           <Select
    //             className="block w-40 bg-white  border-gray-400 hover:border-gray-500 px-4  focus:outline-none focus:shadow-outline"
    //             defaultValue={fromFloorType}
    //             onChange={setFromFloorType}
    //             options={floorOptions}
    //           />
    //         </div>

    //         <div className="whitespace-nowrap bg-white  w-20 pr-44  text-right font-bold  detailquestions text-gray-600">
    //           floor with service lift
    //         </div>

    //         <div className=" ">
    //           <Select
    //             className="block appearance-none w-60 bg-white  border-gray-400 hover:border-gray-500 focus:outline-none focus:shadow-outline"
    //             defaultValue={fromLift}
    //             onChange={setFromLift}
    //             options={liftOptions}
    //           />
    //         </div>

    //       </div>

    //       {/* <div className="bg-white form_content">
    //     </div> */}

    //   {/* <div className="grid step2grid1 bg-white form_content"> */}
    //       <div className="grid step2grid2 gap-0 wrapper">
    //         <div className="pl-4_5">
    //           <label htmlFor="name" className="bg-white  w-20 mr-2 text-right font-bold text-gray-600   detailquestions">for shifting. I&apos;m moving to</label>
    //         </div>
    //         <div>
    //           <Select
    //             className="block appearance w-40 bg-white  border-gray-400 hover:border-gray-500 focus:outline-none focus:shadow-outline"
    // defaultValue={toFloorType}
    // onChange={setToFloorType}
    // options={floorOptions}
    //           />
    //         </div>
    //         <div className="bg-white  w-20 mr-2 text-right font-bold text-gray-600 detailquestions whitespace-nowrap">
    //           floor with service lift
    //         </div>
    //       </div>
    //       <div className="grid step2grid3 gap-0 mt-6 wrapper" >
    //         <div className="ml-4">
    //           <Select
    //             className="block appearance-none w-60 bg-white  border-gray-400 hover:border-gray-500 focus:outline-none focus:shadow-outline "
    // defaultValue={toLift}
    // onChange={setToLift}
    // options={liftOptions}
    //           />
    //         </div>
    //         <div className="whitespace-nowrap bg-white  w-20 mr-2 text-right font-bold text-gray-600 detailquestions">
    //           for shifting.
    //         </div>
    //       </div>

    //       {/* button */}

    //       <div className="bg-white ">
    //         <button className=" px-10 py-4 button_2 rounded-m"
    // onClick={handleSubmit}
    // loading={loading}
    //         >
    //           Next
    //         </button>
    //       </div>

    //     </form>
    //   </div>
    // </div>

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
