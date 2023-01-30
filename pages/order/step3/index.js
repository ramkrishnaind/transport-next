import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Card from "../../Card";
import bikeList from "../../../data/bikeList.json";
import itemList from "../../../data/itemList.json";
// import { useRouter } from "next/router";
import TransportContext from "../../../context";
import {
  bookingItem,
  step3Item,
  getBookingItem,
} from "../../../services/customer-api-service";
import useAuth from "../../../hooks/useAuth";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSearch,
//   faAmbulance,
//   faAnchor,
// } from "@fortawesome/free-solid-svg-icons";
// import * as fa from "@fortawesome/free-solid-svg-icons";
import { Collapse, Tooltip } from "antd";
const { Panel } = Collapse;

const Step3 = (props) => {
  const { bookingInfo, saveBooking, customer } = useAuth();
  const router = useRouter();
  const ctx = useContext(TransportContext);
  const { booking } = ctx;
  const { step1State } = ctx;
  const { step2State } = ctx;
  const { step3State, setStep3State } = ctx;
  console.log("context.booking -- ", booking);
  console.log("context.step1State -- ", step1State);
  console.log("context.step2State -- ", step2State);
  console.log("context.step3State -- ", step3State);

  let categories = [...itemList.map((item) => item?.Category)];
  let uniqueCategories = [],
    items = {};
  const Vehicles = [
    { title: "Bikes", image: "/images/bike-24.png" },
    { title: "Cars", image: "/images/car.png" },
    { title: "Cycles", image: "/images/cycle-24.png" },
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
  // debugger;
  const [objectState, setObjectState] = useState(
    step3State || {
      ...items,
      Vehicle: Vehicles,
    }
  );
  // if (props.location !== prevProps.location) {
  //   console.log("ss");
  // }

  useEffect(() => {
    console.log("bookingInfo in step3 is ", bookingInfo);
    setObjectState((prev) => {
      const newState = { ...prev };
      const keys = Object.keys(newState);
      keys.forEach((k) => {
        newState[k] = newState[k]?.map((i) => {
          if (i?.count === undefined) i.count = 0;
          return i;
        });
      });
      return newState;
    });
  }, [bookingInfo]);
  useEffect(() => {
    // debugger;
    if (!step3State) {
      let stp3State = JSON.parse(localStorage.getItem("step3State"));
      console.log("local storage - ", stp3State);
      if (!stp3State) {
        return;
      } else {
        setObjectState((prev) => {
          const newState = { ...prev };
          const keys = Object.keys(stp3State);
          keys.forEach((k) => {
            stp3State[k] = stp3State[k]?.map((i) => {
              console.log("new title - ", i.title);
              console.log("new title - ", i.count);
              return i;
            });
          });
          return stp3State;
        });
      }
    } else {
      setObjectState((prev) => {
        const newState = { ...prev };
        const keys = Object.keys(step3State);
        keys.forEach((k) => {
          newState[k] = newState[k]?.map((i) => {
            //console.log(" title - ", i.title);
            //console.log(" title - ", i.count);
            return i;
          });
        });
        return newState;
      });
    }
  }, []);

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
    const newStep4 = ctx.step4State;
    if (newStep4) {
    }
    // ctx.setStep4Items([]);
    // ctx.setStep3State(newState);
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
    const newStep4 = ctx.step4State;
    debugger;
    if (newStep4) {
      delete newStep4[key + "-" + item.title];
      ctx.setStep4Items({ ...newStep4 });
      localStorage.setItem("step4State", JSON.stringify(newStep4));
      localStorage.setItem("step4StepResults", JSON.stringify(newStep4));
    }

    // ctx.setStep3State(newState);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    debugger;
    await step3Item({
      bookingId: step2State?.bookingId,
      step3: { ...objectState },
    });
    //await step3Item({ ...items });
    // ----------------------
    // let result = await callApi();
    // debugger;
    // if (result.data.status) {
    //   console.log("Booking result is", result);
    //   //  setBooking(result.data);
    // }
    //--------------------------
    ctx.setStep3State(objectState);
    console.log("objectState", objectState);
    saveBooking({ ...bookingInfo, step3: objectState });
    localStorage.setItem("step3State", JSON.stringify(objectState));
    console.log("local storage save- ", JSON.stringify(objectState));
    router.push("/order/step4");
  };
  const handleSkip = () => {
    router.push("/order/step7");
  };
  const form1 = () => {
    return (
      <form className="max-w-screen-xl m-auto px-4">
        <div className="mt-5">
          <div className="flex flex-col gap-2 grid-cols-1 mt-5">
            {objectState.Furniture.map((item, index) => {
              console.log("item in step 3", item);
              return (
                <>
                  {item.title === "Cupboard" ? (
                    <Tooltip
                      placement="left"
                      title={"Click on a card to add an item of that type"}
                      defaultOpen={true}
                    >
                      <Card
                        image={item.image}
                        key={index}
                        item={item.title}
                        itemCount={item.count}
                        onDecrement={decrementHandler.bind(
                          null,
                          "Furniture",
                          item
                        )}
                        onClick={clickHandler.bind(null, "Furniture", item)}
                      />
                    </Tooltip>
                  ) : (
                    <Card
                      image={item.image}
                      key={index}
                      item={item.title}
                      itemCount={item.count}
                      onDecrement={decrementHandler.bind(
                        null,
                        "Furniture",
                        item
                      )}
                      onClick={clickHandler.bind(null, "Furniture", item)}
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </form>
    );
  };
  const form2 = () => {
    return (
      <form className="max-w-screen-xl m-auto px-4">
        <div className="mt-5">
          <div className="flex flex-col gap-2 grid-cols-1 mt-5">
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
        </div>
      </form>
    );
  };
  const form3 = () => {
    return (
      <form className="max-w-screen-xl m-auto px-4">
        <div className="mt-5">
          <div className="flex flex-col gap-2 grid-cols-1 mt-5">
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
    );
  };
  // const callApi = async () => {
  //   let arr = objectState?.Furniture ? [...objectState.Furniture] : [];
  //   arr = objectState?.Electronic
  //     ? [...arr, ...objectState.Electronic]
  //     : [...arr];
  //   arr = objectState?.Vehicle ? [...arr, ...objectState.Vehicle] : [...arr];
  //   const objCreated = {};
  //   arr.forEach((item) => {
  //     const key = item.title.replace("/", " ");
  //     const items = key.split(" ");
  //     let newKey = "";
  //     items.forEach((i, index) => {
  //       if (index === 0) {
  //         newKey += i.toLowerCase();
  //       } else {
  //         newKey += i.substr(0, 1).toUpperCase() + i.substr(1);
  //       }
  //     });
  //     // const newKey = items.join("");
  //     debugger;
  //     objCreated[newKey] = item;
  //   });
  //   debugger;
  //   return await bookingItem({
  //     bookingId: step2State?.bookingId,
  //     sofaSets: objCreated.sofaSets,
  //     tables: objCreated.tables,
  //     chairs: objCreated.chairs,
  //     cots: objCreated.cots,
  //     mattress: objCreated.mattress,
  //     cupBoards: objCreated.cupBoards,
  //     tvs: objCreated.tvs,
  //     refrigerators: objCreated.refrigerators,
  //     washingMachines: objCreated.washingMachines,
  //     ovens: objCreated.ovens,
  //     airConditioners: objCreated.airConditioners,
  //     fansCoolers: objCreated.fansCoolers,
  //     bikes: objCreated.bikes,
  //     cars: objCreated.cars,
  //     cycles: objCreated.cycles,
  //   });
  // };

  return (
    <>
      {/* completeBAR */}
      <div>
        <div className="hidden md:block lg:block xl:block">
          <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 md:mt-3 lg:mt-3 xl:mt-3  bg-white rounded-lg h-12">
            <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
              Virtual Survey 40% complete
            </div>
            <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
              3 Step left • About 6 min
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4  bg-white rounded-lg ">
          <div>
            <hr className="step3-line" />
          </div>
        </div>
        <div className=" flex flex-col items-center  gap-2.5 py-5  bg-white MoblieCompletePersentage md:hidden lg:hidden xl:hidden">
          <div className="completepersentage  font-semibold text-3xl completing_bar_text">
            Virtual Survey 40% complete
          </div>
          <div className="not-italic ">
            <span className=" font-semibold">3 Step left •</span>
            <span> About 6 min</span>
          </div>
        </div>
      </div>

      <div className="r1 top-36 r4 md:mt-3 lg:mt-3 xl:mt-3">
        <div className=" flex flex-col justify-between items-left p-0 gap-1.5  top-36 r4 mt-3 p-2 md:pl-0 lg:pl-0 xl:pl-0 md:mt-5 lg:mt-5 xl:mt-5  ">
          <div className="step3_heading font-medium text-center md:text-left xl:text-left lg:text-left p-1.5 lg:p-0 xl:p-0">
            What are the major item you want to move?
          </div>
          <div className=" text-center md:text-left xl:text-left lg:text-left padding_Heading_step2 ">
            to save you the trouble, we have pre-selected this list.
          </div>
        </div>

        {/* Tab Responsive */}
        <div className="hidden ResponsiveTab">
          <Collapse
            defaultActiveKey={["1"]}
            ghost
            className=" text-2xl steps_text_color"
          >
            <Panel header="Furniture" key="1">
              {form1()}
            </Panel>
          </Collapse>

          <Collapse
            defaultActiveKey={["1"]}
            ghost
            className=" first:text-2xl steps_text_color"
          >
            <Panel header="Electronic" key="1">
              {form2()}
            </Panel>
          </Collapse>

          <Collapse
            defaultActiveKey={["1"]}
            ghost
            className=" text-2xl steps_text_color"
          >
            <Panel header="Vehicle" key="1">
              {form3()}
            </Panel>
          </Collapse>

          <div className="mt-6 ">
            <div className="flex justify-start mr-5 mt-5 mb-2 space-x-5 pl-5">
              <button
                className="button_2_skip rounded-m px-10 py-2"
                type="button"
                // onClick={handleSkip}
              >
                SKIP
              </button>
              <button
                className="button_3 rounded-m px-10 py-2 "
                type="button"
                onClick={handleSubmit}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>

        {/* Laptop */}
        <div className="hidden ResponsiveLatop">
          <form className="max-w-screen-xl m-auto">
            <div className="grid gap-8 lg:grid-cols-3 mt-4 ">
              {uniqueCategories.map((item, i) => {
                return (
                  <div key={i}>
                    <h3 className="text-2xl text-center text-gray-600">
                      {item}
                    </h3>
                  </div>
                );
              })}
            </div>
            <div className="grid gap-3 md:grid-cols-3 px-4">
              <div className="flex flex-col gap-3 md:grid-cols-1">
                {objectState.Furniture.map((item, index) => {
                  console.log("item", item);
                  return (
                    <>
                      {item.title === "Cupboard" ? (
                        <Tooltip
                          placement="left"
                          title={"Click on a card to add an item of that type"}
                          defaultOpen={true}
                        >
                          <Card
                            image={item.image}
                            key={index}
                            item={item.title}
                            itemCount={item.count}
                            onDecrement={decrementHandler.bind(
                              null,
                              "Furniture",
                              item
                            )}
                            onClick={clickHandler.bind(null, "Furniture", item)}
                          />
                        </Tooltip>
                      ) : (
                        <Card
                          image={item.image}
                          key={index}
                          item={item.title}
                          itemCount={item.count}
                          onDecrement={decrementHandler.bind(
                            null,
                            "Furniture",
                            item
                          )}
                          onClick={clickHandler.bind(null, "Furniture", item)}
                        />
                      )}
                    </>
                  );
                })}
              </div>
              <div className="flex flex-col gap-3 md:grid-cols-1">
                {objectState.Electronic.map((item, index) => (
                  <Card
                    image={item.image}
                    key={index}
                    item={item.title}
                    itemCount={item.count}
                    onDecrement={decrementHandler.bind(
                      null,
                      "Electronic",
                      item
                    )}
                    onClick={clickHandler.bind(null, "Electronic", item)}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-3 md:grid-cols-1">
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
          <div className="mt-6 ">
            <div className="flex justify-start mr-5 mt-5 mb-2 space-x-5 pl-5">
              <button
                className="button_2_skip rounded-m px-10 py-2"
                type="button"
                onClick={handleSkip}
              >
                SKIP
              </button>
              <button
                className="button_3 rounded-m px-10 py-2 "
                type="button"
                onClick={handleSubmit}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE Responsive */}

      <div className="block md:hidden lg:hidden xl:hidden">
        <Collapse
          defaultActiveKey={["1"]}
          ghost
          className=" text-2xl steps_text_color"
        >
          <Panel header="Furniture" key="1">
            {form1()}
          </Panel>
        </Collapse>

        <Collapse
          defaultActiveKey={["1"]}
          ghost
          className="  text-2xl steps_text_color"
        >
          <Panel header="Electronic" key="1">
            {form2()}
          </Panel>
        </Collapse>

        <Collapse
          defaultActiveKey={["1"]}
          ghost
          className=" text-2xl steps_text_color"
        >
          <Panel header="Vehicle" key="1">
            {form3()}
          </Panel>
        </Collapse>

        <div className="mt-6 ">
          <div className="mt-5 mb-5 flex flex-row mx-5 justify-between">
            <button
              className="px-5 py-4  buttonMobile_white rounded-m "
              type="button"
              onClick={handleSkip}
            >
              SKIP
            </button>
            <button
              className="px-5 py-4  buttonMobile2 rounded-m  "
              type="button"
              onClick={handleSubmit}
            >
              NEXT
            </button>
          </div>
        </div>
        {/* <div className="flex justify-between mx-5  mb-5 text-sm ">
          <span className="step3_skip-text">Skip for now</span>
          <span className="step3_save_draft-text">Save Deaft</span>
        </div> */}
      </div>
    </>

    // <div>

    //   <div className="b1">
    //     <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 mt-3 bg-white rounded-lg h-14">
    //       <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
    //         Set up 0% complete
    //       </div>
    //       <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
    //         3 Step left • About 6 min
    //       </div>
    //     </div>
    //     <hr className="step3_line" />

    //     {/* details */}

    //     <div className="  r1 r4 mt-2 bg-white step3_container  rounded-lg ">

    // <div className=" flex flex-col justify-between items-left p-0 gap-2.5  top-36 r4 mt-3 pl-2 ">
    //   <div className="step3_heading font-medium pl-2">
    //     What are the major item you want to move?
    //   </div>
    //   <div className=" pl-2">
    //     to save you the trouble, we have pre-selected this list.
    //   </div>
    // </div>

    // <form className="max-w-screen-xl m-auto">
    //   <div className="grid gap-8 lg:grid-cols-3 mt-4 ">
    //     {uniqueCategories.map((item, i) => {
    //       return (
    //         <div key={i}>
    //           <h3 className="text-2xl text-center text-gray-600">{item}</h3>
    //         </div>
    //       );
    //     })}
    //   </div>
    //   <div className="grid gap-3 md:grid-cols-3 px-4">
    //     <div className="flex flex-col gap-3 md:grid-cols-1">
    //       {objectState.Furniture.map((item, index) => {
    //         console.log("item", item);
    //         return (
    //           <Card
    //             image={item.image}
    //             key={index}
    //             item={item.title}
    //             itemCount={item.count}
    //             onDecrement={decrementHandler.bind(null, "Furniture", item)}
    //             onClick={clickHandler.bind(null, "Furniture", item)}
    //           />
    //         );
    //       })}
    //     </div>
    //     <div className="flex flex-col gap-3 md:grid-cols-1">
    //       {objectState.Electronic.map((item, index) => (
    //         <Card
    //           image={item.image}
    //           key={index}
    //           item={item.title}
    //           itemCount={item.count}
    //           onDecrement={decrementHandler.bind(null, "Electronic", item)}
    //           onClick={clickHandler.bind(null, "Electronic", item)}
    //         />
    //       ))}
    //     </div>
    //     <div className="flex flex-col gap-3 md:grid-cols-1">
    //       {objectState.Vehicle.map((item, index) => (
    //         <Card
    //           image={item.image}
    //           key={index}
    //           item={item.title}
    //           itemCount={item.count}
    //           onDecrement={decrementHandler.bind(null, "Vehicle", item)}
    //           onClick={clickHandler.bind(null, "Vehicle", item)}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </form>
    // <div className="mt-6 ">

    //   <div className="flex justify-start mr-5 mt-5 mb-2 space-x-5 pl-5">
    //     <button
    //       className="button_2_skip rounded-m px-10 py-2"
    //       type="button"
    //       onClick={handleSkip}
    //     >
    //       SKIP
    //     </button>
    //     <button
    //       className="button_3 rounded-m px-10 py-2 "
    //       type="button"
    //       onClick={handleSubmit}
    //     >
    //       NEXT
    //     </button>
    //   </div>
    //         <div className="flex justify-start mr-5 pl-5 mb-5 text-sm ">
    //           {/* <FontAwesomeIcon
    //           icon={fa["faSearch"]}
    //           style={{ fontSize: 20, color: "blue" }}
    //         /> */}
    //           <p>Do you know you can save this progress</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div>
    // <div className="flex justify-end mr-5 mt-5 mb-2 space-x-5">
    //   <button
    //     className="bg-gray-100 hover:bg-blue-400 text-white-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
    //     type="button"
    //     onClick={handleSkip}
    //   >
    //     SKIP
    //   </button>
    //   <button
    //     className="bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
    //     type="button"
    //     onClick={handleSubmit}
    //   >
    //     NEXT
    //   </button>
    // </div>
    // <div className="flex justify-end mr-5  mb-5 text-sm ">
    //   {/* <FontAwesomeIcon
    //     icon={fa["faSearch"]}
    //     style={{ fontSize: 20, color: "blue" }}
    //   /> */}
    //   <p>Do you know you can save this progress</p>
    // </div>

    //   <form className="max-w-screen-xl m-auto py-10 px-5">
    //     <div className="grid gap-8 lg:grid-cols-3">
    //       {uniqueCategories.map((item, i) => {
    //         return (
    //           <div className="px-4 py-4" key={i}>
    //             <h3 className="text-2xl text-center text-gray-600">{item}</h3>
    //           </div>
    //         );
    //       })}
    //     </div>

    //     <div className="grid gap-8 md:grid-cols-3 mt-5">
    //       <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
    //         {objectState.Furniture.map((item, index) => {
    //           console.log("item", item);
    //           return (
    //             <Card
    //               image={item.image}
    //               key={index}
    //               item={item.title}
    //               itemCount={item.count}
    //               onDecrement={decrementHandler.bind(null, "Furniture", item)}
    //               onClick={clickHandler.bind(null, "Furniture", item)}
    //             />
    //           );
    //         })}
    //       </div>
    //       <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
    //         {objectState.Electronic.map((item, index) => (
    //           <Card
    //             image={item.image}
    //             key={index}
    //             item={item.title}
    //             itemCount={item.count}
    //             onDecrement={decrementHandler.bind(null, "Electronic", item)}
    //             onClick={clickHandler.bind(null, "Electronic", item)}
    //           />
    //         ))}
    //       </div>
    //       <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
    //         {objectState.Vehicle.map((item, index) => (
    //           <Card
    //             image={item.image}
    //             key={index}
    //             item={item.title}
    //             itemCount={item.count}
    //             onDecrement={decrementHandler.bind(null, "Vehicle", item)}
    //             onClick={clickHandler.bind(null, "Vehicle", item)}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Step3;
