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
        <><div>
            <div className="index_font_color">
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
                <div>
                    <div className="Index_background2 px-7 py-10 TrackYourOrderBox">
                        {/* <button className="yellowButton text-center Index-track-button py-4 mt-6">
              Track
            </button> */}
                    </div>
                </div>
                <div className="Index_background3 mt-9 h-full p-10 Index_background3-2">
                    <div className="bannerText2">
                        <div className="Index-MovingMadeModern_text py-4">
                            Moving Made
                            <br />
                            Modern
                        </div>
                        <div className="Index-MovingMadeModern_text_2">
                            by choosing Whit&apos;Glove Packers and Movers, you&apos;re
                            guaranteeing a great moving day. All customers receive transparent
                            pricing, flexible service and payment options, Quality Packaging
                            Material, industry-best customer support, and an easy-to-access
                            online dashboard.
                        </div>
                    </div>
                </div>
                <div className="xl:hidden lg:hidden">
                    <Carousel autoplay className="mb-5">
                        <div className="index_card1 " style={contentStyle}>
                            <div className="mb-20 mt-7">
                                <img
                                    className="ml-auto mr-auto index-Worldwide-delivery-1"
                                    src="/images/index_image/Worldwide-delivery-1.png"
                                    itemProp="image"
                                    alt="Worldwide delivery "
                                />
                            </div>
                            <div className="flex flex-row mx-10 pb-10">
                                <div className="my-auto">
                                    <img
                                        className="index-globe"
                                        src="/images/index_image/globe.svg"
                                        itemProp="image"
                                        alt="GLOBE"
                                    />
                                </div>
                                <div className=" index-international_Relocation-text pl-3.5">
                                    International
                                    <br />
                                    Relocation
                                </div>
                            </div>
                            <div className="pb-6 index_card1_text font-bold mx-10">
                                Great &#38; Affordable <br /> Shifting Services
                            </div>
                            <div className="index_card1_text-2 mx-10 pb-6">
                                rexeive fixed-price, individualized plan and reserve your move
                                without having to worry about hidden fees.
                            </div>
                            <div className="mx-10 pb-7">Read More</div>
                        </div>
                        <div className="index_card1  " style={contentStyle}>
                            <div className="mb-20 mt-7">
                                <img
                                    className="ml-auto mr-auto index-Worldwide-delivery-1"
                                    src="/images/index_image/Worldwide-delivery-1.png"
                                    itemProp="image"
                                    alt="Worldwide delivery "
                                />
                            </div>
                            <div className="flex flex-row mx-10 pb-10">
                                <div className="my-auto">
                                    <img
                                        className="index-globe"
                                        src="/images/index_image/globe.svg"
                                        itemProp="image"
                                        alt="GLOBE"
                                    />
                                </div>
                                <div className=" index-international_Relocation-text pl-3.5">
                                    International
                                    <br />
                                    Relocation
                                </div>
                            </div>
                            <div className="pb-6 index_card1_text font-bold mx-10">
                                Great &#38; Affordable <br /> Shifting Services
                            </div>
                            <div className="index_card1_text-2 mx-10 pb-6">
                                rexeive fixed-price, individualized plan and reserve your move
                                without having to worry about hidden fees.
                            </div>
                            <div className="mx-10 pb-7">Read More</div>
                        </div>
                    </Carousel>
                </div>
                <div className=" bg-white py-24">
                    <div className="Index_background4 mx-5 p-7">
                        <div className="lg:mt-16 xl:mt-16 lg:ml-16 xl:ml-16">
                            <div className="Index-WhatDoYou-text pb-3">
                                what do you want
                                <br />
                                to ship?
                            </div>
                            <div className="Index-WhatDoYou-text-2 font-small py-4 mb-5">
                                Get local advice for your request.<br /> Our team is always there for you.
                            </div>
                            <button type="button" className="BlackButton px-5 py-4 text-lg">
                                Lets talk
                                <img
                                    className="arrow-png pl-3"
                                    src="/images/index_image/arrow_blue.png"
                                    itemProp="image"
                                    alt="main BannerImage"
                                />
                            </button>
                        </div>
                        <img
                            className="w-52 absolute mt-16 packagesImages"
                            src="/images/packages_1.png"
                            itemProp="image"
                            alt="packages"
                        />
                    </div>
                    {/* <div className="p-5">image of packeditem</div> */}

                    <div className="index_card_of_details_parient mt-12 bg-white p-5">
                        <div className="index_card_of_details">
                            <img
                                className="arrow-png pl-3"
                                src="/images/index_image/pin_drop.png"
                                itemProp="image"
                                alt="main BannerImage"
                            />
                            <div className="index_card_of_details-text">Number of Location</div>
                            <div className="index_card_of_details-text-2 fedraFont">359</div>
                        </div>
                        <div className="index_card_of_details">
                            <img
                                className="arrow-png pl-3"
                                src="/images/index_image/local_shipping.png"
                                itemProp="image"
                                alt="main BannerImage"
                            />
                            <div className="index_card_of_details-text">Delivered Packages</div>
                            <div className="index_card_of_details-text-2 fedraFont">500+</div>
                        </div>
                        <div className="index_card_of_details">
                            <img
                                className="arrow-png pl-3"
                                src="/images/index_image/speed.png"
                                itemProp="image"
                                alt="main BannerImage"
                            />
                            <div className="index_card_of_details-text">
                                Kilometer Per Month
                            </div>
                            <div className="index_card_of_details-text-2 fedraFont">500+</div>
                        </div>
                        <div className="index_card_of_details">
                            <img
                                className="arrow-png pl-3"
                                src="/images/index_image/package.png"
                                itemProp="image"
                                alt="main BannerImage"
                            />
                            <div className="index_card_of_details-text">Tons </div>
                            <div className="index_card_of_details-text-2 fedraFont">500+</div>
                        </div>
                        <div className="index_card_of_details">
                            <img
                                className="arrow-png pl-3"
                                src="/images/index_image/sentiment_satisfied.png"
                                itemProp="image"
                                alt="main BannerImage"
                            />
                            <div className="index_card_of_details-text">Satisfied Clients</div>
                            <div className="index_card_of_details-text-2 fedraFont">150+</div>
                        </div>
                    </div>
                </div>
                <div className="Index_city_card-background py-14">
                    <div className=" text-center Index_city_card-text">
                        Our Top Cities
                    </div>
                    <div className=" text-center Index_city_card-text-2">
                        Find Movers Near You
                    </div>
                </div>
                <div className="lg:hidden xl:hidden">
                    <Carousel autoplay>
                        <div>
                            <div className="Index_city_card p-6" style={contentStyle}>
                                <img
                                    className="mx-auto"
                                    src="/images/index_image/Group_57.png"
                                    itemProp="image"
                                    alt="City Images  "
                                />
                                <div className=" text-center Index_city_card-text-3 pt-6">
                                    Delhi
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="Index_city_card2 p-6" style={contentStyle}>
                                <img
                                    className="mx-auto"
                                    src="/images/index_image/Group_57_1.png"
                                    itemProp="image"
                                    alt="City Images  "
                                />
                                <div className=" text-center Index_city_card-text-4  pt-6">
                                    Gurugram
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="Index_city_card p-6" style={contentStyle}>
                                <img
                                    className="mx-auto"
                                    src="/images/index_image/Group_57.png"
                                    itemProp="image"
                                    alt="City Images  "
                                />
                                <div className=" text-center Index_city_card-text-3 pt-6">
                                    Delhi
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="Index_city_card2 p-6" style={contentStyle}>
                                <img
                                    className="mx-auto"
                                    src="/images/index_image/Group_57_1.png"
                                    itemProp="image"
                                    alt="City Images  "
                                />
                                <div className=" text-center Index_city_card-text-4  pt-6">
                                    Gurugram
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>
                <div className="hidden lg:block xl:block">
                    <div className="flex justify-center items-center gap-4">
                        <div className="border py-6 px-9 cityNameCards_index">
                            <img
                                className="mx-auto cityIcon_index"
                                src="/images/index_image/Group_57.png"
                                itemProp="image"
                                alt="City Images  "
                            />
                            <div className=" text-center Index_city_card-text-3 pt-6">
                                Delhi
                            </div>
                        </div>
                        <div className="border py-6 px-9 cityNameCards_index">
                            <img
                                className="mx-auto cityIcon_index"
                                src="/images/index_image/Group_57_blue.png"
                                itemProp="image"
                                alt="City Images  "
                            />
                            <div className=" text-center Index_city_card-text-3 pt-6">
                                Gurgaon
                            </div>
                        </div>
                        <div className="border py-6 px-9 cityNameCards_index">
                            <img
                                className="mx-auto cityIcon_index"
                                src="/images/index_image/Group_62.png"
                                itemProp="image"
                                alt="City Images  "
                            />
                            <div className=" text-center pt-6">
                                Hyderabad
                            </div>
                        </div>
                        <div className="border py-6 px-9 cityNameCards_index">
                            <img
                                className="mx-auto cityIcon_index"
                                src="/images/index_image/Group_59.png"
                                itemProp="image"
                                alt="City Images  "
                            />
                            <div className=" text-center Index_city_card-text-3 pt-6">
                                Mumbai
                            </div>
                        </div>
                        <div className="border py-6 px-9 cityNameCards_index">
                            <img
                                className="mx-auto cityIcon_index"
                                src="/images/index_image/Group_61.png"
                                itemProp="image"
                                alt="City Images  "
                            />
                            <div className=" text-center Index_city_card-text-3 pt-6">
                                Chennai
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Index_city_card-background py-14 flex justify-center">
                    <button
                        type="button"
                        className="WhiteButton w-56 mx-auto py-4 text-lg"
                    >
                        Explore All Cities
                        <img
                            className="arrow-png pl-3"
                            src="/images/index_image/arrow_blue.png"
                            itemProp="image"
                            alt="City Images  "
                        />
                    </button>
                </div>
                <div className="bg-white px-5 py-8 flex flex-col justify-center">
                    <div className="Index_fAQ_text px-12 text-center font-bold">
                        FAQ about Packers and Movers
                    </div>
                    <div className="index_FAQsPannels">
                        <Collapse defaultActiveKey={["1"]}>
                            <Panel header="This is panel header 1" key="1">
                                {text}
                            </Panel>
                            <Panel header="This is panel header 2" key="2">
                                {text}
                            </Panel>
                            <Panel header="This is panel header 3" key="3">
                                {text}
                            </Panel>
                        </Collapse>
                    </div>
                    <button
                        type="button"
                        className="WhiteButton px-7 mx-auto py-4 text-lg mt-3"
                    >
                        View All FAQs
                        <img
                            className="arrow-png pl-3"
                            src="/images/index_image/arrow_blue.png"
                            itemProp="image"
                            alt="main BannerImage"
                        />
                    </button>
                </div>
                <div className="Index_background5 pl-4 pr-4 pt-10 pb-20">
                    <div className="index_card_experience_text ">
                        Our{" "}
                        <span className="index_card_experience_text-2">
                            Best experience
                        </span>{" "}
                        in Excellent <br /> Logistics Fulfillment
                    </div>
                    <div className="index_card_experience_respo">
                        <div className="index_card_experience  p-5 ">
                            <div className="index_card_experience_text-3  pb-5">01</div>
                            <img
                                className="pb-4"
                                src="/images/index_image/sticky_note_2.png"
                                itemProp="image"
                                alt="main BannerImage"
                            />
                            <div className="index_card_experience_text-4 pb-3">
                                Convenient Booking
                            </div>
                            <div className="index_card_experience_text-5">
                                Book on your schedule and get estimates instantly with the help of
                                our dedicated customer service agents.
                            </div>
                        </div>
                        <div className="index_card_experience  p-5 ">
                            <div className="index_card_experience_text-3  pb-5">01</div>
                            <img
                                className="pb-4"
                                src="/images/index_image/sticky_note_2.png"
                                itemProp="image"
                                alt="main BannerImage"
                            />
                            <div className="index_card_experience_text-4 pb-3">
                                A Non-to-Exceed quote
                            </div>
                            <div className="index_card_experience_text-5">
                                Receive fixed-price, individualized plans and reserve your move without having to worry about hidden fees.
                            </div>
                        </div>
                        <div className="index_card_experience  p-5 ">
                            <div className="index_card_experience_text-3  pb-5">01</div>
                            <img
                                className="pb-4"
                                src="/images/index_image/sticky_note_2.png"
                                itemProp="image"
                                alt="main BannerImage"
                            />
                            <div className="index_card_experience_text-4 pb-3">
                                Precise Pickup & Delivery
                            </div>
                            <div className="index_card_experience_text-5">
                                There's no need to get held up by service windows. With White Glove Packers and Movers, you can relax.
                            </div>
                        </div>
                        <div className="index_card_experience  p-5 ">
                            <div className="index_card_experience_text-3  pb-5">01</div>
                            <img
                                className="pb-4"
                                src="/images/index_image/sticky_note_2.png"
                                itemProp="image"
                                alt="main BannerImage"
                            />
                            <div className="index_card_experience_text-4 pb-3">
                                Dedicated Trucks
                            </div>
                            <div className="index_card_experience_text-5">
                                Don't worry about sharing your truck space or move-day with anyone else.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5">
                    <div className=" text-center Index_blog-text-3 py-7">
                        Our Latest blog
                    </div>
                    <div className="IndexBlogs">
                        <div className="Index_BlogCards">
                            <div>
                                <img
                                    className="pb-4"
                                    src="/images/index_image/Rectangle_9.png"
                                    itemProp="image"
                                    alt="main BannerImage"
                                />
                            </div>
                            <div className=" py-4">
                                <button
                                    type="button"
                                    className="GreyButton px-7 mx-auto py-3 text-lg"
                                >
                                    Agriculture
                                </button>
                                <span className="Index_blog-text m-auto pl-8">27 Aug, 2022</span>
                            </div>
                            <div className="Index_blog-text-2 pb-8">
                                Griha Pravesh Muhurat 2021: Auspicious Dates for Home Shifting
                            </div>
                        </div>
                        <div className="Index_BlogCards">
                            <div>
                                <img
                                    className="pb-4"
                                    src="/images/index_image/Rectangle_10.png"
                                    itemProp="image"
                                    alt="main BannerImage"
                                />
                            </div>
                            <div className=" py-4">
                                <button
                                    type="button"
                                    className="GreyButton px-7 mx-auto py-3 text-lg"
                                >
                                    LifeStyle
                                </button>
                                <span className="Index_blog-text m-auto pl-8">06 May, 2022</span>
                            </div>
                            <div className="Index_blog-text-2 pb-8">
                                How to Find the Right House in Bangalore?
                            </div>
                        </div>
                        <div className="Index_BlogCards">
                            <div>
                                <img
                                    className="pb-4"
                                    src="/images/index_image/Rectangle_8.png"
                                    itemProp="image"
                                    alt="main BannerImage"
                                />
                            </div>
                            <div className=" py-4">
                                <button
                                    type="button"
                                    className="GreyButton px-7 mx-auto py-3 text-lg"
                                >
                                    LifeStyle
                                </button>
                                <span className="Index_blog-text m-auto pl-8">27 Aug, 2022</span>
                            </div>
                            <div className="Index_blog-text-2 pb-8">
                                A Comprehensive Guide for Moving into a New Home
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-center">
                        <button type="button" className="WhiteButton px-7    py-4 text-lg">
                            View all Blogs
                            <img
                                className="arrow-png pl-5"
                                src="/images/index_image/arrow_blue.png"
                                itemProp="image"
                                alt="main BannerImage"
                            />
                        </button>
                    </div>
                    {/* </div> */}
                </div>
                <div className="Index_background6 p-7 ">
                    <div className="Index_Clint_card-Heading text-center px-6 py-11">
                        What our Clients are Saying
                    </div>
                    <div className="hidden lg:block xl:block">
                        <Card
                            bordered={false}
                            style={{
                                width: 500,
                                height: 350,
                            }}
                        >
                            <div className="Index_Clint_card p-6">
                                <div className="Index_Clint_card-item pb-7">
                                    <div>
                                        <img
                                            className="pb-4"
                                            src="/images/index_image/Rectangle_11.png"
                                            itemProp="image"
                                            alt="main BannerImage"
                                        />
                                    </div>
                                    <div>
                                        <div className="Index_Clint_card-item-text pb-5">
                                            Mainak Chakraborty
                                        </div>
                                        <div className="Index_Clint_card-item-text-2 pb-4">
                                            Co-founder &amp; CEO, GPS Renewables
                                        </div>
                                        <div className="Index_Clint_card-item-text-3">
                                            Relocated from Bangalore to Hyderabad
                                        </div>
                                    </div>
                                </div>
                                <div className="Index_Clint_card-text">
                                    I moved from Whitefield, Bangalore to Hyderabad with Pikkol
                                    recently. I had been in Bangalore for many years, so, had
                                    considerable number of items. My Whitefield house was a duplex
                                    villa (without a lift) with many of these items in the first
                                    floor.
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="Index_Clint_card p-6 block lg:hidden xl:hidden">
                        <div className="Index_Clint_card-item pb-7">
                            <div>
                                <img
                                    className="pb-4"
                                    src="/images/index_image/Rectangle_11.png"
                                    itemProp="image"
                                    alt="main BannerImage"
                                />
                            </div>
                            <div>
                                <div className="Index_Clint_card-item-text pb-5">
                                    Mainak Chakraborty
                                </div>
                                <div className="Index_Clint_card-item-text-2 pb-4">
                                    Co-founder &amp; CEO, GPS Renewables
                                </div>
                                <div className="Index_Clint_card-item-text-3">
                                    Relocated from Bangalore to Hyderabad
                                </div>
                            </div>
                        </div>
                        <div className="Index_Clint_card-text">
                            I moved from Whitefield, Bangalore to Hyderabad with Pikkol
                            recently. I had been in Bangalore for many years, so, had
                            considerable number of items. My Whitefield house was a duplex
                            villa (without a lift) with many of these items in the first
                            floor.
                        </div>
                    </div>
                    <div className="Index-Clint_trust-Heading py-12 ">
                        150+ Clients Trust White Glove
                    </div>
                    <div>
                        <div className="lg:hidden xl:hidden hidden grid grid-cols-2 items-center justify-center">
                            {/* <div> */}
                            <div className=" border p-5">
                                <img
                                    // className="p-4"
                                    src="/images/index_image/LOGISTIC_icon.png"
                                    alt="main BannerImage" />
                            </div>
                            <div className=" border p-5">
                                <img
                                    // className="p-4"
                                    src="/images/index_image/Express_Delevery_icon.png"
                                    alt="main BannerImage" />
                            </div>

                            <div className=" border p-5">
                                <img
                                    // className="p-4" 
                                    src="/images/index_image/ExpressIcon.png"
                                    alt="main BannerImage" />
                            </div>
                            {/* </div> */}
                            {/* <div> */}

                            <div className=" border p-5">
                                <img
                                    className="p-1"
                                    src="/images/index_image/Express_icon.png"
                                    alt="main BannerImage" />
                            </div>
                            <div className=" border p-5">
                                <img
                                    // className="p-4"
                                    src="/images/index_image/ICON_COMPNY.png"
                                    alt="main BannerImage" />
                            </div>
                            <div className=" border p-5">
                                <img
                                    // className="p-4"
                                    src="/images/index_image/Global_Icon.png"
                                    alt="main BannerImage" />
                            </div>
                            {/* </div> */}
                        </div>
                        <div className="px-56">
                            <img
                                className="hidden lg:block xl:block"
                                src="/images/index_image/aerow_company.png"
                                alt="main BannerImage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
export default HomePage;
