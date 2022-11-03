import React, { useEffect, useState, useContext, useCallback } from "react";
import Card from "../../Card";
import TransportContext from "../../../context";
import { useRouter } from "next/router";
import { getBookingItem } from "../../../services/customer-api-service";
import { Timeline, Collapse } from 'antd';
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
    const { step5State } = context;
    console.log("context.step1State", step1State);
    console.log("context.step2State", step2State);
    console.log("context.step3State", step3State);
    console.log("context.step5State", step5State);
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
                            // debugger;
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
    }, []);
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
        // debugger;
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
    

    return (
        <>

            <div className="fontColor_4E4E4E">
                <div>
                    <div className="flex flex-col m-5 p-4 rounded-lg gap-4 bg-white step7SummarylBox1  ">
                        <div className="thankyou_step7"><img
                            className="inline w-8 pr-2"
                            src="/images/sentiment_satisfied.png"
                            itemProp="image"
                            alt="Image"
                        />
                            Thank you Rishi Lohan! 
                        </div>
                        <div className="thankyou2_step7">The information you provided has been sent to our top secret super wise quote calculating monks. We will get you perfect tailor made quote in a day.</div>
                    </div>
                </div>


                <div className="orderHistoryMainBox md:flex xl:flex lg:flex md:flex-row xl:flex-row lg:flex-row flex-row-reverse gap-4 ">


                    <div className="">
                        <div className="m-5 lg:m-0 xl:m-0 md:m-0 lg:my-5 xl:my-5 md:my-5 p-4 bg-white rounded-lg SummaryBox2_orderHistory">


                            <div className="flex justify-between ">
                                <div className="current font-semibold py-3 text-xl">Order History</div>
                                <div>
                                    <button
                                        className=" new_order_step7 py-3 px-8 text-sm rounded"
                                        type="submit"
                                        onClick={handleNewOrder}>
                                        + NEW ORDER
                                    </button>
                                </div>
                            </div>

                            <div className=" text-sm font-semibold my-6">15 Thursday, Sep, 2022</div>
                            <div className="Blue_border">
                                <div className="p-3  ">
                                    <div>
                                        <span className="font-bold">Order Id</span><span className="OrderID_text_step7 pl-2 font-bold">#BLL288945</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-between gap-2 p-3">
                                        <div className="step7Summarybox_item1">
                                            <div>From</div>
                                            <div className="font-semibold">Delhi, India</div>
                                        </div>
                                        <div>
                                            <div>To</div>
                                            <div className="font-semibold">Noida, Uttar Pradesh, India</div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="mx-auto step7SummarylBox2_hr" />

                                <div className="flex p-3 gap-5 items-center justify-center flex-wrap">
                                    <div>
                                        <div className="pb-2">Furniture</div>
                                        <div>
                                            <img
                                                className="inline"
                                                src="/images/chair_icon.svg"
                                                itemProp="image"
                                                alt="Image" />  2x
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pb-2">Electronics</div>
                                        <div>
                                            <img
                                                className="inline"
                                                src="/images/kitchen_icon.svg"
                                                itemProp="image"
                                                alt="Image" />  3x
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pb-2">Vechile</div>
                                        <div>
                                            <img
                                                className="inline"
                                                src="/images/directions_car_icon.svg"
                                                itemProp="image"
                                                alt="Image" />  2x
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pb-2">Others</div>
                                        <div>
                                            <img
                                                className="inline"
                                                src="/images/build_icon.svg"
                                                itemProp="image"
                                                alt="Image" />  25x
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" text-sm font-semibold my-6">15 Thursday, Sep, 2022</div>

                            <div className="Blue_border">
                                <div className="p-3  ">
                                    <div>
                                        <span className="font-bold">Order Id</span><span className="OrderID_text_step7 pl-2 font-bold">#BLL288945</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-between gap-2 p-3">
                                        <div className="step7Summarybox_item1">
                                            <div>From</div>
                                            <div className="font-semibold">Delhi, India</div>
                                        </div>
                                        <div>
                                            <div>To</div>
                                            <div className="font-semibold">Noida, Uttar Pradesh, India</div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="mx-auto step7SummarylBox2_hr" />
                                <div className="flex p-3 gap-5 items-center justify-center flex-wrap">
                                    <div>
                                        <div className="pb-2">Furniture</div>
                                        <div>
                                            <img
                                                className="inline"
                                                src="/images/chair_icon.svg"
                                                itemProp="image"
                                                alt="Image" />  2x
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pb-2">Electronics</div>
                                        <div>
                                            <img
                                                className="inline"
                                                src="/images/kitchen_icon.svg"
                                                itemProp="image"
                                                alt="Image" />  3x
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pb-2">Vechile</div>
                                        <div>
                                            <img
                                                className="inline"
                                                src="/images/directions_car_icon.svg"
                                                itemProp="image"
                                                alt="Image" />  2x
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pb-2">Others</div>
                                        <div>
                                            <img
                                                className="inline"
                                                src="/images/build_icon.svg"
                                                itemProp="image"
                                                alt="Image" />  25x
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" m-5 lg:m-0 xl:m-0 md:m-0 lg:my-5 xl:my-5 md:my-5 p-4 rounded-lg gap-4 bg-white  SummaryBox_orderHistory">
                        <div className="flex flex-row justify-between p-3">
                            <div>
                                <div className="font-bold">Order Id</div>
                                <div className="OrderID_text_step7 font-bold">#BLL288945</div>
                            </div>
                            <div>
                                <div>Date & Time slot</div>
                                <div className=" font-semibold">11 August 2022</div>
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
                                    <div className="py-1 font-semibold">Delhi Cantt Railway Station, jail Road, Nagal village, Delhi Cantonment, New Delhi</div>
                                    <div className="py-1 greencolor">Lift Avilabe</div>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <div className="py-1">To</div>
                                    <div className="py-1 font-semibold">Sonipat, Haryana, India</div>
                                    <div className="py-1 greencolor">Lift Avilabe</div>
                                </Timeline.Item>
                            </Timeline>
                        </div>
                        <div className="px-5">
                            <hr className="mx-auto step7SummarylBox2_hr" />
                        </div>
                        <div className="flex flex-row justify-between p-4 mt-6">
                            <div>
                                <div>What to move</div>
                                <div className="font-semibold">3BHK</div>
                            </div>
                            <div>
                                <div>Preferred Choice</div>
                                <div className="font-semibold">-</div>
                            </div>
                        </div>
                        <div className="m-2 font-semibold p-2 text-xl ">
                            Your selected items
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
                    </div>
                </div>
            </div>

        </>
    );
};

export default Step7;
