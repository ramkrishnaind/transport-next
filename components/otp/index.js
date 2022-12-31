import React, { useEffect, useState, useContext } from "react";
import { Button, notification, Alert } from "antd";
import {
  verifyOtp,
  registerCustomer,
} from "../../services/customer-api-service";
import useAuth from "../../hooks/useAuth";

import TransportContext from "../../context";
import { useRouter } from "next/router";
const Otp = () => {
  const { customer, authenticated, saveUserId, gitTokenLogin, getUserRole, routerProtectorLogic, saveCustomer } = useAuth();
  const router = useRouter();
  const context = useContext(TransportContext);
  const { customerDetails, setCustomerDetails } = context;

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
    saveCustomer(customerDetails)
  }, [customerDetails]);
  const resendOTP = async () => {

    setResendloading(true);
    const results = await registerCustomer(context.customerDetails);

    if (results.data.status) {

      context.setOTP(results.data.OTP);
      setResendloading(false);
    }
  };
  console.log("customer is ", customer)
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

      setCustomerDetails(result.data.customerData);
      saveCustomer(result.data.customerData)
      setLoading(false);
      router.push("/order/step1");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="xl:w-96 m-auto  mt-10 px-2">
        <p className=" text-gray-400 text-center">
          Please Validate the Login PIN sent to your Mobile Number (
          {customerData.mobile}) or check your Email ({customerData.email})
        </p>
        <div className="flex justify-center items-center ">
          <div>
            WG - <input
              className="mt-10 ml-1 border-gray-200 border-b py-2 px-4 w-xl rounded text-gray-700 bluecolor"
              type="text"
              placeholder="PIN"
              autoFocus
              required
              onChange={pinInputChangeHandler}
            />
          </div>
        </div>
        <p className="text-gray-400 font-small text-sm text-center mt-10">
          If you do not receive the PIN in the next 12 seconds, Please try Re-Send.
        </p>

        <div className="flex  gap-4 justify-center items-center pt-5 pb-4">

          <Button
            className="seconderyButton"
            onClick={resendOTP}
            size="large"
            loading={resendloading}
          >
            Re-Send
          </Button>
          <Button onClick={handleSubmit} size="large" loading={loading}>
            Submit
          </Button>

        </div>
        <p className="text-gray-400 font-small text-sm text-center mt-10">
          Please check your email and spam folder before resend.
        </p>
      </form>
    </div>
  );
};

export default Otp;
