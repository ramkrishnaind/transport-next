import React, { useEffect, useState } from "react";
import Card from "../Card"
import Image from 'next/image';

const Step6 = () => {
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

  return (
    <div className="flex flex-col items-center justify-center">
      <Image className="mt-5" src={"images/cup-java-50.png"} alt="" />
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
        >
          MY ORDERS
        </button>
      </div>

      <div className=" h-65 w-5/6 border-2 shadow-lg rounded">
        <form className="mb-5">
          <div className="flex ml-10 mr-10 mt-5 space-x-2 text-gray-800 font-medium text-md">
            <div className="flex- 1 w-1/2">Order id</div>
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
            <div className="flex- 1 w-1/2 ">Date and Timeslot</div>
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
      <form className="max-w-screen-xl m-auto py-10 px-5">
      <div className="grid gap-8 space-x-1 lg:grid-cols-3">
        <div className="px-4  ">
          <h3 className="text-md text-center text-gray-600">Furniture</h3>
        </div>
        <div className="px-4">
          <h3 className="text-md text-center text-gray-600">Electronic</h3>
        </div>
        <div className="px-4">
          <h3 className="text-md text-center text-gray-600">Vehicle</h3>
        </div>
      </div>
      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <Card image={"images/table-24.png"} item={"Tables"} itemCount={1} />
        <Card image={"images/washing-machine-24.png"} item={"Washing machines"} itemCount={1} />
        <Card image={"images/bike-24.png"} item={"Bikes"} itemCount={1} />
      </div>
      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <Card image={"images/office-chair-24.png"} item={"Chairs"} itemCount={1} />
      </div>

    </form>
    </div>
    </div>
  );
};

export default Step6;
