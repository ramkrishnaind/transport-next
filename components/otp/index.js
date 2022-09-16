import React, { useEffect, useState, useContext } from "react";
import { Button, notification, Alert } from "antd";
import {
  verifyOtp,
  registerCustomer,
} from "../../services/customer-api-service";

import TransportContext from "../../context";
import { useRouter } from "next/router";
const Otp = () => {
  const router = useRouter();
  const context = useContext(TransportContext);
  const { customerDetails, setCustomerDetails } = context;
  debugger;
  const [tpin, setTpin] = useState(context.OTP);
  resendloading
  const [loading, setLoading] = useState(false);
  const [resendloading, setResendloading] = useState(false);
  const [customerData, setCustomerData] = useState({});
  useEffect(() => {
    if (tpin) {
      console.log("tpin is valid");
    }
  }, [tpin]);
  useEffect(() => {
    setTpin(context.OTP);
  }, [context.OTP]);
  useEffect(() => {
    console.log("customerDetails is", customerDetails);
    setCustomerData(customerDetails);
  }, [customerDetails]);
  const resendOTP = async () => {
    debugger;
    setResendloading(true);
    const results = await registerCustomer(context.customerDetails);

    if (results.data.status) {
      context.setOTP(results.data.OTP);
      setResendloading(false);
    }
  };
  const submitOTP = async (tpin) => {
    return await verifyOtp({
      email: customerData.email,
      mobile: Number(customerData.mobile),
      otp: Number(tpin),
    });
  };

  const pinInputChangeHandler = (event) => {
    setTpin(event.target.value);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    let result = await submitOTP(tpin);
    console.log("result is", result);
    if (result.data.status) {
      router.push("/order/step1");
      setCustomerDetails(result.data.customerData);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="xl:w-96 m-auto py-4 mt-10 px-2">
        <p className="mt-2 text-gray-400 text-center">
          Please validate the Login OTP sent to your mobile number (
          {customerData.mobile})
        </p>

        <input
          className="mt-10 ml-20 border-gray-200 border-b py-2 px-4 w-xl rounded text-gray-700 "
          type="text"
          placeholder="OTP"
          autoFocus
          required
          onChange={pinInputChangeHandler}
          value={tpin}
        />

        <p className="text-gray-400 font-small text-sm text-center mt-10">
          If you do not receive the T-PIN in the next 12 seconds, you will
          automatically receive a IVR call to convey the PIN.
        </p>
        {/* <div className="flex justify-center items-center">
                    <button
                        className="m-10 bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-4 font-semibold text-lg rounded shadow-lg"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        PROCEED
                    </button>
                </div> */}
        <div className="grid grid-flow-col grid-cols-2 mb-16">
          <Button
            className="w-44 seconderyButton"
            onClick={resendOTP}
            size="large"
            loading={resendloading}
          >
            Re-Send
          </Button>
          <Button className="w-44" onClick={handleSubmit} size="large" loading={loading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Otp;
