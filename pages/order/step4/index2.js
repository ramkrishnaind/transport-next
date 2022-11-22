import React, { useEffect, useState, useContext, useCallback } from "react";
import TransportContext from "../../../context";

import itemList from "../../../data/itemList.json";
import bikeList from "../../../data/bikeList.json";
import {
  bookingItem,
  step4Item,
  cft,
} from "../../../services/customer-api-service";
import { useRouter } from "next/router";
import useAuth from "../../../hooks/useAuth";
let objToAppend = [];
const bikeTransformed = [];
bikeList.forEach((bikeItem) => {
  bikeTransformed.push({
    Item: bikeItem?.Category,
    Image: bikeItem?.Image,
    Action1Image: bikeItem?.Image,
    Action2Image: bikeItem?.Image,
    Action3Image: null,
    Action4Image: null,
    Category: "Vehicle",
    "Action 1": bikeItem?.MAKE,
    "Action 2": bikeItem?.MODEL,
    "Action 3": null,
    "Action 4": null,
  });
});
const checkValuesEqual = (first, second) => {
  const keysFirst = Object.keys(first);
  if (keysFirst.length !== Object.keys(second).length) return false;
  const isEqual = true;
  for (const key of keysFirst) {
    if (first[key] !== second[key]) {
      isEqual = false;
      break;
    }
  }
  return isEqual;
};
const checkValueInList = (item, arr) => {
  const keysItem = Object.keys(item);
  const exist = false;
  arr.forEach((i) => {
    exist = true;
    keysItem.forEach((k) => {
      if (i[k] !== item[k]) {
        exist = false;
        return false;
      }
    });
  });
  return exist;
};

