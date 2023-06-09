import React, { useEffect, useState, useContext, useCallback } from "react";
import Card from "../../Card";
import TransportContext from "../../../context";
import { useRouter } from "next/router";
import { getBookingItem } from "../../../services/customer-api-service";
import { Timeline, Collapse, Modal } from "antd";
const { Panel } = Collapse;
const Step7 = () => {
  const router = useRouter();
  // const [name, setName] = useState("Test");
  // const [orderId, setOrderId] = useState("");
  // const [moveType, setMoveType] = useState("");
  // const [mobileNo, setMobileNo] = useState("");
  // const [emailId, setEmailId] = useState("");
  // const [orderCreated, setOrderCreated] = useState("₹ 0/CREATED");
  // const [formAddress, setFromAddress] = useState("");
  const [allRecords, setAllRecords] = useState();
  // const [toAddress, setToAddress] = useState("");
  // const [date, setDate] = useState("");
  // const [fromLift, setFromLift] = useState("");
  // const [toLift, setToLift] = useState("");
  // const [currentFloor, setCurrentFloor] = useState("");
  // const [movingOnFloor, setmovingOnFloor] = useState("");
  const context = useContext(TransportContext);
  const { step1State } = context;
  const { step2State } = context;
  const { step3State } = context;
  const { step4State } = context;
  const { step5State } = context;
  console.log("context.step1State", step1State);
  console.log("context.step2State", step2State);
  console.log("context.step3State", step3State);
  console.log("context.step4State", step4State);
  console.log("context.step5State", step5State);
  const [cft, setCft] = useState();

  const [isModalOpenBook, setIsModalOpenBook] = useState(false);
  const showModalBook = () => {
    setIsModalOpenBook(true);
  };
  const handleOkBook = () => {
    setIsModalOpenBook(false);
  };
  const handleCancelBook = () => {
    setIsModalOpenBook(false);
  };

  // const { customerDetails } = context;
  // const [customerData, setCustomerData] = useState({});
  // const [state, setState] = useState([]);
  // const [items, setItems] = useState([]);
  // const [state5, setState5] = useState([]);
  let objToAppend = [];
  // const [dayName, setDayName] = useState("");
  // const [day, setDay] = useState("");
  // const [month, setMonth] = useState("");

  // todo - mover planner and manager name comes from where
  const [moverPlanner] = useState("Charmee Kothari");
  const [moverPlannerNo] = useState("08047094008");
  const [moveManager] = useState("Not Assigned");

  useEffect(() => {
    // debugger;
    const getData = async () => {
      let results;
      try {
        results = await getBookingItem(step2State?.bookingId);
        console.log("results------>", results);
        // debugger;
        if (results?.data?.customerData) {
          const arr = [];
          results?.data?.customerData.forEach((item) => {
            const transformedStep3 = item?.step3
              ? transformStep3Object(item?.step3)
              : null;
            const transformedStep5 = item?.step5
              ? transformStep5Object(item?.step5)
              : null;
            if (item?.step3) {
              debugger;
            }
            arr.push({
              step3: transformedStep3,
              step3State: item?.step3 || {},
              step5: transformedStep5,
              step4Items: item?.step4 || [],
              step5State: item?.step5 || {},
              bookingId: item.booking_id,
              ...getStep1AndStep2(item),
            });
          });
          setAllRecords(arr);
          console.log(arr);
        }
      } catch (error) {}
    };
    getData();
  }, []);

  useEffect(() => {
    if (!step4State) return;
    setCft(step4State["cft"]);
    console.log("cftdata7 - ", cft);
  }, [step4State]);

  const transformStep3Object = (step3Object) => {
    if (!step3Object) return;
    const keys = Object.keys(step3Object);
    const arr = [];
    const arrayItems = [];
    keys.forEach((k) => {
      step3Object[k].forEach((i) => {
        i.category = k;
        if (i.count < 1) return;
        arr.push(i);
        const arryStateCount = [...Array(i.count).keys()];
        arryStateCount.forEach((it) => {
          let objFound = objToAppend.find((itemToFind) => {
            // if (itemToFind.key === "TVS") {
            //
            // }
            return itemToFind.key === i.title;
          });
          objFound = getCopiedObject(objFound);
          //
          if (objFound) {
            arrayItems.push({
              ...objFound,
              index: it,
              currentIndex: -1,
              completed: false,
            });
          }
        });
      });
    });
    // if (arrayItems && arrayItems.length > 0) setItems(arrayItems);
    return arr;
  };
  const transformStep5Object = (step5Object) => {
    if (!step5Object) return;
    const keys = Object.keys(step5Object);
    const arr = [];
    const arrayItems = [];
    keys.forEach((k) => {
      step5Object[k].forEach((i) => {
        i.category = k;
        if (i.count < 1) return;
        arr.push(i);
        const arryStateCount = [...Array(i.count).keys()];
        arryStateCount.forEach((it) => {
          let objFound = objToAppend.find((itemToFind) => {
            // if (itemToFind.key === "TVS") {
            //
            // }
            return itemToFind.key === i.title;
          });
          objFound = getCopiedObject(objFound);
          //
          if (objFound) {
            arrayItems.push({
              ...objFound,
              index: it,
              currentIndex: -1,
              completed: false,
            });
          }
        });
      });
    });
    // if (arrayItems && arrayItems.length > 0) setItems(arrayItems);
    // setState5(arr);
    return arr;
  };
  const getStep1AndStep2 = (record) => {
    debugger;
    const {
      shiftingFrom,
      shiftingTo,
      shiftingFor,
      shiftingOn,
      bookingId,
      currentFloor,
      isLiftAvailableOnCurrentFloor,
      isLiftAvailableOnMovingFloor,
      movingOnFloor,
      cft,
    } = record;
    const fromAddress = shiftingFrom;
    const toAddress = shiftingTo;
    const moveType = shiftingFor;

    const months = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const d = new Date(shiftingOn);
    const year = d.getFullYear();
    const date = d.getDate();
    const monthName = months[d.getMonth()];
    const dayName = days[d.getDay()];
    const formattedDate = `${dayName}, ${date} ${monthName} ${year}`;
    const data = {
      fromAddress,
      toAddress,
      moveType,
      date: formattedDate,
      day: date,
      dayName,
      month: monthName + " " + year,
    };

    if (!step2State) return;
    data.orderId = bookingId;
    data.currentFloor = currentFloor;
    data.isLiftAvailableOnCurrentFloor = isLiftAvailableOnCurrentFloor;
    data.isLiftAvailableOnMovingFloor = isLiftAvailableOnMovingFloor;
    data.movingOnFloor = movingOnFloor;
    data.emailId = record?.customerId?.email;
    data.name = record?.customerId?.fullName;
    data.mobileNo = record?.customerId?.mobile;
    data.cft = cft;
    return data;
  };
  // useEffect(() => {
  //   if (!step1State) return;
  //   setFromAddress(step1State["shiftingFrom"]);
  //   setToAddress(step1State["shiftingTo"]);
  //   setMoveType(step1State["shiftingFor"]);
  //   //setDate(step1State["shiftingOn"])
  //   const months = {
  //     0: "January",
  //     1: "February",
  //     2: "March",
  //     3: "April",
  //     4: "May",
  //     5: "June",
  //     6: "July",
  //     7: "August",
  //     8: "September",
  //     9: "October",
  //     10: "November",
  //     11: "December",
  //   };
  //   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //   const d = step1State["shiftingOn"];
  //   const year = d.getFullYear();
  //   const date = d.getDate();
  //   const monthName = months[d.getMonth()];
  //   const dayName = days[d.getDay()];
  //   const formattedDate = `${dayName}, ${date} ${monthName} ${year}`;
  //   setDate(formattedDate);
  //   setDay(date);
  //   setDayName(dayName);
  //   setMonth(monthName + " " + year);

  //   if (!step2State) return;
  //   setOrderId(step2State["bookingId"]);
  //   setCurrentFloor(step2State["currentFloor"]);
  //   setFromLift(step2State["isLiftAvailableOnCurrentFloor"]);
  //   setToLift(step2State["isLiftAvailableOnMovingFloor"]);
  //   setmovingOnFloor(step2State["movingOnFloor"]);

  //   if (!customerDetails) return;
  //   setEmailId(customerDetails["email"]);
  //   setName(customerDetails["fullName"]);
  //   setMobileNo(customerDetails["mobile"]);
  // }, [step1State, step2State, customerDetails]);

  const getCopiedObject = useCallback((objFound) => {
    //
    const objValues = [];
    if (objFound?.value?.length > 0) {
      objFound?.value.forEach((i) => {
        objValues.push(getCopiedObject(i));
      });
      return { ...objFound, value: [...objValues] };
    } else {
      return { ...objFound };
    }
  }, []);

  // useEffect(() => {
  //   //debugger;
  //   setState(transformStep3Object(step3State));
  // }, [step3State]);

  // useEffect(() => {
  //   //debugger;

  // }, [step5State, getCopiedObject]);
  // state.forEach((s) => {
  //   console.log("state = " + s.title);
  //   console.log("state = " + s.image);
  //   console.log("state = " + s.count);
  //   console.log("state = " + s.category);
  // });

  // console.log("items------", items);
  // console.log("state------", state);

  const clickHandler = (key, item) => {};
  const decrementHandler = (key, item) => {};

  const handleNewOrder = async (event) => {
    event.preventDefault();
    router.push("/order/step1");
  };

  const handleEditInventory = async (event, record) => {
    event.preventDefault();
    context.step2State = { ...context.step2State, bookingId: record.bookingId };
    context.step3State = { ...record.step3State };
    context.step4State = { ...record.step4State };
    context.step5State = { ...record.step5State };
    getData(record.bookingId);
    router.push("/order/step3");
  };

  const getData = async (bookingId) => {
    let results;
    console.log("bookingInfo?.bookingId is ", bookingId)
    try {
      results = await getBookingItem(bookingId);
      if (results?.data?.data) {
        console.log("api response is ", results)
        let currentBooking = results?.data?.data;
        console.log("current booking is ", currentBooking)
        context.step3State = currentBooking?.step3 || {};
        context.step4State = currentBooking?.step4 || [];
        context.step5State = currentBooking?.step5 || {};
      }
    } catch (error) { console.log('Error is', error) }
  };

  return (
    <>
      {/* completeBAR */}
      {/* 
      <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 md:mt-3 lg:mt-3 xl:mt-3  bg-white rounded-lg h-12">
        <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
          Set up 0% complete
        </div>
        <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
          5 Step left • About 8 min
        </div>
      </div> */}

      <div className="fontColor_4E4E4E">
        {allRecords?.map((record, index) => {
          return (
            <div key={index}>
              <div>
                <div className="flex flex-col m-5 p-4 rounded-lg gap-4 bg-white step7SummarylBox1  ">
                  <div className="thankyou_step7">
                    <img
                      className="inline w-8 pr-2"
                      src="/images/sentiment_satisfied.png"
                      itemProp="image"
                      alt="Image"
                    />
                    Thank you {record.name}!
                  </div>
                  <div className="thankyou2_step7">
                    The information you provided has been sent to our top secret
                    super wise quote calculating monks. We will get you perfect
                    tailor made quote in a day.
                  </div>
                </div>
              </div>

              <div className="step7RespoMain">
                <div className="step7RespoContainer1">
                  <div className="step7RespoItem">
                    <div className="flex flex-col m-5 p-2 top-2 rounded-lg gap-4 bg-white step7ProfileBox1">
                      <div className="step7_grid1 ">
                        <div className="step7_container1 p-3 my-auto">
                          <div className="ellipse_step7"></div>
                        </div>
                        <div className="step7_container2 my-5 py-2 rounded-lg gap-1 bg-white ">
                          <div className=" font-bold">{record.name}</div>
                          <div>{record.emailId}</div>
                          <div>{record.mobileNo}</div>
                        </div>
                      </div>
                    </div>

                    <div className="step7buttonBox1 step7_buttonbox pl-5">
                      <div className="flex justify-between ">
                        <div
                          className="current font-semibold 
                  py-3 text-xl"
                        >
                          Current Order
                        </div>
                        <div>
                          <button
                            className=" new_order_step7 py-3 px-10 text-sm rounded"
                            type="submit"
                            onClick={handleNewOrder}
                          >
                            + NEW ORDER
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="step7SummarylBox2 m-5 rounded-lg bg-white ">
                      <div className="flex flex-row justify-between p-4 rounded-xl">
                        <div className="step7_grid2 justify-start">
                          <div className="step7_grid2item1 px-2">
                            {record.day}
                          </div>
                          <div className="flex flex-col my-auto px-2 pr-2">
                            <div className=" font-bold">{record.dayName}</div>
                            <div>{record.month}</div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 text-md">
                          <div className=" font-semibold">Order Id</div>
                          <div className="OrderID_text_step7 font-semibold">
                            {record.bookingId}
                          </div>
                        </div>
                      </div>

                      <hr className="mx-auto step7SummarylBox2_hr" />
                      <div>
                        <div className="flex flex-row justify-between p-3">
                          <div className="step7Summarybox_item1">
                            <div>from</div>
                            <div className="font-semibold">
                              {record.fromAddress}
                            </div>
                          </div>
                          <div>
                            <div>to</div>
                            <div className="font-semibold">
                              {record.toAddress}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between p-3">
                          <div>
                            <div>Move Planner:</div>
                            <div className="font-semibold">Sumit</div>
                            <div className="font-semibold">09289911353</div>
                          </div>
                          <div className="step7Summarybox_item2">
                            <div>Move Manager:</div>
                            <div className="font-semibold">Not Assigned</div>
                          </div>
                        </div>
                        <hr className="mx-auto step7SummarylBox2_hr" />
                        <div className="flex flex-row p-3 justify-between">
                          <div>
                            <button
                              className=" greyOwn hover:bg-green-100 rounded-md  py-3 px-5 font-semibold text-sm"
                              type="submit"
                              onClick={showModalBook}
                            >
                              Book Now
                            </button>
                          </div>

                          <Modal
                            title="Thank you for showing interest in our Services"
                            open={isModalOpenBook}
                            onOk={handleOkBook}
                            onCancel={handleCancelBook}
                          >
                            <p>
                              Please contact customer care for booking and
                              schedule your move
                            </p>
                            <a href="tel:180012097225">
                              <p>Line-1 180012097225</p>
                            </a>
                            <a href="tel:180012006683">
                              <p>Linw-2 180012006683</p>
                            </a>
                          </Modal>  

                          <div>
                             <button
                              className="text-blue-500 py-2 px-4 font-semibold text-base rounded "
                              type="submit"
                              onClick={(e) => handleEditInventory(e, record)}
                            >
                              <img
                                className="inline px-4"
                                src="/images/edit_blue.svg"
                                itemProp="image"
                                alt="Image"
                              />
                              Edit Inventory
                            </button> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="step7ProfileBox1 m-5 rounded-lg bg-white pb-1 step7_2container">
                    <div className="flex flex-row justify-between p-3">
                      <div>
                        <div className="font-bold">Order Id</div>
                        <div className="OrderID_text_step7 font-bold">
                          {record.bookingId}
                        </div>
                      </div>
                      <div>
                        <div>Date & Time slot</div>
                        <div className=" font-semibold">
                          {record.dayName} {record.day} {record.month}
                        </div>
                      </div>
                    </div>
                    <hr className="mx-auto step7SummarylBox2_hr" />
                    <div className="p-3">
                      Your order is being evaluated by us
                    </div>
                    <div className="p-3">CFT {record.cft}</div>
                    {/* {cft > 0 ? <div className="p-3">CFT  {cft}</div> : ""} */}
                    <div className="p-3">
                      <Timeline>
                        <Timeline.Item>
                          <div className="py-1">From</div>
                          <div className="py-1 font-semibold">
                            {record.fromAddress}
                          </div>
                          <div className="py-1 greencolor">
                            {record.isLiftAvailableOnCurrentFloor
                              ? "Lift Available"
                              : "Not Available"}
                          </div>
                        </Timeline.Item>
                        <Timeline.Item>
                          <div className="py-1">To</div>
                          <div className="py-1 font-semibold">
                            {record.toAddress}
                          </div>
                          <div className="py-1 greencolor">
                            {record.isLiftAvailableOnMovingFloor
                              ? "Lift Available"
                              : "Lift Not Available"}
                          </div>
                        </Timeline.Item>
                      </Timeline>
                    </div>
                    <div className="px-5">
                      <hr className="mx-auto step7SummarylBox2_hr" />
                    </div>
                    <div className="flex flex-row justify-between p-4 mt-6">
                      <div>
                        <div>What to move</div>
                        <div className="font-semibold">{record.moveType}</div>
                      </div>
                      <div>
                        <div>Preferred Choice</div>
                        <div className="font-semibold">-</div>
                      </div>
                    </div>
                    <div className="m-2 font-semibold p-2 text-xl ">
                      Your selected items
                    </div>
                    <div className="w-5/6">
                      <form className="max-w-xl m-auto py-10 px-5">
                        <div className="flex flex-col gap-8 md:grid-cols-3 mt-5">
                          {record.step3?.map((st, ind1) => {
                            console.log("item", st);
                            return (
                              <Card
                                image={st.image}
                                key={ind1}
                                item={st.title}
                                itemCount={st.count}
                                onDecrement={decrementHandler.bind(
                                  null,
                                  "",
                                  st
                                )}
                                onClick={clickHandler.bind(null, "", st)}
                              />
                            );
                          })}
                          {record.step5 &&
                            record.step5?.map((st, ind2) => {
                              console.log("item", st);
                              return (
                                <Card
                                  image={st.image}
                                  key={ind2}
                                  item={st.title}
                                  itemCount={st.count}
                                  onDecrement={decrementHandler.bind(
                                    null,
                                    "",
                                    st
                                  )}
                                  onClick={clickHandler.bind(null, "", st)}
                                />
                              );
                            })}
                        </div>
                      </form>
                    </div>
                    {/* <div className=" rounded-lg border m-2">
                <Collapse defaultActiveKey={['1']} ghost>
                  <Panel header="Furniture " key="1">
                    <div className="m-2">
                      <div className="p-3">
                        <div className=" font-semibold">2X Sofa set</div>
                        <div className="pl-5">• 1 X 1 seater leather leciner sofa set</div>
                        <div className="pl-5">• 1 x 1 sofa set with storage</div>
                      </div>
                      <div className="p-3">
                        <div className=" font-semibold">3x Table</div>
                        <div className="pl-5">• 1 x 3 seater foldable metal top dining table</div>
                        <div className="pl-5">• 1 x Dismantlable dressing table</div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div>
              <div className=" rounded-lg border m-2">
                <Collapse defaultActiveKey={['1']} ghost>
                  <Panel header="Furniture " key="1">
                    <div className="m-2">
                      <div className="p-3">
                        <div className=" font-semibold">2X Sofa set</div>
                        <div className="pl-5">• 1 X 1 seater leather leciner sofa set</div>
                        <div className="pl-5">• 1 x 1 sofa set with storage</div>
                      </div>
                      <div className="p-3">
                        <div className=" font-semibold">3x Table</div>
                        <div className="pl-5">• 1 x 3 seater foldable metal top dining table</div>
                        <div className="pl-5">• 1 x Dismantlable dressing table</div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div>
              <div className=" rounded-lg border m-2">
                <Collapse defaultActiveKey={['1']} ghost>
                  <Panel header="Furniture " key="1">
                    <div className="m-2">
                      <div className="p-3">
                        <div className=" font-semibold">2X Sofa set</div>
                        <div className="pl-5">• 1 X 1 seater leather leciner sofa set</div>
                        <div className="pl-5">• 1 x 1 sofa set with storage</div>
                      </div>
                      <div className="p-3">
                        <div className=" font-semibold">3x Table</div>
                        <div className="pl-5">• 1 x 3 seater foldable metal top dining table</div>
                        <div className="pl-5">• 1 x Dismantlable dressing table</div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/*       
      <div>
        {allRecords?.map((record, index) => {
          return (
            <div className="flex m-10 space-x-5" key={index}>
              <div className="h-80 w-2/5 rounded shadow-lg">
                <div className="flex ">
                  <div className="w-1/3 h-80">
                    <div className="h-32 border-t-2 border-l-2 border-b-2 bg-gray-100 rounded shadow-lg">
                      <div className="flex mt-10 justify-center space-x-2">
                        <div className=" text-xl font-bold justify-center">
                          {record.bookingId}
                        </div>
                      </div>
                    </div>
                    <div className="h-48 w-full  bg-blue-400 ">
                      <div className="flex  justify-center ">
                        <div className="font-bold text-xl text-gray-100 mt-7">
                          {record.day}
                        </div>
                      </div>
                      <div className="flex mt-5 justify-center">
                        <div className="font-bold text-xl text-gray-100">
                          {record.dayName}
                        </div>
                      </div>

                      <div className="flex mt-5 justify-center ">
                        <div className="font-bold text-xl text-gray-100">
                          {record.month}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-2/3 h-80 border-2 rounded shadow-lg text-sm">
                    <div className="flex ml-3 mr-10 mt-1 space-x-2 font-medium text-sm">
                      <div className="flex- 1 w-1/2">From</div>
                    </div>
                    <div className="flex ml-3 mr-10 space-x-2 text-sm">
                      <div className="flex- 1 w-3/5">{record.fromAddress}</div>
                    </div>

                    <div className="flex ml-3 mr-10 mt-3 space-x-2 font-medium text-sm">
                      <div className="flex- 1 w-1/2">To</div>
                    </div>
                    <div className="flex ml-3 mr-10 space-x-2">
                      <div className="flex- 1 w-3/5">{record.toAddress}</div>
                    </div>
                    <div className="flex ml-3 mr-10 mt-5 space-x-2 font-medium text-sm">
                      <div className="flex- 1 w-1/2">Mover Planner</div>
                      <div className="flex- 1 w-1/2 ">Mover Manager</div>
                    </div>
                    <div className="flex ml-3 mr-10 space-x-2 text-sm">
                      <div className="flex- 1 w-1/2">{moverPlanner}</div>
                      <div className="flex- 1 w-1/2  ">{moveManager}</div>
                    </div>
                    <div className="flex ml-3 mr-10 space-x-2">
                      <div className="flex- 1 w-1/2">{moverPlannerNo}</div>
                    </div>
                    <div className="flex mr-5 mt-10 justify-end text-sm">
                      Your order is being evaluated by us
                    </div>

                    <div className="flex justify-end mr-5 mt-5 space-x-5">
                      <button
                        className="bg-gray-400 hover:bg-blue-400 text-green-100 border py-2 px-4 font-semibold text-sm rounded shadow-lg"
                        type="submit"
                      >
                        VIEW DETAILS
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-4 font-semibold text-sm rounded shadow-lg"
                        type="submit"
                        onClick={(e) => handleEditInventory(e, record)}
                      >
                        EDIT INVENTORY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-screen w-2/5 text-gray-500 border-2 rounded shadow-lg overflow-y-auto">
                <div className="flex ml-10 mr-10 mt-5 space-x-2 font-medium text-md">
                  <div className="flex- 1 w-1/2">Order Id</div>
                  <div className="flex- 1 w-1/2 ">Date Timeslot</div>
                </div>
                <div className="flex ml-10 mr-10 mt-1 space-x-2">
                  <div className="flex- 1 w-1/2">{record.orderId}</div>
                  <div className="flex- 1 w-1/2  ">{record.date}</div>
                </div>
                <div className="flex ml-10 mr-10 mt-5 space-x-2 font-medium text-md">
                  <div className="flex- 1 w-1/2">From Address</div>
                  <div className="flex- 1 w-1/2 ">To Address</div>
                </div>
                <div className="flex ml-10 mr-10 mt-1 space-x-2">
                  <div className="flex- 1 w-1/2">{record.fromAddress}</div>
                  <div className="flex- 1 w-1/2  ">{record.toAddress}</div>
                </div>

                <div className="flex ml-10 mr-10 mt-10 space-x-2 font-medium text-md">
                  <div className="flex- 1 w-1/2">Floor</div>
                  <div className="flex- 1 w-1/2 ">Floor</div>
                </div>
                <div className="flex ml-10 mr-10 mt-1 space-x-2">
                  <div className="flex- 1 w-1/2">{record.currentFloor}</div>
                  <div className="flex- 1 w-1/2  ">{record.movingOnFloor}</div>
                </div>
                <div className="flex ml-10 mr-10 mt-1 space-x-2">
                  <div className="flex- 1 w-1/2">
                    {record.isLiftAvailableOnCurrentFloor}
                  </div>
                  <div className="flex- 1 w-1/2  ">
                    {record.isLiftAvailableOnMovingFloor}
                  </div>
                </div>
                <div className="flex ml-10 mr-10 mt-5 space-x-2 font-medium text-md">
                  <div className="flex- 1 w-1/2">Preferred Choice</div>
                  <div className="flex- 1 w-1/2 ">What to Move</div>
                </div>
                <div className="flex ml-10 mr-10 mt-1 space-x-2">
                  <div className="flex- 1 w-1/2">{ }</div>
                  <div className="flex- 1 w-1/2  ">{record.moveType}</div>
                </div>

                <div className="w-5/6">
                  <form className="max-w-xl m-auto py-10 px-5">
                    <div className="flex flex-col gap-8 md:grid-cols-3 mt-5">
                      {record.step3?.map((st, ind1) => {
                        console.log("item", st);
                        return (
                          <Card
                            image={st.image}
                            key={ind1}
                            item={st.title}
                            itemCount={st.count}
                            onDecrement={decrementHandler.bind(null, "", st)}
                            onClick={clickHandler.bind(null, "", st)}
                          />
                        );
                      })}
                      {record.step5 &&
                        record.step5?.map((st, ind2) => {
                          console.log("item", st);
                          return (
                            <Card
                              image={st.image}
                              key={ind2}
                              item={st.title}
                              itemCount={st.count}
                              onDecrement={decrementHandler.bind(null, "", st)}
                              onClick={clickHandler.bind(null, "", st)}
                            />
                          );
                        })}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </>
  );
  // <div>
  //   <div className="flex justify-end">
  //     <button
  //       className="m-5 bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-10 text-sm rounded shadow-lg"
  //       type="submit"
  //       onClick={handleNewOrder}
  //     >
  //       + NEW ORDER
  //     </button>
  //   </div>
  //   {allRecords?.map((record, index) => {
  //     return (
  //       <div className="flex m-10 space-x-5" key={index}>
  //         <div className="h-80 w-2/5 rounded shadow-lg">
  //           <div className="flex ">
  //             <div className="w-1/3 h-80">
  //               <div className="h-32 border-t-2 border-l-2 border-b-2 bg-gray-100 rounded shadow-lg">
  //                 <div className="flex mt-10 justify-center space-x-2">
  //                   <div className=" text-xl font-bold justify-center">
  //                     {record.bookingId}
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="h-48 w-full  bg-blue-400 ">
  //                 <div className="flex  justify-center ">
  //                   <div className="font-bold text-xl text-gray-100 mt-7">
  //                     {record.day}
  //                   </div>
  //                 </div>
  //                 <div className="flex mt-5 justify-center">
  //                   <div className="font-bold text-xl text-gray-100">
  //                     {record.dayName}
  //                   </div>
  //                 </div>

  //                 <div className="flex mt-5 justify-center ">
  //                   <div className="font-bold text-xl text-gray-100">
  //                     {record.month}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="w-2/3 h-80 border-2 rounded shadow-lg text-sm">
  //               <div className="flex ml-3 mr-10 mt-1 space-x-2 font-medium text-sm">
  //                 <div className="flex- 1 w-1/2">From</div>
  //               </div>
  //               <div className="flex ml-3 mr-10 space-x-2 text-sm">
  //                 <div className="flex- 1 w-3/5">{record.fromAddress}</div>
  //               </div>

  //               <div className="flex ml-3 mr-10 mt-3 space-x-2 font-medium text-sm">
  //                 <div className="flex- 1 w-1/2">To</div>
  //               </div>
  //               <div className="flex ml-3 mr-10 space-x-2">
  //                 <div className="flex- 1 w-3/5">{record.toAddress}</div>
  //               </div>
  //               <div className="flex ml-3 mr-10 mt-5 space-x-2 font-medium text-sm">
  //                 <div className="flex- 1 w-1/2">Mover Planner</div>
  //                 <div className="flex- 1 w-1/2 ">Mover Manager</div>
  //               </div>
  //               <div className="flex ml-3 mr-10 space-x-2 text-sm">
  //                 <div className="flex- 1 w-1/2">{moverPlanner}</div>
  //                 <div className="flex- 1 w-1/2  ">{moveManager}</div>
  //               </div>
  //               <div className="flex ml-3 mr-10 space-x-2">
  //                 <div className="flex- 1 w-1/2">{moverPlannerNo}</div>
  //               </div>
  //               <div className="flex mr-5 mt-10 justify-end text-sm">
  //                 Your order is being evaluated by us
  //               </div>

  //               <div className="flex justify-end mr-5 mt-5 space-x-5">
  // <button
  //   className="bg-gray-400 hover:bg-blue-400 text-green-100 border py-2 px-4 font-semibold text-sm rounded shadow-lg"
  //   type="submit"
  // >
  //   VIEW DETAILS
  // </button>
  // <button
  //   className="bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-4 font-semibold text-sm rounded shadow-lg"
  //   type="submit"
  //   onClick={(e) => handleEditInventory(e, record)}
  // >
  //   EDIT INVENTORY
  // </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="h-screen w-2/5 text-gray-500 border-2 rounded shadow-lg overflow-y-auto">
  //           <div className="flex ml-10 mr-10 mt-5 space-x-2 font-medium text-md">
  //             <div className="flex- 1 w-1/2">Order Id</div>
  //             <div className="flex- 1 w-1/2 ">Date Timeslot</div>
  //           </div>
  //           <div className="flex ml-10 mr-10 mt-1 space-x-2">
  //             <div className="flex- 1 w-1/2">{record.orderId}</div>
  //             <div className="flex- 1 w-1/2  ">{record.date}</div>
  //           </div>
  //           <div className="flex ml-10 mr-10 mt-5 space-x-2 font-medium text-md">
  //             <div className="flex- 1 w-1/2">From Address</div>
  //             <div className="flex- 1 w-1/2 ">To Address</div>
  //           </div>
  //           <div className="flex ml-10 mr-10 mt-1 space-x-2">
  //             <div className="flex- 1 w-1/2">{record.fromAddress}</div>
  //             <div className="flex- 1 w-1/2  ">{record.toAddress}</div>
  //           </div>

  //           <div className="flex ml-10 mr-10 mt-10 space-x-2 font-medium text-md">
  //             <div className="flex- 1 w-1/2">Floor</div>
  //             <div className="flex- 1 w-1/2 ">Floor</div>
  //           </div>
  //           <div className="flex ml-10 mr-10 mt-1 space-x-2">
  //             <div className="flex- 1 w-1/2">{record.currentFloor}</div>
  //             <div className="flex- 1 w-1/2  ">{record.movingOnFloor}</div>
  //           </div>
  //           <div className="flex ml-10 mr-10 mt-1 space-x-2">
  //             <div className="flex- 1 w-1/2">
  //               {record.isLiftAvailableOnCurrentFloor}
  //             </div>
  //             <div className="flex- 1 w-1/2  ">
  //               {record.isLiftAvailableOnMovingFloor}
  //             </div>
  //           </div>
  //           <div className="flex ml-10 mr-10 mt-5 space-x-2 font-medium text-md">
  //             <div className="flex- 1 w-1/2">Preferred Choice</div>
  //             <div className="flex- 1 w-1/2 ">What to Move</div>
  //           </div>
  //           <div className="flex ml-10 mr-10 mt-1 space-x-2">
  //             <div className="flex- 1 w-1/2">{}</div>
  //             <div className="flex- 1 w-1/2  ">{record.moveType}</div>
  //           </div>

  // <div className="w-5/6">
  //   <form className="max-w-xl m-auto py-10 px-5">
  //     <div className="flex flex-col gap-8 md:grid-cols-3 mt-5">
  //       {record.step3?.map((st, ind1) => {
  //         console.log("item", st);
  //         return (
  //           <Card
  //             image={st.image}
  //             key={ind1}
  //             item={st.title}
  //             itemCount={st.count}
  //             onDecrement={decrementHandler.bind(null, "", st)}
  //             onClick={clickHandler.bind(null, "", st)}
  //           />
  //         );
  //       })}
  //       {record.step5 &&
  //         record.step5?.map((st, ind2) => {
  //           console.log("item", st);
  //           return (
  //             <Card
  //               image={st.image}
  //               key={ind2}
  //               item={st.title}
  //               itemCount={st.count}
  //               onDecrement={decrementHandler.bind(null, "", st)}
  //               onClick={clickHandler.bind(null, "", st)}
  //             />
  //           );
  //         })}
  //     </div>
  //   </form>
  // </div>
  //         </div>
  //       </div>
  //     );
  //   })}
  // </div>
};

export default Step7;
