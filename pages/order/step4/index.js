import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  createRef,
  useRef,
} from "react";
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
import { includes, lastIndexOf } from "lodash";
let itemLists = itemList.filter((i) => !!i);
// console.log("itemLists", itemLists);
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
const checkValueInList = (item, arr, keysItem) => {
  // debugger;
  // const keysItem = ["Item", "Image"];
  const exist = false;
  // if (!item[k])
  arr.forEach((i) => {
    exist = true;
    keysItem.forEach((k) => {
      if (!item[k]) {
        exist = true;
        return true;
      }
      if (i[k] !== item[k]) {
        exist = false;
        return false;
      }
    });
  });
  return exist;
};

const itemCategroies = itemLists
  .filter((i) => !!i)
  .map((i) => {
    // if (!i) {
    //   debugger;
    // }
    return i.Category;
  });
const categories = new Set([...itemCategroies, "Vehicle"]);
console.log("categories", categories);
const getLevelOne = (category, type) => {
  // debugger;
  const arrResult = [];
  console.log("itemLists", itemLists);
  console.log("bikeTransformed", bikeTransformed);
  const filteredList = [...itemLists, ...bikeTransformed].filter(
    (i) => i && i?.Category === category && i.Item === type

    // &&
    // i["Action 1"] === level1
  );
  console.log("filteredList", filteredList);
  filteredList.forEach((item) => {
    if (!checkValueInList(item, arrResult, ["Item", "Image"]))
      arrResult.push({ ...item });
  });
  return arrResult;
};
const getLevelTwo = (category, type) => {
  const arrResult = [];
  [...itemLists, ...bikeTransformed]
    .filter((i) => i && i.Category === category && i.Item === type)
    .forEach((item) => {
      if (!checkValueInList(item, arrResult, ["Action 1"]))
        arrResult.push({
          ...item,
          cft: !item["Action 2"] ? item.CFT || 0 : 0,
          isLast: !item["Action 2"],
        });
    });
  return arrResult;
};
const getLevelThree = (category, type, level1) => {
  const arrResult = [];
  [...itemLists, ...bikeTransformed]
    .filter(
      (i) =>
        i &&
        i.Category === category &&
        i.Item === type &&
        i["Action 1"] === level1
    )
    .forEach((item) => {
      if (!item["Action 2"]) return;
      if (!checkValueInList(item, arrResult, ["Action 2"]))
        arrResult.push({
          ...item,
          cft: !item["Action 3"] ? item.CFT || 0 : 0,
          isLast: !item["Action 3"],
        });
    });
  return arrResult;
};
const getLevelFour = (category, type, level1, level2) => {
  const arrResult = [];
  [...itemLists, ...bikeTransformed]
    .filter(
      (i) =>
        i &&
        i.Category === category &&
        i.Item === type &&
        i["Action 1"] === level1 &&
        i["Action 2"] === level2
    )
    .forEach((item) => {
      if (!item["Action 3"]) return;
      if (!checkValueInList(item, arrResult, ["Action 2", "Action 3"]))
        arrResult.push({
          ...item,
          cft: !item["Action 4"] ? item.CFT || 0 : 0,
          isLast: !item["Action 4"],
        });
    });
  return arrResult;
};
const getLevelFive = (category, type, level1, level2, level3) => {
  const arrResult = [];
  [...itemLists, ...bikeTransformed]
    .filter(
      (i) =>
        i &&
        i.Category === category &&
        i.Item === type &&
        i["Action 1"] === level1 &&
        i["Action 2"] === level2 &&
        i["Action 3"] === level3
    )
    .forEach((item) => {
      if (!item["Action 4"]) return;
      if (!checkValueInList(item, arrResult, ["Action 4"]))
        arrResult.push({
          ...item,
          cft: item.CFT || 0,
          isLast: true,
        });
    });
  return arrResult;
};
const getLevelSix = (category, type, level1, level2, level3, level4) => {
  const arrResult = [];
  [...itemLists, ...bikeTransformed]
    .filter(
      (i) =>
        i &&
        i.Category === category &&
        i.Item === type &&
        i["Action 1"] === level1 &&
        i["Action 2"] === level2 &&
        i["Action 3"] === level3 &&
        i["Action 4"] === level4
    )
    .forEach((item) => {
      if (!item["Action 4"]) return;
      if (!checkValueInList(item, arrResult, ["Action 4"]))
        arrResult.push({
          ...item,
          cft: item.CFT || 0,
          isLast: true,
        });
    });
  return arrResult;
};
itemLists
  .filter((i) => !!i)
  .forEach((item) => {
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
  const [itemsLevel1, setItemsLevel1] = useState([]);
  const [itemsLevel2, setItemsLevel2] = useState([]);
  const [itemsLevel3, setItemsLevel3] = useState([]);
  const [itemsLevel4, setItemsLevel4] = useState([]);
  const [itemsLevel5, setItemsLevel5] = useState([]);
  const [myLevel1Refs, setMyLevel1Refs] = useState();
  const [myLevel2Refs, setMyLevel2Refs] = useState();
  const [myLevel3Refs, setMyLevel3Refs] = useState();
  const [myLevel4Refs, setMyLevel4Refs] = useState();
  const [myLevel5Refs, setMyLevel5Refs] = useState();
  const [completedCount, setCompletedCount] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();
  const [categoryResults, setCategoryResults] = useState([]);
  const [stepResults, setStepResults] = useState();
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
  const { step3State, step2State, setStep3State } = ctx;
  const { step4State, setStep4State } = ctx;
  console.log("ctx.step3State - ", ctx.step3State);
  const [cftTotal, setCftTotal] = useState(0);
  const [cftTot, setCftTot] = useState(0);
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
      const itemData = itemLists.find(
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
  useEffect(getStateData, [items]);
  useEffect(() => {
    if (categoryResults && categoryResults.length > 0)
      if (categoryResults[0]?.category) {
        setStepResults((prev) => {
          const newVal = { ...prev };
          newVal[categoryResults[0]?.category] = categoryResults;
          return { ...newVal };
        });
      }
  }, [categoryResults]);
  const resetState = (i) => {
    i.checked = false;
    if (i.value?.length > 0) {
      i.value?.forEach((valItem) => {
        resetState(valItem);
      });
    }
  };
  useEffect(() => {
    console.log("itemLevels1----", myLevel1Refs);
    itemsLevel2.map((n, index) => {
      if (
        myLevel1Refs &&
        myLevel1Refs[index].current &&
        stepResults[itemsLevel2?.[index]?.[index]?.Category]
      )
        myLevel1Refs[index].current.value = JSON.stringify(
          stepResults[itemsLevel2[index]?.[index]?.Category]?.[index]?.level1
        );
    });
  }, [myLevel1Refs]);
  useEffect(() => {
    const arr = [];
    state.forEach((element, index) => {
      arr.push(getCompletedCount(element.category, element.title));
    });
    setCompletedCount(arr);
  }, [state, categoryResults]);
  useEffect(() => {
    console.log("itemLevels2----", myLevel2Refs);

    setTimeout(() => {
      itemsLevel3.map((n, index) => {
        if (
          myLevel2Refs &&
          myLevel2Refs[index].current &&
          stepResults[itemsLevel3?.[index]?.[index]?.Category]?.[index]
        )
          myLevel2Refs[index].current.value = JSON.stringify(
            stepResults[itemsLevel3[index]?.[index]?.Category]?.[index]?.level2
          );
      });
    }, 10);
  }, [myLevel2Refs]);
  useEffect(() => {
    debugger;
    setMyLevel1Refs(null);
    setMyLevel2Refs(null);
    setMyLevel3Refs(null);
    setMyLevel4Refs(null);
    setMyLevel5Refs(null);
  }, [currentCategory]);
  useEffect(() => {
    debugger;
    console.log("itemLevels3----", myLevel3Refs);
    itemsLevel4.map((n, index) => {
      if (
        myLevel3Refs &&
        myLevel3Refs[index].current &&
        stepResults[itemsLevel4?.[index]?.[index]?.Category]?.[index]
      )
        myLevel3Refs[index].current.value = JSON.stringify(
          stepResults[itemsLevel4[index]?.[index]?.Category]?.[index]?.level3
        );
    });
  }, [myLevel3Refs]);
  useEffect(() => {
    debugger;
    console.log("itemLevels4----", myLevel4Refs);
    itemsLevel5.map((n, index) => {
      if (
        myLevel4Refs &&
        myLevel4Refs[index].current &&
        stepResults[itemsLevel5?.[index]?.[index]?.Category]?.[index]
      )
        myLevel4Refs[index].current.value = JSON.stringify(
          stepResults[itemsLevel5[index]?.[index]?.Category]?.[index]?.level4
        );
    });
  }, [myLevel4Refs]);
  // useEffect(() => {
  //   debugger;
  //   console.log("itemLevels4----", myLevel5Refs);
  //   itemsLevel6.map((n, index) => {
  //     if (
  //       myLevel5Refs &&
  //       myLevel5Refs[index].current &&
  //       stepResults[itemsLevel6?.[index]?.[index]?.Category]?.[index]
  //     )
  //       myLevel5Refs[index].current.value = JSON.stringify(
  //         stepResults[itemsLevel6[index]?.[index]?.Category]?.[index]?.level5
  //       );
  //   });
  // }, [myLevel5Refs]);
  useEffect(() => {
    if (itemsLevel2.length > 0) {
      setMyLevel1Refs(itemsLevel2.map(() => createRef()));
    }
  }, [itemsLevel2]);
  useEffect(() => {
    setStep4State(stepResults);
    if (stepResults)
      localStorage.setItem("step4State", JSON.stringify(stepResults));
    if (stepResults) {
      let cftTot = 0;
      for (const i = 0; i < Object.keys(stepResults).length; i++) {
        const catResults = stepResults[Object.keys(stepResults)[i]];
        debugger;
        if (catResults?.length) {
          cftTot += catResults.reduce((sum, val) => {
            debugger;
            return sum + (val?.cft || 0);
          }, 0);
        }
      }
      setCftTot(cftTot);
    }
  }, [stepResults]);
  useEffect(() => {
    // debugger;
    if (!step4State) {
      const step4StateLS = localStorage.getItem("step4State");
      // console.log("local storage - ", stp3State);
      if (!step4StateLS || step4StateLS === "undefined") {
        return;
      } else {
        debugger;
        setStepResults(JSON.parse(step4StateLS));
        setStep4State(JSON.parse(step4StateLS));
      }
    } else {
      setStepResults(step4State);
    }
    if (!step3State) {
      const step3StateLS = localStorage.getItem("step3State");
      // console.log("local storage - ", stp3State);
      if (!step3StateLS || step3StateLS === "undefined") {
        return;
      } else {
        debugger;
        setStep3State(JSON.parse(step3StateLS));
      }
    }
  }, []);
  useEffect(() => {
    if (itemsLevel3?.length > 0) {
      setMyLevel2Refs(itemsLevel3?.map(() => createRef()));
    }
  }, [itemsLevel3]);
  useEffect(() => {
    if (itemsLevel4?.length > 0) {
      setMyLevel3Refs(itemsLevel4?.map(() => createRef()));
    }
  }, [itemsLevel4]);
  useEffect(() => {
    if (itemsLevel5?.length > 0) {
      setMyLevel4Refs(itemsLevel5?.map(() => createRef()));
    }
  }, [itemsLevel5]);
  const getCompletedCount = (cat, item) => {
    debugger;
    if (!stepResults || !stepResults[cat]) return 0;
    const itemsCompleted = stepResults[cat].filter(
      (i) => i.Item && i.Item == item && i.isLast
    );
    //
    return itemsCompleted.reduce((prevValue, currValue) => {
      return ++prevValue;
    }, 0);
  };

  const getCopiedObject = useCallback((objFound) => {
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
    setCategoryResults((prev) => {
      const newVal = [...prev];
      newVal[index] = {
        category: categoryResults[index].category,
        Item: categoryResults[index].Item,
        level1: null,
        level2: null,
        level3: null,
        level4: null,
      };
      return newVal;
    });
    const levelOneItems = getLevelOne(
      categoryResults[index].category,
      categoryResults[index].Item
    );
    setItemsLevel1((prev) => {
      const newVal = [...prev];
      newVal[index] = null;
      return newVal;
    });
    const prev = [...itemsLevel1];
    prev[index] = [...levelOneItems];
    setItemsLevel1(prev);
    setItemsLevel2((old) => {
      let current = [...old];
      current[index] = getLevelTwo(
        categoryResults[index].category,
        categoryResults[index].Item,
        null
      );
      return current;
    });
    setItemsLevel3((old) => {
      let current = [...old];
      current[index] = [];
      return current;
    });
    setItemsLevel4((old) => {
      let current = [...old];
      current[index] = [];
      return current;
    });
    setItemsLevel5((old) => {
      let current = [...old];
      current[index] = [];
      return current;
    });
    // }, 10);
  };
  const deleteHandler = (category, item, index) => {
    if (!step3State) return;

    const newStep3State = { ...step3State };
    const itemCurrent = newStep3State[category].find((i) => i.title === item);
    if (itemCurrent) itemCurrent.count -= 1;
    setStep3State(newStep3State);
    localStorage.setItem("step3State", JSON.stringify(newStep3State));
    if (state.find((i) => i.title === item).count === 0) {
      setStepResults((prev) => {
        delete prev[category];
        return prev;
      });
      setState(state.filter((i) => i.title !== item));
      setItemsLevel1([]);
      setItemsLevel2([]);
      setItemsLevel3([]);
      setItemsLevel4([]);
      setItemsLevel5([]);
      return;
    }
    setStepResults((prev) => {
      prev[category].splice(index, 1);
      return { ...prev };
    });
    const newItemsLevel1 = [...itemsLevel1];
    newItemsLevel1.splice(index, 1);
    setItemsLevel1(newItemsLevel1);
    const newItemsLevel2 = [...itemsLevel2];
    newItemsLevel2.splice(index, 1);
    setItemsLevel2(newItemsLevel2);
    const newItemsLevel3 = [...itemsLevel3];
    newItemsLevel3.splice(index, 1);
    setItemsLevel3(newItemsLevel3);
    const newItemsLevel4 = [...itemsLevel4];
    newItemsLevel4.splice(index, 1);
    setItemsLevel4(newItemsLevel4);
    const newItemsLevel5 = [...itemsLevel5];
    newItemsLevel5.splice(index, 1);
    setItemsLevel5(newItemsLevel5);
    debugger;
    const arr = [];
    state.forEach((element, index) => {
      arr.push(getCompletedCount(element.category, element.title));
    });
    setCompletedCount(arr);
  };
  const addHandler = (category, item, index) => {
    debugger;
    if (!step3State) return;

    const newStep3State = { ...step3State };
    const itemCurrent = newStep3State[category].find((i) => i.title === item);
    if (itemCurrent) itemCurrent.count += 1;
    setStep3State(newStep3State);
    localStorage.setItem("step3State", JSON.stringify(newStep3State));
    setItemsLevel1((old) => {
      let current = [...old, getLevelTwo(category, item, null)];
      return current;
    });
    setItemsLevel2((old) => {
      let current = [...old, getLevelTwo(category, item, null)];
      return current;
    });
    // setItemsLevel1(newItemsLevel1);
    setCategoryResults((prev) => {
      const newVal = [...prev];
      newVal.push({
        category: category,
        Item: item,
        level1: null,
        level2: null,
        level3: null,
        level4: null,
      });
      return newVal;
    });
    setItemsLevel3((prev) => {
      prev[prev.length] = null;
      return prev;
    });
    setItemsLevel4((prev) => {
      prev[prev.length] = null;
      return prev;
    });
    setItemsLevel5((prev) => {
      prev[prev.length] = null;
      return prev;
    });
    debugger;
    const arr = [];
    state.forEach((element, index) => {
      arr.push(getCompletedCount(element.category, element.title));
    });
    setCompletedCount(arr);
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
            return itemToFind.key === i.title;
          });
          objFound = getCopiedObject(objFound);
          if (objFound) {
            arrayItems.push({
              ...objFound,
              index: it,
              completed: false,
            });
          }
        });
      });
    });
    if (arrayItems && arrayItems.length > 0) setItems(arrayItems);
    setState(arr);
  }, [step3State, getCopiedObject, bookingInfo]);
  console.log("itemsLevel4", itemsLevel4);
  const changeState = () => {
    setState("Sofasets");
  };
  useEffect(() => {
    if (ctx?.step4Items && ctx?.step4Items?.length > 0)
      setItems([...(ctx.step4Items || [])]);
  }, [ctx.step4Items]);

  const handleCarouselClick = (event, element) => {
    debugger;
    setCurrentCategory((prev) => {
      return { category: element?.category, count: element?.count };
    });
    const level1 = [];
    const catResults = stepResults?.[element.category] || [];
    const filteredList = [...itemLists, ...bikeTransformed].filter(
      (i) => i && i?.Category === element.category && i.Item === element.title
    );

    setCurrentHeader(filteredList);
    const levelOneItems = getLevelOne(element.category, element.title);
    for (const i = 0; i < element.count; i++) {
      level1.push(levelOneItems);
    }
    if (
      stepResults?.[element.category] &&
      stepResults?.[element.category].length > 0
    ) {
      while (catResults.length < element.count) {
        catResults.push({
          category: element.category,
          Item: element.title,
          level1: null,
          level2: null,
          level3: null,
          level4: null,
        });
      }
      debugger;
      setItemsLevel2(() => {
        let current = [];
        for (const i = 0; i < element.count; i++) {
          current[i] = getLevelTwo(element.category, element.title, null);
        }
        return current;
      });
      if (
        !stepResults?.[element.category][0].level1?.isLast &&
        stepResults?.[element.category][0].level1
      )
        setItemsLevel3(() => {
          let current = [];
          for (const i = 0; i < element.count; i++) {
            current[i] = getLevelThree(
              element.category,
              element.title,
              stepResults?.[element.category]?.[i]?.level1?.["Action 1"]
            );
          }
          return current;
        });
      if (
        !stepResults?.[element.category][0].level2?.isLast &&
        stepResults?.[element.category][0].level2
      )
        setItemsLevel4(() => {
          let current = [];
          for (const i = 0; i < element.count; i++) {
            current[i] = getLevelFour(
              element.category,
              element.title,
              stepResults?.[element.category]?.[i]?.level1?.["Action 1"],
              stepResults?.[element.category]?.[i]?.level2?.["Action 2"]
            );
          }
          return current;
        });
      if (
        !stepResults?.[element.category][0].level3?.isLast &&
        stepResults?.[element.category][0].level3
      )
        setItemsLevel5(() => {
          let current = [];
          for (const i = 0; i < element.count; i++) {
            current[i] = getLevelFive(
              element.category,
              element.title,
              stepResults?.[element.category]?.[i]?.level1?.["Action 1"],
              stepResults?.[element.category]?.[i]?.level2?.["Action 2"],
              stepResults?.[element.category]?.[i]?.level3?.["Action 3"]
            );
          }
          return current;
        });
      if (
        !stepResults?.[element.category][0].level4?.isLast &&
        stepResults?.[element.category][0].level4
      )
        setItemsLevel6(() => {
          let current = [];
          for (const i = 0; i < element.count; i++) {
            current[i] = getLevelSix(
              element.category,
              element.title,
              stepResults?.[element.category]?.[i]?.level1?.["Action 1"],
              stepResults?.[element.category]?.[i]?.level2?.["Action 2"],
              stepResults?.[element.category]?.[i]?.level3?.["Action 3"],
              stepResults?.[element.category]?.[i]?.level3?.["Action 4"]
            );
          }
          return current;
        });
    } else {
      for (const i = 0; i < element.count; i++) {
        catResults.push({
          category: element.category,
          Item: element.title,
          level1: null,
          level2: null,
          level3: null,
          level4: null,
        });
        setItemsLevel2((old) => {
          let current = [...old];
          current[i] = [];

          return current;
        });
        setTimeout(() => {
          setItemsLevel2((old) => {
            let current = [...old];
            current[i] = getLevelTwo(element.category, element.title, null);

            return current;
          });
          setItemsLevel3((old) => {
            let current = [...old];
            current[i] = [];
            return current;
          });
          setItemsLevel4((old) => {
            let current = [...old];
            current[i] = [];
            return current;
          });
          setItemsLevel5((old) => {
            let current = [...old];
            current[i] = [];
            return current;
          });
        }, 100);
      }
    }

    setItemsLevel1(level1);

    setCategoryResults(catResults);
  };
  useEffect(() => {}, [stepResults]);
  const handleFirstLevelItemClick = (event, parentIndex, category, item) => {
    event.stopPropagation();

    const obj = itemsLevel2[headerIndex];

    return (
      <div className="  px-3 py-4 ">
        <div>
          <select
            className=" bg-transparent  font-semibold"
            ref={myLevel1Refs?.[headerIndex] || null}
            onChange={(e) => {
              // debugger;
              if (!(e.target.value && JSON.parse(e.target.value)?.isLast))
                handleSecondLevelClick(
                  e,
                  headerIndex,
                  e.target.value && JSON.parse(e.target.value)?.Category,
                  e.target.value && JSON.parse(e.target.value)?.Item,
                  e.target.value
                );
              else {
                setCategoryResults((prev) => {
                  let curr = [...prev];
                  if (curr[headerIndex]) {
                    curr[headerIndex].level1 =
                      e.target.value && JSON.parse(e.target.value);
                    curr[headerIndex].level2 = null;
                    curr[headerIndex].level3 = null;
                    curr[headerIndex].level4 = null;
                    curr[headerIndex].cft = JSON.parse(e.target.value)?.cft;
                    curr[headerIndex].isLast = true;
                  }
                  return curr;
                });
              }
            }}
          >
            <option value={""}>
              <div className="text-center text-sm">Select...</div>
            </option>
            {obj.map((item, index) => {
              return (
                <option value={JSON.stringify(item)} key={index}>
                  <span className="text-center text-sm p-1">
                    {item["Action 1"]}
                  </span>
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );

    // );
  };
  const handleSecondLevelClick = (
    event,
    parentIndex,
    category,
    type,
    value
  ) => {
    event.stopPropagation();
    setCategoryResults((prev) => {
      let curr = [...prev];
      if (curr[parentIndex]) {
        curr[parentIndex].level1 = value && JSON.parse(value);
        curr[parentIndex].level2 = null;
        curr[parentIndex].level3 = null;
        curr[parentIndex].level4 = null;
      }
      return curr;
    });
    if (!value) {
      setItemsLevel3((old) => {
        let current = [...old];
        current[parentIndex] = [];
        return current;
      });
      setItemsLevel4((old) => {
        let current = [...old];
        current[parentIndex] = [];
        return current;
      });
      setItemsLevel5((old) => {
        let current = [...old];
        current[parentIndex] = [];
        return current;
      });
      return;
    }
    setItemsLevel3((old) => {
      let current = [...old];
      current[parentIndex] = getLevelThree(
        category,
        type,
        JSON.parse(value)["Action 1"]
      );

      return current;
    });

    setItemsLevel4((old) => {
      let current = [...old];
      current[parentIndex] = [];
      return current;
    });
    setItemsLevel5((old) => {
      let current = [...old];
      current[parentIndex] = [];
      return current;
    });
  };
  const displayThirdLevelNew = (headerIndex) => {
    return (
      <div className="px-3 py-4 ">
        <div>
          <select
            className=" bg-transparent  font-semibold"
            ref={myLevel2Refs?.[headerIndex] || null}
            onChange={(e) => {
              // debugger;
              if (!(e.target.value && JSON.parse(e.target.value)?.isLast))
                handleThirdLevelClick(
                  e,
                  headerIndex,
                  e.target.value && JSON.parse(e.target.value)?.Category,
                  e.target.value && JSON.parse(e.target.value)?.Item,
                  e.target.value && JSON.parse(e.target.value)?.["Action 1"],
                  // categoryResults[headerIndex].level2.Item,
                  e.target.value && JSON.parse(e.target.value)
                );
              else {
                setCategoryResults((prev) => {
                  let curr = [...prev];
                  if (curr[headerIndex]) {
                    curr[headerIndex].level2 = JSON.parse(e.target.value);
                    curr[headerIndex].level3 = JSON.parse(e.target.value);
                    curr[headerIndex].level4 = null;
                    curr[headerIndex].cft = JSON.parse(e.target.value)?.cft;
                    curr[headerIndex].isLast = true;
                  }
                  return curr;
                });
                // setItemsLevel4((old) => {
                //   // debugger;
                //   let current = [...old];
                //   current[headerIndex] = getLevelFour(
                //     e.target.value && JSON.parse(e.target.value)?.Category,
                //     e.target.value && JSON.parse(e.target.value)?.Item,
                //     e.target.value && JSON.parse(e.target.value)?.["Action 1"],
                //     e.target.value && JSON.parse(e.target.value)["Action 2"]
                //   );

                //   return current;
                // });
              }
            }}
          >
            <option value={""}>
              <div className="text-center text-sm">Select</div>
            </option>
            {itemsLevel3[headerIndex].map((iterator, index) => {
              return (
                <option value={JSON.stringify(iterator)} key={index}>
                  <div className="flex justify-center py-2 max-h-20 w-20">
                    <img src={`/images/${iterator?.image}`} alt="" />
                  </div>
                  <div className="text-center text-sm">
                    {iterator?.["Action 2"]}
                  </div>
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
    parentIndex,
    category,
    type,
    level1,
    level2
  ) => {
    // debugger;
    event.stopPropagation();
    setCategoryResults((prev) => {
      let curr = [...prev];
      if (curr[parentIndex]) {
        curr[parentIndex].level2 = level2;
        curr[parentIndex].level3 = null;
        curr[parentIndex].level4 = null;
      }
      return curr;
    });
    if (!level2) {
      setItemsLevel4((old) => {
        let current = [...old];
        current[parentIndex] = [];
        return current;
      });
      setItemsLevel5((old) => {
        let current = [...old];
        current[parentIndex] = [];
        return current;
      });
      return;
    }
    setItemsLevel4((old) => {
      // debugger;
      let current = [...old];
      current[parentIndex] = getLevelFour(
        category,
        type,
        level1,
        level2["Action 2"]
      );

      return current;
    });
    setItemsLevel5((old) => {
      let current = [...old];
      current[parentIndex] = [];
      return current;
    });
  };
  const displayFourthLevelNew = (headerIndex) => {
    return (
      <div className="px-3 py-4 ">
        <div>
          <select
            className=" bg-transparent  font-semibold"
            ref={myLevel3Refs?.[headerIndex] || null}
            onChange={(e) => {
              // debugger;
              if (!(e.target.value && JSON.parse(e.target.value)?.isLast))
                handleFourthLevelClick(
                  e,
                  headerIndex,
                  e.target.value && JSON.parse(e.target.value)?.Category,
                  e.target.value && JSON.parse(e.target.value)?.Item,
                  e.target.value && JSON.parse(e.target.value)?.["Action 1"],
                  e.target.value && JSON.parse(e.target.value)?.["Action 2"],
                  e.target.value && JSON.parse(e.target.value)
                );
              else {
                setCategoryResults((prev) => {
                  debugger;
                  let curr = [...prev];
                  if (curr[headerIndex]) {
                    curr[headerIndex].level3 = JSON.parse(e.target.value);
                    curr[headerIndex].level4 = null;
                    curr[headerIndex].cft = JSON.parse(e.target.value)?.cft;
                    curr[headerIndex].isLast = true;
                  }
                  return curr;
                });
                // setItemsLevel5((old) => {
                //   // debugger;
                //   let current = [...old];
                //   current[headerIndex] = getLevelFive(
                //     e.target.value && JSON.parse(e.target.value)?.Category,
                //     e.target.value && JSON.parse(e.target.value)?.Item,
                //     e.target.value && JSON.parse(e.target.value)?.["Action 1"],
                //     e.target.value && JSON.parse(e.target.value)?.["Action 2"],
                //     e.target.value && JSON.parse(e.target.value)["Action 3"]
                //   );
                //   return current;
                // });
              }
            }}
          >
            <option value={""}>
              <div className="text-center text-sm">Select</div>
            </option>
            {itemsLevel4[headerIndex].map((iterator, index) => {
              return (
                <option value={JSON.stringify(iterator)} key={index}>
                  <div className="flex justify-center py-2 max-h-20 w-20">
                    <img src={`/images/${iterator?.image}`} alt="" />
                  </div>
                  <div className="text-center text-sm">
                    {iterator?.["Action 3"]}
                  </div>
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );

    // );
  };
  const handleFourthLevelClick = (
    event,
    parentIndex,
    category,
    type,
    level1,
    level2,
    level3
  ) => {
    debugger;
    event.stopPropagation();
    setCategoryResults((prev) => {
      let curr = [...prev];
      if (curr[parentIndex]) {
        curr[parentIndex].level3 = level3;
        curr[parentIndex].level4 = null;
      }
      return curr;
    });
    if (!level3) {
      setItemsLevel5((old) => {
        let current = [...old];
        current[parentIndex] = [];
        return current;
      });
      return;
    }
    setItemsLevel5((old) => {
      // debugger;
      let current = [...old];
      current[parentIndex] = getLevelFive(
        category,
        type,
        level1,
        level2,
        level3["Action 3"]
      );
      return current;
    });
  };
  const displayFifthLevelNew = (headerIndex) => {
    // console.log("itemsLevel5", itemsLevel5);
    return (
      <div className="px-3 py-4 ">
        <div>
          <select
            className=" bg-transparent  font-semibold"
            ref={myLevel4Refs?.[headerIndex] || null}
            onChange={(e) => {
              if (!(e.target.value && JSON.parse(e.target.value)?.isLast))
                handleFifthLevelClick(
                  e,
                  headerIndex,
                  e.target.value && JSON.parse(e.target.value)?.Category,
                  e.target.value && JSON.parse(e.target.value)?.Item,
                  e.target.value && JSON.parse(e.target.value)?.["Action 1"],
                  e.target.value && JSON.parse(e.target.value)?.["Action 2"],
                  e.target.value && JSON.parse(e.target.value)?.["Action 3"],
                  e.target.value && JSON.parse(e.target.value)
                );
              else {
                setCategoryResults((prev) => {
                  let curr = [...prev];
                  if (curr[headerIndex]) {
                    curr[headerIndex].level4 = JSON.parse(e.target.value);
                    curr[headerIndex].cft = JSON.parse(e.target.value)?.cft;
                    curr[headerIndex].isLast = true;
                  }
                  return curr;
                });
              }
            }}
          >
            <option value={""}>
              <div className="text-center text-sm">Select</div>
            </option>
            {itemsLevel5[headerIndex].map((iterator, index) => {
              return (
                <option value={JSON.stringify(iterator)} key={index}>
                  <div className="flex justify-center py-2 max-h-20 w-20">
                    <img src={`/images/${iterator?.image}`} alt="" />
                  </div>
                  <div className="text-center text-sm">
                    {iterator?.["Action 4"]}
                  </div>
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );

    // );
  };

  const handleFifthLevelClick = (
    event,
    parentIndex,
    category,
    type,
    level1,
    level2,
    level3,
    level4
  ) => {
    // debugger;
    event.stopPropagation();

    setCategoryResults((prev) => {
      let curr = [...prev];
      if (curr[parentIndex]) curr[parentIndex].level4 = level4;
      return curr;
    });
    event.stopPropagation();

    if (!level4) {
      setItemsLevel5((old) => {
        let current = [...old];
        current[parentIndex] = [];
        return current;
      });
    }
    setItemsLevel6((old) => {
      let current = [...old];
      current[parentIndex] = getLevelSix(
        category,
        type,
        level1,
        level2,
        level3,
        level4["Action 4"]
      );
      return current;
    });
    return current;
  };
  const displaySecondLevelNew = (headerIndex) => {
    // debugger;
    // const parentIndex = headerIndex;
    // const contentSelected = items?.[headerIndex]?.value || [];
    const obj = itemsLevel2[headerIndex];
    // itemsLevel2[headerIndex] = getLevelTwo(category, obj.item);

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
            ref={myLevel1Refs?.[headerIndex] || null}
            onChange={(e) => {
              // debugger;
              if (!(e.target.value && JSON.parse(e.target.value)?.isLast))
                handleSecondLevelClick(
                  e,
                  headerIndex,
                  e.target.value && JSON.parse(e.target.value)?.Category,
                  e.target.value && JSON.parse(e.target.value)?.Item,
                  e.target.value
                );
              else {
                setCategoryResults((prev) => {
                  let curr = [...prev];
                  if (curr[headerIndex]) {
                    curr[headerIndex].level1 =
                      e.target.value && JSON.parse(e.target.value);
                    curr[headerIndex].level2 = null;
                    curr[headerIndex].level3 = null;
                    curr[headerIndex].level4 = null;
                    curr[headerIndex].cft = JSON.parse(e.target.value)?.cft;
                    curr[headerIndex].isLast = true;
                  }
                  return curr;
                });
              }
            }}
          >
            <option value={""}>
              <div className="text-center text-sm">Select...</div>
            </option>
            {obj.map((item, index) => {
              // debugger;
              return (
                <option value={JSON.stringify(item)} key={index}>
                  {/* <div className="flex justify-center py-2 max-h-20 w-20">
                  <img src={`/images/${item?.image}`} alt="" />
                </div> */}
                  <span className="text-center text-sm p-1">
                    {item["Action 1"]}
                  </span>
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );

    // );
  };
  console.log("stepresults", stepResults);
  const checkToShowThirdLevel = (headerIndex) => {
    return itemsLevel3?.[headerIndex] && itemsLevel3?.[headerIndex].length > 0;
  };
  const checkToShowFourthLevel = (headerIndex) => {
    return itemsLevel4?.[headerIndex] && itemsLevel4?.[headerIndex].length > 0;
  };
  const checkToShowFifthLevel = (headerIndex) => {
    return itemsLevel5?.[headerIndex] && itemsLevel5?.[headerIndex].length > 0;
  };

  const handleSubmit = async () => {
    debugger;

    let cftTot = 0;
    for (const i = 0; i < Object.keys(stepResults).length; i++) {
      const catResults = stepResults[Object.keys(stepResults)[i]];
      debugger;
      if (catResults?.length) {
        cftTot += catResults.reduce((sum, val) => {
          debugger;

          return sum + (val?.cft || 0);
        }, 0);
      }
    }
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
      if (Object.keys(objCreated).includes(newKey)) {
        objCreated[newKey] = [...objCreated[newKey], { ...item }];
      } else {
        objCreated[newKey] = [{ ...item }];
      }
    });
    console.log("stateData", stateData);

    console.log("cfttotal- ", cft);
    // const cftData = { cft: cftTotal };
    // ctx.setStep4State(cftData);
    // console.log("context.step4State -- ", step4State);
    await cft({
      bookingId: step2State?.bookingId,
      cft: cftTot,
    });
    await bookingItem({
      bookingId: step2State?.bookingId,
      ...objCreated,
    });
    await step4Item({
      bookingId: step2State?.bookingId,
      step4: stepResults,
    });
    saveBooking({
      ...bookingInfo,
      step4: stepResults,
      step4Object: objCreated,
      cftTotal: cftTot,
    });
    router.push("/order/step5");
  };

  return (
    <>
      <div>
        <div className="hidden md:block lg:block xl:block">
          <div className=" flex flex-row justify-between items-center p-0 gap-2.5 r1 top-36 r4 md:mt-3 lg:mt-3 xl:mt-3  bg-white rounded-lg h-12">
            <div className="pl-7 completepersentage not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
              Set up 40% complete
            </div>
            <div className="pr-7 not-italic font-semibold text-base flex-none order-none flex-grow-0 bg-white completing_bar_text">
              3 Step left • About 6 min
              <span className="CFT_box_step5 px-2 py-1 ml-1">
                <span className="CFT_box-text1_step5">CFT </span>
                <span className="CFT_box-text1_step5 font-bold">{cftTot}</span>
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
      <div className=" b1 r1 r4 mt-2 bg-white step5_container  rounded-lg w-full">
        <div className=" flex flex-col justify-between items-left p-0 gap-2.5  top-36 r4 mt-3 pl-2 w-full">
          <div className="step4_heading font-medium px-2 text-center md:text-left lg:text-left xl:text-left overflow-x-auto ">
            Please describe the items, so that we can understand them better
          </div>
          <div className="step4_heading2 px-2 text-center md:text-left lg:text-left xl:text-left  ">
            We would be able to provide you a more accurate quote once you
            provide us this.
          </div>
        </div>
        <div className="p-3 w-full overflow-x-auto">
          <div
            className="flex overflow-x-auto accent-emerald-500/25  space-x-4  py-2  px-5"
            style={{ width: "max-content" }}
          >
            <div className="flex flex-row space-x-3">
              {state.map((element, index) => {
                // debugger;
                // console.log("aaa");
                return (
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
                    <div className="px-5 mt-2 hover:bg-blue-100">
                      <button
                        className="text-gray-500 text-center m-auto cursor-pointer"
                        // onClick={changeState}
                      >
                        {completedCount[index]}/{element.count}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="mainHeaderCardBox-Current_history flex-col lg:flex xl:flex bg-white xl:justify-between lg:justify-between"
          style={{ width: "max-content" }}
        >
          {itemsLevel1.map((iterator, index) => {
            debugger;
            console.log("iterator", iterator);
            return (
              <div className="flex flex-row" key={index}>
                {itemsLevel1[index] && (
                  <div className="px-3 py-4">
                    <div
                      className=""
                      onClick={(e) => {
                        // if (!item?.completed)
                        // handleFirstLevelItemClick(
                        //   e,
                        //   index,
                        //   iterator.Category,
                        //   iterator
                        // );
                      }}
                    >
                      <div>
                        {`${index + 1}. `}
                        <img
                          className="arrow-png pl-3 pr-2 max-h-6 max-w-11"
                          src={`/images/${iterator[0]?.Image}`}
                          itemProp="image"
                          alt="main BannerImage"
                        />
                        {iterator[0]?.Item}
                      </div>
                    </div>
                  </div>
                )}

                <hr className=" lg:hidden xl:hidden" />
                {itemsLevel1[index] && myLevel1Refs?.[index] && (
                  <div className="second">{displaySecondLevelNew(index)}</div>
                )}

                {checkToShowThirdLevel(index) && myLevel2Refs?.[index] && (
                  <div className="third">{displayThirdLevelNew(index)}</div>
                )}
                {checkToShowFourthLevel(index) && myLevel3Refs?.[index] && (
                  <div className="fourth">{displayFourthLevelNew(index)}</div>
                )}
                {checkToShowFifthLevel(index) && myLevel4Refs?.[index] && (
                  <div className="fifth">{displayFifthLevelNew(index)}</div>
                )}
                <div className="flex">
                  {categoryResults[index]?.isLast && (
                    <div
                      className="orange-text_currentOrder hidden xl:block lg:block px-3 py-3 cursor-pointer mb-1"
                      onClick={() => {
                        editHandler(iterator[0].Category, index);
                      }}
                    >
                      Clear
                    </div>
                  )}

                  <div
                    className="red-text_currentOrder hidden xl:block lg:block px-3 py-3 cursor-pointer"
                    onClick={() => {
                      deleteHandler(
                        iterator[0].Category,
                        iterator[0].Item,
                        index
                      );
                    }}
                  >
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {itemsLevel1?.[0]?.[0] && (
          <div className="mt-3 ">
            <div className="flex  justify-start mr-5 mt-5 mb-2 space-x-5 pl-5">
              <button
                className="button_2_skip order_4border rounded-m px-10 py-2"
                type="button"
                onClick={() =>
                  addHandler(
                    itemsLevel1?.[0]?.[0].Category,
                    itemsLevel1?.[0]?.[0].Item
                  )
                }
              >
                ADD
              </button>
            </div>
          </div>
        )}
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
        </div>
      </div>
    </>
  );
};

export default Step4;
