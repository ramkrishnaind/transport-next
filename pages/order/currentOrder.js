import React, { useEffect, useState, useContext, useCallback } from "react";
import moment from 'moment';
import TransportContext from "../../context";
import { useRouter } from "next/router";
import { getBookingItem } from "../../services/customer-api-service";
import { Timeline, Collapse, Spin  } from 'antd';
import useAuth from "../../hooks/useAuth";
import _ from "lodash";
const { Panel } = Collapse;
const CurrentOrder = () => {
  const { bookingInfo, saveBooking, customer } = useAuth();
  const router = useRouter();
  const [allRecords, setAllRecords] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(TransportContext);
  const { step1State } = context;
  const { step2State } = context;
  const { step3State } = context;
  const { step5State } = context;
  const [currentBooking, setCurrentBooking] = useState({});
  let objToAppend = [];
  const [moverPlanner] = useState("Charmee Kothari");
  const [moverPlannerNo] = useState("08047094008");
  const [moveManager] = useState("Not Assigned");

  useEffect(() => {
    const getData = async () => {
      let results;
      try {
        results = await getBookingItem(bookingInfo?.bookingId);
      if (results?.data?.data) {
          setCurrentBooking(results?.data?.data)
          setIsLoading(false)
        }
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
              //debugger;
            }
            arr.push({
              step3: transformedStep3,
              step3State: item?.step3 || {},
              step5: transformedStep5,
              step4Items: item?.step4 || [],
              step5State: item?.step5 || {},
              bookingId: item.bookingId,
              ...getStep1AndStep2(item),
            });
          });
          setAllRecords(arr);
        }
      } catch (error) { }
    };
    getData();
  }, [bookingInfo, customer]);
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
    return arr;
  };
  const getStep1AndStep2 = (record) => {
    //debugger;
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
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
    return data;
  };
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


  const clickHandler = (key, item) => { };
  const decrementHandler = (key, item) => { };

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
    router.push("/order/step3");
  };
  const bookingSelectedItems = (details) => {
    let result;
    let groupedItems;
    if(details){
      let itemList = [];
      Object.keys(details.step4Object).forEach(function(key, index) {
        itemList.push(...details.step4Object[key] );
      });
      groupedItems = _.groupBy(itemList, item => item.category);
    }
    return (
      <>
      {Object.keys(groupedItems).map((key, i) => (
          <div className="collapse_grid_currentOrder">
          <div>
            <div className=" rounded-lg border m-2">
              <Collapse defaultActiveKey={[{i}]} ghost>
                <Panel header={key} key={i}>
                  {console.log("Hello in collapse ", groupedItems[key])}
                  <div className="m-2">
                  {
                    itemInfoFun(groupedItems[key])
                  }
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      ))}
      </>
    )
  }
  const itemInfoFun = (itemList) => {
    let groupedDetailsItems = _.groupBy(itemList, item => item.item);
        return (
          <>
            {Object.keys(groupedDetailsItems).map((keyName, index) => (
              <>
                <div className="p-3">
                  <div className=" font-semibold">{keyName}</div>
                  
                  {groupedDetailsItems[keyName]?.map((item, index) => {
                    return (
                      <>
                        <div className="pl-5">• {item.Action1 ? item.Action1 + " " : ""} 
                        {item.Action2 ? item.Action2 + " " : ""}
                        {item.Action3 ? item.Action3 + " " : ""}
                        {item.Action4 ? item.Action4 + " " : ""}
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            ))}
          </>
        )
  }
  return (
    <>
      {isLoading ? (<>
        <div className="flex justify-center items-center"><Spin size="large" /></div>
      </>) : (<>
        <div className="fontColor_4E4E4E">


        <div>
          <div className="flex flex-col m-5 p-4 rounded-lg gap-4 bg-white step7SummarylBox1  ">
            <div className="thankyou_step7"><img
              className="inline w-8 pr-2"
              src="/images/sentiment_satisfied.png"
              itemProp="image"
              alt="Image"
            />
              Thank you {customer?.customerName}!
            </div>
            <div className="thankyou2_step7">The information you provided has been sent to our top secret super wise quote calculating monks. We will get you perfect tailor made quote in a day.</div>
          </div>
        </div>

        <div className="step7RespoMain">
          <div className="step7RespoContainer1">


            <div className="step7RespoItem">


              <div className="flex flex-col m-5 p-2 top-2 rounded-lg gap-4 bg-white step7ProfileBox1">
                <div className="step7_grid1 ">
                  <div className="step7_container1 p-3 my-auto">
                    <div className="ellipse_step7">
                    </div>
                  </div>
                  <div className="step7_container2 my-5 py-2 rounded-lg gap-1 bg-white ">
                    <div className=" font-bold">{customer?.customerName}</div>
                    <div>{customer?.email}</div>
                    <div>{customer?.mobile}</div>
                  </div>
                </div>
              </div>

              <div className="step7buttonBox1 step7_buttonbox pl-5">
                <div className="flex justify-between ">
                  <div className="current font-semibold 
                  py-3 text-xl">Current Order</div>
                  <div>
                    <button
                      className=" new_order_step7 py-3 px-10 text-sm rounded"
                      type="submit"
                      onClick={handleNewOrder}>
                      + NEW ORDER
                    </button>
                  </div>
                </div>
              </div>
              <div className="step7SummarylBox2 m-5 rounded-lg bg-white ">


                <div className="flex flex-row justify-between p-4 rounded-xl">

                  <div className="step7_grid2 justify-start">

                    <div className="step7_grid2item1 px-2" >
                      {moment(currentBooking.shiftingOn).format('DD')}
                    </div>
                    <div className="flex flex-col my-auto px-2 pr-2">
                      <div className=" font-bold">{moment(currentBooking.shiftingOn).format('dddd')}</div>
                      <div>{moment(currentBooking.shiftingOn).format('MMMM')}, {moment(currentBooking.shiftingOn).format('YYYY')}</div>
                    </div>

                  </div>
                  
                  <div className="flex flex-col gap-3 text-md">
                    <div className=" font-semibold">Order Id</div>
                    <div className="OrderID_text_step7 font-semibold">{currentBooking.booking_id}</div>
                  </div>

                </div>


                <hr className="mx-auto step7SummarylBox2_hr" />
                <div>
                  <div className="flex flex-row justify-between p-3">
                    <div className="step7Summarybox_item1">
                      <div>From</div>
                      <div className="font-semibold">{currentBooking.shiftingFrom}</div>
                    </div>
                    <div>
                      <div>To</div>
                      <div className="font-semibold">{currentBooking.shiftingTo}</div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between p-3">
                    <div>
                      <div>Mover Planner:</div>
                      <div className="font-semibold">{currentBooking.moverPlanner ? currentBooking.moverPlanner : "Not Assigned"}</div>
                    </div>
                    <div className="step7Summarybox_item2">
                      <div>Mover Manager:</div>
                      <div className="font-semibold">{currentBooking.moverManager ? currentBooking.moverManager : "Not Assigned"}</div>
                    </div>
                  </div>
                  <hr className="mx-auto step7SummarylBox2_hr" />
                  <div className="flex flex-row p-3 justify-between">
                    <div>
                      <button
                        className=" greyOwn hover:bg-green-100 rounded-md  py-3 px-5 font-semibold text-sm"
                        type="submit"
                      >
                        Book Now
                      </button>
                    </div>
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
                  <div className="OrderID_text_step7 font-bold">{currentBooking.booking_id}</div>
                </div>
                <div>
                  <div>Date & Time slot</div>
                  <div className=" font-semibold">{moment(currentBooking.shiftingOn).format("Do MMMM YYYY")}</div>
                </div>
              </div>
              <hr className="mx-auto step7SummarylBox2_hr" />
              <div className="p-3">
                Your order is being evaluated by us
              </div>
              <div className="p-3">
                <Timeline>
                  <Timeline.Item>
                    <div className="py-1">From</div>
                    <div className="py-1 font-semibold">{currentBooking.shiftingFrom}</div>
                    <div className="py-1 font-semibold">{currentBooking.currentFloor} Floor</div> <div className="py-1 greencolor">{currentBooking.isLiftAvailableOnCurrentFloor ? "Lift Avilabe" : "Lift Not Avilabe"} </div>
                  </Timeline.Item>
                  <Timeline.Item>
                    <div className="py-1">To</div>
                    <div className="py-1 font-semibold">{currentBooking.shiftingTo}</div>
                    <div className="py-1 font-semibold">{currentBooking.movingOnFloor} Floor</div> <div className="py-1 greencolor">{currentBooking.isLiftAvailableOnMovingFloor ? "Lift Avilabe" : "Lift Not Avilabe"}</div>
                  </Timeline.Item>
                </Timeline>
              </div>
              <div className="px-5">
                <hr className="mx-auto step7SummarylBox2_hr" />
              </div>
              <div className="flex flex-row justify-between p-4 mt-6">
                <div>
                  <div>What to move</div>
                  <div className="font-semibold">{currentBooking.shiftingFor}</div>
                </div>
              </div>
              <div className="m-2 font-semibold p-2 text-xl ">
                Your selected items
              </div>
              {bookingSelectedItems(bookingInfo)}
            </div>


          </div>
        </div>
      </div>
      </>) }
      </>
  );
};

export default CurrentOrder;
