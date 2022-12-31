import React, { useEffect, useState, useContext } from "react";
import Card from "../../Card";
import itemList from "../../../data/otherItemList.json";
import TransportContext from "../../../context";
import { useRouter } from "next/router";
import {
  misItem,
  step5Item,
  cft,
} from "../../../services/customer-api-service";
import { Collapse } from "antd";
const { Panel } = Collapse;
import { Button, Modal, Space } from "antd";
import useAuth from "../../../hooks/useAuth";
const Step5 = () => {
  const { bookingInfo, saveBooking, customer } = useAuth();
  const [step4CFT, setStep4CFT] = useState(0);
  const ctx = useContext(TransportContext);
  const router = useRouter();
  const { customerDetails } = ctx;
  const { booking } = ctx;
  const { step1State } = ctx;
  const { step2State } = ctx;
  const { step3State } = ctx;
  const { step4State, setStep4State } = ctx;
  const { step5State } = ctx;
  // console.log("customerDetails -- ", customerDetails);
  // console.log("context.booking -- ", booking);
  // console.log("context.step1State -- ", step1State);
  // console.log("context.step2State -- ", step2State);
  // console.log("context.step3State -- ", step3State);
  // console.log("context.step4State -- ", step4State);
  // console.log("context.step5State -- ", step5State);
  // const [cftTotal, setCftTotal] = useState(Number(bookingInfo?.cft));
  const [cftTotal, setCftTotal] = useState(0);
  console.log("cft -", step4State?.cft);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const bookingId = booking?.bookingId;
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
        {
          title: item["Item"],
          image: `/images/${item.Image}`,
          cft: item["CFT"],
        },
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
          cft: item["CFT"],
        });
      }
    }
  });

  // debugger;
  const [objectState, setObjectState] = useState(
    step5State || {
      ...items,
    }
  );
  console.log("items - ", items);
  console.log("objectState - ", objectState);

  useEffect(() => {
    debugger;
    if (!step4State) return;
    let cftTot = 0;
    for (const i = 0; i < Object.keys(step4State).length; i++) {
      const catResults = step4State[Object.keys(step4State)[i]];
      debugger;
      if (catResults?.length) {
        cftTot += catResults.reduce((sum, val) => {
          debugger;

          return sum + val?.cft || 0;
        }, 0);
      }
    }
    setStep4CFT(cftTot);
    setCftTotal(cftTot);
    console.log("cftdata5 - ", cftTotal);
  }, [step4State]);

  useEffect(() => {
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
    console.log("bookingInfo in step5 is ", bookingInfo);
    //setCftTotal(Number(booking?.cft))
  }, [bookingInfo]);
  useEffect(() => {
    //debugger;
    if (!step5State) return;
    setObjectState((prev) => {
      const newState = { ...prev };
      const keys = Object.keys(step5State);
      keys.forEach((k) => {
        newState[k] = newState[k]?.map((i) => {
          console.log(" title - ", i.title);
          console.log(" title - ", i.count);
          return i;
        });
      });
      return newState;
    });
  }, []);

  // console.log("objectState", objectState);
  const clickHandler = (key, item) => {
    const newState = { ...objectState };
    const newArray = [];
    const sumOfCFT = cftTotal || 0;
    // debugger;
    const arr = [...newState[key]];
    arr?.forEach((i) => {
      if (i.title === item.title) {
        i.count = i.count + 1;
        console.log("item - ", item);
        sumOfCFT += item?.cft || 0;
      }
      newArray.push(i);
    });
    console.log("called");
    newState[key] = newArray;
    setCftTotal(sumOfCFT);
    setObjectState(newState);
    // ctx.setStep5State(newState);
  };
  const decrementHandler = (key, item) => {
    const newState = { ...objectState };
    const newArray = [];
    const sumOfCFT = cftTotal;
    // debugger;
    const arr = [...newState[key]];
    arr?.forEach((i) => {
      if (i.title === item.title && i.count !== 0) {
        i.count = i.count - 1;
        sumOfCFT -= item?.cft || 0;
      }
      newArray.push(i);
    });
    console.log("called");
    newState[key] = newArray;
    setObjectState(newState);
    setCftTotal(sumOfCFT);
    //ctx.setStep5State(newState);
  };

  const handleSkip = () => {
    router.push("/order/step7");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ----------------------
    //debugger;
    await step5Item({
      bookingId: step2State?.bookingId,
      step5: { ...objectState },
    });
    // await step5Item({ ...objectState });
    let result = await callApi();
    if (result.data.status) {
      // bookingConformation()
      setIsBookingConfirmed(true);

      console.log("Booking result is", result);
      //  setBooking(result.data);
    }
    console.log("objectState", objectState);
    ctx.setStep5State(objectState);
    const sum = cftTotal + step4CFT;
    const cftData = { cft: sum };
    console.log("cftData - ", cftData);
    setStep4State(cftData);
    await cft({
      bookingId: step2State?.bookingId,
      cft: sum,
    });
    console.log("step5State - 5", ctx.step5State);
    // router.push("/order/step6");
    saveBooking({ ...bookingInfo, step5: objectState });
  };

  const callApi = async () => {
    let arr = [];
    Object.keys(objectState).forEach((key) => {
      arr = [...arr, ...objectState[key]];
    });

    const objCreated = {};
    arr.forEach((item) => {
      //const key = item.title.replace("/", " ");
      // debugger;
      const key = item.title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
      const items = key.split(" ");
      let newKey = "";
      items.forEach((i, index) => {
        if (index === 0) {
          newKey += i.toLowerCase();
        } else {
          newKey += i.toLowerCase();
        }
      });
      // const newKey = items.join("");
      //debugger;
      objCreated[newKey] = item;
    });
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

    return await misItem({
      bookingId: bookingId,
      customerId: customerDetails?.customerId,
      ...objCreated,
    });
  };
  const handleOk = () => {
    setIsBookingConfirmed(false);
    // router.push("/order/currentOrder");
    router.push("/order/step7");
  };
  const bookingConformation = () => {
    Modal.success({
      content: (
        <div className="flex items-center justify-center flex-col  ">
          <div>
            <img
              className=""
              src="/images/check_circle.jpg"
              itemProp="image"
              alt="Image"
            />
          </div>

          <div className=" greencolor text-3xl text-center mt-12 font-bold ">
            Well done
          </div>

          <div className="steps_detail_text_color text-center text-base mt-2 font-semibold">
            Virtual Survey 100% complete
          </div>

          {/* <div className="text-center steps_detail_text_color mt-6">for a 2 BHK, we are offering 25 cartoon boxes as complimentary which are required for packing of clothes, kitchen item and other miscellaneous items.</div> */}
        </div>
      ),
    });
  };

  return (
    <>
      {/* completeBAR */}
      <div>
        <Modal open={isBookingConfirmed} onOk={handleOk} footer={null}>
          <div className="flex items-center justify-center flex-col  ">
            <div>
              <img
                className=""
                src="/images/check_circle.jpg"
                itemProp="image"
                alt="Image"
              />
            </div>

            <div className=" greencolor text-3xl text-center mt-12 font-bold ">
              Well done
            </div>

            <div className="steps_detail_text_color text-center text-base mt-2 font-semibold">
              Virtual Survey 100% complete
            </div>
            <br />
            <Button onClick={handleOk}>Ok, i got it</Button>
            {/* <div className="text-center steps_detail_text_color mt-6">for a 2 BHK, we are offering 25 cartoon boxes as complimentary which are required for packing of clothes, kitchen item and other miscellaneous items.</div> */}
          </div>
        </Modal>
        <div className=" flex flex-col items-center  gap-2.5 py-5  bg-white MoblieCompletePersentage md:hidden lg:hidden xl:hidden">
          <div className="completepersentage  font-semibold text-3xl completing_bar_text">
            Virtual Survey 80% complete
          </div>
          <div className="not-italic ">
            <span className=" font-semibold">1 Step left •</span>
            <span> About 1 min</span>
          </div>
          <div className="CFT_box_step5 px-3 py-1">
            <span className="CFT_box-text1_step5">CFT </span>
            <span className="CFT_box-text1_step5 font-bold">{cftTotal}</span>
          </div>
        </div>
      </div>

      {/* mobile responsive  */}

      <div className="hidden ResponsiveMobile">
        <div className="px-16 py-8   font-semibold text-center text-xl steps_text_color">
          Do you want to move any of this item?
        </div>
        <div className="mt-2">
          <Collapse
            defaultActiveKey={["1"]}
            ghost
            className="pl-4 text-2xl steps_text_color"
          >
            <Panel header="Utility" key="1">
              <form className="max-w-screen-xl m-auto px-4">
                <div className="mt-5">
                  <div className="flex flex-col gap-2 grid-cols-1 mt-5">
                    {objectState.Utility.map((item, index) => {
                      console.log("utility item -", item);
                      return (
                        <Card
                          image={item.image}
                          key={index}
                          item={item.title}
                          itemCount={item.count}
                          onDecrement={decrementHandler.bind(
                            null,
                            "Utility",
                            item
                          )}
                          onClick={clickHandler.bind(null, "Utility", item)}
                        />
                      );
                    })}
                  </div>
                </div>
              </form>
            </Panel>
          </Collapse>

          <Collapse
            defaultActiveKey={["1"]}
            ghost
            className="pl-4 text-2xl steps_text_color"
          >
            <Panel header="Home Appliances" key="1">
              <form className="max-w-screen-xl m-auto px-4">
                <div className="mt-5">
                  <div className="flex flex-col gap-2 grid-cols-1 mt-5">
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
                        onClick={clickHandler.bind(
                          null,
                          "HomeAppliances",
                          item
                        )}
                      />
                    ))}
                  </div>
                </div>
              </form>
            </Panel>
          </Collapse>

          <Collapse
            defaultActiveKey={["1"]}
            ghost
            className="pl-4 text-2xl steps_text_color"
          >
            <Panel header="Special care items" key="1">
              <form className="max-w-screen-xl m-auto px-4">
                <div className="mt-5">
                  <div className="flex flex-col gap-2 grid-cols-1 mt-5">
                    {objectState.CareItems.map((item, index) => (
                      <Card
                        image={item.image}
                        key={index}
                        item={item.title}
                        itemCount={item.count}
                        onDecrement={decrementHandler.bind(
                          null,
                          "CareItems",
                          item
                        )}
                        onClick={clickHandler.bind(null, "CareItems", item)}
                      />
                    ))}
                  </div>
                </div>
              </form>
            </Panel>
          </Collapse>

          <Collapse
            defaultActiveKey={["1"]}
            ghost
            className="pl-4 text-2xl steps_text_color"
          >
            <Panel header="Fun and Fitness" key="1">
              <form className="max-w-screen-xl m-auto px-4">
                <div className="mt-5">
                  <div className="flex flex-col gap-2 grid-cols-1 mt-5">
                    {objectState.Fitness.map((item, index) => (
                      <Card
                        image={item.image}
                        key={index}
                        item={item.title}
                        itemCount={item.count}
                        onDecrement={decrementHandler.bind(
                          null,
                          "Fitness",
                          item
                        )}
                        onClick={clickHandler.bind(null, "Fitness", item)}
                      />
                    ))}
                  </div>
                </div>
              </form>
            </Panel>
          </Collapse>

          <div className="flex justify-start pl-5 mr-5 mt-8 mb-2 space-x-5">
            <button
              className="button_3 border px-16 py-2 font-semibold text-sm rounded shadow-lg"
              type="button"
              onClick={handleSubmit}
            >
              NEXT
            </button>
          </div>
          <div className="flex justify-start pl-5 mr-5  mb-5 text-sm ">
            <p>Do you know you can save this progress</p>
          </div>
        </div>
      </div>

      {/* Laptop responsive */}

      <div className=" hidden ResponsiveLatop ResponsiveTab">
        <div className="b1">
          <div>
            <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 mt-3 bg-white rounded-lg h-12">
              <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
                Virtual Survey 80% complete
              </div>
              <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
                1 Step left • About 1 min{" "}
                <span className="CFT_box_step5 px-2 py-1 ml-1">
                  <span className="CFT_box-text1_step5">CFT </span>
                  <span className="CFT_box-text1_step5 font-bold">
                    {cftTotal}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4  bg-white rounded-lg ">
              <div>
                <hr className="step5-line" />
              </div>
            </div>
          </div>

          {/* details */}

          <div className=" b1 r1 r4 mt-2 bg-white step5_container  rounded-lg ">
            <div className=" flex flex-col justify-between items-left p-0 gap-2.5  top-36 r4 mt-3 pl-2 ">
              <div className="step3_heading font-medium pl-2">
                Do you want to move any of these items?
              </div>
            </div>

            <form className="max-w-screen-xl m-auto">
              <div className="grid gap-8 lg:grid-cols-4 mt-2 ">
                {uniqueCategories.map((item, i) => {
                  return (
                    <div className="px-4 pt-4 pb-2" key={i}>
                      <h3 className="text-2xl text-center text-gray-600">
                        {item}
                      </h3>
                    </div>
                  );
                })}
              </div>
              <div className="grid gap-3 md:grid-cols-4 px-4">
                <div className="flex flex-col gap-2 md:grid-cols-1">
                  {objectState.Utility.map((item, index) => {
                    console.log("item", item);
                    return (
                      <Card
                        image={item.image}
                        key={index}
                        item={item.title}
                        itemCount={item.count}
                        onDecrement={decrementHandler.bind(
                          null,
                          "Utility",
                          item
                        )}
                        onClick={clickHandler.bind(null, "Utility", item)}
                      />
                    );
                  })}
                </div>
                <div className="flex flex-col gap-2 md:grid-cols-1">
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
                <div className="flex flex-col gap-2 md:grid-cols-1">
                  {objectState.CareItems.map((item, index) => (
                    <Card
                      image={item.image}
                      key={index}
                      item={item.title}
                      itemCount={item.count}
                      onDecrement={decrementHandler.bind(
                        null,
                        "CareItems",
                        item
                      )}
                      onClick={clickHandler.bind(null, "CareItems", item)}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2 md:grid-cols-1">
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
                  className="button_3 rounded-m px-10 py-2"
                  type="button"
                  onClick={handleSubmit}
                >
                  NEXT
                </button>
              </div>
              <div className="flex justify-start mr-5 pl-5 mb-5 text-sm ">
                {/* <FontAwesomeIcon
                icon={fa["faSearch"]}
                style={{ fontSize: 20, color: "blue" }}
              /> */}
                <p>Do you know you can save this progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

    // <div
    //   className="flex items-center justify-center flex-col m-4 py-3 px-7 bg-white rounded-3xl  col-span-1 ">
    //   <div className="mt-16">
    //   <img
    //         className=""
    //         src="/images/check_circle.jpg"
    //         itemProp="image"
    //         alt="Image"
    //       />
    //   </div>

    //   <div className=" greencolor text-3xl text-center mt-12 font-bold ">Well done</div>

    //   <div className="steps_detail_text_color text-center text-base mt-2 font-semibold">Set up 100% complete</div>

    //   <div className="text-center steps_detail_text_color mt-6">for a 2 BHK, we are offering 25 cartoon boxes as complimentary which are required for packing of clothes, kitchen item and other miscellaneous items.</div>

    // </div>

    // <div>
    //   <div className="flex justify-start m-2 text-sm ">
    //     <p>Do you want to move any of these items?</p>
    //   </div>

    //   <div className="flex justify-end mr-5 mt-5 mb-2 space-x-5">
    // <button
    //   className="bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
    //   type="button"
    //   onClick={handleSubmit}
    // >
    //   NEXT
    // </button>
    //   </div>
    //   <div className="flex justify-end mr-5  mb-5 text-sm ">
    //     <p>Do you know you can save this progress</p>
    //   </div>
    // <form className="max-w-screen-xl m-auto py-10 px-5">
    //   <div className="grid gap-8 lg:grid-cols-4">
    // {uniqueCategories.map((item, i) => {
    //   return (
    //     <div className="px-4 py-4" key={i}>
    //       <h3 className="text-2xl text-center text-gray-600">{item}</h3>
    //     </div>
    //   );
    // })}
    //   </div>

    //   <div className="grid gap-8 md:grid-cols-4 mt-5">
    //     <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
    // {objectState.Utility.map((item, index) => {
    //   console.log("item", item);
    //   return (
    //     <Card
    //       image={item.image}
    //       key={index}
    //       item={item.title}
    //       itemCount={item.count}
    //       onDecrement={decrementHandler.bind(null, "Utility", item)}
    //       onClick={clickHandler.bind(null, "Utility", item)}
    //     />
    //   );
    // })}
    //     </div>
    //     <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
    // {objectState.HomeAppliances.map((item, index) => (
    //   <Card
    //     image={item.image}
    //     key={index}
    //     item={item.title}
    //     itemCount={item.count}
    //     onDecrement={decrementHandler.bind(
    //       null,
    //       "HomeAppliances",
    //       item
    //     )}
    //     onClick={clickHandler.bind(null, "HomeAppliances", item)}
    //   />
    // ))}
    //     </div>
    //     <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
    // {objectState.CareItems.map((item, index) => (
    //   <Card
    //     image={item.image}
    //     key={index}
    //     item={item.title}
    //     itemCount={item.count}
    //     onDecrement={decrementHandler.bind(null, "CareItems", item)}
    //     onClick={clickHandler.bind(null, "CareItems", item)}
    //   />
    // ))}
    //     </div>

    //     <div className="flex flex-col gap-8 md:grid-cols-1 mt-5">
    // {objectState.Fitness.map((item, index) => (
    //   <Card
    //     image={item.image}
    //     key={index}
    //     item={item.title}
    //     itemCount={item.count}
    //     onDecrement={decrementHandler.bind(null, "Fitness", item)}
    //     onClick={clickHandler.bind(null, "Fitness", item)}
    //   />
    // ))}
    //     </div>
    //   </div>
    // </form>
    // </div>
  );
};

export default Step5;
