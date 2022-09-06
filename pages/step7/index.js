import React, { useEffect, useState, useContext, useCallback } from "react";
import Card from "../Card";
import TransportContext from "../../context";
import { useRouter } from "next/router";

const Step7 = () => {
  const router = useRouter();
  const [name, setName] = useState("Test");
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
  const { step1State} = context;
  const { step2State} = context;
  const { step3State } = context;
  console.log("context.step1State", step1State);
  console.log("context.step2State", step2State);
  console.log("context.step3State", step3State);
  const { customerDetails } = context;
  const [customerData, setCustomerData] = useState({});
  const [state, setState] = useState([]);
  const [items, setItems] = useState([]);
  let objToAppend = [];
  const [dayName, setDayName] =useState("");
  const [day, setDay] =useState("");
  const [month, setMonth] =useState("");
  
  // todo - mover planner and manager name comes from where
  const [moverPlanner, setMoverPlanner] = useState("Charmee Kothari");
  const [moverPlannerNo, setMoverPlannerNo] = useState("08047094008");
  const [moveManager, setMoveManager] = useState("Not Assigned");

  useEffect(()=>{
   
    if (!step1State) return;
    setFromAddress(step1State["shiftingFrom"]);
    setToAddress(step1State["shiftingTo"]);
    setMoveType(step1State["shiftingFor"])
    //setDate(step1State["shiftingOn"])
    const months = {0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December',}
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
    const d = step1State["shiftingOn"];
    const year = d.getFullYear()
    const date = d.getDate()
    const monthName = months[d.getMonth()]
    const dayName = days[d.getDay()] 
    const formattedDate = `${dayName}, ${date} ${monthName} ${year}`
    setDate(formattedDate);
    setDay(date);
    setDayName(dayName);
    setMonth(monthName + " " + year );

 
    if (!step2State) return;
    setOrderId(step2State["bookingId"]);
    setCurrentFloor(step2State["currentFloor"]);
    setFromLift(step2State["isLiftAvailableOnCurrentFloor"]);
    setToLift(step2State["isLiftAvailableOnMovingFloor"]);
    setmovingOnFloor(step2State["movingOnFloor"]);
    
     if(!customerDetails) return;
      setEmailId(customerDetails["email"]);
      setName(customerDetails["fullName"]);
      setMobileNo(customerDetails["mobile"]);
  },[step1State, step2State, customerDetails]);

  const handleNewOrder = async (event) => {
    event.preventDefault();
    router.push("/step1");
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="m-5 bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-10 text-sm rounded shadow-lg"
          type="submit"
          onClick={handleNewOrder}
        >
          + NEW ORDER
        </button>
      </div>
      <div className="flex m-10 space-x-5">
        <div className="h-80 w-2/5 rounded shadow-lg">
          <div className="flex ">
            <div className="w-1/3 h-80">
              <div className="h-32 border-t-2 border-l-2 border-b-2 bg-gray-100 rounded shadow-lg">
                <div className="flex mt-10 justify-center space-x-2">
                  <div className=" text-xl font-bold justify-center">
                    {orderId}
                  </div>
                </div>
              </div>
              <div className="h-48 w-full  bg-blue-400 ">
                <div className="flex  justify-center ">
                  <div className="font-bold text-xl text-gray-100 mt-7">
                    {day}
                  </div>
                </div>
                <div className="flex mt-5 justify-center">
                  <div className="font-bold text-xl text-gray-100">
                    {dayName}
                  </div>
                </div>

                <div className="flex mt-5 justify-center ">
                  <div className="font-bold text-xl text-gray-100">
                    {month}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/3 h-80 border-2 rounded shadow-lg text-sm">
              <div className="flex ml-3 mr-10 mt-1 space-x-2 font-medium text-sm">
                <div className="flex- 1 w-1/2">From</div>
              </div>
              <div className="flex ml-3 mr-10 space-x-2 text-sm">
                <div className="flex- 1 w-3/5">{formAddress}</div>
              </div>

              <div className="flex ml-3 mr-10 mt-3 space-x-2 font-medium text-sm">
                <div className="flex- 1 w-1/2">To</div>
              </div>
              <div className="flex ml-3 mr-10 space-x-2">
                <div className="flex- 1 w-3/5">{toAddress}</div>
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
                >
                  EDIT INVENTORY
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen w-2/5 text-gray-500 border-2 rounded shadow-lg">
          <div className="flex ml-10 mr-10 mt-5 space-x-2 font-medium text-md">
            <div className="flex- 1 w-1/2">Order Id</div>
            <div className="flex- 1 w-1/2 ">Date Timeslot</div>
          </div>
          <div className="flex ml-10 mr-10 mt-1 space-x-2">
            <div className="flex- 1 w-1/2">{orderId}</div>
            <div className="flex- 1 w-1/2  ">{date}</div>
          </div>
          <div className="flex ml-10 mr-10 mt-5 space-x-2 font-medium text-md">
            <div className="flex- 1 w-1/2">From Address</div>
            <div className="flex- 1 w-1/2 ">To Address</div>
          </div>
          <div className="flex ml-10 mr-10 mt-1 space-x-2">
            <div className="flex- 1 w-1/2">{formAddress}</div>
            <div className="flex- 1 w-1/2  ">{toAddress}</div>
          </div>

          <div className="flex ml-10 mr-10 mt-10 space-x-2 font-medium text-md">
            <div className="flex- 1 w-1/2">Floor</div>
            <div className="flex- 1 w-1/2 ">Floor</div>
          </div>
          <div className="flex ml-10 mr-10 mt-1 space-x-2">
            <div className="flex- 1 w-1/2">{currentFloor}</div>
            <div className="flex- 1 w-1/2  ">{movingOnFloor}</div>
          </div>
          <div className="flex ml-10 mr-10 mt-1 space-x-2">
            <div className="flex- 1 w-1/2">{fromLift}</div>
            <div className="flex- 1 w-1/2  ">{toLift}</div>
          </div>
          <div className="flex ml-10 mr-10 mt-5 space-x-2 font-medium text-md">
            <div className="flex- 1 w-1/2">Preferred Choice</div>
            <div className="flex- 1 w-1/2 ">What to Move</div>
          </div>
          <div className="flex ml-10 mr-10 mt-1 space-x-2">
            <div className="flex- 1 w-1/2">{}</div>
            <div className="flex- 1 w-1/2  ">{moveType}</div>
          </div>

          <div className="w-5/6">
            <form className="max-w-screen-xl m-auto py-10 px-5">
              <div className="grid space-x-1 lg:grid-cols-1">
                <div className="px-4  ">
                  <h3 className="text-md text-center text-gray-600">
                    Furniture
                  </h3>
                </div>

                <div className="grid gap-8 space-x-1 md:grid-cols-1 mt-1">
                  <Card
                    image={"images/office-chair-24.png"}
                    item={"Chairs"}
                    itemCount={1}
                  />
                </div>
              </div>
              <div className="grid gap-8 space-x-1 md:grid-cols-1 mt-1">
                <Card
                  image={"images/table-24.png"}
                  item={"Tables"}
                  itemCount={1}
                />
              </div>
              <div className="grid space-x-1 lg:grid-cols-1 mt-1">
                <div className="px-4">
                  <h3 className="text-md text-center text-gray-600">
                    Electronic
                  </h3>
                </div>
              </div>
              <div className="grid gap-8 space-x-1 md:grid-cols-1 mt-1">
                <Card
                  image={"images/washing-machine-24.png"}
                  item={"Washing machines"}
                  itemCount={1}
                />
              </div>

              <div className="grid space-x-1 lg:grid-cols-1 mt-2">
                <div className="px-4">
                  <h3 className="text-md text-center text-gray-600">Vehicle</h3>
                </div>
              </div>
              <div className="grid gap-8 space-x-1 md:grid-cols-1 mt-1">
                <Card
                  image={"images/bike-24.png"}
                  item={"Bikes"}
                  itemCount={1}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step7;
