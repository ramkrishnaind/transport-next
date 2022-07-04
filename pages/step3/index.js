import React, { useEffect, useState, useContext } from "react";
import Card from "../Card";
import bikeList from "../../data/bikeList.json";
import itemList from "../../data/itemList.json";
import { useRouter } from "next/router";
import TransportContext from "../../context";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSearch,
//   faAmbulance,
//   faAnchor,
// } from "@fortawesome/free-solid-svg-icons";
// import * as fa from "@fortawesome/free-solid-svg-icons";

const Step3 = () => {
  const router = useRouter();
  const ctx = useContext(TransportContext);
  let categories = [...itemList.map((item) => item?.Category)];
  let uniqueCategories = [],
    items = {};
  const Vehicles = [
    { title: "Bikes", image: "images/bike-24.png" },
    { title: "Cars", image: "images/car.png" },
    { title: "Cycles", image: "images/cycle-24.png" },
  ];
  categories.forEach((c) => {
    if (c && !uniqueCategories.includes(c) && c !== "Cycles") {
      uniqueCategories.push(c);
    }
  });

  //uniqueCategories.push("Vehicle");
  itemList.map((item) => {
    const keys = Object.keys(items);
    const keyExist = item?.Category && keys.includes(item?.Category);
    if (!keyExist && item?.Category) {
      items[item?.Category] = [
        { title: item["Item"], image: `images/${item.Image}` },
      ];
    } else if (item?.Category) {
      const itemIndex = items[item?.Category].findIndex(
        (i) => i.title === item["Item"]
      );
      // debugger;
      if (itemIndex === -1) {
        items[item?.Category].push({
          title: item["Item"],
          image: `images/${item.Image}`,
        });
      }
    }
  });
  const [objectState, setObjectState] = useState({
    ...items,
    Vehicle: Vehicles,
  });
  useEffect(() => {
    setObjectState((prev) => {
      const newState = { ...prev };
      const keys = Object.keys(newState);
      keys.forEach((k) => {
        newState[k] = newState[k]?.map((i) => {
          i.count = 0;
          return i;
        });
      });
      return newState;
    });
  }, []);
  console.log("objectState", objectState);
  const clickHandler = (key, item) => {
    const newState = { ...objectState };
    const newArray = [];
    // debugger;
    const arr = [...newState[key]];
    arr?.forEach((i) => {
      if (i.title === item.title) {
        i.count = i.count + 1;
      }
      newArray.push(i);
    });
    console.log("called");
    newState[key] = newArray;
    setObjectState(newState);
    ctx.setStep3State(newState);
  };
  const decrementHandler = (key, item) => {
    const newState = { ...objectState };
    const newArray = [];
    // debugger;
    const arr = [...newState[key]];
    arr?.forEach((i) => {
      if (i.title === item.title && i.count !== 0) {
        i.count = i.count - 1;
      }
      newArray.push(i);
    });
    console.log("called");
    newState[key] = newArray;
    setObjectState(newState);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    ctx.setStep3State(objectState);
    console.log("objectState", objectState);
    router.push("/step4");
    console.log("ctx.step3State", ctx.step3State);
  };
  return (
    <div>
      <div className="flex justify-end mr-5 mt-5 mb-2 space-x-5">
        <button
          className="bg-gray-100 hover:bg-blue-400 text-white-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
          type="submit"
        >
          SKIP
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
          type="button"
          onClick={handleSubmit}
        >
          NEXT
        </button>
      </div>
      <div className="flex justify-end mr-5  mb-5 text-sm ">
        {/* <FontAwesomeIcon
          icon={fa["faSearch"]}
          style={{ fontSize: 20, color: "blue" }}
        /> */}
        <p>Do you know you can save this progress</p>
      </div>

      <form className="max-w-screen-xl m-auto py-10 px-5">
        <div className="grid gap-8 lg:grid-cols-3">
          {uniqueCategories.map((item, i) => {
            return (
              <div className="px-4 py-4" key={i}>
                <h3 className="text-2xl text-center text-gray-600">{item}</h3>
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-5">
          <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
            {objectState.Furniture.map((item, index) => {
              console.log("item", item);
              return (
                <Card
                  image={item.image}
                  key={index}
                  item={item.title}
                  itemCount={item.count}
                  onDecrement={decrementHandler.bind(null, "Furniture", item)}
                  onClick={clickHandler.bind(null, "Furniture", item)}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
            {objectState.Electronic.map((item, index) => (
              <Card
                image={item.image}
                key={index}
                item={item.title}
                itemCount={item.count}
                onDecrement={decrementHandler.bind(null, "Electronic", item)}
                onClick={clickHandler.bind(null, "Electronic", item)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
            {objectState.Vehicle.map((item, index) => (
              <Card
                image={item.image}
                key={index}
                item={item.title}
                itemCount={item.count}
                onDecrement={decrementHandler.bind(null, "Vehicle", item)}
                onClick={clickHandler.bind(null, "Vehicle", item)}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step3;
