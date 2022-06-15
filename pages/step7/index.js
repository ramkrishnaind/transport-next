import React, { useEffect, useState } from "react";
import Card from "../Card";

const Step7 = () => {
  const [name, setName] = useState("Test");
  const [orderId, setOrderId] = useState("#BLL285609");
  const [moveType, setMoveType] = useState("3 BHK");
  const [mobileNo, setMobileNo] = useState("98XXXXXX0");
  const [emailId, setEmailId] = useState("test@gmail.com");
  const [orderCreated, setOrderCreated] = useState("₹ 0/CREATED");
  const [formAddress, setFromAddress] = useState("Bhubaneswar, Odisha, India");
  const [toAddress, setToAddress] = useState("Chennai, Tamil Nadu, India");
  const [date, setDate] = useState("14 June 2022");
  const [fromLift, setFromLift] = useState("Lift available");
  const [toLift, setToLift] = useState("Lift not available");
  const [moverPlanner, setMoverPlanner] = useState("Charmee Kothari");
  const [moverPlannerNo, setMoverPlannerNo] = useState("08047094008");
  const [moveManager, setMoveManager] = useState("Not Assigned");

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="m-5 bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-10 text-sm rounded shadow-lg"
          type="submit"
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
                  <div className="flex- 1  w-3/5 text-xl font-bold">
                    {orderId}
                  </div>
                </div>
              </div>
              <div className="h-48 w-full  bg-blue-400 ">
                <div className="flex  ml-10 justify-center ">
                  <div className="flex- 1 w-3/5 font-bold text-xl text-gray-100 ml-5 mt-7">
                    08
                  </div>
                </div>
                <div className="flex m-5 justify-center">
                  <div className="flex- 1 w-3/5 font-bold text-xl text-gray-100">
                    Thursday
                  </div>
                </div>

                <div className="flex space-x-5 justify-center ">
                  <div className="flex- 1 w-3/5 font-bold text-xl text-gray-100">
                    June 2022
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
