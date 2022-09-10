import React, { useEffect, useState, useContext } from "react";
import Card from "../../Card";
import itemList from "../../../data/otherItemList.json";
import TransportContext from "../../../context";
import { useRouter } from "next/router";
import { misItem } from "../../../services/customer-api-service";

const Step5 = () => {
  const ctx = useContext(TransportContext);
  const router = useRouter();
  const { customerDetails } = ctx;
  const { booking } = ctx;
  const { step1State } = ctx;
  const { step2State } = ctx;
  const { step3State, setStep3State } = ctx;
  console.log("customerDetails -- ", customerDetails);
  console.log("context.booking -- ", booking);
  console.log("context.step1State -- ", step1State);
  console.log("context.step2State -- ", step2State);
  console.log("context.step3State -- ", step3State);

  let categories = [...itemList.map((item) => item?.Category)];
  let uniqueCategories = [],
    items = {};

  categories.forEach((c) => {
    if (c && !uniqueCategories.includes(c)) {
      uniqueCategories.push(c);
    }
  });

  itemList.map((item) => {
    const keys = Object.keys(items);
    const keyExist = item?.Category && keys.includes(item?.Category);
    if (!keyExist && item?.Category) {
      items[item?.Category] = [
        { title: item["Item"], image: `/images/${item.Image}` },
      ];
    } else if (item?.Category) {
      const itemIndex = items[item?.Category].findIndex(
        (i) => i.title === item["Item"]
      );
      // debugger;
      if (itemIndex === -1) {
        items[item?.Category].push({
          title: item["Item"],
          image: `/images/${item.Image}`,
        });
      }
    }
  });
  const [objectState, setObjectState] = useState({
    ...items,
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
    ctx.setStep5State(newState);
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
    ctx.setStep5State(newState);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // ----------------------
    let result = await callApi();
    if (result.data.status) {
      console.log("Booking result is", result);
      //  setBooking(result.data);
    }
    ctx.setStep5State(objectState);
    console.log("objectState", objectState);
    console.log("objectState - 5", ctx.step5State);
    router.push("/order/step6");
  };

  const callApi = async () => {
    return await misItem({
      customerId: customerDetails?.customerId,
      cartonboxes: objectState.cartonboxes,
      wetgrinders: objectState.wetgrinders,
      frames: objectState.frames,
      swings: objectState.swings,
      waterdrums: objectState.waterdrums,
      waterpurifiers: objectState.waterpurifiers,
      cockerysets: objectState.cockerysets,
      excercisecycles: objectState.excercisecycles,
      cribes: objectState.cribes,
      vacumcleaners: objectState.vacumcleaners,
      hometheatres: objectState.hometheatres,
      treadmils: objectState.treadmils,
      lpgcylinders: objectState.lpgcylinders,
      dishwashers: objectState.dishwashers,
      showpieces: objectState.showpieces,
      infantcycles: objectState.infantcycles,
      Trunks: objectState.Trunks,
      desktops: objectState.desktops,
      barcabinets: objectState.barcabinets,
      flowerpot: objectState.flowerpot,
      batteries: objectState.batteries,
      swingmachines: objectState.swingmachines,
      lamps: objectState.lamps,
      flowerpotlarge: objectState.flowerpotlarge,
      kitchenracks: objectState.kitchenracks,
      stoves: objectState.stoves,
      temples: objectState.temples,
      beanbags: objectState.beanbags,
    });
  };

  return (
    <div>
      <div className="flex justify-start m-2 text-sm ">
        <p>Do you want to move any of these items?</p>
      </div>

      <div className="flex justify-end mr-5 mt-5 mb-2 space-x-5">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
          type="button"
          onClick={handleSubmit}
        >
          NEXT
        </button>
      </div>
      <div className="flex justify-end mr-5  mb-5 text-sm ">
        <p>Do you know you can save this progress</p>
      </div>
      <form className="max-w-screen-xl m-auto py-10 px-5">
        <div className="grid gap-8 lg:grid-cols-4">
          {uniqueCategories.map((item, i) => {
            return (
              <div className="px-4 py-4" key={i}>
                <h3 className="text-2xl text-center text-gray-600">{item}</h3>
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 md:grid-cols-4 mt-5">
          <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
            {objectState.Utility.map((item, index) => {
              console.log("item", item);
              return (
                <Card
                  image={item.image}
                  key={index}
                  item={item.title}
                  itemCount={item.count}
                  onDecrement={decrementHandler.bind(null, "Utility", item)}
                  onClick={clickHandler.bind(null, "Utility", item)}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
            {objectState.HomeAppliances.map((item, index) => (
              <Card
                image={item.image}
                key={index}
                item={item.title}
                itemCount={item.count}
                onDecrement={decrementHandler.bind(
                  null,
                  "HomeAppliances",
                  item
                )}
                onClick={clickHandler.bind(null, "HomeAppliances", item)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
            {objectState.CareItems.map((item, index) => (
              <Card
                image={item.image}
                key={index}
                item={item.title}
                itemCount={item.count}
                onDecrement={decrementHandler.bind(null, "CareItems", item)}
                onClick={clickHandler.bind(null, "CareItems", item)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
            {objectState.Fitness.map((item, index) => (
              <Card
                image={item.image}
                key={index}
                item={item.title}
                itemCount={item.count}
                onDecrement={decrementHandler.bind(null, "Fitness", item)}
                onClick={clickHandler.bind(null, "Fitness", item)}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step5;
