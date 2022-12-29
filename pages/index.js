import React, { useEffect, useState, useContext } from "react";
import { registerCustomer } from "../services/customer-api-service";
import TransportContext from "../context";
import OTP from "../components/otp";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { Avatar, Segmented } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  Divider,
  Tabs,
  Collapse,
  Carousel,
  Button,
  notification,
  Alert,
  Modal,
  Spin,
  Card
} from "antd";
import HomeForm from "../components/Home";
import Image from "next/image";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const text = (
  <p style={{ paddingLeft: 24 }}>
    Try to provide moving companies with as much notice as possible, especially
    if you are moving during the summer months (mid-May to mid-September) or at
    the beginning or end of a month (regardless of the season). We recommend
    making arrangements at least four to six weeks before your desired moving
    date. This will increase your likelihood of securing the pickup and delivery
    dates you desire. Add even more time to make a decision if you are obligated
    by your employer to submit estimates for approval.
  </p>
);
const contentStyle = {
  marginLeft: "auto",
  marginRight: "auto",
};

//import
const HomePage = () => {
  //---------------------------
  const {
    saveToken,
    authenticated,
    saveCustomer,
    gitTokenLogin,
    getUserRole,
    routerProtectorLogic,
  } = useAuth();
  const context = useContext(TransportContext);
  const router = useRouter();
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");

  const [nameBlur, setNameBlur] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [phoneNumberBlur, setPhoneNumberBlur] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);
  const [visibleOtpModal, setVisibleOtpModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    // validateEmail(event.target.value);
    // if(enteredEmailIsValid){
    setEnteredEmail(event.target.value);
    // }
  };

  const phoneNumberInputChangeHandler = (event) => {
    if (!event.target.value.match(/[0-9]/)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
    setEnteredPhoneNumber(event.target.value);
    if (enteredPhoneNumber) {
      if (event.target.value.length > 10 || event.target.value.length < 10) {
        setPhoneNumberError(true);
      }
    } else {
      setPhoneNumberError(false);
    }
    if (event.target.value.length == 10) {
      setPhoneNumberError(false);
    }
  };
  const disableSubmit =
    !enteredName ||
    !enteredPhoneNumber ||
    !enteredEmail ||
    !enteredEmail.includes("@") ||
    phoneNumberError;
  function validateEmail(email) {
    setEnteredEmailIsValid(false);
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result) {
      setEnteredEmailIsValid(true);
    }
  }

  const saveFormData = async () => {
    const formData = {
      fullName: enteredName,
      email: enteredEmail,
      mobile: enteredPhoneNumber,
    };
    context.setCustomerDetails(formData);
    return await registerCustomer(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    setLoading(true);
    setNameBlur(true);
    setEmailBlur(true);
    setPhoneNumberBlur(true);

    if (!enteredName || !enteredEmail || !enteredPhoneNumber) {
      setLoading(false);
      return
    };
    try {
      let saveResponse = await saveFormData();
      console.log("saveRes", saveResponse);
      if (saveResponse.data.status) {
        saveCustomer({
          customerID: saveResponse.data.customerData._id,
          customerName: saveResponse.data.customerData.fullName,
          email: saveResponse.data.customerData.email,
          mobile: saveResponse.data.customerData.mobile
        });
        localStorage.clear();
        //router.push("/otp")
        // setEnteredName("");
        // setEnteredEmail("");
        // setEnteredPhoneNumber("");
        //debugger;
        context.setOTP(saveResponse.data.OTP);
        setVisibleOtpModal(true);
        setLoading(false);
        //router.push("/otp")
      } else {
        console.log(
          "i am in else",
          saveResponse.data.error.error.details[0].message
        );
        notification.open({
          type: "error",
          message: "Error",
          description: saveResponse.data.error.error.details[0].message,
        });
      }
    } catch (e) {
      alert(`Submission failed! ${e.message}`);
    }
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleOtpModal(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisibleOtpModal(false);
  };

  const handleEntery = () => {
    router.push("/order/step1");
  };
  //---------------------------

  return (
    <><div className="index_font_color">
        <div className="Index_background1">
          <div className=" flex justify-center items-center">
            <img
              className="Index_movers-Burnaby_1 absolute pt-52 lg:mt-80"
              src="/images/index_image/truck_and_movers.png"
              itemProp="image"
              alt="main BannerImage"
            />

            {/* <img className="Truck_Mockup_1 absolute ml-14 mt-24" src="/images/index_image/Truck_Mockup_1.png" itemProp="image"
              alt="main BannerImage" /> */}
          </div>
        </div>
        <div className="index_font_color pb-2">
          <div className="mx-6 bg-white rounded-xl flex flex-col my-3 items-center indexForm_calcuation">
            <div className="index_Calculate_price_Box-text-1 text-xl pt-6 ">
              Shifting Happiness
            </div>
            <div className="index_Calculate_price_Box-text-2 font-bold px-20 text-center py-4 ">
              We make your Moving Easy
            </div>
            <form className="max-w-xl m-auto mt-4 w-72">
              <div className="mb-10">
                {/* <label className="text-gray-600 font-medium text-lg">
                  
                </label> */}
                <input
                  className="border-solid border-gray-200 border py-2 px-4 w-full rounded text-gray-700 bluecolor"
                  type="text"
                  placeholder="Full Name"
                  autoFocus
                  required
                  onChange={nameInputChangeHandler}
                  value={enteredName}
                  onBlur={() => setNameBlur(true)}
                />
                {nameBlur && !enteredName && (
                  <div className="text-red-400">Name must not be empty.</div>
                )}
              </div>
              <div className="mb-10">
                {/* <label className="text-gray-600 font-medium text-lg">
                  
                </label> */}
                <input
                  className="border-solid border-gray-200 border py-2 px-4 w-full rounded text-gray-700 bluecolor"
                  type="email"
                  placeholder="Email Address"
                  required
                  onChange={emailInputChangeHandler}
                  value={enteredEmail}
                  onBlur={() => setEmailBlur(true)}
                />
                {emailBlur &&
                  (!enteredEmail || !enteredEmail.includes("@")) && (
                    <p className="text-red-400">Email address must be valid.</p>
                  )}
              </div>
              <div className="mb-10">
                {/* <label className="text-gray-600 font-medium text-lg">
                  
                </label> */}
                <input
                  className="border-solid border-gray-200 border py-2 px-4 w-full rounded text-gray-700 bluecolor"
                  type="tel"
                  required
                  placeholder="Phone Number"
                  onChange={phoneNumberInputChangeHandler}
                  value={enteredPhoneNumber}
                  onBlur={() => setPhoneNumberBlur(true)}
                />
                {phoneNumberBlur && !enteredPhoneNumber && (
                  <p className="text-red-400">
                    Phone Number must not be empty.
                  </p>
                )}
                {phoneNumberBlur && phoneNumberError && (
                  <p className="text-red-400">
                    Phone Number must be 10 digits.
                  </p>
                )}
              </div>
              {loading ? (<><div className="flex justify-center items-center"><Spin /></div></>) : (<><div className="pb-4">
                <button
                  loading={loading}
                  disabled={disableSubmit}
                  type="button"
                  className="yellowButton px-5 py-3.5 text-lg"
                  onClick={handleSubmit}
                >
                  Calculate Moving Prices
                  <img
                    className="arrow-png pl-3"
                    src="/images/index_image/arrow.png"
                    itemProp="image"
                    alt="main BannerImage"
                  />
                </button>
              </div></>)}

              {/* <Button className="w-96" onClick={handleSubmit} size="large"
      loading={loading}>
          Calculate Your Moving Cost
        </Button> */}
              {/* <button
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-green-100 border py-3 px-6 font-semibold text-lg rounded disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                    disabled={disableSubmit}
                    type="submit"
                    onClick={handleSubmit}
                >
                    Calculate Your Moving Cost
                </button> */}
              {/* <p className="text-xs text-center text-gray-500 py-3 px-6">
          Trusted By 100K+ Happy Customers.
        </p> */}
            </form>
            <Modal
              title=""
              closable={false}
              visible={visibleOtpModal}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              footer={null}
            >
              <OTP />
            </Modal>
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
};
export default HomePage;
