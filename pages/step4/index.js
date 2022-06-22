import React, { useEffect, useState } from "react";
import ItemCard from "../ItemCard";
import Card from "../Card";
import objectState from "../../data/objectState.json";
const Step4 = (props) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    const keys = Object.keys(objectState);
    const arr = [];
    keys.forEach((k) => {
      objectState[k].forEach((i) => {
        i.category = k;
        arr.push(i);
      });
    });
    setState(arr);
  }, []);
  // const items = [
  //   { name: "Sofasets", img: "images/sofa50.png" },
  //   { name: "TVs", img: "images/tv50.png" },
  //   { name: "Bikes", img: "images/bike50.png" },
  //   { name: "Tables", img: "images/table50.png" },
  //   { name: "Refrigerators", img: "images/fridge50.png" },
  //   { name: "Cars", img: "images/cars50.png" },
  //   { name: "Chairs", img: "images/chair50.png" },
  //   { name: "Washing Machines", img: "images/washingmachine50.png" },
  //   { name: "Cycles", img: "images/bicycle50.png" },
  //   { name: "Cots", img: "images/bed50.png" },
  //   { name: "Ovens", img: "images/microwave50.png" },
  //   { name: "Mattress", img: "images/mattress50.png" },
  //   { name: "Air Conditioners", img: "images/air-conditioner50.png" },
  //   { name: "Cupboards", img: "images/cupboard50.png" },
  //   { name: "Fans/Coolers", img: "images/ceiling-fan-off50.png" },
  // ];

  // const [state, setState] = useState("");
  console.log(state);

  const changeState = () => {
    setState("Sofasets");
  };

  const handleCarouselClick = () => {
    // setDisplay1("visible");
  };

  return (
    <div className="relative">
      <div className="flex justify-end mr-5 mt-5 mb-2 space-x-5">
        <button
          className="bg-gray-100 hover:bg-blue-400 text-white-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
          type="submit"
        >
          SKIP
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-8 font-semibold text-sm rounded shadow-lg"
          type="submit"
        >
          PROCEED
        </button>
      </div>
      <div className="flex justify-end mr-5  mb-5 text-sm ">
        <p>Do you know you can save this progress</p>
      </div>
      <div className="flex overflow-x-auto accent-emerald-500/25 absolute top-0 left-80 space-x-4 w-1/2 m-auto py-2  px-5 border mx-auto">
        <div className="flex flex-row space-x-4" onClick={handleCarouselClick}>
          {state.map((element) => (
            <div className="border px-2 ">
              <div className="flex justify-center py-2" style={{ height: 60 }}>
                <img src={element.image} alt="" />
              </div>
              <div className="text-center text-sm">{element.title}</div>
              <div className="px-5 mt-2 hover:bg-blue-100">
                <button
                  className="text-gray-500 text-center m-auto"
                  // onClick={changeState}
                >
                  0/{element.count}
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
    </div>
  );
};

export default Step4;
