import React, { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//import Select from "react-select";
import TransportContext from "../../../context";
import { useRouter } from "next/router";
import { collectBasicInfo } from "../../../services/customer-api-service";
import { Select, Button, Space } from "antd";
const Option = Select.Option;

import useAuth from "../../../hooks/useAuth";


const houseTypeOptions = [
  { value: "1 BHK", label: "1 BHK" },
  { value: "2 BHK", label: "2 BHK" },
  { value: "3 BHK", label: "3 BHK" },
  { value: "4 BHK", label: "4 BHK" },
  { value: "duplex", label: "Duplex" },
  { value: "villa", label: "Villa" },
  { value: "vehicle", label: "Vehicle" },
  { value: "few items", label: "Few items" },
];

const cityOptions = [
  { value: "Bangalore", label: "Bangalore" },
  { value: "Chennai", label: "Chennai" },
  { value: "Delhi", label: "Delhi" },
  { value: "Pune", label: "Pune" },
];

const Step1 = () => {
  const { customer, authenticated, bookingInfo, saveBooking } = useAuth();
  const router = useRouter();
  const context = useContext(TransportContext);
  const { customerDetails, setBooking } = context;
  const { localCustomer, setLocalCustomer } = useState();
  const [houseType, setHouseType] = useState();
  const [fromState, setFromState] = useState();
  const [toState, setToState] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [houseTypeBlur, setHouseTypeBlur] = useState(false);
  const [fromBlur, setFromBlur] = useState(false);
  const [toBlur, setToBlur] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(false);
  console.log("customer in step 1  is ", customer)

  useEffect(() => {
    console.log("customerDetails in step 1 is", customerDetails);
    console.log("customer from local storage in step 1 is")
    // if(customer == null ){
    //   console.log("expire session")
    //   router.push("/")
    // }
    setCustomerData(customerDetails);
  }, [customerDetails, customer]);

  const handleSubmit = async (event) => {
    console.log("houseType is ", houseType)
    console.log("startdate is ", startDate)
    setLoading(true);
    event.preventDefault(); // Prevent default submission
    let result = await callApi();
    if (result.data.status) {
      console.log("CollectBasicInfo result is", result.data);
      setBooking({ bookingId: result.data.bookingId });
      saveBooking({ bookingId: result.data.bookingId })
      const formData = {
        shiftingFor: houseType,
        shiftingFrom: fromState,
        shiftingTo: toState,
        shiftingOn: startDate,
      };

      console.log("bookingId is ", result.data.bookingId)
      console.log("houseType is ", houseType)
      console.log("fromState is ", fromState)
      console.log("toState is ", toState)
      console.log("startDate  ", startDate)

      context.setStep1State(formData);
      console.log(formData);
    
      router.push("/order/step2");
      setLoading(false);
    }
    console.log("step 1 result is", result);
  };

  const callApi = async () => {
    return await collectBasicInfo({
      customerId: customerData?._id ? customerData?._id : customer._id,
      shiftingFor: houseType,
      shiftingFrom: fromState,
      shiftingTo: toState,
      shiftingOn: startDate,
    });
  };

  const disabled = !houseType || !fromState || !toState;

  const houseHandler = (event) =>{
    setHouseType(event.target.value)
    console.log("house type", event.target.value)
  }
  const fromStateInputChangeHandler = (event) => {
    setFromState(event.target.value);
  };
  const toStateInputChangeHandler = (event) => {
    setToState(event.target.value);
  };
  return (
    <>
    <div className="orderBackground h-full">

    
      {/* <div className="p-5">.
        <Space direction="vertical" size={12}>
          <DatePicker bordered={false} />
        </Space>
      </div> */}


      <div>
        {/* completeBAR */}
        <div>
          <div className="hidden md:block lg:block xl:block">
            <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 md:mt-5 lg:mt-5 xl:mt-5  bg-white rounded-lg  h-14">
              <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
                Set up 0% complete
              </div>
              <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
                5 Step left • About 8 min
              </div>
            </div>
          </div>

          <div className=" flex flex-col items-center  gap-2.5 py-5  bg-white MoblieCompletePersentage md:hidden lg:hidden xl:hidden">
            <div className="completepersentage  font-semibold text-3xl completing_bar_text">Set up 0% complete</div>
            <div className="not-italic ">
              <span className=" font-semibold">5 Step left •</span>
              <span> About 8 min</span>
            </div>
          </div>
        </div>
      </div>


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
                <div className="grid1_step1">
                  <div className=" text-gray-600 detailquestions  shifting_text">
                    I am shifting my
                  </div>




                  <div className=" text-left   md:mt-0 lg:mt-0 xl:mt-0 ">
                  {/* <select
                  className="houseTypeOptions-select py-2 font-semibold"
                  defaultValue={houseType}
                  onChange={setHouseType}
                  options={houseTypeOptions}
                  onBlur={() => setHouseTypeBlur(true)}
                /> */}

                <select className="houseTypeOptions-select py-2 font-semibold" required onChange={houseHandler}>
                <option value="" disabled selected hidden className="step1_select_hidden_option">1 BHK</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                  <option value="duplex">Duplex</option>
                  <option value="villa">Villa</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="few items">Few items</option>
                </select>



                  </div>

                  <div className=" mt-5 md:mt-0 lg:mt-0 xl:mt-0 text-gray-600 detailquestions ">
                    from
                  </div>
                  <div className=" text-left  text-gray-600 ">
                  
                    <input placeholder="Apartment Name/Locality" bordered={false}
                      className="Locality-inputText py-2 font-semibold"
                      type="text"
                      autoFocus
                      required
                      onChange={fromStateInputChangeHandler}
                      defaultValue={fromState}
                      onBlur={() => setFromBlur(true)}

                    /> 


                  {/* <input type="text" className="Locality-inputText py-2 font-semibold" placeholder="Apartment Name/Locality" /> */}

                  </div>
                </div>

                <div className="grid2_step1">

                  <div className=" mt-5 md:mt-0 lg:mt-0 xl:mt-0 text-gray-600 detailquestions ">
                    to
                  </div>

                  <div className=" text-left  text-gray-600 ">

                    <input placeholder="Apartment Name/Locality" bordered={false}
                      className="Locality-inputText py-2 font-semibold"
                      type="text"
                      autoFocus
                      required
                      onChange={toStateInputChangeHandler}
                      defaultValue={toState}
                      onBlur={() => setFromBlur(true)}
                    />
                   
                   {/* <input type="text" className="Locality-inputText py-2 font-semibold" placeholder="Apartment Name/Locality" /> */}
                    
                    {/* <Select
                      className="border-0 focuspt text-green-600 placeholder-green-600 outline-none  border-b-2 widthSlect"
                      bordered={false}
                      defaultValue={fromFloorType}
                      onChange={setFromFloorType}
                      options={floorOptions}
                    /> */}
                  </div>
                  <div className=" text-gray-600 mt-5 md:mt-0 lg:mt-0 xl:mt-0 detailquestions  ">
                    on
                  </div>
                  <div className=" text-left  text-gray-600 ">

                    <DatePicker
                      selected={startDate}
                      bordered={false}
                      //className="bg-white  border-b-2  border-gray-400 focuspt text-gray-600 placeholder-gray-400 outline-none detailfill text-left w-330" s
                      className="Datepicker_Step1   py-2 font-semibold" placeholder="DD/MM/YYYY" 
                      onChange={(date) => setStartDate(date)}
                    />
                    {/* <input type="text" className="Datepicker_Step1   py-2 font-semibold" placeholder="DD/MM/YYYY" 
                     onChange={(date) => setStartDate(date)}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    /> */}

                  </div>
                </div>

              </div>
              <div className=" mt-5 mb-5">
                <Button className=" px-10 py-4 button_1 buttonMobile rounded-m "
                  type="submit"
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={disabled}
                >Next</Button>
              </div>
            </form>
          </div>
        </div>
      </div>






      {/* 
      <div className="ResponsiveMobile hidden">

        <div className=" flex flex-col items-center  gap-2.5 py-5  bg-white MoblieCompletePersentage">
          <div className="completepersentage  font-semibold text-3xl completing_bar_text">Set up 0% complete</div>
          <div className="not-italic ">
            <span className=" font-semibold">5 Step left •</span>
            <span> About 8 min•</span>
          </div>
        </div>



        <div className=" bg-white rounded-2xl mt-9 mx-4 ">
          <div className=" pt-10 pb-5">
            <img
              className="pl-8"
              src="/images/movingthings.png"
              itemProp="image"
              alt="Image"
            />
          </div>
          <div className="  grid gap-7  h-full">
            <form className="px-5">
              <div className="flex flex-col ">
                <div className="bg-white  text-gray-600 detailquestions  shifting_text">
                  I am shifting my
                </div>
                <div className=" text-left  text-gray-600 ">
                  <Select
                    className="border-0 focuspt text-green-600 placeholder-green-600 outline-none  border-b-2 "
                    defaultValue={houseType}
                    style={{
                      width: 330
                    }}
                    bordered={false}
                    onChange={setHouseType}
                    options={houseTypeOptions}
                    onBlur={() => setHouseTypeBlur(true)}
                  />
                </div>
                <div className="bg-white  mt-5 text-gray-600 detailquestions ">
                  from
                </div>
    <div className="  bg-white">
      <input
        placeholder="Apartment Name/Locality"
        className="bg-white  border-b-2  border-gray-input focuspt text-green-400 placeholder-gray-400 outline-none detailfill text-left w-330"
        type="text"
        autoFocus
        required
        onChange={fromStateInputChangeHandler}
        defaultValue={fromState}
        onBlur={() => setFromBlur(true)}
      />
    </div>
                <div className="bg-white mt-5  text-gray-600 detailquestions ">
                  to
                </div>

                <div className="bg-white  ">
                  <input
                    placeholder="Apartment Name/Locality"
                    className="bg-white  border-b-2  border-gray-input focuspt text-gray-600 placeholder-gray-400 outline-none detailfill text-left w-330"
                    type="text"
                    autoFocus
                    required
                    onChange={toStateInputChangeHandler}
                    defaultValue={toState}
                    onBlur={() => setFromBlur(true)}
                  />
                </div>
                <div className=" text-gray-600 mt-5 detailquestions ">
                  I am shifting on
                </div>

                <div className="bg-white">
                  <DatePicker
                    selected={startDate}
                    className="bg-white  border-b-2  border-gray-400 focuspt text-gray-600 placeholder-gray-400 outline-none detailfill text-left w-330" s
                    // className="border-2 p-2 bg-white"
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="bg-white mt-5 mb-5">
                  <Button className=" px-10 py-4 button_1 buttonMobile rounded-m "
                    type="submit"
                    onClick={handleSubmit}
                    loading={loading}
                  //disabled={disabled}
                  >Next</Button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div> */}


      {/* 


      <div className="b1 hidden ResponsiveTab ResponsiveLatop">
        <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 bg-white rounded-lg h-16">
          <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
            Set up 0% complete
          </div>
          <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
            5 Step left • About 8 min
          </div>
        </div>












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

            <div className="bg-white ">
              <Button className=" px-10 py-4 button_1 rounded-m "
                type="submit"
                onClick={handleSubmit}
                loading={loading}
              >Next</Button>
            </div>
          </form>
        </div>
      </div> */}













      {/* completeBAR */}
      {/* <div>
        <div className="hidden md:block lg:block xl:block">
          <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 md:mt-3 lg:mt-3 xl:mt-3  bg-white rounded-lg h-12">
            <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
              Set up 0% complete
            </div>
            <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
            5 Step left • About 8 min
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4  bg-white rounded-lg ">
          <div>
            <hr className="step2_line hidden md:block lg:block xl:block" />
          </div>
        </div>
        <div className=" flex flex-col items-center  gap-2.5 py-5  bg-white MoblieCompletePersentage md:hidden lg:hidden xl:hidden">
          <div className="completepersentage  font-semibold text-3xl completing_bar_text">Set up 0% complete</div>
          <div className="not-italic ">
            <span className=" font-semibold">5 Step left •</span>
            <span> About 8 min</span>
          </div>
        </div>
      </div> */}


      {/* FORM */}


      {/* 
      <div className="bg-white r1_Detail ">
        <div className=" bg-white rounded-2xl mt-9 md:mt-4 sm:mt-4 lg:mt-4 xl:mt-4 mx-4 lg:p-9 ">
          <div className=" pt-10 pb-5 md:pt-0 sm:pt-0 lg:pt-0 xl:pt-0">
            <img
              className="pl-8"
              src="/images/movingthings.png"
              itemProp="image"
              alt="012Image"
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
                    <Select
                      className="border-0 focuspt text-green-600 placeholder-green-600 outline-none  border-b-2 widthSlect"

                      bordered={false}
                      defaultValue={fromFloorType}
                      onChange={setFromFloorType}
                      options={floorOptions}
                    />
                  </div>
                  <div className=" mt-5 md:mt-0 lg:mt-0 xl:mt-0 text-gray-600 detailquestions ">
                    floor with service lift
                  </div>
                  <div className=" text-left  text-gray-600 ">
                    <Select
                      className="border-0 focuspt text-green-600 placeholder-green-600 outline-none widthSlect2 widthSlect border-b-2 "

                      bordered={false}
                      defaultValue={fromLift}
                      onChange={setFromLift}
                      options={liftOptions}
                    />
                  </div>
                </div>
                <div className="grid2_step2">
                  <div className=" mt-5 md:mt-0 lg:mt-0 xl:mt-0 text-gray-600 detailquestions ">
                    for shifting. I&apos;m moving to
                  </div>
                  <div className=" text-left  text-gray-600 ">
                    <Select
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
      {/* </div>
                  <div className=" text-gray-600 mt-5 md:mt-0 lg:mt-0 xl:mt-0 detailquestions ">
                    floor with service lift
                  </div>
                </div>
                <div className="grid3_step2">
                  <div className=" text-left  text-gray-600 ">
                    <Select
                      className="border-0 focuspt text-green-600 placeholder-green-600 outline-none widthSlect2 border-b-2 "

                      bordered={false}
                      defaultValue={toLift}
                      onChange={setToLift}
                      options={liftOptions}
                    />
                  </div>
                  <div className=" text-gray-600 mt-5 md:mt-0 lg:mt-0 xl:mt-0 detailquestions ">
                    for shifting.
                  </div>
                </div>
              </div>
              <div className=" mt-5 mb-5">
                <Button className=" px-10 py-4 button_1 buttonMobile rounded-m "
                  type="submit"
                  onClick={handleSubmit}
                  loading={loading}
                //disabled={disabled}
                >Next</Button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
</div>
    </>
  );
};

export default Step1;
