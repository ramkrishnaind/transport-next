import React, { useEffect, useState, useContext, useCallback } from "react";
import ItemCard from "../../ItemCard";
import TransportContext from "../../../context";
import Card from "../../Card";
// import objectState from "../../data/objectState.json";
import itemList from "../../../data/itemList.json";
import bikeList from "../../../data/bikeList.json";
import { customAlphabet } from "nanoid";
import Image from "next/image";
import { bookingItem, step4Item, cft } from "../../../services/customer-api-service";
import { useRouter } from "next/router";
import { faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons";
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
  const router = useRouter();
  const [state, setState] = useState([]);
  const [items, setItems] = useState([]);
  const [stateData, setStateData] = useState([]);
  const checkKeyExist = (object, key) => { };
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
    i.currentIndex = -1;
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
  //useEffect(() => {}, []);
  // console.log("currentHeader", currentHeader);

  const changeState = () => {
    setState("Sofasets");
  };

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
    items.forEach((i) => {
      if (!i.completed && i.key !== element.key) {
        // if (i.index == index) {
        resetState(i);
        // }
      }
    });
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
        item.currentIndex = index;
        if (item.value.length == 0) item.completed = true;
      } else if (
        item.key === element.key &&
        item.category == currentHeader[0].category
      ) {
        item.currentIndex = index;
      }
      return item;
    });
    //debugger;
    if (itemsNew && itemsNew.length > 0) {
      ctx.setStep4Items([...itemsNew]);
      setItems(itemsNew);
    }
    itemsNew.forEach((i) => {
      if (!i.completed && i.key !== element.key) {
        if (i.index == index) {
          resetState(i);
        }
      }
    });
  };
  useEffect(() => {
    // debugger;
    if (ctx?.step4Items && ctx?.step4Items?.length > 0)
      setItems([...(ctx.step4Items || [])]);
  }, ctx.step4Items);
  const handleSecondLevelClick = (event, parentIndex, index, element) => {
    //debugger;
    event.stopPropagation();
    let itemsNew = [...items];
    let itemsSub = [...itemsNew[parentIndex].value] || [];

    // itemsNew.find(
    //   (i) =>
    //     i.index === i.currentIndex && i.category == currentHeader[0].category
    // ).value || [];
    itemsSub = itemsSub.map((i) => {
      let item = { ...i };
      item = getCopiedObject(i);
      if (item.key === element.key && item.index === index) {
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
    itemsSub.forEach((i) => {
      if (i.key !== element.key) {
        // if (i.index == index) {
        resetState(i);
        // }
      }
    });
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
          i.index === i.currentIndex &&
          i.category == currentHeader[0].category &&
          i.key === parentElement.key
      )?.value || [];
    let itemsSubSub =
      itemsSub?.find((i) => i.index === i.currentIndex)?.value || [];
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
          i.index === i.currentIndex &&
          i.category == currentHeader[0].category &&
          i.key === parentItem.key
      )?.value || [];
    let itemsSubSub =
      itemsSub.find((i) => i.index === i.currentIndex)?.value || [];
    let itemsSubSubSub =
      itemsSubSub.find((i) => i.index === i.currentIndex)?.value || [];
    itemsSubSubSub = itemsSubSubSub.map((i) => {
      if (i.key === element.key && i.index === index) {
        i.checked = true;
        if (i.value.length == 0) {
          itemsNew.find(
            (iParent) =>
              iParent.index === iParent.currentIndex &&
              iParent.key === parentItem.key
          ).completed = true;
          i.currentIndex = index;
        } else if (i.key === element.key) {
          i.currentIndex = index;
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
          i.index === i.currentIndex &&
          i.category == currentHeader[0].category &&
          i.key === parentItem.key
      )?.value || [];
    let itemsSubSub =
      itemsSub.find((i) => i.index === i.currentIndex)?.value || [];
    let itemsSubSubSub =
      itemsSubSub.find((i) => i.index === i.currentIndex)?.value || [];
    let itemsSubSubSubSub =
      itemsSubSubSub.find((i) => i.index === i.currentIndex)?.value || [];
    itemsSubSubSubSub = itemsSubSubSubSub.map((i) => {
      if (i.key === element.key && i.index === index) {
        i.checked = true;
        // if (i.value.length == 0) {
        itemsNew.find(
          (iParent) =>
            iParent.index === iParent.currentIndex &&
            iParent.key === parentItem.key
        ).completed = true;
        i.currentIndex = index;
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
  const displayFirstLevel = () => {
    // const arr = [...Array(currentHeader.count).keys()];
    // console.log("length", arr.length);
    const contentSelected =
      items.filter((i) => i.key == currentHeader?.[0]?.key) || [];
    return (
      <div
        className="flex-col flex h-full items-start justify-start flex-wrap px-2 overflow-auto py-8"
        title={currentHeader?.[0]?.key}
        style={{ minHeight: "77.5vh" }}
      >
        {contentSelected.map((item, index) => {
          return (
            <div
              key={index}
              className="px-2 cursor-pointer flex items-center mb-8 rounded shadow-md relative"
              title={item?.key}
              style={{
                backgroundColor: item?.completed
                  ? "lightgreen"
                  : item?.index === item?.currentIndex
                    ? "lightpink"
                    : "white",
              }}
              onClick={(e) => {
                if (!item?.completed) handleFirstLevelItemClick(e, index, item);
              }}
            >
              <div className="flex justify-center py-2 max-h-20 w-20">
                <img src={`${item?.image}`} alt="" />
              </div>
              {item?.completed && (
                <div
                  className="right-1 top-0 absolute"
                  style={{ maxHeight: 20, maxWidth: 20 }}
                  onClick={() => {
                    editHandler(item.category, index);
                  }}
                >
                  <img src={`/images/edit.png`} alt="" />
                </div>
              )}

              <div className="text-center text-sm">{item?.key}</div>
            </div>
          );
        })}
      </div>
    );
  };
  const displaySecondLevel = () => {
    const parentIndex = items.findIndex(
      (i) =>
        i.index === i.currentIndex &&
        !i.completed &&
        i.category == currentHeader[0]?.category
    );
    const contentSelected =
      items.find(
        (i) =>
          i.index === i.currentIndex &&
          !i.completed &&
          i.category == currentHeader[0].category
      )?.value || [];

    return (
      <div
        className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
        title={contentSelected?.[0]?.key}
        style={{ minHeight: "77.5vh" }}
      >
        {contentSelected.map((item, index) => {
          return (
            <div
              key={index}
              className="px-2 cursor-pointer flex items-center mb-8 rounded shadow-md"
              title={item?.key}
              style={{
                minWidth: 220,
                backgroundColor:
                  item?.index === item?.currentIndex ? "lightpink" : "white",
              }}
              onClick={(e) =>
                handleSecondLevelClick(e, parentIndex, index, item)
              }
            >
              <div className="flex justify-center py-2 max-h-20 w-20">
                <img src={`/images/${item?.image}`} alt="" />
              </div>
              <div className="text-center text-sm">{item?.key}</div>
            </div>
          );
        })}
      </div>
    );
  };
  const checkToShowThirdLevel = () => {
    let contentSelected = [];
    // let contentText;
    const contentSelectedFirstLevel =
      items.find((i) => i.index === i.currentIndex && !i.completed)?.value ||
      [];

    if (contentSelectedFirstLevel.length > 0) {
      contentSelected =
        contentSelectedFirstLevel.find((i) => i.index === i.currentIndex)
          ?.value || [];
    }
    return contentSelected.length > 0;
  };
  const checkToShowFourthLevel = () => {
    let contentSelected = [];

    const contentSelectedFirstLevel =
      items.find((i) => i.index === i.currentIndex && !i.completed)?.value ||
      [];

    if (contentSelectedFirstLevel.length > 0) {
      // contentText = items.find((i) => i.index === i.currentIndex)?.key;
      const contentSelectedSecondLevel =
        contentSelectedFirstLevel.find((i) => i.index === i.currentIndex)
          ?.value || [];
      if (contentSelectedSecondLevel.length > 0) {
        contentSelected =
          contentSelectedSecondLevel.find((i) => i.index === i.currentIndex)
            ?.value || [];
      }
    }
    return contentSelected.length > 0;
  };
  const checkToShowFifthLevel = () => {
    let contentSelected = [];

    const contentSelectedFirstLevel =
      items.find((i) => i.index === i.currentIndex && !i.completed)?.value ||
      [];

    if (contentSelectedFirstLevel.length > 0) {
      // contentText = items.find((i) => i.index === i.currentIndex)?.key;
      const contentSelectedSecondLevel =
        contentSelectedFirstLevel.find((i) => i.index === i.currentIndex)
          ?.value || [];
      if (contentSelectedSecondLevel.length > 0) {
        const contentSelectedThirdLevel =
          contentSelectedSecondLevel.find((i) => i.index === i.currentIndex)
            ?.value || [];
        if (contentSelectedThirdLevel.length > 0) {
          contentSelected =
            contentSelectedThirdLevel.find((i) => i.index === i.currentIndex)
              ?.value || [];
        }
      }
    }
    return contentSelected.length > 0;
  };
  const displayThirdLevel = () => {
    const topIndex = items.findIndex(
      (i) =>
        i.index === i.currentIndex &&
        !i.completed &&
        i.category == currentHeader[0].category
    );

    let contentSelected;
    let contentText;
    const parentItem = items.find(
      (i) => i.index === i.currentIndex && !i.completed
    );
    const contentSelectedFirstLevel =
      items.find((i) => i.index === i.currentIndex && !i.completed)?.value ||
      [];
    const firstLevelIndex = contentSelectedFirstLevel.findIndex(
      (i) => i.index === i.currentIndex
    );
    if (contentSelectedFirstLevel.length > 0) {
      contentText = items.find((i) => i.index === i.currentIndex)?.key;
      contentSelected =
        contentSelectedFirstLevel.find((i) => i.index === i.currentIndex)
          ?.value || [];
    }
    return (
      <div
        className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
        title={contentText}
        style={{ minHeight: "77.5vh" }}
      >
        {contentSelected?.map((item, index) => {
          return (
            <div
              key={index}
              className="px-2 cursor-pointer flex items-center mb-8 rounded shadow-md"
              title={item?.key}
              style={{
                minWidth: 220,
                backgroundColor:
                  item?.index === item?.currentIndex ? "lightpink" : "white",
              }}
              onClick={(e) => {
                handleThirdLevelClick(
                  e,
                  topIndex,
                  firstLevelIndex,
                  index,
                  parentItem,
                  item
                );
              }}
            >
              <div className="flex justify-center py-2 max-h-20 w-20">
                <img src={`/images/${item?.image}`} alt="" />
              </div>
              <div className="text-center text-sm">{item?.key}</div>
            </div>
          );
        })}
      </div>
    );
  };
  const displayFourthLevel = () => {
    let contentSelected;
    let contentText;
    const parentItem = items.find(
      (i) => i.index === i.currentIndex && !i.completed
    );
    const contentSelectedFirstLevel =
      items.find((i) => i.index === i.currentIndex && !i.completed)?.value ||
      [];

    if (contentSelectedFirstLevel.length > 0) {
      // contentText = items.find((i) => i.index === i.currentIndex)?.key;
      const contentSelectedSecondLevel =
        contentSelectedFirstLevel.find((i) => i.index === i.currentIndex)
          ?.value || [];
      if (contentSelectedSecondLevel.length > 0) {
        contentText = contentSelectedFirstLevel.find(
          (i) => i.index === i.currentIndex
        )?.key;
        contentSelected =
          contentSelectedSecondLevel.find((i) => i.index === i.currentIndex)
            ?.value || [];
      }
    }

    return (
      <div
        className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
        title={contentText}
        style={{ minHeight: "77.5vh" }}
      >
        {contentSelected?.map((item, index) => {
          return (
            <div
              key={index}
              className="px-2 cursor-pointer flex items-center mb-8 rounded shadow-md"
              title={item?.key}
              style={{
                minWidth: 220,
                backgroundColor:
                  item?.index === item?.currentIndex ? "lightpink" : "white",
              }}
              onClick={(e) =>
                handleFourthLevelClick(e, index, parentItem, item)
              }
            >
              <div className="flex justify-center py-2 max-h-20 w-20">
                <img src={`/images/${item?.image}`} alt="" />
              </div>
              <div className="text-center text-sm">{item?.key}</div>
            </div>
          );
        })}
      </div>
    );
  };
  const displayFifthLevel = () => {
    let contentSelected;
    let contentText;
    const parentItem = items.find(
      (i) => i.index === i.currentIndex && !i.completed
    );
    const contentSelectedFirstLevel =
      items.find((i) => i.index === i.currentIndex && !i.completed)?.value ||
      [];

    if (contentSelectedFirstLevel.length > 0) {
      // contentText = items.find((i) => i.index === i.currentIndex)?.key;
      const contentSelectedSecondLevel =
        contentSelectedFirstLevel.find((i) => i.index === i.currentIndex)
          ?.value || [];
      if (contentSelectedSecondLevel.length > 0) {
        const contentSelectedThirdLevel =
          contentSelectedSecondLevel.find((i) => i.index === i.currentIndex)
            ?.value || [];
        if (contentSelectedThirdLevel.length > 0) {
          contentText = contentSelectedSecondLevel.find(
            (i) => i.index === i.currentIndex
          )?.key;
          contentSelected =
            contentSelectedThirdLevel.find((i) => i.index === i.currentIndex)
              ?.value || [];
        }
      }
    }

    return (
      <div
        className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-8"
        title={contentText}
        style={{ minHeight: "77.5vh" }}
      >
        {contentSelected?.map((item, index) => {
          return (
            <div
              key={index}
              className="px-2 cursor-pointer flex items-center mb-8 rounded shadow-md"
              title={item?.key}
              style={{
                minWidth: 220,
                backgroundColor:
                  item?.index === item?.currentIndex ? "lightpink" : "white",
              }}
              onClick={(e) => handleFifthLevelClick(e, index, parentItem, item)}
            >
              <div className="flex justify-center py-2 max-h-20 w-20">
                <img src={`/images/${item?.image}`} alt="" />
              </div>
              <div className="text-center text-sm">{item?.key}</div>
            </div>
          );
        })}
      </div>
    );
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
      // debugger;
      if (Object.keys(objCreated).includes(newKey)) {
        objCreated[newKey] = [...objCreated[newKey], { ...item }];
      } else {
        objCreated[newKey] = [{ ...item }];
      }
    });

    // debugger;
    console.log("stateData", stateData);
    console.log("items", items);
    console.log("cfttotal- ", cftTotal);
    const cftData = { cft: cftTotal, };
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
    router.push("/order/step5");
  };

  return (<>
    {/* completeBAR */}
    <div>
      <div className="hidden md:block lg:block xl:block">
        <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 md:mt-3 lg:mt-3 xl:mt-3  bg-white rounded-lg h-12">
          <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
            Set up 40% complete
          </div>
          <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
            3 Step left • About 6 min<span className="CFT_box_step5 px-2 py-1 ml-1"><span className="CFT_box-text1_step5">CFT </span><span className="CFT_box-text1_step5 font-bold">{cftTotal}</span></span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4  bg-white rounded-lg ">
        <div>
          <hr className="step4-line hidden md:block lg:block xl:block" />
        </div>
      </div>
      <div>
        <div className="bg-white flex flex-col items-center  gap-2.5 py-5 MoblieCompletePersentage md:hidden lg:hidden xl:hidden">
          <div className="completepersentage  font-semibold text-3xl completing_bar_text">Set up 60% complete</div>
          <div className="not-italic ">
            <span className=" font-semibold">2 Step left •</span>
            <span> About 4 min</span>
          </div>
        </div>
      </div>
    </div>


    <div className=" b1 r1 r4 mt-2 bg-white step5_container  rounded-lg h-100vh">
      <div className=" flex flex-col justify-between items-left p-0 gap-2.5  top-36 r4 mt-3 pl-2 ">
        <div className="step4_heading font-medium px-2 text-center md:text-left lg:text-left xl:text-left  ">
          Please describe the items, so that we can understand them better
        </div>
        <div className="step4_heading2 px-2 text-center md:text-left lg:text-left xl:text-left  ">
          We would be able to provide you a more accurate quote once you provide us this.
        </div>
      </div>

      <div className="p-3">
        <div className="flex overflow-x-auto accent-emerald-500/25  space-x-4  py-2  px-5">
          <div className="flex flex-row space-x-3">
            {state.map((element, index) => (
              <div
                key={index}
                className=" px-2 cursor-pointer "
                title={element.title}
                onClick={(e) => handleCarouselClick(e, element)}
              >
                <div className="flex justify-center p-3" style={{ height: 60 }}>
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


      <div className="mainHeaderCardBox-Current_history lg:flex xl:flex m-3 bg-white xl:justify-between lg:justify-between">
        <div className="HeaderCard_CurrentOrder px-3 py-4">
          <div className="">
            <div>1.<img className="arrow-png pl-3 pr-2" src="/images/trail-img/table_restaurant.png" itemProp="image" alt="main BannerImage" />Table
            </div>
          </div>
          <div className="">
            <div className="red-text_currentOrder xl:hidden lg:hidden">Clear</div>
          </div>
        </div>
        <hr className=" lg:hidden xl:hidden" />
        <div className="grid_Select_currentOrder   px-3 py-4 ">
          <div>
            <select
              className=" bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                Coffee / center
              </option>
              <option value="Coffee / center">Coffee / center</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
          <div>
            <select
              className="bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                3 seater
              </option>
              <option value="Coffee / center">
                <img className="inline " src="/images/trail-img/ellipse_grassTop.png" itemProp="image" alt="main BannerImage" />Grass Top</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
          <div>
            <select
              className="bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                3 seater
              </option>
              <option value="Coffee / center">
                <img className="inline " src="/images/trail-img/ellipse_grassTop.png" itemProp="image" alt="main BannerImage" />Grass Top</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
          <div>
            <select
              className="bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                Grass Top
              </option>
              <option value="Coffee / center">
                <img className="inline " src="/images/trail-img/ellipse_grassTop.png" itemProp="image" alt="main BannerImage" />Grass Top</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
        </div>
        <div className="red-text_currentOrder hidden xl:block lg:block px-3 py-4">Clear</div>
      </div>
      <div className="mainHeaderCardBox-Current_history lg:flex xl:flex m-3 bg-white xl:justify-between lg:justify-between">
        <div className="HeaderCard_CurrentOrder px-3 py-4">
          <div className="">
            <div>1.<img className="arrow-png pl-3 pr-2" src="/images/trail-img/table_restaurant.png" itemProp="image" alt="main BannerImage" />Table
            </div>
          </div>
          <div className="">
            <div className="red-text_currentOrder xl:hidden lg:hidden">Clear</div>
          </div>
        </div>
        <hr className=" lg:hidden xl:hidden" />
        <div className="grid_Select_currentOrder   px-3 py-4 ">
          <div>
            <select
              className=" bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                Coffee / center
              </option>
              <option value="Coffee / center">Coffee / center</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
          <div>
            <select
              className="bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                3 seater
              </option>
              <option value="Coffee / center">
                <img className="inline " src="/images/trail-img/ellipse_grassTop.png" itemProp="image" alt="main BannerImage" />Grass Top</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
          <div>
            <select
              className="bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                3 seater
              </option>
              <option value="Coffee / center">
                <img className="inline " src="/images/trail-img/ellipse_grassTop.png" itemProp="image" alt="main BannerImage" />Grass Top</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
          <div>
            <select
              className="bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                Grass Top
              </option>
              <option value="Coffee / center">
                <img className="inline " src="/images/trail-img/ellipse_grassTop.png" itemProp="image" alt="main BannerImage" />Grass Top</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
        </div>
        <div className="red-text_currentOrder hidden xl:block lg:block px-3 py-4">Clear</div>
      </div>
      <div className="mainHeaderCardBox2-Current_history lg:flex xl:flex m-3 bg-white xl:justify-between lg:justify-between">
        <div className="HeaderCard_CurrentOrder px-3 py-4">
          <div className="">
            <div>1.<img className="arrow-png pl-3 pr-2" src="/images/trail-img/table_restaurant.png" itemProp="image" alt="main BannerImage" />Table
            </div>
          </div>
          <div className="">
            <div className="red-text_currentOrder xl:hidden lg:hidden">Clear</div>
          </div>
        </div>
        <hr className=" lg:hidden xl:hidden" />
        <div className="grid_Select_currentOrder   px-3 py-4 ">
          <div>
            <select
              className=" bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                Coffee / center
              </option>
              <option value="Coffee / center">Coffee / center</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
          <div>
            <select
              className="bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                3 seater
              </option>
              <option value="Coffee / center">
                <img className="inline " src="/images/trail-img/ellipse_grassTop.png" itemProp="image" alt="main BannerImage" />Grass Top</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
          <div>
            <select
              className="bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                3 seater
              </option>
              <option value="Coffee / center">
                <img className="inline " src="/images/trail-img/ellipse_grassTop.png" itemProp="image" alt="main BannerImage" />Grass Top</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
          <div>
            <select
              className="bg-transparent  font-semibold"
              required>
              <option
                value=""
                disabled
                selected
                hidden
                className="step1_select_hidden_option"
              >
                Grass Top
              </option>
              <option value="Coffee / center">
                <img className="inline " src="/images/trail-img/ellipse_grassTop.png" itemProp="image" alt="main BannerImage" />Grass Top</option>
              <option value="Cocktail Table">Cocktail Table</option>
              <option value="End Table">End Table</option>
              <option value="Wood Table">Wood Table</option>
            </select>
          </div>
        </div>
        <div className="red-text_currentOrder hidden xl:block lg:block px-3 py-4">Clear</div>
      </div>
      <div className=" flex justify-center items-center lg:justify-start xl:justify-start my-3 b1">
        <button className="Step4_add_button  py-3 px-2 text-center m-2">
          +  Add more tables
        </button>
      </div>
     
      <div className="mt-6 b1 ">
        <div className="flex justify-start mr-5 mt-5 mb-2 space-x-5 pl-5">
          <button
            className="button_2_skip rounded-m px-10 py-2"
            type="button"
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
      </div>
    </div>
  </>
  );
};

export default Step4;
