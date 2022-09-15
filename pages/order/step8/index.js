import Card from "../../Card";

import React, { useState } from "react";

const Step8 = () => {
  const refrigerators = ["refrigerators1", "refrigerators2"];
  const refrigeratorModel = [
    "Single door",
    "Double door",
    "Side by Side",
    "Triple door",
  ];
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
        {refrigerators.map((element, index) => (
          <Card
            key={index}
            image={"/images/refrigerator-24.png"}
            item={element}
            itemCount={1}
          />
        ))}
      </div>

      <div className={`w-1/5 ${display}  px-2 py-4`}>
        {refrigeratorModel.map((element, index) => (
          <Card key={index} image={""} item={element} />
        ))}
      </div>
    </div>
  );
};
export default Step8;
