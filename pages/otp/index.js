import React, { useEffect, useState, useContext } from "react";
import { verifyOtp } from '../../services/customer-api-service';
import TransportContext from "../../context";
import { useRouter } from "next/router"
const Otp = () => {
  const router = useRouter();
  const context = useContext(TransportContext);
  const { customerDetails, setCustomerDetails } = context;
  const [tpin, setTpin] = useState("");
  const [customerData, setCustomerData] = useState({});
  useEffect(() => {
    if (tpin) {
      console.log("tpin is valid");
    }
  }, [tpin]);
  useEffect(() => {
    console.log('customerDetails is', customerDetails)
    setCustomerData(customerDetails)
  }, [customerDetails])

  const submitOTP = async (tpin) => {

    return await verifyOtp(
      {
        mobile: Number(customerData.mobile),
        otp: Number(tpin),
      }
    );
  };

  const pinInputChangeHandler = (event) => {
    setTpin(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Submission! " + tpin);
    let result = await submitOTP(tpin);
    console.log('result is', result)
    if (result.data.status) {
      router.push("/step1")
    }

  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="xl:w-96 m-auto py-4 mt-10 px-2 border">
        <p className="mt-10 text-gray-400 font-small text-sm text-center">
          Please validate the T-PIN sent to your mobile number (98XXXXXX0)
        </p>

        <input
          className="mt-10 ml-20 border-gray-200 border-b py-2 px-4 w-xl rounded text-gray-700 "
          type="text"
          placeholder="T-PIN"
          autoFocus
          required
          onChange={pinInputChangeHandler}
          value={tpin}
        />

        <p className="text-gray-400 font-small text-sm text-center mt-10">
          If you do not receive the T-PIN in the next 12 seconds, you will
          automatically receive a IVR call to convey the PIN.
        </p>
        <div className="flex justify-center items-center">
          <button
            className="m-10 bg-blue-500 hover:bg-blue-400 text-green-100 border py-2 px-4 font-semibold text-lg rounded shadow-lg"
            type="submit"
            onClick={handleSubmit}
          >
            PROCEED
          </button>
        </div>
      </form>
    </div>
  );
};

export default Otp;
