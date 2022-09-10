import React, { useEffect, useState, useContext, useCallback } from "react";
import Card from "../Card";
import Image from "next/image";
import TransportContext from "../../context";
import { useRouter } from "next/router";

const Step6 = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [moveType, setMoveType] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [orderCreated, setOrderCreated] = useState("₹ 0/CREATED");
  const [formAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [date, setDate] = useState("");
  const [fromLift, setFromLift] = useState("");
  const [toLift, setToLift] = useState("");
  const [currentFloor, setCurrentFloor] = useState("");
  const [movingOnFloor, setmovingOnFloor] = useState("");

  const context = useContext(TransportContext);
  const { step1State } = context;
  const { step2State } = context;
  const { step3State } = context;
  console.log("context.step1State", step1State);
  console.log("context.step2State", step2State);
  console.log("context.step3State", step3State);
  const { customerDetails } = context;
  const [customerData, setCustomerData] = useState({});
  const [state, setState] = useState([]);
  const [items, setItems] = useState([]);
  const [liftAvailability, setLiftAvailability] = useState("");
  let objToAppend = [];

  useEffect(() => {
    if (!step1State) return;
    setFromAddress(step1State["shiftingFrom"]);
    setToAddress(step1State["shiftingTo"]);
    setMoveType(step1State["shiftingFor"]);
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

    if (!step2State) return;
    setOrderId(step2State["bookingId"]);
    setCurrentFloor(step2State["currentFloor"]);
    if (step2State["isLiftAvailableOnCurrentFloor"]) {
      setFromLift(step2State["currentFloor"] + " , " + "Lift is available");
    } else {
      setFromLift(step2State["currentFloor"] + " , " + "Lift is not available");
    }
    if (step2State["isLiftAvailableOnMovingFloor"]) {
      setToLift(step2State["movingOnFloor"] + " , " + "Lift is available");
    } else {
      setToLift(step2State["movingOnFloor"] + " , " + "Lift is not available");
    }
    setmovingOnFloor(step2State["movingOnFloor"]);
    const d = step1State["shiftingOn"];
    const year = d.getFullYear();
    const date = d.getDate();
    const monthName = months[d.getMonth()];
    const dayName = days[d.getDay()];
    const formattedDate = `${dayName}, ${date} ${monthName} ${year}`;
    setDate(formattedDate);

    if (!customerDetails) return;
    setEmailId(customerDetails["email"]);
    setName(customerDetails["fullName"]);
    setMobileNo(customerDetails["mobile"]);
  }, [step1State, step2State, customerDetails]);

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

  useEffect(() => {
    //debugger;
    if (!step3State) return;
    const keys = Object.keys(step3State);
    const arr = [];
    const arrayItems = [];
    keys.forEach((k) => {
      step3State[k].forEach((i) => {
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
    if (arrayItems && arrayItems.length > 0) setItems(arrayItems);
    setState(arr);
  }, [step3State, getCopiedObject]);

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    // ctx.setStep5State(objectState);
    // console.log("objectState - 5", ctx.step5State);
    // alert("Success!");
    router.push("/step7");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <img className="mt-5" src={"images/cup-java-50.png"} alt="" /> */}
      <img className="mt-5" src={"images/cup-java-50.png"} alt="" />
      <p className="mt-10 mb-3 text-gray-800 font-medium text-lg text-center">
        Thank you {name}!
      </p>
      <p className="mt-5  text-gray-800 font-medium text-sm text-center">
        The information you provided has been sent to our top secret super wise
        quote calculating monks. We will get you perfect tailor made quote in a
        day.
      </p>
      <p className="mt-1 text-gray-800 font-medium text-sm text-center">
        Pikkol Tip 1 : You can instantly change the price by changing the day of
        move. Wait for the quote page to see this in action.
      </p>
      <div className="flex justify-center items-center">
        <button
          className="m-5 bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-10 font-semibold text-lg rounded shadow-lg"
          type="submit"
          onClick={handleSubmit}
        >
          MY ORDERS
        </button>
      </div>

      <div className=" h-65 w-5/6 border-2 shadow-lg rounded">
        <form className="mb-5">
          <div className="flex ml-10 mr-10 mt-5 space-x-2 text-gray-800 font-medium text-md">
            <div className="flex- 1 w-1/2">Order Id</div>
            <div className="flex- 1 w-1/2 ">Move type</div>
            <div className="flex- 1 w-1/2 ">User information</div>
          </div>

          <div className="flex ml-10 mr-10 mt-1 space-x-2">
            <div className="flex- 1 w-1/2">{orderId}</div>
            <div className="flex- 1 w-1/2  ">{moveType}</div>
            <div className="flex- 1 w-1/2 ">{name}</div>
          </div>

          <div className="flex ml-10 mr-10 mt-1 space-x-2">
            <div className="flex- 1 w-1/2">{orderCreated}</div>
            <div className="flex- 1 w-1/2  ">{}</div>
            <div className="flex- 1 w-1/2  ">{mobileNo}</div>
          </div>

          <div className="flex ml-10 mr-10 mt-1 space-x-2">
            <div className="flex- 1 w-1/2">{}</div>
            <div className="flex- 1 w-1/2  ">{}</div>
            <div className="flex- 1 w-1/2  ">{emailId}</div>
          </div>
          <div className="flex ml-10 mr-10 mt-5 space-x-2 text-gray-800 font-medium text-md">
            <div className="flex- 1 w-1/2">From</div>
            <div className="flex- 1 w-1/2 ">To</div>
            <div className="flex- 1 w-1/2 ">Date</div>
          </div>

          <div className="flex ml-10 mr-10 mt-1 space-x-2">
            <div className="flex- 1 w-1/2">{formAddress}</div>
            <div className="flex- 1 w-1/2  ">{toAddress}</div>
            <div className="flex- 1 w-1/2 ">{date}</div>
          </div>

          <div className="flex ml-10 mr-10 mt-1 space-x-2">
            <div className="flex- 1 w-1/2">{fromLift}</div>
            <div className="flex- 1 w-1/2  ">{toLift}</div>
            <div className="flex- 1 w-1/2  ">{}</div>
          </div>
        </form>
      </div>
      <div>
        <p className="mt-10 mb-3 text-gray-800 font-medium text-sm text-center">
          Your selected items
        </p>
      </div>

      <div className="w-5/6">
        <form className="max-w-xl m-auto py-10 px-5">
          <div className="flex flex-col gap-8 md:grid-cols-3 mt-5">
            {state.map((st, index) => {
              console.log("item", st);
              return (
                <Card
                  image={st.image}
                  key={index}
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
  );
};

export default Step6;