const categories = new Set([...itemList.map((i) => i.item), "Vehicle"]);
const getLevelOne = (category) => {
  const arrResult = [];
  [...itemList, ...bikeList]
    .filter((i) => i.item === category)
    .forEach((item) => {
      if (!checkValueInList(item, arrResult))
        arrResult.push({ item: item.item, image: item.image });
    });
  return arrResult;
};
const getLevelTwo = (category, level1) => {
  const arrResult = [];
  [...itemList, ...bikeList]
    .filter((i) => i.item === category && i["Action 1"] === level1)
    .forEach((item) => {
      if (!checkValueInList(item, arrResult))
        arrResult.push({
          item: item.item,
          image: item.image,
          cft: !item["Action 3"] ? item.CFT || 0 : 0,
          isLast: !item["Action 3"],
        });
    });
  return arrResult;
};
const getLevelThree = (category, level1, level2) => {
  const arrResult = [];
  [...itemList, ...bikeList]
    .filter(
      (i) =>
        i.item === category &&
        i["Action 1"] === level1 &&
        i["Action 2"] === level2
    )
    .forEach((item) => {
      if (!checkValueInList(item, arrResult))
        arrResult.push({
          item: item.item,
          image: item.image,
          cft: !item["Action 4"] ? item.CFT || 0 : 0,
          isLast: !item["Action 4"],
        });
    });
  return arrResult;
};
const getLevelFour = (category, level1, level2, level3) => {
  const arrResult = [];
  [...itemList, ...bikeList]
    .filter(
      (i) =>
        i.item === category &&
        i["Action 1"] === level1 &&
        i["Action 2"] === level2 &&
        i["Action 3"] === level3
    )
    .forEach((item) => {
      if (!checkValueInList(item, arrResult))
        arrResult.push({
          item: item.item,
          image: item.image,
          cft: item.CFT || 0,
          isLast: true,
        });
    });
  return arrResult;
};
itemList.forEach((item) => {
  // const keys = Object.keys(itemToSet);

  let objItem = objToAppend.find((i) => i.key === item?.Item);
  if (!item?.Item) return;
  if (!objItem) {
    objToAppend.push({
      key: item?.Item,
      value: [],
      category: item?.Category,
      checked: false,
      currentIndex: -1,
      index: objToAppend.length,
      image: item?.Image,
    });
    // objItem = [];
  }
  objItem = objToAppend.find((i) => i.key === item?.Item);

  let objectAction1 = objItem.value.find((i) => i.key === item?.["Action 1"]);
  if (!objectAction1) {
    objItem.value.push({
      key: item?.["Action 1"],
      value: [],
      checked: false,
      currentIndex: -1,
      image: item?.Action1Image,
      index: objItem.value.length,
    });
  }
  if (item?.["Action 2"]) {
    objectAction1 = objItem.value.find((i) => i.key === item?.["Action 1"]);
    let objectAction2 = objectAction1.value.find(
      (i) => i.key === item?.["Action 2"]
    );
    if (!objectAction2) {
      objectAction1.value.push({
        key: item?.["Action 2"],
        value: [],
        checked: false,
        currentIndex: -1,
        image: item?.Action2Image,
        index: objectAction1.value.length,
      });
    }
    if (item?.["Action 3"]) {
      objectAction2 = objectAction1.value.find(
        (i) => i.key === item?.["Action 2"]
      );

      let objectAction3 = objectAction2.value.find(
        (i) => i.key === item?.["Action 3"]
      );
      if (!objectAction3) {
        objectAction2.value.push({
          key: item?.["Action 3"],
          value: [],
          checked: false,
          currentIndex: -1,
          image: item?.Action3Image,
          index: objectAction2.value.length,
        });
      }
      if (item?.["Action 4"]) {
        objectAction3 = objectAction2.value.find(
          (i) => i.key === item?.["Action 3"]
        );
        let objectAction4 = objectAction3.value.find(
          (i) => i === item?.["Action 4"]
        );
        if (!objectAction4) {
          objectAction3.value.push({
            key: item?.["Action 4"],
            checked: false,
            currentIndex: -1,
            image: item?.Action4Image,
            index: objectAction3.value.length,
          });
        }
      }
    }
  }
});
bikeTransformed.forEach((item) => {
  // const keys = Object.keys(itemToSet);

  let objItem = objToAppend.find((i) => i.key === item?.Item);
  if (!item?.Item) return;
  if (!objItem) {
    objToAppend.push({
      key: item?.Item,
      value: [],
      category: item?.Category,
      checked: false,
      currentIndex: -1,
      index: objToAppend.length,
      image: item?.Image,
    });
    // objItem = [];
  }
  objItem = objToAppend.find((i) => i.key === item?.Item);

  let objectAction1 = objItem.value.find((i) => i.key === item?.["Action 1"]);
  if (!objectAction1) {
    objItem.value.push({
      key: item?.["Action 1"],
      value: [],
      checked: false,
      currentIndex: -1,
      image: item?.Action1Image,
      index: objItem.value.length,
    });
  }
  if (item?.["Action 2"]) {
    objectAction1 = objItem.value.find((i) => i.key === item?.["Action 1"]);
    let objectAction2 = objectAction1.value.find(
      (i) => i.key === item?.["Action 2"]
    );
    if (!objectAction2) {
      objectAction1.value.push({
        key: item?.["Action 2"],
        value: [],
        checked: false,
        currentIndex: -1,
        image: item?.Action2Image,
        index: objectAction1.value.length,
      });
    }
    if (item?.["Action 3"]) {
      objectAction2 = objectAction1.value.find(
        (i) => i.key === item?.["Action 2"]
      );

      let objectAction3 = objectAction2.value.find(
        (i) => i.key === item?.["Action 3"]
      );
      if (!objectAction3) {
        objectAction2.value.push({
          key: item?.["Action 3"],
          value: [],
          checked: false,
          currentIndex: -1,
          image: item?.Action3Image,
          index: objectAction2.value.length,
        });
      }
      if (item?.["Action 4"]) {
        objectAction3 = objectAction2.value.find(
          (i) => i.key === item?.["Action 3"]
        );
        let objectAction4 = objectAction3.value.find(
          (i) => i === item?.["Action 4"]
        );
        if (!objectAction4) {
          objectAction3.value.push({
            key: item?.["Action 4"],
            checked: false,
            currentIndex: -1,
            image: item?.Action4Image,
            index: objectAction3.value.length,
          });
        }
      }
    }
  }
});
const Step4 = (props) => {
  const { bookingInfo, saveBooking, customer } = useAuth();
  const router = useRouter();
  const [state, setState] = useState([]);
  const [items, setItems] = useState([]);
  const [stateData, setStateData] = useState([]);
  const checkKeyExist = (object, key) => {};
  const [currentHeader, setCurrentHeader] = useState();
  const [currentItem, setCurrentItem] = useState();
  const itemToSet = {};
  const ctx = useContext(TransportContext);
  const { step3State, step2State } = ctx;
  const { step4State, setStep4State } = ctx;
  console.log("ctx.step3State - ", ctx.step3State);
  const [cftTotal, setCftTotal] = useState(0);
  const getStateData = () => {
    const result = [];
    const sumOfCFT = 0;
    const filteredItems = items.filter((i) => i.completed);
    filteredItems.forEach((i) => {
      const obj = {};
      obj.category = i.category;
      obj.item = i.key;
      i.value?.forEach((vi) => {
        if (vi.currentIndex == vi.index) {
          obj.Action1 = vi.key;
          vi.value?.forEach((vi2) => {
            if (vi2.currentIndex == vi2.index) {
              obj.Action2 = vi2.key;
              vi2.value?.forEach((vi3) => {
                if (vi3.currentIndex == vi3.index) {
                  obj.Action3 = vi3.key;
                  vi3.value?.forEach((vi4) => {
                    if (vi4.currentIndex == vi4.index) {
                      obj.Action4 = vi4.key;
                    }
                  });

                  if (!vi3?.value) {
                    obj.Action4 = null;
                  }
                }
              });
              if (!vi2?.value) {
                obj.Action3 = null;
                obj.Action4 = null;
              }
            }
          });
          if (!vi?.value) {
            obj.Action2 = null;
            obj.Action3 = null;
            obj.Action4 = null;
          }
        }
      });
      const itemData = itemList.find(
        (it) =>
          it?.Category === obj.category &&
          it?.Item === obj.item &&
          it?.["Action 1"] === obj.Action1 &&
          (!obj.Action2 || it?.["Action 2"] === obj.Action2) &&
          (!obj.Action3 || it?.["Action 3"] === obj.Action3) &&
          (!obj.Action4 || it?.["Action 4"] === obj.Action4)
      );
      obj.CFT = itemData?.CFT || 0;
      sumOfCFT += obj.CFT;
      result.push({ ...obj });
    });
    setCftTotal(sumOfCFT);
    setStateData(result);
  };
  console.log("stateDate", stateData);
  useEffect(getStateData, [items]);
  const resetState = (i) => {
    // i.currentIndex = -1;
    i.checked = false;
    if (i.value?.length > 0) {
      i.value?.forEach((valItem) => {
        resetState(valItem);
      });
    }
  };
  // console.log("objToAppend", objToAppend);
  const getCompletedCount = (key) => {
    const itemsCompleted = items.filter((i) => i.completed && i.key == key);
    //
    return itemsCompleted.reduce((prevValue, currValue) => {
      return ++prevValue;
    }, 0);
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
  const editHandler = (category, index) => {
    const newItems = [...items];
    newItems.forEach((i) => {
      if ((i.Category = category)) {
        if (i.index == index) {
          i.completed = false;
          resetState(i);
        }
      }
    });
    if (newItems && newItems.length > 0) {
      ctx.setStep4Items([...newItems]);
      setItems([...newItems]);
    }
  };
  useEffect(() => {
    console.log("bookingInfo in step4 is ", bookingInfo);
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
              // currentIndex: -1,
              completed: false,
            });
          }
        });
      });
    });
    if (arrayItems && arrayItems.length > 0) setItems(arrayItems);
    setState(arr);
  }, [step3State, getCopiedObject, bookingInfo]);
  //useEffect(() => {}, []);
  // console.log("currentHeader", currentHeader);

  const changeState = () => {
    setState("Sofasets");
  };
  useEffect(() => {
    debugger;
    if (ctx?.step4Items && ctx?.step4Items?.length > 0)
      setItems([...(ctx.step4Items || [])]);
  }, [ctx.step4Items]);
  const handleCarouselClick = (event, element) => {
    // event.stopPropagation();
    // console.log("event", event);
    // console.log("element", element);
    const arrSelected = items.filter(
      (it) => it.key === element.title && it.category === element.category
    );
    arrSelected = arrSelected.map((i) => {
      i.image = element.image;
      return i;
    });

    setCurrentHeader(arrSelected);
    // items.forEach((i) => {
    //   if (!i.completed && i.key !== element.key) {
    //     // if (i.index == index) {
    //     resetState(i);
    //     // }
    //   }
    // });
    // setDisplaysetCurrentHeader1("visible");
  };

  const handleFirstLevelItemClick = (event, index, element) => {
    //debugger;
    event.stopPropagation();
    let itemsNew = [...items];
    itemsNew = itemsNew.map((i) => {
      let item = { ...i };
      // item = getCopiedObject(item);
      if (
        item.key === element.key &&
        item.index === index &&
        item.category == element.category
      ) {
        // //debugger;
        item.checked = true;
        // item.currentIndex = index;
        if (item.value.length == 0) item.completed = true;
      } else if (
        item.key === element.key &&
        item.category == currentHeader[index].category
      ) {
        // item.currentIndex = index;
        item.checked = true;
      }
      return item;
    });
    //debugger;
    if (itemsNew && itemsNew.length > 0) {
      ctx.setStep4Items([...itemsNew]);
      setItems(itemsNew);
    }
    // itemsNew.forEach((i) => {
    //   if (!i.completed && i.key !== element.key) {
    //     if (i.index == index) {
    //       resetState(i);
    //     }
    //   }
    // });
  };
  const displaySecondLevelNew = (headerIndex) => {
    debugger;
    // const parentIndex = headerIndex;
    const contentSelected = items?.[headerIndex]?.value || [];

    return (
      // <div
      //   className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
      //   title={contentSelected?.[0]?.key}
      //   style={{ minHeight: "77.5vh" }}
      // >
      <div className="  px-3 py-4 ">
        <div>
          <select
            className=" bg-transparent  font-semibold"
            onChange={(e) => {
              // debugger;
              handleSecondLevelClick(
                e,
                headerIndex,
                e.target.selectedIndex,
                JSON.parse(e.target.value)
              );
            }}
          >
            <option value={""}>
              <div className="text-center text-sm">Select...</div>
            </option>
            {contentSelected.map((item, index) => {
              return (
                <option value={JSON.stringify(item)}>
                  {/* <div className="flex justify-center py-2 max-h-20 w-20">
                    <img src={`/images/${item?.image}`} alt="" />
                  </div> */}
                  <span className="text-center text-sm p-1">{item?.key}</span>
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );

    // );
  };
  const handleSecondLevelClick = (event, parentIndex, index, element) => {
    debugger;
    //debugger;
    event.stopPropagation();
    let itemsNew = [...items];
    let itemsSub = [...itemsNew[parentIndex].value] || [];

    // itemsNew.find(
    //   (i) =>
    //     i.checked && i.category == currentHeader[0].category
    // ).value || [];
    itemsSub = itemsSub.map((i) => {
      let item = { ...i };
      item = getCopiedObject(i);
      if (item.key === element.key && item.index === parentIndex) {
        item.checked = true;
        if (item.value.length == 0) {
          itemsNew[parentIndex].completed = true;
        }
        item.currentIndex = index;
      } else if (item.key === element.key) {
        item.currentIndex = index;
      }
      return item;
    });
    itemsNew[parentIndex].value = itemsSub;
    if (itemsNew && itemsNew.length > 0) {
      ctx.setStep4Items([...itemsNew]);
      setItems([...itemsNew]);
    }

    // debugger;
    // itemsSub.forEach((i) => {
    //   if (i.key !== element.key) {
    //     // if (i.index == index) {
    //     resetState(i);
    //     // }
    //   }
    // });
  };
  const displayThirdLevelNew = (headerIndex) => {
    const topIndex = headerIndex;

    let contentSelected;
    let contentText;
    const parentItem = items[headerIndex];
    const contentSelectedFirstLevel = items[headerIndex]?.value || [];
    const firstLevelIndex = headerIndex;
    if (contentSelectedFirstLevel.length > 0) {
      contentText = items[headerIndex]?.key;
      contentSelected = items[headerIndex]?.value || [];
    }

    return (
      // <div
      //   className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
      //   title={contentSelected?.[0]?.key}
      //   style={{ minHeight: "77.5vh" }}
      // >
      <div className="  px-3 py-4 ">
        <div>
          <select
            className=" bg-transparent  font-semibold"
            onChange={(e) => {
              handleThirdLevelClick(
                e,
                topIndex,
                firstLevelIndex,
                e.target.selectedIndex - 1,
                parentItem,
                JSON.parse(e.target.value)
              );
            }}
          >
            <option value={""}>
              <div className="text-center text-sm">Select</div>
            </option>
            {contentSelected.map((item, index) => {
              return (
                <option value={JSON.stringify(item)}>
                  <div className="flex justify-center py-2 max-h-20 w-20">
                    <img src={`/images/${item?.image}`} alt="" />
                  </div>
                  <div className="text-center text-sm">{item?.key}</div>
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );

    // );
  };
  const handleThirdLevelClick = (
    event,
    topIndex,
    parentIndex,
    index,
    parentElement,
    element
  ) => {
    event.stopPropagation();
    //debugger;
    let itemsNew = [...items];
    const itemsSub =
      items.find(
        (i) =>
          i.checked &&
          i.category == currentHeader[0].category &&
          i.key === parentElement.key
      )?.value || [];
    let itemsSubSub = itemsSub?.find((i) => i.checked)?.value || [];
    itemsSubSub = itemsSubSub.map((i) => {
      if (i.key === element.key && i.index === index) {
        i.checked = true;
        if (i.value.length == 0) {
          // //debugger;
          itemsNew.find(
            (iParent) =>
              iParent.index === iParent.currentIndex &&
              iParent.key === parentElement.key &&
              iParent.category == currentHeader[0].category
          ).completed = true;
        }
        i.currentIndex = index;
      } else if (i.key === element.key) {
        i.currentIndex = index;
      }

      return i;
    });
    if (itemsNew && itemsNew.length > 0) {
      ctx.setStep4Items([...itemsNew]);
      setItems([...itemsNew]);
    }

    itemsSubSub.forEach((i) => {
      if (i.key !== element.key) {
        // if (i.index == index) {
        resetState(i);
        // }
      }
    });
  };
  const handleFourthLevelClick = (event, index, parentItem, element) => {
    event.stopPropagation();
    let itemsNew = [...items];
    const itemsSub =
      itemsNew.find(
        (i) =>
          i.checked &&
          i.category == currentHeader[0].category &&
          i.key === parentItem.key
      )?.value || [];
    let itemsSubSub = itemsSub.find((i) => i.checked)?.value || [];
    let itemsSubSubSub = itemsSubSub.find((i) => i.checked)?.value || [];
    itemsSubSubSub = itemsSubSubSub.map((i) => {
      if (i.key === element.key && i.index === index) {
        i.checked = true;
        if (i.value.length == 0) {
          itemsNew.find(
            (iParent) =>
              iParent.index === iParent.currentIndex &&
              iParent.key === parentItem.key
          ).completed = true;
          // i.currentIndex = index;
        } else if (i.key === element.key) {
          // i.currentIndex = index;
        }
      }

      return i;
    });
    if (itemsNew && itemsNew.length > 0) {
      ctx.setStep4Items([...itemsNew]);
      setItems([...itemsNew]);
    }

    itemsSubSubSub.forEach((i) => {
      if (i.key !== element.key) {
        // if (i.index == index) {
        resetState(i);
        // }
      }
    });
  };
  const handleFifthLevelClick = (event, index, parentItem, element) => {
    event.stopPropagation();
    let itemsNew = [...items];
    const itemsSub =
      itemsNew.find(
        (i) =>
          i.checked &&
          i.category == currentHeader[0].category &&
          i.key === parentItem.key
      )?.value || [];
    let itemsSubSub = itemsSub.find((i) => i.checked)?.value || [];
    let itemsSubSubSub = itemsSubSub.find((i) => i.checked)?.value || [];
    let itemsSubSubSubSub = itemsSubSubSub.find((i) => i.checked)?.value || [];
    itemsSubSubSubSub = itemsSubSubSubSub.map((i) => {
      if (i.key === element.key && i.index === index) {
        i.checked = true;
        // if (i.value.length == 0) {
        itemsNew.find(
          (iParent) =>
            iParent.index === iParent.currentIndex &&
            iParent.key === parentItem.key
        ).completed = true;
        // i.currentIndex = index;
        // } else if (i.key === element.key) {
        //   i.currentIndex = index;
        // }
      }

      return i;
    });
    if (itemsNew && itemsNew.length > 0) {
      ctx.setStep4Items([...itemsNew]);
      setItems([...itemsNew]);
    }

    itemsSubSubSubSub.forEach((i) => {
      if (i.key !== element.key) {
        // if (i.index == index) {
        resetState(i);
        // }
      }
    });
  };
  // console.log("items", items);
  // const displayFirstLevel = (headerIndex) => {
  //   // const arr = [...Array(currentHeader.count).keys()];
  //   // console.log("length", arr.length);
  //   const contentSelected = items[headerIndex];
  //   return (
  //     <div
  //       className="flex-col flex h-full items-start justify-start flex-wrap px-2 overflow-auto py-8"
  //       title={currentHeader?.[0]?.key}
  //       style={{ minHeight: "77.5vh" }}
  //     >
  //       {contentSelected.map((item, index) => {
  //         return (
  //           <div
  //             key={index}
  //             className="px-2 cursor-pointer flex items-center mb-8 rounded shadow-md relative"
  //             title={item?.key}
  //             style={{
  //               backgroundColor: item?.completed
  //                 ? "lightgreen"
  //                 : item?.checked
  //                 ? "lightpink"
  //                 : "white",
  //             }}
  //             onClick={(e) => {
  //               if (!item?.completed) handleFirstLevelItemClick(e, index, item);
  //             }}
  //           >
  //             <div className="flex justify-center py-2 max-h-20 w-20">
  //               <img src={`${item?.image}`} alt="" />
  //             </div>
  //             {item?.completed && (
  //               <div
  //                 className="right-1 top-0 absolute"
  //                 style={{ maxHeight: 20, maxWidth: 20 }}
  //                 onClick={() => {
  //                   editHandler(item.category, index);
  //                 }}
  //               >
  //                 <img src={`/images/edit.png`} alt="" />
  //               </div>
  //             )}

  //             <div className="text-center text-sm">{item?.key}</div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };
  // const displaySecondLevel = (headerIndex) => {
  //   const parentIndex = items[headerIndex];
  //   const contentSelected =
  //     items.find(
  //       (i) =>
  //         i.checked && !i.completed && i.category == currentHeader[0].category
  //     )?.value || [];

  //   return (
  //     <div
  //       className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
  //       title={contentSelected?.[0]?.key}
  //       style={{ minHeight: "77.5vh" }}
  //     >
  //       {contentSelected.map((item, index) => {
  //         return (
  //           <div
  //             key={index}
  //             className="px-2 cursor-pointer flex items-center mb-8 rounded shadow-md"
  //             title={item?.key}
  //             style={{
  //               minWidth: 220,
  //               backgroundColor: item?.checked ? "lightpink" : "white",
  //             }}
  //             onClick={(e) =>
  //               handleSecondLevelClick(e, parentIndex, index, item)
  //             }
  //           >
  //             <div className="flex justify-center py-2 max-h-20 w-20">
  //               <img src={`/images/${item?.image}`} alt="" />
  //             </div>
  //             <div className="text-center text-sm">{item?.key}</div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  // const displayThirdLevel = (headerIndex) => {
  //   const topIndex = items[headerIndex];

  //   let contentSelected;
  //   let contentText;
  //   const parentItem = items.find((i) => i.checked && !i.completed);
  //   const contentSelectedFirstLevel =
  //     items.find((i) => i.checked && !i.completed)?.value || [];
  //   const firstLevelIndex = contentSelectedFirstLevel.findIndex(
  //     (i) => i.checked
  //   );
  //   if (contentSelectedFirstLevel.length > 0) {
  //     contentText = items.find((i) => i.checked)?.key;
  //     contentSelected =
  //       contentSelectedFirstLevel.find((i) => i.checked)?.value || [];
  //   }
  //   return (
  //     <div
  //       className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
  //       title={contentText}
  //       style={{ minHeight: "77.5vh" }}
  //     >
  //       {contentSelected?.map((item, index) => {
  //         return (
  //           <div
  //             key={index}
  //             className="px-2 cursor-pointer flex items-center mb-8 rounded shadow-md"
  //             title={item?.key}
  //             style={{
  //               minWidth: 220,
  //               backgroundColor: item?.checked ? "lightpink" : "white",
  //             }}
  //             onClick={(e) => {
  //               handleThirdLevelClick(
  //                 e,
  //                 topIndex,
  //                 firstLevelIndex,
  //                 index,
  //                 parentItem,
  //                 item
  //               );
  //             }}
  //           >
  //             <div className="flex justify-center py-2 max-h-20 w-20">
  //               <img src={`/images/${item?.image}`} alt="" />
  //             </div>
  //             <div className="text-center text-sm">{item?.key}</div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  // const displayFourthLevel = (headerIndex) => {
  //   let contentSelected;
  //   let contentText;
  //   const parentItem = items[headerIndex];
  //   const contentSelectedFirstLevel =
  //     items.find((i) => i.checked && !i.completed)?.value || [];

  //   if (contentSelectedFirstLevel.length > 0) {
  //     // contentText = items.find((i) => i.checked)?.key;
  //     const contentSelectedSecondLevel =
  //       contentSelectedFirstLevel.find((i) => i.checked)?.value || [];
  //     if (contentSelectedSecondLevel.length > 0) {
  //       contentText = contentSelectedFirstLevel.find((i) => i.checked)?.key;
  //       contentSelected =
  //         contentSelectedSecondLevel.find((i) => i.checked)?.value || [];
  //     }
  //   }

  //   return (
  //     <div
  //       className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
  //       title={contentText}
  //       style={{ minHeight: "77.5vh" }}
  //     >
  //       {contentSelected?.map((item, index) => {
  //         return (
  //           <div
  //             key={index}
  //             className="px-2 cursor-pointer flex items-center mb-8 rounded shadow-md"
  //             title={item?.key}
  //             style={{
  //               minWidth: 220,
  //               backgroundColor: item?.checked ? "lightpink" : "white",
  //             }}
  //             onClick={(e) =>
  //               handleFourthLevelClick(e, index, parentItem, item)
  //             }
  //           >
  //             <div className="flex justify-center py-2 max-h-20 w-20">
  //               <img src={`/images/${item?.image}`} alt="" />
  //             </div>
  //             <div className="text-center text-sm">{item?.key}</div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };
  // const displayFifthLevel = (headerIndex) => {
  //   let contentSelected;
  //   let contentText;
  //   const parentItem = items[headerIndex];
  //   const contentSelectedFirstLevel =
  //     items.find((i) => i.checked && !i.completed)?.value || [];

  //   if (contentSelectedFirstLevel.length > 0) {
  //     // contentText = items.find((i) => i.checked)?.key;
  //     const contentSelectedSecondLevel =
  //       contentSelectedFirstLevel.find((i) => i.checked)?.value || [];
  //     if (contentSelectedSecondLevel.length > 0) {
  //       const contentSelectedThirdLevel =
  //         contentSelectedSecondLevel.find((i) => i.checked)?.value || [];
  //       if (contentSelectedThirdLevel.length > 0) {
  //         contentText = contentSelectedSecondLevel.find((i) => i.checked)?.key;
  //         contentSelected =
  //           contentSelectedThirdLevel.find((i) => i.checked)?.value || [];
  //       }
  //     }
  //   }

  //   return (
  //     <div
  //       className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
  //       title={contentText}
  //       style={{ minHeight: "77.5vh" }}
  //     >
  //       {contentSelected?.map((item, index) => {
  //         return (
  //           <div
  //             key={index}
  //             className="px-2 cursor-pointer flex items-center mb-8 rounded shadow-md"
  //             title={item?.key}
  //             style={{
  //               minWidth: 220,
  //               backgroundColor:
  //                 item?.index === item?.currentIndex ? "lightpink" : "white",
  //             }}
  //             onClick={(e) => handleFifthLevelClick(e, index, parentItem, item)}
  //           >
  //             <div className="flex justify-center py-2 max-h-20 w-20">
  //               <img src={`/images/${item?.image}`} alt="" />
  //             </div>
  //             <div className="text-center text-sm">{item?.key}</div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  const displayFourthLevelNew = (headerIndex) => {
    debugger;
    let contentSelected;
    let contentText;
    const parentItem = items[headerIndex];
    const contentSelectedFirstLevel = items[headerIndex]?.value || [];

    if (contentSelectedFirstLevel.length > 0) {
      // contentText = items.find((i) => i.checked)?.key;
      const contentSelectedSecondLevel =
        contentSelectedFirstLevel.find((i) => i.checked)?.value || [];
      if (contentSelectedSecondLevel.length > 0) {
        contentText = contentSelectedFirstLevel.find((i) => i.checked)?.key;
        contentSelected =
          contentSelectedSecondLevel.find((i) => i.checked)?.value || [];
      }
    }

    return (
      // <div
      //   className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
      //   title={contentSelected?.[0]?.key}
      //   style={{ minHeight: "77.5vh" }}
      // >
      <div className="  px-3 py-4 ">
        <div>
          <select
            className=" bg-transparent  font-semibold"
            onChange={(e) => {
              debugger;
              handleFourthLevelClick(
                e,
                e.target.selectedIndex - 1,
                parentItem,
                JSON.parse(e.target.value)
              );
            }}
          >
            <option value={""}>
              <div className="text-center text-sm">Select</div>
            </option>
            {contentSelected.map((item, index) => {
              return (
                <option value={JSON.stringify(item)}>
                  <div className="flex justify-center py-2 max-h-20 w-20">
                    <img src={`/images/${item?.image}`} alt="" />
                  </div>
                  <div className="text-center text-sm">{item?.key}</div>
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );

    // );
  };

  const displayFifthLevelNew = (headerIndex) => {
    debugger;
    let contentSelected;
    let contentText;
    const parentItem = items[headerIndex];
    const contentSelectedFirstLevel = items[headerIndex]?.value || [];

    if (contentSelectedFirstLevel.length > 0) {
      // contentText = items.find((i) => i.checked)?.key;
      const contentSelectedSecondLevel =
        contentSelectedFirstLevel.find((i) => i.checked)?.value || [];
      if (contentSelectedSecondLevel.length > 0) {
        const contentSelectedThirdLevel =
          contentSelectedSecondLevel.find((i) => i.checked)?.value || [];
        if (contentSelectedThirdLevel.length > 0) {
          contentText = contentSelectedSecondLevel.find((i) => i.checked)?.key;
          contentSelected =
            contentSelectedThirdLevel.find((i) => i.checked)?.value || [];
        }
      }
    }

    return (
      // <div
      //   className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
      //   title={contentSelected?.[0]?.key}
      //   style={{ minHeight: "77.5vh" }}
      // >
      <div className="  px-3 py-4 ">
        <div>
          <select
            className=" bg-transparent  font-semibold"
            onChange={(e) => {
              handleFifthLevelClick(
                e,
                e.target.selectedIndex - 1,
                parentItem,
                JSON.parse(e.target.value)
              );
            }}
          >
            <option value={""}>
              <div className="text-center text-sm">Select</div>
            </option>
            {contentSelected.map((item, index) => {
              return (
                <option value={JSON.stringify(item)}>
                  <div className="flex justify-center py-2 max-h-20 w-20">
                    <img src={`/images/${item?.image}`} alt="" />
                  </div>
                  <div className="text-center text-sm">{item?.key}</div>
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );

    // );
  };

  const checkToShowThirdLevel = () => {
    let contentSelected = [];
    // let contentText;
    const contentSelectedFirstLevel =
      items.find(
        (i) => i.checked
        //  && !i.completed
      )?.value || [];

    if (contentSelectedFirstLevel.length > 0) {
      contentSelected =
        contentSelectedFirstLevel.find((i) => i.checked)?.value || [];
    }
    return contentSelected.length > 0;
  };
  const checkToShowFourthLevel = () => {
    let contentSelected = [];

    const contentSelectedFirstLevel =
      items.find(
        (i) => i.checked
        // && !i.completed
      )?.value || [];

    if (contentSelectedFirstLevel.length > 0) {
      // contentText = items.find((i) => i.checked)?.key;
      const contentSelectedSecondLevel =
        contentSelectedFirstLevel.find((i) => i.checked)?.value || [];
      if (contentSelectedSecondLevel.length > 0) {
        contentSelected =
          contentSelectedSecondLevel.find((i) => i.checked)?.value || [];
      }
    }
    return contentSelected.length > 0;
  };
  const checkToShowFifthLevel = () => {
    let contentSelected = [];

    const contentSelectedFirstLevel =
      items.find(
        (i) => i.checked
        // && !i.completed
      )?.value || [];

    if (contentSelectedFirstLevel.length > 0) {
      // contentText = items.find((i) => i.checked)?.key;
      const contentSelectedSecondLevel =
        contentSelectedFirstLevel.find((i) => i.checked)?.value || [];
      if (contentSelectedSecondLevel.length > 0) {
        const contentSelectedThirdLevel =
          contentSelectedSecondLevel.find((i) => i.checked)?.value || [];
        if (contentSelectedThirdLevel.length > 0) {
          contentSelected =
            contentSelectedThirdLevel.find((i) => i.checked)?.value || [];
        }
      }
    }
    return contentSelected.length > 0;
  };
  const handleSubmit = async () => {
    // await bookingItem({
    //   bookingId: step2State?.bookingId,
    //   sofaSets: objCreated.sofaSets,
    //   tables: objCreated.tables,
    //   chairs: objCreated.chairs,
    //   cots: objCreated.cots,
    //   mattress: objCreated.mattress,
    //   cupBoards: objCreated.cupBoards,
    //   tvs: objCreated.tvs,
    //   refrigerators: objCreated.refrigerators,
    //   washingMachines: objCreated.washingMachines,
    //   ovens: objCreated.ovens,
    //   airConditioners: objCreated.airConditioners,
    //   fansCoolers: objCreated.fansCoolers,
    //   bikes: objCreated.bikes,
    //   cars: objCreated.cars,
    //   cycles: objCreated.cycles,
    // });
    const objCreated = {};
    stateData?.forEach((item) => {
      const key = item?.item.replace("/", " ");
      const items = key.split(" ");
      let newKey = "";
      items.forEach((i, index) => {
        if (index === 0) {
          newKey += i.toLowerCase();
        } else {
          newKey += i.substr(0, 1).toUpperCase() + i.substr(1);
        }
      });
      // const newKey = items.join("");
      debugger;
      if (Object.keys(objCreated).includes(newKey)) {
        objCreated[newKey] = [...objCreated[newKey], { ...item }];
      } else {
        objCreated[newKey] = [{ ...item }];
      }
    });

    debugger;
    console.log("stateData", stateData);
    console.log("items", items);
    console.log("cfttotal- ", cftTotal);
    const cftData = { cft: cftTotal };
    ctx.setStep4State(cftData);
    // console.log("setStep4State - ", ctx.step4State["cft"])
    console.log("context.step4State -- ", step4State);
    await cft({
      bookingId: step2State?.bookingId,
      cft: cftTotal,
    });
    await bookingItem({
      bookingId: step2State?.bookingId,
      ...objCreated,
    });
    await step4Item({
      bookingId: step2State?.bookingId,
      step4: [...items],
    });
    saveBooking({
      ...bookingInfo,
      step4: [...items],
      step4Object: objCreated,
      cftTotal,
    });
    router.push("/order/step5");
  };

  return (
    <>
      <div>
        {/* completeBAR */}

        <div className="hidden md:block lg:block xl:block">
          <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 md:mt-3 lg:mt-3 xl:mt-3  bg-white rounded-lg h-12">
            <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
              Set up 40% complete
            </div>
            <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
              3 Step left • About 6 min
              <span className="CFT_box_step5 px-2 py-1 ml-1">
                <span className="CFT_box-text1_step5">CFT </span>
                <span className="CFT_box-text1_step5 font-bold">
                  {cftTotal}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4  bg-white rounded-lg ">
          <div>
            <hr className="step4-line" />
          </div>
        </div>

        <div>
          <div className=" flex flex-col items-center  gap-2.5 py-5 MoblieCompletePersentage md:hidden lg:hidden xl:hidden">
            <div className="completepersentage  font-semibold text-3xl completing_bar_text">
              Set up 60% complete
            </div>
            <div className="not-italic ">
              <span className=" font-semibold">2 Step left •</span>
              <span> About 4 min</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" b1 r1 r4 mt-2 bg-white step5_container  rounded-lg ">
        <div className=" flex flex-col justify-between items-left p-0 gap-2.5  top-36 r4 mt-3 pl-2 ">
          <div className="step4_heading font-medium px-2 text-center md:text-left lg:text-left xl:text-left  ">
            Please describe the items, so that we can understand them better
          </div>
          <div className="step4_heading2 px-2 text-center md:text-left lg:text-left xl:text-left  ">
            We would be able to provide you a more accurate quote once you
            provide us this.
          </div>
        </div>
        <div className="p-3">
          <div
            className="flex overflow-x-auto accent-emerald-500/25  space-x-4  py-2  px-5"
            style={{ width: "max-content" }}
          >
            <div className="flex flex-row space-x-3">
              {state.map((element, index) => (
                <div
                  key={index}
                  className=" px-2 cursor-pointer "
                  title={element.title}
                  onClick={(e) => handleCarouselClick(e, element)}
                >
                  <div
                    className="flex justify-center p-3"
                    style={{ height: 60 }}
                  >
                    <img src={element.image} alt="" />
                  </div>
                  {/* <div className="text-center text-sm">{element.title}</div> */}
                  <div className="px-5 mt-2 hover:bg-blue-100">
                    <button
                      className="text-gray-500 text-center m-auto"
                      // onClick={changeState}
                    >
                      {getCompletedCount(element.title)}/{element.count}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Action List Starts from Here */}

        <div
          className="mainHeaderCardBox-Current_history flex-col lg:flex xl:flex bg-white xl:justify-between lg:justify-between"
          style={{ width: "max-content" }}
        >
          {(items.filter((i) => i.key == currentHeader?.[0]?.key) || []).map(
            (item, index) => (
              <div className="flex flex-row">
                <div className="px-3 py-4">
                  <div
                    className=""
                    onClick={(e) => {
                      if (!item?.completed)
                        handleFirstLevelItemClick(e, index, item);
                    }}
                  >
                    <div>
                      {`${index + 1}. `}
                      <img
                        className="arrow-png pl-3 pr-2"
                        src={item.image}
                        itemProp="image"
                        alt="main BannerImage"
                      />
                      {item.key}
                    </div>
                  </div>
                </div>

                <hr className=" lg:hidden xl:hidden" />

                {items.find(
                  (i) => i.checked
                  //  && !i.completed
                ) && (
                  <div className="second">{displaySecondLevelNew(index)}</div>
                )}
                {checkToShowThirdLevel() && (
                  <div className="third">{displayThirdLevelNew(index)}</div>
                )}
                {checkToShowFourthLevel() && (
                  <div className="fourth">{displayFourthLevelNew(index)}</div>
                )}
                {checkToShowFifthLevel() && (
                  <div className="fifth">{displayFifthLevelNew(index)}</div>
                )}
                {item.completed && (
                  <div
                    className="red-text_currentOrder hidden xl:block lg:block px-3 py-4"
                    onClick={() => {
                      editHandler(item.category, index);
                    }}
                  >
                    Clear
                  </div>
                )}
              </div>
            )
          )}
        </div>
        {/* Action List Ends Here */}
      </div>

      <div className="  ">
        <div className="relative flex-1">
          <div className="flex justify-end mr-5 mt-5 mb-2 space-x-5">
            <button
              className="bg-gray-100 hover:bg-blue-400 text-white-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
              type="submit"
            >
              SKIP 1
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
              type="button"
              onClick={handleSubmit}
            >
              PROCEED
            </button>
          </div>
          <div className="flex justify-end mr-5  mb-5 text-sm ">
            <p>Do you know you can save this progress</p>
          </div>
          <div className="flex overflow-x-auto accent-emerald-500/25 absolute top-0 left-80 space-x-4 w-1/2 m-auto py-2  px-5 border mx-auto">
            <div className="flex flex-row space-x-4">
              {state.map((element, index) => (
                <div
                  key={index}
                  className="border px-2 cursor-pointer "
                  title={element.title}
                  onClick={(e) => handleCarouselClick(e, element)}
                >
                  <div
                    className="flex justify-center py-2"
                    style={{ height: 60 }}
                  >
                    <img src={element.image} alt="" />
                  </div>
                  {/* <div className="text-center text-sm">{element.title}</div> */}
                  <div className="px-5 mt-2 hover:bg-blue-100">
                    <button
                      className="text-gray-500 text-center m-auto"
                      // onClick={changeState}
                    >
                      {getCompletedCount(element.title)}/{element.count}
                    </button>
                  </div>
                </div>
              ))}

              {/* <div className="flex flex-row space-x-4">
          {items.map((element) => (
            <ItemCard
              image={element.img}
              itemCount={"0/1"}
              name={element.name}
            />
          ))}
        </div> */}

              {/* <div className="flex flex-row space-x-4">
          {items.map(element => (
         <ItemCard image={element.img} itemCount={"0/1"} name={element.name} />
        ))}
        </div> */}
            </div>
          </div>
          {/* <div className="flex flex-1 justify-center">
            <div className="mr-10 first">
              {displayFirstLevel(index)}
              
            </div>
            {items.find(
              (i) => i.checked
              
            ) && <div className="second">{displaySecondLevel()}</div>}
            {checkToShowThirdLevel(index) && (
              <div className="third">{displayThirdLevel()}</div>
            )}
            {checkToShowFourthLevel(index) && (
              <div className="fourth">{displayFourthLevel()}</div>
            )}
            {checkToShowFifthLevel(index) && (
              <div className="fifth">{displayFifthLevel()}</div>
            )}
          </div> */}
        </div>
      </div>
    </>
    // <div className="relative flex-1">
    //   <div className="flex justify-end mr-5 mt-5 mb-2 space-x-5">
    //     <button
    //       className="bg-gray-100 hover:bg-blue-400 text-white-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
    //       type="submit"
    //     >
    //       SKIP
    //     </button>
    //     <button
    //       className="bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
    //       type="button"
    //       onClick={handleSubmit}
    //     >
    //       PROCEED
    //     </button>
    //   </div>
    //   <div className="flex justify-end mr-5  mb-5 text-sm ">
    //     <p>Do you know you can save this progress</p>
    //   </div>
    //   <div className="flex overflow-x-auto accent-emerald-500/25 absolute top-0 left-80 space-x-4 w-1/2 m-auto py-2  px-5 border mx-auto">
    //     <div className="flex flex-row space-x-4">
    //       {state.map((element, index) => (
    //         <div
    //           key={index}
    //           className="border px-2 cursor-pointer "
    //           title={element.title}
    //           onClick={(e) => handleCarouselClick(e, element)}
    //         >
    //           <div className="flex justify-center py-2" style={{ height: 60 }}>
    //             <img src={element.image} alt="" />
    //           </div>
    //           {/* <div className="text-center text-sm">{element.title}</div> */}
    //           <div className="px-5 mt-2 hover:bg-blue-100">
    //             <button
    //               className="text-gray-500 text-center m-auto"
    //               // onClick={changeState}
    //             >
    //               {getCompletedCount(element.title)}/{element.count}
    //             </button>
    //           </div>
    //         </div>
    //       ))}

    //       {/* <div className="flex flex-row space-x-4">
    //       {items.map((element) => (
    //         <ItemCard
    //           image={element.img}
    //           itemCount={"0/1"}
    //           name={element.name}
    //         />
    //       ))}
    //     </div> */}

    //       {/* <div className="flex flex-row space-x-4">
    //       {items.map(element => (
    //      <ItemCard image={element.img} itemCount={"0/1"} name={element.name} />
    //     ))}
    //     </div> */}
    //     </div>
    //   </div>
    //   <div className="flex flex-1 justify-center">
    //     <div className="mr-10 first">
    //       {currentHeader && displayFirstLevel()}
    //     </div>
    //     {items.find((i) => i.checked && !i.completed) && (
    //       <div className="second">{displaySecondLevel()}</div>
    //     )}
    //     {checkToShowThirdLevel() && (
    //       <div className="third">{displayThirdLevel()}</div>
    //     )}
    //     {checkToShowFourthLevel() && (
    //       <div className="fourth">{displayFourthLevel()}</div>
    //     )}
    //     {checkToShowFifthLevel() && (
    //       <div className="fourth">{displayFifthLevel()}</div>
    //     )}
    //   </div>
    // </div>
  );
};

export default Step4;
