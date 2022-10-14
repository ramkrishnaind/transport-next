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

  return (<>
    <div>
      <div className="flex flex-col m-5 p-4 rounded-lg gap-4 bg-white step7SummarylBox1  ">
        <div className="thankyou_step7"><img
          className="inline w-8 pr-2"
          src="/images/sentiment_satisfied.png"
          itemProp="image"
          alt="Image"
        />
          Thank you Rishi Lohan!
        </div>
        <div className="thankyou2_step7">The information you provided has been sent to our top secret super wise quote calculating monks. We will get you perfect tailor made quote in a day.</div>
      </div>
    </div>


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
  </>
  );
};
export default Step8;
