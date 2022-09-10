import React, { useState } from "react";
import Card from "../Card";

const Step9 = () => {
  const washingmachine = ["Washing Machine"];
  const washingmachineModel = ["Top Loading", "Front Loading"];
  const washingmachineType = ["Automatic", "Semi automatic"];

  let count = 0;
  const [display, setDisplay] = useState("invisible");

  const handleClick = () => {
    setDisplay("visible");
  };

  return (
    <div
      className="flex group flex-nowrap flex-row space-x-2"
      onClick={handleClick}
    >
      <div className="flex-col w-1/5 mt-4 ">
        {washingmachine.map((element, index) => (
          <Card
            key={index}
            image={"/images/washing-machine-24.png"}
            item={element}
            itemCount={1}
          />
        ))}
      </div>

      <div className={`w-1/5 ${display}  px-2 py-4`}>
        {washingmachineModel.map((element, index) => (
          <Card key={index} image={""} item={element} />
        ))}
      </div>

      <div className={`w-1/5 ${display}  px-2 py-4`}>
        {washingmachineType.map((element, index) => (
          <Card key={index} image={""} item={element} />
        ))}
      </div>
    </div>
  );
};

export default Step9;
