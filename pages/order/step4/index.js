import React, { useEffect, useState, useContext, useCallback } from "react";
import ItemCard from "../../ItemCard";
import TransportContext from "../../../context";
import Card from "../../Card";
// import objectState from "../../data/objectState.json";
import itemList from "../../../data/itemList.json";
import bikeList from "../../../data/bikeList.json";
import { customAlphabet } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/router";
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
  const checkKeyExist = (object, key) => {};
  const [currentHeader, setCurrentHeader] = useState();
  const [currentItem, setCurrentItem] = useState();
  const itemToSet = {};
  const ctx = useContext(TransportContext);
  const { step3State } = ctx;
  console.log("ctx.step3State - ", ctx.step3State);
  const getStateData = () => {
    const result = [];

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
      result.push({ ...obj });
    });
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
    if (newItems && newItems.length > 0) setItems([...newItems]);
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
    if (itemsNew && itemsNew.length > 0) setItems(itemsNew);
    itemsNew.forEach((i) => {
      if (!i.completed && i.key !== element.key) {
        if (i.index == index) {
          resetState(i);
        }
      }
    });
  };
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
    if (itemsNew && itemsNew.length > 0) setItems([...itemsNew]);
    debugger;
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
    if (itemsNew && itemsNew.length > 0) setItems(itemsNew);
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
    if (itemsNew && itemsNew.length > 0) setItems(itemsNew);
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
    if (itemsNew && itemsNew.length > 0) setItems(itemsNew);
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
        className="flex-col flex h-full items-start justify-start flex-wrap px-2 overflow-auto py-32"
        title={currentHeader?.[0]?.key}
        style={{ minHeight: "77.5vh" }}
      >
        {contentSelected.map((item, index) => {
          return (
            <div
              key={index}
              className="px-2 cursor-pointer flex items-center mb-24 rounded shadow-md relative"
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
        i.category == currentHeader[0].category
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
        className="border flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-32"
        title={contentSelected?.[0]?.key}
        style={{ minHeight: "77.5vh" }}
      >
        {contentSelected.map((item, index) => {
          return (
            <div
              key={index}
              className="px-2 cursor-pointer flex items-center mb-32 rounded shadow-md"
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
        className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-32"
        title={contentText}
        style={{ minHeight: "77.5vh" }}
      >
        {contentSelected?.map((item, index) => {
          return (
            <div
              key={index}
              className="px-2 cursor-pointer flex items-center mb-32 rounded shadow-md"
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
        className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-32"
        title={contentText}
        style={{ minHeight: "77.5vh" }}
      >
        {contentSelected?.map((item, index) => {
          return (
            <div
              key={index}
              className="px-2 cursor-pointer flex items-center mb-32 rounded shadow-md"
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
        className="flex-col flex h-full items-center justify-start flex-wrap px-2 overflow-auto py-32"
        title={contentText}
        style={{ minHeight: "77.5vh" }}
      >
        {contentSelected?.map((item, index) => {
          return (
            <div
              key={index}
              className="px-2 cursor-pointer flex items-center mb-32 rounded shadow-md"
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

  const handleSubmit = () => {
    router.push("/order/step5");
  };

  return (
    <div className="relative flex-1">
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
              <div className="flex justify-center py-2" style={{ height: 60 }}>
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
      <div className="flex flex-1 justify-center">
        <div className="mr-10 first">
          {currentHeader && displayFirstLevel()}
        </div>
        {items.find((i) => i.index === i.currentIndex && !i.completed) && (
          <div className="mr-8 second">{displaySecondLevel()}</div>
        )}
        {checkToShowThirdLevel() && (
          <div className="mr-8 third">{displayThirdLevel()}</div>
        )}
        {checkToShowFourthLevel() && (
          <div className="mr-8 fourth">{displayFourthLevel()}</div>
        )}
        {checkToShowFifthLevel() && (
          <div className="mr-8 fourth">{displayFifthLevel()}</div>
        )}
      </div>
    </div>
  );
};

export default Step4;
