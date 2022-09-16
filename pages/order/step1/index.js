import React, { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import TransportContext from "../../../context";
import { useRouter } from "next/router";
import { collectBasicInfo } from "../../../services/customer-api-service";

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
  const router = useRouter();
  const context = useContext(TransportContext);
  const { customerDetails, setBooking } = context;
  const [houseType, setHouseType] = useState(null);
  const [fromState, setFromState] = useState();
  const [toState, setToState] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [houseTypeBlur, setHouseTypeBlur] = useState(false);
  const [fromBlur, setFromBlur] = useState(false);
  const [toBlur, setToBlur] = useState(false);
  const [customerData, setCustomerData] = useState({});

  useEffect(() => {
    console.log("customerDetails in step 1 is", customerDetails);
    setCustomerData(customerDetails);
  }, [customerDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    let result = await callApi();
    if (result.data.status) {
      console.log("CollectBasicInfo result is", result.data);
      setBooking({ bookingId: result.data.bookingId });
      const formData = {
        shiftingFor: houseType.value,
        shiftingFrom: fromState.value,
        shiftingTo: toState.value,
        shiftingOn: startDate,
      };
      context.setStep1State(formData);
      console.log(formData);
      router.push("/order/step2");
    }
    console.log("step 1 result is", result);
  };
  const callApi = async () => {
    return await collectBasicInfo({
      customerId: customerData?._id,
      shiftingFor: houseType.value,
      shiftingFrom: fromState,
      shiftingTo: toState,
      shiftingOn: startDate,
    });
  };
  const disabled = !houseType || !fromState || !toState;

  
  const fromStateInputChangeHandler = (event) => {
    setFromState(event.target.value);
  };
  const toStateInputChangeHandler = (event) => {
    setToState(event.target.value);
  };
  return (
    <>
      <div className="b1">
        <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 bg-white rounded-lg h-16">
          <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
            Set up 0% complete
          </div>
          <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
            5 Step left: About 8 min
          </div>
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
          <form className="mt-10">

            <div className="grid gap-0  bg-white form_content details_form ">

              <div className="bg-white w-36 font-bold text-gray-600 detailquestions  shifting_text">
                I am shifting my
              </div>
              <div className="bg-white w-20 text-right font-bold text-gray-600 detailquestions">
                <Select
                  className="border-0 focuspt text-gray-600 placeholder-gray-400 outline-none select_java_step1 bg-white w-36 "
                  defaultValue={houseType}
                  onChange={setHouseType}
                  options={houseTypeOptions}
                  onBlur={() => setHouseTypeBlur(true)}
                />
              </div>
              <div className="bg-white w-6 font-bold text-gray-600 detailquestions ">
                from
              </div>
              <div className="  bg-white">
                <input
                  placeholder="Apartment Name/Locality"
                  className="bg-white  border-b-2  border-gray-400 focuspt text-gray-600 placeholder-gray-400 outline-none detailfill  pl-6 mr-7 w-72"
                  type="text"
                  autoFocus
                  required
                  onChange={fromStateInputChangeHandler}
                  defaultValue={fromState}
                  onBlur={() => setFromBlur(true)}
                />
              </div>
            </div>

            <div className="grid gap-0  bg-white  details_form pl-14">

              <div className="bg-white form_content ">
                <label
                  htmlFor="name"
                  className="bg-white  w-20 mr-2 text-right font-bold  detailquestions text-gray-600">
                  to
                </label>

                <input
                  placeholder="Apartment Name/Locality"
                  className="bg-white  border-b-2  border-gray-400 focuspt text-gray-600 placeholder-gray-400 outline-none detailfill  pl-6 mr-7 w-72"
                  type="text"
                  autoFocus
                  required
                  onChange={toStateInputChangeHandler}
                  defaultValue={toState}
                  onBlur={() => setFromBlur(true)}
                     />
              </div>

              <div className="bg-white form_content">
                <label
                  htmlFor="name"
                  className="bg-white  w-20 mr-2 text-right font-bold text-gray-600 detailquestions">
                  I am shifting on
                </label>
              </div>
              <div className="bg-white">
                <DatePicker
                  selected={startDate}
                  className="border-gray-400 focuspt text-gray-400 placeholder-gray-400 outline-none bg-white pb-1 pl-7 text-lg "
                  // className="border-2 p-2 bg-white"
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div className="bg-white"></div>
            </div>
            {/* button */}

            <div className="bg-white ">
              <button className=" px-10 py-4 button_1 rounded-m "
              type="submit"
                    onClick={handleSubmit}
                    //disabled={disabled}
              >Next</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Step1;
