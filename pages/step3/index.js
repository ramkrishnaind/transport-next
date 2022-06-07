import React, { useEffect, useState } from "react";
import Card from "../Card";

const Step3 = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Success!");
  };
  return (
    <form className="max-w-screen-xl m-auto py-10 mt-5 px-5 border">
      <div className="grid gap-8 space-x-1 lg:grid-cols-3">
        <div className="px-4 py-4  ">
          <h3 className="text-2xl text-center text-gray-600">Furniture</h3>
        </div>
        <div className="px-4 py-4 ">
          <h3 className="text-2xl text-center text-gray-600">Electronic</h3>
        </div>
        <div className="px-4 py-4  ">
          <h3 className="text-2xl text-center text-gray-600">Vehicle</h3>
        </div>
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <Card image={"images/table.png"} item={"Sofasets"} itemCount={0} />
        <Card image={"images/table.png"} item={"TVs"} itemCount={0} />
        <Card image={"images/table.png"} item={"Bikes"} itemCount={0} />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <Card image={"images/table.png"} item={"Tables"} itemCount={0} />
        <Card image={"images/table.png"} item={"Refrigerators"} itemCount={0} />
        <Card image={"images/table.png"} item={"Cars"} itemCount={0} />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <Card image={"images/table.png"} item={"Chairs"} itemCount={0} />
        <Card
          image={"images/table.png"}
          item={"Washing Machines"}
          itemCount={0}
        />
        <Card image={"images/table.png"} item={"Cycles"} itemCount={0} />
      </div>
      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <Card image={"images/table.png"} item={"Cots"} itemCount={0} />
        <Card image={"images/table.png"} item={"Ovens"} itemCount={0} />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <Card image={"images/table.png"} item={"Mattress"} itemCount={0} />
        <Card
          image={"images/table.png"}
          item={"Air Conditioners"}
          itemCount={0}
        />
      </div>

      <div className="grid gap-8 space-x-1 md:grid-cols-3 mt-5">
        <Card image={"images/table.png"} item={"Cupboards"} itemCount={0} />
        <Card image={"images/table.png"} item={"Fans/Coolers"} itemCount={0} />
      </div>
    </form>
  );
};

export default Step3;
