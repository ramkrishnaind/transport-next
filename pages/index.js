import React, { useEffect, useState, useContext } from "react";
import { registerCustomer } from "../services/customer-api-service";
import { Button, notification, Alert } from "antd";
import TransportContext from "../context";
import { useRouter } from "next/router";
// import FirstSVG from "../public/svg/first.svg";
// import Maritime_transport from "../public/svg/maritime_transport.svg";
// import Landing from "../public/svg/landing.svg";
// import PagesSVG from "../public/svg/pages.svg"; 
// import AboutUsSVG from "../public/svg/aboutUs.svg";
// import OurTeamSVG from "../public/svg/our_team.svg";
// import MeetTheCrewSVG from "../public/svg/meet_the_crew.svg";
// import JobApplicationSVG from "../public/svg/job_application.svg";
// import AvailablePositionsSVG from "../public/svg/available_positions.svg";
// import OurClientsSVG from "../public/svg/OurClients.svg";
// import FAQPageSVG from "../public/svg/FAQPage.svg";
// import ErrorPageSVG from "../public/svg/404_error_page.svg";
// import ServicesSVG from "../public/svg/Services.svg";
// import OurServicesSVG from "../public/svg/ourServices.svg";
// import WhatWeDoSVG from "../public/svg/WhatWeDo.svg";
// import RequestFreightSVG from "../public/svg/request_reight.svg";
// import BlogSVG from "../public/svg/blog.svg";
// import RightSidebarSVG from "../public/svg/rightSidebar.svg";
// import LeftSidebarSVG from "../public/svg/leftSidebar.svg";
// import NoSidebarSVG from "../public/svg/noSidebar.svg";
// import PostTypesSVG from "../public/svg/postTypes.svg";
// import PostTypes2SVG from "../public/svg/postTypes2.svg";
// import StandardPostSVG from "../public/svg/standardPost.svg";
// import GalleryPostSVG from "../public/svg/galleryPost.svg";
// import QuotePostSVG from "../public/svg/quotePost.svg";
// import LinkPostSVG from "../public/svg/linkPost.svg";
// import AudioPostSVG from "../public/svg/audioPost.svg";
// import VideoPostSVG from "../public/svg/videoPost.svg";
// import NoSidebarPostSVG from "../public/svg/noSidebarPost.svg";
// import ContactSVG from "../public/svg/contact.svg";
// import GetInTouchSVG from "../public/svg/getInTouch.svg";
// import GlobalNetworkSVG from "../public/svg/globalNetwork.svg";
// import TrackYourOrderSVG from "../public/svg/trackYourOrder.svg";
// import TrackTraceSVG from "../public/svg/TrackTrace.svg";
// import MenuSVG from "../public/svg/menu.svg";
// import MenuCloseSVG from "../public/svg/menu_close.svg";
// import HomesSVG from "../public/svg/homes.svg";
// import MainHomeSVG from "../public/svg/mainHome.svg";
// import CargoShippingSVG from "../public/svg/cargoShipping.svg";
// import AirFreightSVG from "../public/svg/airFreight.svg";
// import RailFreightSVG from "../public/svg/railFreight.svg";
// import ComingSoonSVG from "../public/svg/comingSoon.svg";
// import DividedSliderHomeSVG from "../public/svg/dividedSliderHome.svg";
// import ViewMoreSVG from "../public/svg/view_more.svg";
// import BackToTopSVG from "../public/svg/back_to_top.svg";
import Script from "next/script";
import { Spin } from "antd";

const HomePage = () => {
  const context = useContext(TransportContext);
  const router = useRouter();
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");

  const [nameBlur, setNameBlur] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [phoneNumberBlur, setPhoneNumberBlur] = useState(false);

  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (enteredName) {
      console.log("Name is valid");
    }
  }, [enteredName]);

  useEffect(() => {
    if (enteredEmail) {
      console.log("Email is valid");
    }
  }, [enteredEmail]);

  useEffect(() => {
    if (enteredPhoneNumber) {
      console.log("PhoneNumber is valid");
    }
  }, [enteredPhoneNumber]);

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
    setEnteredPhoneNumber(event.target.value);
  };
  const disableSubmit =
    !enteredName ||
    !enteredPhoneNumber ||
    !enteredEmail ||
    !enteredEmail.includes("@");

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
    setNameBlur(true);
    setEmailBlur(true);
    setPhoneNumberBlur(true);

    if (!enteredName || !enteredEmail || !enteredPhoneNumber) return;
    try {
      setLoading(true);
      let saveResponse = await saveFormData();
      console.log("saveRes", saveResponse.data);
      if (saveResponse.data.status) {
        router.push("/otp");
        setEnteredName("");
        setEnteredEmail("");
        setEnteredPhoneNumber("");
        setLoading(false);
        router.push("/otp");
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
        setLoading(false);
      }
    } catch (e) {
      alert(`Submission failed! ${e.message}`);
    }
  };

  return (
    <>
      <div>
        {/* <FirstSVG />
         */}
        <img src="../public/svg/first.svg" />
        {/* <SecondSVG />
        <ThirdSVG />
        <FourthSVG />
        <FifthSVG />
        <SixthSVG />
        <SeventhSVG />
        <EightthSVG /> */}
        <a className="skip-link screen-reader-text" href="#qodef-page-content">
          Skip to the content
        </a>{" "}
        <div id="qodef-page-wrapper" className="">
          <div id="qodef-menu-cover"></div>
          <header id="qodef-page-header" role="banner">
            <div id="qodef-page-header-inner"
              className=" qodef-skin--light qodef-header-cursor--light"
            >
              <a
                itemprop="url"
                className="qodef-header-logo-link qodef-height--not-set qodef-source--image"
                href="https://globefarer.qodeinteractive.com/"
                rel="home"
              >
                <img
                  src="assets/image/logo.png"
                  className="qodef-header-logo-image qodef--main"
                  itemprop="image"
                  alt="logo main"
                />
                <img
                  src="assets/image/logo.png"
                  className="qodef-header-logo-image qodef--dark"
                  itemprop="image"
                  alt="logo dark"
                />
                <img
                  src="assets/image/logo.png"
                  className="qodef-header-logo-image qodef--light"
                  itemprop="image"
                  alt="logo light"
                />
              </a>
              <nav
                className="qodef-header-navigation"
                role="navigation"
                aria-label="Top Menu"
              >
                <ul id="menu-main-menu-1" className="menu">
                  <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-757 qodef--hide-link qodef-menu-item--narrow">
                    <a onclick="JavaScript: return false;">
                      <span className="qodef-menu-item-text">
                        Homes
                        <img src="../public/svg/homes.svg" />
                      </span>
                    </a>
                    <div className="qodef-drop-down-second">
                      <div className="qodef-drop-down-second-inner">
                        <ul className="sub-menu">
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-50 current_page_item menu-item-762">
                            <a href="https://globefarer.qodeinteractive.com/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/mainHome.svg" />
                                Main Home
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1143">
                            <a href="https://globefarer.qodeinteractive.com/cargo-shipping/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/cargoShipping.svg" />
                                Cargo Shipping
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2516">
                            <a href="https://globefarer.qodeinteractive.com/maritime-transport/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/maritime_transport.svg" />
                                Maritime Transport
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-763">
                            <a href="https://globefarer.qodeinteractive.com/air-freight/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/airFreight.svg" />
                                Air Freight
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1780">
                            <a href="https://globefarer.qodeinteractive.com/rail-freight/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/railFreight.svg" />
                                Rail Freight
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6680">
                            <a href="https://globefarer.qodeinteractive.com/coming-soon/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/comingSoon.svg" />
                                Coming Soon
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1142">
                            <a href="https://globefarer.qodeinteractive.com/divided-slider-home/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/dividedSliderHome.svg" />
                                Divided Slider Home
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5224">
                            <a href="https://globefarer.qodeinteractive.com/landing/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/landing.svg" />
                                Landing
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-761 qodef--hide-link qodef-menu-item--narrow">
                    <a onclick="JavaScript: return false;">
                      <span className="qodef-menu-item-text">
                        Pages
                        <img src="../public/svg/pages.svg" />
                      </span>
                    </a>
                    <div className="qodef-drop-down-second">
                      <div className="qodef-drop-down-second-inner">
                        <ul className="sub-menu">
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2638">
                            <a href="https://globefarer.qodeinteractive.com/about-us/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/aboutUs.svg" />
                                About Us
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-team menu-item-3439">
                            <a href="https://globefarer.qodeinteractive.com/team/mary-simens/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/our_team.svg" />
                                Our Team
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3438">
                            <a href="https://globefarer.qodeinteractive.com/meet-the-crew/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/meet_the_crew.svg" />
                                Meet The Crew
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-career-item menu-item-3596">
                            <a href="https://globefarer.qodeinteractive.com/career-item/stocking-associate/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/job_application.svg" />
                                Job Application
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4022">
                            <a href="https://globefarer.qodeinteractive.com/available-positions/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/available_positions.svg" />
                                Available Positions
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3136">
                            <a href="https://globefarer.qodeinteractive.com/our-clients/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/OurClients.svg" />
                                Our Clients
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3176">
                            <a href="https://globefarer.qodeinteractive.com/faq-page/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/FAQPage.svg" />
                                FAQ Page
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4573">
                            <a href="https://globefarer.qodeinteractive.com/404-error-page">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/404_error_page.svg" />
                                404 Error Page
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-764 qodef--hide-link qodef-menu-item--narrow">
                    <a onclick="JavaScript: return false;">
                      <span className="qodef-menu-item-text">
                        Services
                        <img src="../public/svg/Services.svg" />
                      </span>
                    </a>
                    <div className="qodef-drop-down-second">
                      <div className="qodef-drop-down-second-inner">
                        <ul className="sub-menu">
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2715">
                            <a href="https://globefarer.qodeinteractive.com/our-services/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/ourServices.svg" />
                                Our Services
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3137">
                            <a href="https://globefarer.qodeinteractive.com/what-we-do/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/WhatWeDo.svg" />
                                What We Do
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3450">
                            <a href="https://globefarer.qodeinteractive.com/step-1-3/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/request_reight.svg" />
                                Request a Freight
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-765 qodef--hide-link qodef-menu-item--narrow">
                    <a onclick="JavaScript: return false;">
                      <span className="qodef-menu-item-text">
                        Blog
                        <img src="../public/svg/blog.svg" />
                      </span>
                    </a>
                    <div className="qodef-drop-down-second">
                      <div className="qodef-drop-down-second-inner">
                        <ul className="sub-menu">
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3007">
                            <a href="https://globefarer.qodeinteractive.com/blog/right-sidebar/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/rightSidebar.svg" />
                                Right Sidebar
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3006">
                            <a href="https://globefarer.qodeinteractive.com/blog/left-sidebar/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/leftSidebar.svg" />
                                Left Sidebar
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3005">
                            <a href="https://globefarer.qodeinteractive.com/blog/no-sidebar/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/noSidebar.svg" />
                                No Sidebar
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-2799 qodef--hide-link">
                            <a onclick="JavaScript: return false;">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/postTypes.svg" />
                                Post Types
                                <img src="../public/svg/postTypes2.svg" />
                              </span>
                            </a>
                            <ul className="sub-menu">
                              <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2806">
                                <a href="https://globefarer.qodeinteractive.com/electric-wave-motion/">
                                  <span className="qodef-menu-item-text">
                                    <img src="../public/svg/standardPost.svg" />
                                    Standard Post
                                  </span>
                                </a>
                              </li>
                              <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2805">
                                <a href="https://globefarer.qodeinteractive.com/the-hidden-gems/">
                                  <span className="qodef-menu-item-text">
                                    <img src="../public/svg/galleryPost.svg" />
                                    Gallery Post
                                  </span>
                                </a>
                              </li>
                              <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2804">
                                <a href="https://globefarer.qodeinteractive.com/creating-memories/">
                                  <span className="qodef-menu-item-text">
                                    <img src="../public/svg/quotePost.svg" />
                                    Quote Post
                                  </span>
                                </a>
                              </li>
                              <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2803">
                                <a href="https://globefarer.qodeinteractive.com/large-scale-fishing/">
                                  <span className="qodef-menu-item-text">
                                    <img src="../public/svg/linkPost.svg" />
                                    Link Post
                                  </span>
                                </a>
                              </li>
                              <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2802">
                                <a href="https://globefarer.qodeinteractive.com/the-industrial-proletariat/">
                                  <span className="qodef-menu-item-text">
                                    <img src="../public/svg/audioPost.svg" />
                                    Audio Post
                                  </span>
                                </a>
                              </li>
                              <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2801">
                                <a href="https://globefarer.qodeinteractive.com/a-sustainable-future/">
                                  <span className="qodef-menu-item-text">
                                    <img src="../public/svg/videoPost.svg" />
                                    Video Post
                                  </span>
                                </a>
                              </li>
                              <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2800">
                                <a href="https://globefarer.qodeinteractive.com/tips-and-strategies/">
                                  <span className="qodef-menu-item-text">
                                    <img src="../public/svg/noSidebarPost.svg" />
                                    No Sidebar Post
                                  </span>
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-766 qodef--hide-link qodef-menu-item--narrow">
                    <a onclick="JavaScript: return false;">
                      <span className="qodef-menu-item-text">
                        Contact
                        <img src="../public/svg/contact.svg" />
                      </span>
                    </a>
                    <div className="qodef-drop-down-second">
                      <div className="qodef-drop-down-second-inner">
                        <ul className="sub-menu">
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3254">
                            <a href="https://globefarer.qodeinteractive.com/get-in-touch/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/getInTouch.svg" />
                                Get in Touch
                              </span>
                            </a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3228">
                            <a href="https://globefarer.qodeinteractive.com/global-network/">
                              <span className="qodef-menu-item-text">
                                <img src="../public/svg/globalNetwork.svg" />
                                Global Network
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
              <div className="qodef-widget-holder qodef--one">
                <div
                  className="widget widget_globefarer_core_order_tracking"
                  data-area="header-light"
                >
                  {" "}
                  <div className="qodef-order-tracking">
                    <div className="qodef-m-opener">
                      <img src="../public/svg/trackYourOrder.svg" />
                      <span className="qodef-m-opener-text">
                        Track Your Order
                      </span>
                    </div>
                    <div className="qodef-m-dropdown">
                      <div className="qodef-m-dropdown-inner">
                        <div className="qodef-m-dropdown-tagline">
                          <span>Keep track of your packages</span>
                        </div>
                        <div className="qodef-contact-form-7">
                          <div
                            role="form"
                            className="wpcf7"
                            id="wpcf7-f1991-o1"
                            lang="en-US"
                            dir="ltr"
                          >
                            <div className="screen-reader-response">
                              <p
                                role="status"
                                aria-live="polite"
                                aria-atomic="true"
                              ></p>{" "}
                              <ul></ul>
                            </div>
                            <form
                              action="/#wpcf7-f1991-o1"
                              method="post"
                              className="wpcf7-form init"
                              novalidate="novalidate"
                              data-status="init"
                            >
                              <div
                                style={{ display: "none" }}
                              >
                                <input
                                  type="hidden"
                                  name="_wpcf7"
                                  value="1991"
                                />
                                <input
                                  type="hidden"
                                  name="_wpcf7_version"
                                  value="5.5.3"
                                />
                                <input
                                  type="hidden"
                                  name="_wpcf7_locale"
                                  value="en_US"
                                />
                                <input
                                  type="hidden"
                                  name="_wpcf7_unit_tag"
                                  value="wpcf7-f1991-o1"
                                />
                                <input
                                  type="hidden"
                                  name="_wpcf7_container_post"
                                  value="0"
                                />
                                <input
                                  type="hidden"
                                  name="_wpcf7_posted_data_hash"
                                  value=""
                                />
                              </div>
                              <div className="qodef-contact-form-7--order-tracking-widget">
                                <span className="wpcf7-form-control-wrap your-id">
                                  <input
                                    type="text"
                                    name="your-id"
                                    value=""
                                    size="40"
                                    className="wpcf7-form-control wpcf7-text"
                                    aria-invalid="false"
                                    placeholder="Tracking ID"
                                  />
                                </span>
                                <button
                                  type="submit"
                                  className="wpcf7-form-control wpcf7-submit qodef-button qodef-size--normal qodef-layout--filled qodef-m"
                                >
                                  <span className="qodef-m-button-icon">
                                    <img src="../public/svg/TrackTrace.svg" />
                                  </span>
                                  <span className="qodef-m-button-text">
                                    Track & Trace
                                  </span>
                                </button>
                              </div>
                              <div
                                className="wpcf7-response-output"
                                aria-hidden="true"
                              ></div>
                            </form>
                          </div>
                        </div>
                        <a
                          className="qodef-m-dropdown-link"
                          itemprop="url"
                          href=""
                          target="_blank"
                        >
                          <span>Need help?</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="widget widget_globefarer_core_side_area_opener"
                  data-area="header-light"
                >
                  <a
                    href="javascript:void(0)"
                    className="qodef-opener-icon qodef-m qodef-source--predefined qodef-side-area-opener"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <span className="qodef-m-icon qodef--open">
                      <img src="../public/svg/menu.svg" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="qodef-header-sticky qodef-custom-header-layout qodef-appearance--down">
              <div className="qodef-header-sticky-inner ">
                <a
                  itemprop="url"
                  className="qodef-header-logo-link qodef-height--not-set qodef-source--image"
                  href="https://globefarer.qodeinteractive.com/"
                  rel="home"
                >
                  <img
                    src="assets/image/logo.png"
                    className="qodef-header-logo-image qodef--main"
                    itemprop="image"
                    alt="logo main"
                  />
                </a>
                <nav
                  className="qodef-header-navigation"
                  role="navigation"
                  aria-label="Top Menu"
                >
                  <ul id="menu-main-menu-2" className="menu">
                    <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-757 qodef--hide-link qodef-menu-item--narrow">
                      <a onclick="JavaScript: return false;">
                        <span className="qodef-menu-item-text">
                          Homes
                          <img src="../public/svg/homes.svg" />
                        </span>
                      </a>
                      <div className="qodef-drop-down-second">
                        <div className="qodef-drop-down-second-inner">
                          <ul className="sub-menu">
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-50 current_page_item menu-item-762">
                              <a href="https://globefarer.qodeinteractive.com/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/mainHome.svg" />
                                  Main Home
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1143">
                              <a href="https://globefarer.qodeinteractive.com/cargo-shipping/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/cargoShipping.svg" />
                                  Cargo Shipping
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2516">
                              <a href="https://globefarer.qodeinteractive.com/maritime-transport/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/maritime_transport.svg" />
                                  Maritime Transport
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-763">
                              <a href="https://globefarer.qodeinteractive.com/air-freight/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/airFreight.svg" />
                                  Air Freight
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1780">
                              <a href="https://globefarer.qodeinteractive.com/rail-freight/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/railFreight.svg" />
                                  Rail Freight
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6680">
                              <a href="https://globefarer.qodeinteractive.com/coming-soon/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/comingSoon.svg" />
                                  Coming Soon
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1142">
                              <a href="https://globefarer.qodeinteractive.com/divided-slider-home/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/dividedSliderHome.svg" />
                                  Divided Slider Home
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5224">
                              <a href="https://globefarer.qodeinteractive.com/landing/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/landing.svg" />
                                  Landing
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-761 qodef--hide-link qodef-menu-item--narrow">
                      <a onclick="JavaScript: return false;">
                        <span className="qodef-menu-item-text">
                          Pages
                          <img src="../public/svg/pages.svg" />
                        </span>
                      </a>
                      <div className="qodef-drop-down-second">
                        <div className="qodef-drop-down-second-inner">
                          <ul className="sub-menu">
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2638">
                              <a href="https://globefarer.qodeinteractive.com/about-us/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/aboutUs.svg" />
                                  About Us
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-team menu-item-3439">
                              <a href="https://globefarer.qodeinteractive.com/team/mary-simens/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/our_team.svg" />
                                  Our Team
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3438">
                              <a href="https://globefarer.qodeinteractive.com/meet-the-crew/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/meet_the_crew.svg" />
                                  Meet The Crew
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-career-item menu-item-3596">
                              <a href="https://globefarer.qodeinteractive.com/career-item/stocking-associate/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/job_application.svg" />
                                  Job Application
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4022">
                              <a href="https://globefarer.qodeinteractive.com/available-positions/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/available_positions.svg" />
                                  Available Positions
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3136">
                              <a href="https://globefarer.qodeinteractive.com/our-clients/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/OurClients.svg" />
                                  Our Clients
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3176">
                              <a href="https://globefarer.qodeinteractive.com/faq-page/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/FAQPage.svg" />
                                  FAQ Page
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4573">
                              <a href="https://globefarer.qodeinteractive.com/404-error-page">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/404_error_page.svg" />
                                  404 Error Page
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-764 qodef--hide-link qodef-menu-item--narrow">
                      <a onclick="JavaScript: return false;">
                        <span className="qodef-menu-item-text">
                          Services
                          <img src="../public/svg/Services.svg" />
                        </span>
                      </a>
                      <div className="qodef-drop-down-second">
                        <div className="qodef-drop-down-second-inner">
                          <ul className="sub-menu">
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2715">
                              <a href="https://globefarer.qodeinteractive.com/our-services/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/ourServices.svg" />
                                  Our Services
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3137">
                              <a href="https://globefarer.qodeinteractive.com/what-we-do/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/WhatWeDo.svg" />
                                  What We Do
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3450">
                              <a href="https://globefarer.qodeinteractive.com/step-1-3/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/request_reight.svg" />
                                  Request a Freight
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-765 qodef--hide-link qodef-menu-item--narrow">
                      <a onclick="JavaScript: return false;">
                        <span className="qodef-menu-item-text">
                          Blog
                          <img src="../public/svg/blog.svg" />
                        </span>
                      </a>
                      <div className="qodef-drop-down-second">
                        <div className="qodef-drop-down-second-inner">
                          <ul className="sub-menu">
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3007">
                              <a href="https://globefarer.qodeinteractive.com/blog/right-sidebar/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/rightSidebar.svg" />
                                  Right Sidebar
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3006">
                              <a href="https://globefarer.qodeinteractive.com/blog/left-sidebar/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/leftSidebar.svg" />
                                  Left Sidebar
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3005">
                              <a href="https://globefarer.qodeinteractive.com/blog/no-sidebar/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/noSidebar.svg" />
                                  No Sidebar
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-2799 qodef--hide-link">
                              <a onclick="JavaScript: return false;">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/postTypes.svg" />
                                  Post Types
                                  <img src="../public/svg/postTypes2.svg" />
                                </span>
                              </a>
                              <ul className="sub-menu">
                                <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2806">
                                  <a href="https://globefarer.qodeinteractive.com/electric-wave-motion/">
                                    <span className="qodef-menu-item-text">
                                      <img src="../public/svg/standardPost.svg" />
                                      Standard Post
                                    </span>
                                  </a>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2805">
                                  <a href="https://globefarer.qodeinteractive.com/the-hidden-gems/">
                                    <span className="qodef-menu-item-text">
                                      <img src="../public/svg/galleryPost.svg" />
                                      Gallery Post
                                    </span>
                                  </a>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2804">
                                  <a href="https://globefarer.qodeinteractive.com/creating-memories/">
                                    <span className="qodef-menu-item-text">
                                      <img src="../public/svg/quotePost.svg" />
                                      Quote Post
                                    </span>
                                  </a>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2803">
                                  <a href="https://globefarer.qodeinteractive.com/large-scale-fishing/">
                                    <span className="qodef-menu-item-text">
                                      <img src="../public/svg/linkPost.svg" />
                                      Link Post
                                    </span>
                                  </a>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2802">
                                  <a href="https://globefarer.qodeinteractive.com/the-industrial-proletariat/">
                                    <span className="qodef-menu-item-text">
                                      <img src="../public/svg/audioPost.svg" />
                                      Audio Post
                                    </span>
                                  </a>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2801">
                                  <a href="https://globefarer.qodeinteractive.com/a-sustainable-future/">
                                    <span className="qodef-menu-item-text">
                                      <img src="../public/svg/videoPost.svg" />
                                      Video Post
                                    </span>
                                  </a>
                                </li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2800">
                                  <a href="https://globefarer.qodeinteractive.com/tips-and-strategies/">
                                    <span className="qodef-menu-item-text">
                                      <img src="../public/svg/noSidebarPost.svg" />
                                      No Sidebar Post
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-766 qodef--hide-link qodef-menu-item--narrow">
                      <a onclick="JavaScript: return false;">
                        <span className="qodef-menu-item-text">
                          Contact
                          <img src="../public/svg/contact.svg" />
                        </span>
                      </a>
                      <div className="qodef-drop-down-second">
                        <div className="qodef-drop-down-second-inner">
                          <ul className="sub-menu">
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3254">
                              <a href="https://globefarer.qodeinteractive.com/get-in-touch/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/getInTouch.svg" />
                                  Get in Touch
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3228">
                              <a href="https://globefarer.qodeinteractive.com/global-network/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/globalNetwork.svg" />
                                  Global Network
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </nav>
                <div className="qodef-widget-holder qodef--one">
                  <div
                    id="globefarer_core_side_area_opener-6"
                    className="widget widget_globefarer_core_side_area_opener qodef-sticky-right"
                  >
                    <a
                      href="javascript:void(0)"
                      className="qodef-opener-icon qodef-m qodef-source--predefined qodef-side-area-opener"
                    >
                      <span className="qodef-m-icon qodef--open">
                        <img src="../public/svg/menu.svg" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <header id="qodef-page-mobile-header" role="banner">
            <div id="qodef-page-mobile-header-inner" className="">
              <a
                itemprop="url"
                className="qodef-mobile-header-logo-link qodef-height--not-set qodef-source--image"
                href="https://globefarer.qodeinteractive.com/"
                rel="home"
              >
                <img
                  src="assets/image/logo.png"
                  className="qodef-header-logo-image qodef--main"
                  alt="logo main"
                  itemprop="image"
                />
              </a>
              <a
                href="javascript:void(0)"
                className="qodef-opener-icon qodef-m qodef-source--predefined qodef-mobile-header-opener"
              >
                <span className="qodef-m-icon qodef--open">
                  <img src="../public/svg/menu.svg" />
                </span>
                <span className="qodef-m-icon qodef--close">
                  <img src="../public/svg/menu_close.svg" />
                </span>
              </a>
            </div>
            <nav
              className="qodef-mobile-header-navigation"
              role="navigation"
              aria-label="Mobile Menu"
            >
              <ul id="menu-main-menu-4" className="">
                <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-757 qodef--hide-link qodef-menu-item--narrow">
                  <a onclick="JavaScript: return false;">
                    <span className="qodef-menu-item-text">Homes</span>
                  </a>
                  <img src="../public/svg/homes.svg" />
                  <div className="qodef-drop-down-second">
                    <div className="qodef-drop-down-second-inner">
                      <ul className="sub-menu">
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-50 current_page_item menu-item-762">
                          <a href="https://globefarer.qodeinteractive.com/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/mainHome.svg" />
                              Main Home
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1143">
                          <a href="https://globefarer.qodeinteractive.com/cargo-shipping/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/cargoShipping.svg" />
                              Cargo Shipping
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2516">
                          <a href="https://globefarer.qodeinteractive.com/maritime-transport/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/maritime_transport.svg" />
                              Maritime Transport
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-763">
                          <a href="https://globefarer.qodeinteractive.com/air-freight/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/airFreight.svg" />
                              Air Freight
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1780">
                          <a href="https://globefarer.qodeinteractive.com/rail-freight/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/railFreight.svg" />
                              Rail Freight
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6680">
                          <a href="https://globefarer.qodeinteractive.com/coming-soon/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/comingSoon.svg" />
                              Coming Soon
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1142">
                          <a href="https://globefarer.qodeinteractive.com/divided-slider-home/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/dividedSliderHome.svg" />
                              Divided Slider Home
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5224">
                          <a href="https://globefarer.qodeinteractive.com/landing/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/landing.svg" />
                              Landing
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-761 qodef--hide-link qodef-menu-item--narrow">
                  <a onclick="JavaScript: return false;">
                    <span className="qodef-menu-item-text">Pages</span>
                  </a>
                  <img src="../public/svg/pages.svg" />
                  <div className="qodef-drop-down-second">
                    <div className="qodef-drop-down-second-inner">
                      <ul className="sub-menu">
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2638">
                          <a href="https://globefarer.qodeinteractive.com/about-us/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/aboutUs.svg" />
                              About Us
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-team menu-item-3439">
                          <a href="https://globefarer.qodeinteractive.com/team/mary-simens/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/our_team.svg" />
                              Our Team
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3438">
                          <a href="https://globefarer.qodeinteractive.com/meet-the-crew/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/meet_the_crew.svg" />
                              Meet The Crew
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-career-item menu-item-3596">
                          <a href="https://globefarer.qodeinteractive.com/career-item/stocking-associate/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/job_application.svg" />
                              Job Application
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4022">
                          <a href="https://globefarer.qodeinteractive.com/available-positions/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/available_positions.svg" />
                              Available Positions
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3136">
                          <a href="https://globefarer.qodeinteractive.com/our-clients/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/OurClients.svg" />
                              Our Clients
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3176">
                          <a href="https://globefarer.qodeinteractive.com/faq-page/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/FAQPage.svg" />
                              FAQ Page
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4573">
                          <a href="https://globefarer.qodeinteractive.com/404-error-page">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/404_error_page.svg" />
                              404 Error Page
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-764 qodef--hide-link qodef-menu-item--narrow">
                  <a onclick="JavaScript: return false;">
                    <span className="qodef-menu-item-text">Services</span>
                  </a>
                  <img src="../public/svg/Services.svg" />
                  <div className="qodef-drop-down-second">
                    <div className="qodef-drop-down-second-inner">
                      <ul className="sub-menu">
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2715">
                          <a href="https://globefarer.qodeinteractive.com/our-services/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/ourServices.svg" />
                              Our Services
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3137">
                          <a href="https://globefarer.qodeinteractive.com/what-we-do/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/WhatWeDo.svg" />
                              What We Do
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3450">
                          <a href="https://globefarer.qodeinteractive.com/step-1-3/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/request_reight.svg" />
                              Request a Freight
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-765 qodef--hide-link qodef-menu-item--narrow">
                  <a onclick="JavaScript: return false;">
                    <span className="qodef-menu-item-text">Blog</span>
                  </a>
                  <img src="../public/svg/blog.svg" />
                  <div className="qodef-drop-down-second">
                    <div className="qodef-drop-down-second-inner">
                      <ul className="sub-menu">
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3007">
                          <a href="https://globefarer.qodeinteractive.com/blog/right-sidebar/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/rightSidebar.svg" />
                              Right Sidebar
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3006">
                          <a href="https://globefarer.qodeinteractive.com/blog/left-sidebar/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/leftSidebar.svg" />
                              Left Sidebar
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3005">
                          <a href="https://globefarer.qodeinteractive.com/blog/no-sidebar/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/noSidebar.svg" />
                              No Sidebar
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-2799 qodef--hide-link">
                          <a onclick="JavaScript: return false;">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/postTypes.svg" />
                              Post Types
                            </span>
                          </a>
                          <img src="../public/svg/postTypes2.svg" />
                          <ul className="sub-menu">
                            <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2806">
                              <a href="https://globefarer.qodeinteractive.com/electric-wave-motion/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/standardPost.svg" />
                                  Standard Post
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2805">
                              <a href="https://globefarer.qodeinteractive.com/the-hidden-gems/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/galleryPost.svg" />
                                  Gallery Post
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2804">
                              <a href="https://globefarer.qodeinteractive.com/creating-memories/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/quotePost.svg" />
                                  Quote Post
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2803">
                              <a href="https://globefarer.qodeinteractive.com/large-scale-fishing/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/linkPost.svg" />
                                  Link Post
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2802">
                              <a href="https://globefarer.qodeinteractive.com/the-industrial-proletariat/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/audioPost.svg" />
                                  Audio Post
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2801">
                              <a href="https://globefarer.qodeinteractive.com/a-sustainable-future/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/videoPost.svg" />
                                  Video Post
                                </span>
                              </a>
                            </li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-2800">
                              <a href="https://globefarer.qodeinteractive.com/tips-and-strategies/">
                                <span className="qodef-menu-item-text">
                                  <img src="../public/svg/noSidebarPost.svg" />
                                  No Sidebar Post
                                </span>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-766 qodef--hide-link qodef-menu-item--narrow">
                  <a onclick="JavaScript: return false;">
                    <span className="qodef-menu-item-text">Contact</span>
                  </a>
                  <img src="../public/svg/contact.svg" />
                  <div className="qodef-drop-down-second">
                    <div className="qodef-drop-down-second-inner">
                      <ul className="sub-menu">
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3254">
                          <a href="https://globefarer.qodeinteractive.com/get-in-touch/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/getInTouch.svg" />
                              Get in Touch
                            </span>
                          </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3228">
                          <a href="https://globefarer.qodeinteractive.com/global-network/">
                            <span className="qodef-menu-item-text">
                              <img src="../public/svg/globalNetwork.svg" />
                              Global Network
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </header>
          <div id="qodef-page-outer">
            <div id="qodef-page-inner" className="qodef-content-full-width">
              <main
                id="qodef-page-content"
                className="qodef-grid qodef-layout--template "
                role="main"
              >
                <div className="qodef-grid-inner clear">
                  <div className="qodef-grid-item qodef-page-content-section qodef-col--12">
                    <div
                      data-elementor-type="wp-page"
                      data-elementor-id="50"
                      className="elementor elementor-50"
                      data-elementor-settings="[]"
                    >
                      <div className="elementor-section-wrap">
                        <section
                          className="elementor-section elementor-top-section elementor-element elementor-element-308763f elementor-section-full_width elementor-section-height-default elementor-section-height-default qodef-elementor-content-no"
                          data-id="308763f"
                          data-element_type="section"
                          data-settings='{"background_background":"classic"}'
                        >
                          <div className="elementor-container elementor-column-gap-no">
                            <div
                              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-dd8860a"
                              data-id="dd8860a"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-94b398f elementor-widget elementor-widget-slider_revolution"
                                  data-id="94b398f"
                                  data-element_type="widget"
                                  data-widget_type="slider_revolution.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="wp-block-themepunch-revslider">
                                      <p className="rs-p-wp-fix"></p>
                                      <rs-module-wrap
                                        id="rev_slider_2_1_wrapper"
                                        data-source="gallery"
                                        style={{ visibility: "hidden", background: "transparent", padding: "0" }}
                                      >
                                        <rs-module
                                          id="rev_slider_2_1"
                                          data-version="6.5.9"
                                        >
                                          <rs-slides>
                                            <rs-slide
                                              style={{ position: "absolute" }}
                                              data-key="rs-2"
                                              data-title="Slide"
                                              data-thumb="//globefarer.qodeinteractive.com/wp-content/uploads/2021/08/main-home-rev-slide-1-1-50x100.jpg"
                                              data-in="o:0;"
                                              data-out="a:false;"
                                              data-p1="Ocean Freight"
                                            >
                                              <img
                                                src="//globefarer.qodeinteractive.com/wp-content/plugins/revslider/public/assets/assets/dummy.png"
                                                alt="m"
                                                title="main-home-rev-slide-1"
                                                width="1920"
                                                height="1100"
                                                className="rev-slidebg tp-rs-img rs-lazyload"
                                                data-lazyload="//globefarer.qodeinteractive.com/wp-content/uploads/2021/08/main-home-rev-slide-1-1.jpg"
                                                data-bg="p:center bottom;"
                                                data-no-retina
                                              />
                                              <rs-layer
                                                id="slider-2-slide-2-layer-1"
                                                data-type="text"
                                                data-xy="x:c;xo:342px,288px,0,0;y:m;yo:-20px,-32px,75px,53px;"
                                                data-text="w:normal;s:65,60,60,44;l:72,67,67,51;ls:-1px;fw:700;a:left,left,center,center;"
                                                data-dim="w:585px,540px,540px,290px;h:225px,210px,210px,210px;"
                                                data-basealign="slide"
                                                data-rsp_o="off"
                                                data-rsp_bd="off"
                                                data-frame_0="x:50;"
                                                data-frame_1="e:power4.inOut;st:250;sp:1000;"
                                                data-frame_999="o:0;st:w;"
                                              // style="z-index:6;font-family:'Sarabun';"
                                              style={{zIndex:6, fontFamily:"Sarabun" }}
                                              >
                                                Worldwide shipping and
                                                professional solutions
                                              </rs-layer>
                                              <rs-layer
                                                id="slider-2-slide-2-layer-2"
                                                data-type="text"
                                                data-xy="x:c;xo:350px,293px,0,0;y:m;yo:128px,108px,215px,205px;"
                                                data-text="w:normal;s:18;l:26;a:left,left,center,center;"
                                                data-dim="w:600px,550px,550px,290px;"
                                                data-basealign="slide"
                                                data-rsp_o="off"
                                                data-rsp_bd="off"
                                                data-frame_0="x:50;"
                                                data-frame_1="e:power4.inOut;st:320;sp:1000;"
                                                data-frame_999="o:0;st:w;"
                                              // style="z-index:7;font-family:'Sarabun';"
                                              style={{zIndex:7, fontFamily:"Sarabun" }}
                                              >
                                                No matter the location we got
                                                you covered with our global
                                                shipping!
                                              </rs-layer>{" "}
                                            </rs-slide>
                                            <rs-slide
                                              // style="position: absolute;"
                                              style={{position: "absolute"}}
                                              data-key="rs-6"
                                              data-title="Slide"
                                              data-thumb="//globefarer.qodeinteractive.com/wp-content/uploads/2021/08/main-home-rev-slide-2-50x100.jpg"
                                              data-in="o:0;"
                                              data-out="a:false;"
                                              data-p1="Land Transport"
                                            >
                                              <img
                                                src="//globefarer.qodeinteractive.com/wp-content/plugins/revslider/public/assets/assets/dummy.png"
                                                alt="m"
                                                title="main-home-rev-slide-2"
                                                width="1920"
                                                height="1100"
                                                className="rev-slidebg tp-rs-img rs-lazyload"
                                                data-lazyload="//globefarer.qodeinteractive.com/wp-content/uploads/2021/08/main-home-rev-slide-2.jpg"
                                                data-bg="p:center bottom;"
                                                data-no-retina
                                              />
                                              <rs-layer
                                                id="slider-2-slide-6-layer-1"
                                                data-type="text"
                                                data-xy="x:c;xo:342px,288px,0,0;y:m;yo:-20px,-32px,75px,54px;"
                                                data-text="w:normal;s:65,60,60,44;l:72,67,67,51;ls:-1px;fw:700;a:left,left,center,center;"
                                                data-dim="w:585px,540px,540px,290px;h:225px,210px,210px,210px;"
                                                data-basealign="slide"
                                                data-rsp_o="off"
                                                data-rsp_bd="off"
                                                data-frame_0="x:50;"
                                                data-frame_1="e:power4.inOut;st:250;sp:1000;"
                                                data-frame_999="o:0;st:w;"
                                              // style="z-index:6;font-family:'Sarabun';"
                                              style={{zIndex:6, fontFamily:"Sarabun" }}
                                              >
                                                Fast and secure courier for all
                                                your packages
                                              </rs-layer>
                                              <rs-layer
                                                id="slider-2-slide-6-layer-2"
                                                data-type="text"
                                                data-xy="x:c;xo:350px,293px,0,0;y:m;yo:128px,108px,215px,205px;"
                                                data-text="w:normal;s:18;l:26;a:left,left,center,center;"
                                                data-dim="w:600px,550px,550px,290px;"
                                                data-basealign="slide"
                                                data-rsp_o="off"
                                                data-rsp_bd="off"
                                                data-frame_0="x:50;"
                                                data-frame_1="e:power4.inOut;st:320;sp:1000;"
                                                data-frame_999="o:0;st:w;"
                                              // style="z-index:7;font-family:'Sarabun';"
                                              style={{zIndex:7, fontFamily:"Sarabun" }}
                                              >
                                                Your packages will not be
                                                damaged with our expert courier
                                                services.
                                              </rs-layer>{" "}
                                            </rs-slide>
                                            <rs-slide
                                              // style="position: absolute;"
                                              style={{position: "absolute"}}
                                              data-key="rs-7"
                                              data-title="Slide"
                                              data-thumb="//globefarer.qodeinteractive.com/wp-content/uploads/2021/08/main-home-rev-slide-3-50x100.jpg"
                                              data-in="o:0;"
                                              data-out="a:false;"
                                              data-p1="Air Freight"
                                            >
                                              <img
                                                src="//globefarer.qodeinteractive.com/wp-content/plugins/revslider/public/assets/assets/dummy.png"
                                                alt="m"
                                                title="main-home-rev-slide-3"
                                                width="1920"
                                                height="1100"
                                                className="rev-slidebg tp-rs-img rs-lazyload"
                                                data-lazyload="//globefarer.qodeinteractive.com/wp-content/uploads/2021/08/main-home-rev-slide-3.jpg"
                                                data-bg="p:center bottom;"
                                                data-no-retina
                                              />
                                              <rs-layer
                                                id="slider-2-slide-7-layer-1"
                                                data-type="text"
                                                data-xy="x:c;xo:342px,288px,0,0;y:m;yo:-20px,-32px,75px,53px;"
                                                data-text="w:normal;s:65,60,60,44;l:72,67,67,51;ls:-1px;fw:700;a:left,left,center,center;"
                                                data-dim="w:585px,540px,540px,300px;h:225px,210px,210px,210px;"
                                                data-basealign="slide"
                                                data-rsp_o="off"
                                                data-rsp_bd="off"
                                                data-frame_0="x:50;"
                                                data-frame_1="e:power4.inOut;st:250;sp:1000;"
                                                data-frame_999="o:0;st:w;"
                                              // style="z-index:6;font-family:'Sarabun';"
                                              style={{zIndex:6, fontFamily:"Sarabun" }}
                                              >
                                                We provide super-fast and
                                                fuss-free delivery service
                                              </rs-layer>
                                              <rs-layer
                                                id="slider-2-slide-7-layer-2"
                                                data-type="text"
                                                data-xy="x:c;xo:350px,293px,0,0;y:m;yo:128px,108px,215px,205px;"
                                                data-text="w:normal;s:18;l:26;a:left,left,center,center;"
                                                data-dim="w:600px,550px,550px,290px;"
                                                data-basealign="slide"
                                                data-rsp_o="off"
                                                data-rsp_bd="off"
                                                data-frame_0="x:50;"
                                                data-frame_1="e:power4.inOut;st:320;sp:1000;"
                                                data-frame_999="o:0;st:w;"
                                              // style="z-index:7;font-family:'Sarabun';"
                                              style={{zIndex:7, fontFamily:"Sarabun" }}
                                              >
                                                We guarantee no complications
                                                and full refunds in case of
                                                damages.
                                              </rs-layer>{" "}
                                            </rs-slide>
                                            <rs-slide
                                              // style="position: absolute;"
                                              style={{position: "absolute"}}
                                              data-key="rs-8"
                                              data-title="Slide"
                                              data-thumb="//globefarer.qodeinteractive.com/wp-content/uploads/2021/08/main-home-rev-slide-4-50x100.jpg"
                                              data-in="o:0;"
                                              data-out="a:false;"
                                              data-p1="Warehousing"
                                            >
                                              <img
                                                src="//globefarer.qodeinteractive.com/wp-content/plugins/revslider/public/assets/assets/dummy.png"
                                                alt="m"
                                                title="main-home-rev-slide-4"
                                                width="1920"
                                                height="1100"
                                                className="rev-slidebg tp-rs-img rs-lazyload"
                                                data-lazyload="//globefarer.qodeinteractive.com/wp-content/uploads/2021/08/main-home-rev-slide-4.jpg"
                                                data-bg="p:center bottom;"
                                                data-no-retina
                                              />
                                              <rs-layer
                                                id="slider-2-slide-8-layer-1"
                                                data-type="text"
                                                data-xy="x:c;xo:342px,288px,0,0;y:m;yo:-20px,-32px,75px,53px;"
                                                data-text="w:normal;s:65,60,60,44;l:72,67,67,51;ls:-1px;fw:700;a:left,left,center,center;"
                                                data-dim="w:585px,540px,540px,290px;h:225px,210px,210px,210px;"
                                                data-basealign="slide"
                                                data-rsp_o="off"
                                                data-rsp_bd="off"
                                                data-frame_0="x:50;"
                                                data-frame_1="e:power4.inOut;st:250;sp:1000;"
                                                data-frame_999="o:0;st:w;"
                                              // style="z-index:6;font-family:'Sarabun';"
                                              style={{zIndex:6, fontFamily:"Sarabun" }}
                                              >
                                                Always stay ahead of schedule
                                                with White Glove
                                              </rs-layer>
                                              <rs-layer
                                                id="slider-2-slide-8-layer-2"
                                                data-type="text"
                                                data-xy="x:c;xo:350px,293px,0,0;y:m;yo:128px,108px,215px,205px;"
                                                data-text="w:normal;s:18;l:26;a:left,left,center,center;"
                                                data-dim="w:600px,550px,550px,290px;"
                                                data-basealign="slide"
                                                data-rsp_o="off"
                                                data-rsp_bd="off"
                                                data-frame_0="x:50;"
                                                data-frame_1="e:power4.inOut;st:320;sp:1000;"
                                                data-frame_999="o:0;st:w;"
                                              // style="z-index:7;font-family:'Sarabun';"
                                              style={{zIndex:7, fontFamily:"Sarabun" }}
                                              >
                                                Cost efficient & always on time,
                                                that’s our transport company
                                                moto!
                                              </rs-layer>{" "}
                                            </rs-slide>
                                            <rs-slide
                                              // style="position: absolute;"
                                              style={{position: "absolute"}}
                                              data-key="rs-29"
                                              data-title="Slide"
                                              data-in="o:0;"
                                              data-out="a:false;"
                                            >
                                              <img
                                                src="//globefarer.qodeinteractive.com/wp-content/plugins/revslider/public/assets/assets/dummy.png"
                                                alt="Slide"
                                                title="Main Home"
                                                className="rev-slidebg tp-rs-img rs-lazyload"
                                                data-lazyload="//globefarer.qodeinteractive.com/wp-content/plugins/revslider/public/assets/assets/transparent.png"
                                                data-no-retina
                                              />
                                            </rs-slide>
                                          </rs-slides>
                                          <rs-static-layers>
                                            <rs-layer
                                              id="slider-2-slide-2-layer-3"
                                              className="rs-layer-static"
                                              data-type="image"
                                              data-xy="x:c;xo:-400px,-273px,0,0;y:m;yo:0,-16px,-145px,-115px;"
                                              data-text="w:normal;"
                                              data-dim="w:600px,480px,480px,290px;h:149px,119px,119px,72px;"
                                              data-basealign="slide"
                                              data-rsp_o="off"
                                              data-rsp_bd="off"
                                              data-onslides="s:1;"
                                              data-frame_0="x:-50;"
                                              data-frame_1="e:power4.inOut;st:250;sp:1000;"
                                              data-frame_999="o:0;st:w;"
                                            // style="z-index:5;"
                                            style={{zIndex:5 }}
                                            >
                                              <img
                                                src="//globefarer.qodeinteractive.com/wp-content/plugins/revslider/public/assets/assets/dummy.png"
                                                alt="d"
                                                className="tp-rs-img rs-lazyload"
                                                width="600"
                                                height="149"
                                                data-lazyload="//globefarer.qodeinteractive.com/wp-content/uploads/2021/08/Main-Home-Slider-Logo.png"
                                                data-no-retina
                                              />
                                            </rs-layer>
                                          </rs-static-layers>
                                        </rs-module>
                                        <Script
                                          id="show-banner"
                                          strategy="lazyOnload"
                                        >
                                          {`
          window._wpemojiSettings = {"baseUrl":"https:\/\/s.w.org\/images\/core\/emoji\/14.0.0\/72x72\/","ext":".png","svgUrl":"https:\/\/s.w.org\/images\/core\/emoji\/14.0.0\/svg\/","svgExt":".svg","source":{"concatemoji":"https:\/\/globefarer.qodeinteractive.com\/wp-includes\/js\/wp-emoji-release.min.js?ver=6.0"}};
          /*! This file is auto-generated */
          !function(e,a,t){var n,r,o,i=a.createElement("canvas"),p=i.getContext&&i.getContext("2d");function s(e,t){var a=String.fromCharCode,e=(p.clearRect(0,0,i.width,i.height),p.fillText(a.apply(this,e),0,0),i.toDataURL());return p.clearRect(0,0,i.width,i.height),p.fillText(a.apply(this,t),0,0),e===i.toDataURL()}function c(e){var t=a.createElement("script");t.src=e,t.defer=t.type="text/javascript",a.getElementsByTagName("head")[0].appendChild(t)}for(o=Array("flag","emoji"),t.supports={everything:!0,everythingExceptFlag:!0},r=0;r<o.length;r++)t.supports[o[r]]=function(e){if(!p||!p.fillText)return!1;switch(p.textBaseline="top",p.font="600 32px Arial",e){case"flag":return s([127987,65039,8205,9895,65039],[127987,65039,8203,9895,65039])?!1:!s([55356,56826,55356,56819],[55356,56826,8203,55356,56819])&&!s([55356,57332,56128,56423,56128,56418,56128,56421,56128,56430,56128,56423,56128,56447],[55356,57332,8203,56128,56423,8203,56128,56418,8203,56128,56421,8203,56128,56430,8203,56128,56423,8203,56128,56447]);case"emoji":return!s([129777,127995,8205,129778,127999],[129777,127995,8203,129778,127999])}return!1}(o[r]),t.supports.everything=t.supports.everything&&t.supports[o[r]],"flag"!==o[r]&&(t.supports.everythingExceptFlag=t.supports.everythingExceptFlag&&t.supports[o[r]]);t.supports.everythingExceptFlag=t.supports.everythingExceptFlag&&!t.supports.flag,t.DOMReady=!1,t.readyCallback=function(){t.DOMReady=!0},t.supports.everything||(n=function(){t.readyCallback()},a.addEventListener?(a.addEventListener("DOMContentLoaded",n,!1),e.addEventListener("load",n,!1)):(e.attachEvent("onload",n),a.attachEvent("onreadystatechange",function(){"complete"===a.readyState&&t.readyCallback()})),(e=t.source||{}).concatemoji?c(e.concatemoji):e.wpemoji&&e.twemoji&&(c(e.twemoji),c(e.wpemoji)))}(window,document,window._wpemojiSettings);
          var dataLayer_content = {"pagePostType":"frontpage","pagePostType2":"single-page","pagePostAuthor":"admin"};
	dataLayer.push( dataLayer_content );
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.'+'js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KTQ2BTD');
function setREVStartSize(e){
    //window.requestAnimationFrame(function() {				 
        window.RSIW = window.RSIW===undefined ? window.innerWidth : window.RSIW;	
        window.RSIH = window.RSIH===undefined ? window.innerHeight : window.RSIH;	
        try {								
            var pw = document.getElementById(e.c).parentNode.offsetWidth,
                newh;
            pw = pw===0 || isNaN(pw) ? window.RSIW : pw;
            e.tabw = e.tabw===undefined ? 0 : parseInt(e.tabw);
            e.thumbw = e.thumbw===undefined ? 0 : parseInt(e.thumbw);
            e.tabh = e.tabh===undefined ? 0 : parseInt(e.tabh);
            e.thumbh = e.thumbh===undefined ? 0 : parseInt(e.thumbh);
            e.tabhide = e.tabhide===undefined ? 0 : parseInt(e.tabhide);
            e.thumbhide = e.thumbhide===undefined ? 0 : parseInt(e.thumbhide);
            e.mh = e.mh===undefined || e.mh=="" || e.mh==="auto" ? 0 : parseInt(e.mh,0);		
            if(e.layout==="fullscreen" || e.l==="fullscreen") 						
                newh = Math.max(e.mh,window.RSIH);					
            else{					
                e.gw = Array.isArray(e.gw) ? e.gw : [e.gw];
                for (var i in e.rl) if (e.gw[i]===undefined || e.gw[i]===0) e.gw[i] = e.gw[i-1];					
                e.gh = e.el===undefined || e.el==="" || (Array.isArray(e.el) && e.el.length==0)? e.gh : e.el;
                e.gh = Array.isArray(e.gh) ? e.gh : [e.gh];
                for (var i in e.rl) if (e.gh[i]===undefined || e.gh[i]===0) e.gh[i] = e.gh[i-1];
                                    
                var nl = new Array(e.rl.length),
                    ix = 0,						
                    sl;					
                e.tabw = e.tabhide>=pw ? 0 : e.tabw;
                e.thumbw = e.thumbhide>=pw ? 0 : e.thumbw;
                e.tabh = e.tabhide>=pw ? 0 : e.tabh;
                e.thumbh = e.thumbhide>=pw ? 0 : e.thumbh;					
                for (var i in e.rl) nl[i] = e.rl[i]<window.RSIW ? 0 : e.rl[i];
                sl = nl[0];									
                for (var i in nl) if (sl>nl[i] && nl[i]>0) { sl = nl[i]; ix=i;}															
                var m = pw>(e.gw[ix]+e.tabw+e.thumbw) ? 1 : (pw-(e.tabw+e.thumbw)) / (e.gw[ix]);					
                newh =  (e.gh[ix] * m) + (e.tabh + e.thumbh);
            }
            var el = document.getElementById(e.c);
            if (el!==null && el) el.style.height = newh+"px";					
            el = document.getElementById(e.c+"_wrapper");
            if (el!==null && el) {
                el.style.height = newh+"px";
                el.style.display = "block";
            }
        } catch(e){
            console.log("Failure at Presize of Slider:" + e)
        }					   
    //});
  };
  setREVStartSize({c: 'rev_slider_2_1',rl:[1920,1700,1025,680],el:[900,768,960,720],gw:[1400,1100,600,300],gh:[900,768,960,720],type:'standard',justify:'',layout:'fullscreen',offsetContainer:'',offset:'',mh:"0"});if (window.RS_MODULES!==undefined && window.RS_MODULES.modules!==undefined && window.RS_MODULES.modules["revslider21"]!==undefined) {window.RS_MODULES.modules["revslider21"].once = false;window.revapi2 = undefined;if (window.RS_MODULES.checkMinimal!==undefined) window.RS_MODULES.checkMinimal()}
          `}
                                        </Script>
                                      </rs-module-wrap>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section
                          className="elementor-section elementor-top-section elementor-element elementor-element-e405538 elementor-section-full_width qodef-elementor-content-grid elementor-section-height-default elementor-section-height-default"
                          data-id="e405538"
                          data-element_type="section"
                          data-settings='{"background_background":"classic"}'
                        >
                          <div className="elementor-container elementor-column-gap-no">
                            <div
                              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-4041d44"
                              data-id="4041d44"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-4a768dd elementor-widget elementor-widget-globefarer_core_divided_image_info"
                                  data-id="4a768dd"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_divided_image_info.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="qodef-shortcode qodef-m  qodef-divided-image-info qodef-layout--image-right qodef-separator--on  qodef-breakpoint--1024 qodef-appear-animation--yes qodef-appear-animation-type--roll-out">
                                      <div
                                        className="qodef-m-content"
                                      // style="margin-top: 10px;padding-left: 0px;padding-right: 4%"
                                      style={{marginTop: "10px", paddingLeft: "0px", paddingRight:"4%" }}
                                      >
                                        <h2
                                          itemprop="name"
                                          className="qodef-m-title"
                                        // style="margin-bottom: 29px"
                                        style={{marginBottom: "29px"}}
                                        >
                                          Fast and reliable shipping services{" "}
                                        </h2>
                                        <p className="qodef-m-text">
                                          Lorem ipsum dolor sit amet, et sale ad
                                          mutat nusqua ius ea has autem aeterno
                                          divine sum.{" "}
                                        </p>
                                        <a
                                          className="qodef-shortcode qodef-m qodef-m-button qodef-button qodef-layout--textual  qodef-html--link"
                                          href="https://globefarer.qodeinteractive.com/our-services/"
                                          target="_self"
                                        >
                                          {" "}
                                          <span className="qodef-m-button-icon">
                                            <img src="../public/svg/view_more.svg" />
                                          </span>{" "}
                                          <span className="qodef-m-button-text">
                                            View more
                                            <br /> about our services{" "}
                                          </span>{" "}
                                        </a>
                                      </div>
                                      <div
                                        className="qodef-m-image"
                                      // style="width: 63%;padding-left: 5.8%;padding-right: 0px"
                                      style={{width: "63%", paddingLeft: "5.8%", paddingRight: "0px"}}
                                      >
                                        <img
                                          width="800"
                                          height="407"
                                          src="assets/image/main-home-img-1.jpg"
                                          className="attachment-full size-full"
                                          alt="d"
                                          srcset="assets/image/main-home-img-1.jpg 800w, assets/image/main-home-img-1.jpg 300w, assets/image/main-home-img-1.jpg 768w"
                                          sizes="(max-width: 800px) 100vw, 800px"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section
                          className="elementor-section elementor-top-section elementor-element elementor-element-b4bccbe elementor-section-full_width qodef-elementor-content-grid elementor-section-height-default elementor-section-height-default"
                          data-id="b4bccbe"
                          data-element_type="section"
                        >
                          <div className="elementor-container elementor-column-gap-no">
                            <div
                              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-bd4adc0"
                              data-id="bd4adc0"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-db3b23a elementor-widget elementor-widget-globefarer_core_tabbed_info"
                                  data-id="db3b23a"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_tabbed_info.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="qodef-shortcode qodef-m  qodef-tabbed-info qodef-layout--standard">
                                      <ul className="qodef-m-navigation">
                                        <li>
                                          <a href="qodef-tab--93b2e5e">
                                            Air Freight
                                          </a>
                                        </li>
                                        <li>
                                          <a href="qodef-tab--88e6bad">
                                            Rail Freight
                                          </a>
                                        </li>
                                        <li>
                                          <a href="qodef-tab--08887a2">
                                            LTL Freight
                                          </a>
                                        </li>
                                        <li>
                                          <a href="qodef-tab--89ebe54">
                                            Sea Freight
                                          </a>
                                        </li>
                                        <li>
                                          <a href="qodef-tab--ecdb426">
                                            Land Freight
                                          </a>
                                        </li>
                                        <li>
                                          <a href="qodef-tab--0567851">
                                            Warehousing
                                          </a>
                                        </li>
                                      </ul>
                                      <div
                                        className="qodef-m-content"
                                        id="qodef-tab--93b2e5e"
                                      >
                                        <div className="qodef-m-content-left">
                                          <div className="qodef-m-image">
                                            <img
                                              width="800"
                                              height="425"
                                              src="assets/image/main-home-tabbed-info-1.png"
                                              className="attachment-full size-full"
                                              alt="m"
                                              srcset="assets/image/main-home-tabbed-info-1.png 800w, assets/image/main-home-tabbed-info-1.png 300w, assets/image/main-home-tabbed-info-1.png 768w"
                                              sizes="(max-width: 800px) 100vw, 800px"
                                            />
                                          </div>
                                        </div>
                                        <div className="qodef-m-content-right">
                                          <h2 className="qodef-m-title">
                                            Secure courier for small &amp; big
                                            packages{" "}
                                          </h2>
                                          <p className="qodef-m-text">
                                            Lorem ipsum dolor sit amet, id has
                                            nihil discere vocibus. No novum cu
                                            labor probatus cum, te utamur
                                            scripta ei legat cum qui ei sapere
                                            quo noster sum periculis ad.{" "}
                                          </p>
                                          <a
                                            className="qodef-shortcode qodef-m qodef-m-button qodef-button qodef-layout--textual  qodef-html--link"
                                            href="https://globefarer.qodeinteractive.com/our-services/"
                                            target="_self"
                                          >
                                            {" "}
                                            <span className="qodef-m-button-icon">
                                              <img src="../public/svg/view_more.svg" />
                                            </span>{" "}
                                            <span className="qodef-m-button-text">
                                              View more
                                              <br /> about our services{" "}
                                            </span>{" "}
                                          </a>{" "}
                                        </div>
                                      </div>
                                      <div
                                        className="qodef-m-content"
                                        id="qodef-tab--88e6bad"
                                      >
                                        <div className="qodef-m-content-left">
                                          <div className="qodef-m-image">
                                            <img
                                              width="800"
                                              height="425"
                                              src="assets/image/main-home-tabbed-info-2.jpg"
                                              className="attachment-full size-full"
                                              alt="m"
                                              srcset="assets/image/main-home-tabbed-info-2.jpg 800w, assets/image/main-home-tabbed-info-2.jpg 300w, assets/image/main-home-tabbed-info-2.jpg 768w"
                                              sizes="(max-width: 800px) 100vw, 800px"
                                            />
                                          </div>
                                        </div>
                                        <div className="qodef-m-content-right">
                                          <h2 className="qodef-m-title">
                                            Great &amp; affordable courier
                                            transport{" "}
                                          </h2>
                                          <p className="qodef-m-text">
                                            Lorem ipsum dolor sit amet, id has
                                            nihil discere vocibus. No novum cu
                                            labor probatus cum, te utamur
                                            scripta ei legat cum qui ei sapere
                                            quo noster sum periculis ad.{" "}
                                          </p>
                                          <a
                                            className="qodef-shortcode qodef-m qodef-m-button qodef-button qodef-layout--textual  qodef-html--link"
                                            href="https://globefarer.qodeinteractive.com/what-we-do/"
                                            target="_self"
                                          >
                                            {" "}
                                            <span className="qodef-m-button-icon">
                                              <img src="../public/svg/view_more.svg" />
                                            </span>{" "}
                                            <span className="qodef-m-button-text">
                                              View more
                                              <br /> about our services{" "}
                                            </span>{" "}
                                          </a>{" "}
                                        </div>
                                      </div>
                                      <div
                                        className="qodef-m-content"
                                        id="qodef-tab--08887a2"
                                      >
                                        <div className="qodef-m-content-left">
                                          <div className="qodef-m-image">
                                            <img
                                              width="800"
                                              height="425"
                                              src="assets/image/main-home-tabbed-info-3.jpg"
                                              className="attachment-full size-full"
                                              alt="m"
                                              srcset="assets/image/main-home-tabbed-info-3.jpg 800w, assets/image/main-home-tabbed-info-3.jpg 300w, assets/image/main-home-tabbed-info-3.jpg 768w"
                                              sizes="(max-width: 800px) 100vw, 800px"
                                            />{" "}
                                          </div>
                                        </div>
                                        <div className="qodef-m-content-right">
                                          <h2 className="qodef-m-title">
                                            Any location and any time we’ll be
                                            there{" "}
                                          </h2>
                                          <p className="qodef-m-text">
                                            Lorem ipsum dolor sit amet, id has
                                            nihil discere vocibus. No novum cu
                                            labor probatus cum, te utamur
                                            scripta ei legat cum qui ei sapere
                                            quo noster sum periculis ad.{" "}
                                          </p>
                                          <a
                                            className="qodef-shortcode qodef-m qodef-m-button qodef-button qodef-layout--textual  qodef-html--link"
                                            href="https://globefarer.qodeinteractive.com/step-1-3/"
                                            target="_self"
                                          >
                                            {" "}
                                            <span className="qodef-m-button-icon">
                                              <img src="../public/svg/view_more.svg" />
                                            </span>{" "}
                                            <span className="qodef-m-button-text">
                                              View more
                                              <br /> about our services{" "}
                                            </span>{" "}
                                          </a>{" "}
                                        </div>
                                      </div>
                                      <div
                                        className="qodef-m-content"
                                        id="qodef-tab--89ebe54"
                                      >
                                        <div className="qodef-m-content-left">
                                          <div className="qodef-m-image">
                                            <img
                                              width="800"
                                              height="425"
                                              src="assets/image/main-home-tabbed-info-4.jpg"
                                              className="attachment-full size-full"
                                              alt="m"
                                              srcset="assets/image/main-home-tabbed-info-4.jpg 800w, assets/image/main-home-tabbed-info-4.jpg 300w, assets/image/main-home-tabbed-info-4.jpg 768w"
                                              sizes="(max-width: 800px) 100vw, 800px"
                                            />{" "}
                                          </div>
                                        </div>
                                        <div className="qodef-m-content-right">
                                          <h2 className="qodef-m-title">
                                            Quality packing material for items{" "}
                                          </h2>
                                          <p className="qodef-m-text">
                                            Lorem ipsum dolor sit amet, id has
                                            nihil discere vocibus. No novum cu
                                            labor probatus cum, te utamur
                                            scripta ei legat cum qui ei sapere
                                            quo noster sum periculis ad.{" "}
                                          </p>
                                          <a
                                            className="qodef-shortcode qodef-m qodef-m-button qodef-button qodef-layout--textual  qodef-html--link"
                                            href="https://globefarer.qodeinteractive.com/get-in-touch/"
                                            target="_self"
                                          >
                                            {" "}
                                            <span className="qodef-m-button-icon">
                                              <img src="../public/svg/view_more.svg" />
                                            </span>{" "}
                                            <span className="qodef-m-button-text">
                                              View more
                                              <br /> about our services{" "}
                                            </span>{" "}
                                          </a>{" "}
                                        </div>
                                      </div>
                                      <div
                                        className="qodef-m-content"
                                        id="qodef-tab--ecdb426"
                                      >
                                        <div className="qodef-m-content-left">
                                          <div className="qodef-m-image">
                                            <img
                                              width="800"
                                              height="425"
                                              src="assets/image/main-home-tabbed-info-5.jpg"
                                              className="attachment-full size-full"
                                              alt="m"
                                              srcset="assets/image/main-home-tabbed-info-5.jpg 800w, assets/image/main-home-tabbed-info-5.jpg 300w, assets/image/main-home-tabbed-info-5.jpg 768w"
                                              sizes="(max-width: 800px) 100vw, 800px"
                                            />{" "}
                                          </div>
                                        </div>
                                        <div className="qodef-m-content-right">
                                          <h2 className="qodef-m-title">
                                            Easy &amp; fast on-spot payment
                                            methods{" "}
                                          </h2>
                                          <p className="qodef-m-text">
                                            Lorem ipsum dolor sit amet, id has
                                            nihil discere vocibus. No novum cu
                                            labor probatus cum, te utamur
                                            scripta ei legat cum qui ei sapere
                                            quo noster sum periculis ad.{" "}
                                          </p>
                                          <a
                                            className="qodef-shortcode qodef-m qodef-m-button qodef-button qodef-layout--textual  qodef-html--link"
                                            href="https://globefarer.qodeinteractive.com/global-network/"
                                            target="_self"
                                          >
                                            {" "}
                                            <span className="qodef-m-button-icon">
                                              <img src="../public/svg/view_more.svg" />
                                            </span>{" "}
                                            <span className="qodef-m-button-text">
                                              View more
                                              <br /> about our services{" "}
                                            </span>{" "}
                                          </a>{" "}
                                        </div>
                                      </div>
                                      <div
                                        className="qodef-m-content"
                                        id="qodef-tab--0567851"
                                      >
                                        <div className="qodef-m-content-left">
                                          <div className="qodef-m-image">
                                            <img
                                              width="800"
                                              height="425"
                                              src="assets/image/main-home-tabbed-info-6.jpg"
                                              className="attachment-full size-full"
                                              alt="m"
                                              srcset="assets/image/main-home-tabbed-info-6.jpg 800w, assets/image/main-home-tabbed-info-6.jpg 300w, assets/image/main-home-tabbed-info-6.jpg 768w"
                                              sizes="(max-width: 800px) 100vw, 800px"
                                            />{" "}
                                          </div>
                                        </div>
                                        <div className="qodef-m-content-right">
                                          <h2 className="qodef-m-title">
                                            Our fleet covers your needs &amp;
                                            pricing range{" "}
                                          </h2>
                                          <p className="qodef-m-text">
                                            Lorem ipsum dolor sit amet, id has
                                            nihil discere vocibus. No novum cu
                                            labor probatus cum, te utamur
                                            scripta ei legat cum qui ei sapere
                                            quo noster sum periculis ad.{" "}
                                          </p>
                                          <a
                                            className="qodef-shortcode qodef-m qodef-m-button qodef-button qodef-layout--textual  qodef-html--link"
                                            href="https://globefarer.qodeinteractive.com/about-us/"
                                            target="_self"
                                          >
                                            {" "}
                                            <span className="qodef-m-button-icon">
                                              <img src="../public/svg/view_more.svg" />
                                            </span>{" "}
                                            <span className="qodef-m-button-text">
                                              View more
                                              <br /> about our services{" "}
                                            </span>{" "}
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section
                          className="elementor-section elementor-top-section elementor-element elementor-element-7b053dc elementor-section-full_width elementor-section-height-min-height elementor-section-content-middle qodef-elementor-content-grid elementor-section-height-default elementor-section-items-middle"
                          data-id="7b053dc"
                          data-element_type="section"
                          data-settings='{"background_background":"classic"}'
                        >
                          <div className="elementor-container elementor-column-gap-no">
                            <div
                              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-af2520a"
                              data-id="af2520a"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-71c861c elementor-widget__width-initial elementor-widget-tablet__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-globefarer_core_testimonials_list"
                                  data-id="71c861c"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_testimonials_list.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div
                                      className="qodef-shortcode qodef-m  qodef-testimonials-list qodef-skin--light qodef-grid qodef-swiper-container  qodef-gutter--normal qodef-col-num--1 qodef-item-layout--info-below qodef-responsive--predefined"
                                      data-options='{"slidesPerView":"1","spaceBetween":30,"loop":false,"autoplay":false,"speed":"","speedAnimation":"","slideAnimation":"","outsideNavigation":"yes","unique":3}'
                                    >
                                      <div
                                        className="qodef-m-icon"
                                      // style="color: #FFFFFF"
                                      style={{color: "#FFFFFF"}}
                                      >
                                        {/* <svg
                                          className="qodef-svg--quote"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="75.172"
                                          height="62.462"
                                          viewBox="0 0 75.172 62.462"
                                        >
                                          <g transform="translate(-762.938 -1079.129)">
                                            <g transform="translate(763.438 1079.634)">
                                              <g>
                                                <path
                                                  d="M808.7,1141.091H837.61v-27.657H824.424a1.159,1.159,0,0,1-1.149-1.17v-2.83c0-10.565,3.98-16.034,11.832-16.261v-13.538c-10.007.106-17.7,3.274-22.865,9.421-5.278,6.275-7.954,14.69-7.954,25.01A89.185,89.185,0,0,0,808.7,1141.091Zm-40.631,0h28.921v-27.657H783.574a1.159,1.159,0,0,1-1.15-1.17v-2.83c0-10.57,4.056-16.039,12.06-16.262v-13.537c-10.01.105-17.739,3.275-22.984,9.424-5.351,6.277-8.063,14.691-8.063,25.008A84.046,84.046,0,0,0,768.065,1141.091Z"
                                                  transform="translate(-763.438 -1079.634)"
                                                />
                                              </g>
                                            </g>
                                          </g>
                                        </svg> */}
                                      </div>
                                      <div className="swiper-wrapper">
                                        <div className="qodef-e swiper-slide ">
                                          <div className="qodef-e-inner">
                                            <h2
                                              itemprop="description"
                                              className="qodef-e-text"
                                            >
                                              Eos no dico graeci sea, debet
                                              nihil omnium quodsi quot dolores
                                              percipit.
                                            </h2>
                                            <div className="qodef-e-content">
                                              <div className="qodef-e-media-image">
                                                <img
                                                  width="150"
                                                  height="150"
                                                  src="assets/image/main-home-testimonial-150x150.png"
                                                  className="attachment-thumbnail size-thumbnail wp-post-image"
                                                  alt="d"
                                                  srcset="assets/image/main-home-testimonial-150x150.png 150w, assets/image/main-home-testimonial-150x150.png 156w"
                                                  sizes="(max-width: 150px) 100vw, 150px"
                                                />{" "}
                                              </div>
                                              <div className="qodef-e-author">
                                                <h6
                                                  className="qodef-e-author-job"
                                                // style="color: #FFFFFF"
                                                style={{color: "#FFFFFF"}}
                                                >
                                                  Satisfied Client
                                                </h6>
                                                <h3 className="qodef-e-author-name">
                                                  George Moreno
                                                </h3>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section
                          className="elementor-section elementor-top-section elementor-element elementor-element-e737fae elementor-section-full_width qodef-elementor-content-grid elementor-section-height-default elementor-section-height-default"
                          data-id="e737fae"
                          data-element_type="section"
                          data-settings='{"background_background":"classic"}'
                        >
                          <div className="elementor-container elementor-column-gap-no">
                            <div
                              className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-678738e"
                              data-id="678738e"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-a9cd0d7 elementor-widget elementor-widget-globefarer_core_icon_with_text"
                                  data-id="a9cd0d7"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_icon_with_text.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="qodef-shortcode qodef-m  qodef-icon-with-text qodef-layout--top qodef--custom-icon  qodef-alignment--left">
                                      <div className="qodef-m-icon-wrapper">
                                        <img
                                          width="45"
                                          height="34"
                                          src="assets/image/landing-icon-3.png"
                                          className="attachment-full size-full"
                                          alt="d"
                                        />
                                      </div>
                                      <div className="qodef-m-content">
                                        <h4 className="qodef-m-title">
                                          <span className="qodef-m-title-text">
                                            Ocean Freight
                                          </span>
                                        </h4>
                                        <p
                                          className="qodef-m-text"
                                        // style="margin-top: 18px"
                                        style={{marginTop : "18px"}}
                                        >
                                          Vix ut ignota deserunt partien ad,
                                          pros tale falli periculis ad, idque
                                          deseruisse constituam.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-aaeea25"
                              data-id="aaeea25"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-6d0c936 elementor-widget elementor-widget-globefarer_core_icon_with_text"
                                  data-id="6d0c936"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_icon_with_text.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="qodef-shortcode qodef-m  qodef-icon-with-text qodef-layout--top qodef--custom-icon  qodef-alignment--left">
                                      <div className="qodef-m-icon-wrapper">
                                        <img
                                          width="45"
                                          height="34"
                                          src="assets/image/landing-icon-4.png"
                                          className="attachment-full size-full"
                                          alt="d"
                                        />{" "}
                                      </div>
                                      <div className="qodef-m-content">
                                        <h4 className="qodef-m-title">
                                          <span className="qodef-m-title-text">
                                            Rail Freight
                                          </span>
                                        </h4>
                                        <p
                                          className="qodef-m-text"
                                        // style="margin-top: 18px"
                                        style={{marginTop : "18px"}}
                                        >
                                          Vix ut ignota deserunt partien ad,
                                          pros tale falli periculis ad, idque
                                          deseruisse constituam.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-68ec894"
                              data-id="68ec894"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-fcc6e12 elementor-widget elementor-widget-globefarer_core_icon_with_text"
                                  data-id="fcc6e12"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_icon_with_text.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="qodef-shortcode qodef-m  qodef-icon-with-text qodef-layout--top qodef--custom-icon  qodef-alignment--left">
                                      <div className="qodef-m-icon-wrapper">
                                        <img
                                          width="45"
                                          height="34"
                                          src="assets/image/landing-icon-1.png"
                                          className="attachment-full size-full"
                                          alt="d"
                                        />{" "}
                                      </div>
                                      <div className="qodef-m-content">
                                        <h4 className="qodef-m-title">
                                          <span className="qodef-m-title-text">
                                            Land Freight
                                          </span>
                                        </h4>
                                        <p
                                          className="qodef-m-text"
                                        // style="margin-top: 18px"
                                        style={{marginTop : "18px"}}
                                        >
                                          Vix ut ignota deserunt partien ad,
                                          pros tale falli periculis ad, idque
                                          deseruisse constituam.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-7dfacf7"
                              data-id="7dfacf7"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-69f5656 elementor-widget elementor-widget-globefarer_core_icon_with_text"
                                  data-id="69f5656"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_icon_with_text.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="qodef-shortcode qodef-m  qodef-icon-with-text qodef-layout--top qodef--custom-icon  qodef-alignment--left">
                                      <div className="qodef-m-icon-wrapper">
                                        <img
                                          width="45"
                                          height="34"
                                          src="assets/image/landing-icon-2.png"
                                          className="attachment-full size-full"
                                          alt="d"
                                        />{" "}
                                      </div>
                                      <div className="qodef-m-content">
                                        <h4 className="qodef-m-title">
                                          <span className="qodef-m-title-text">
                                            Air Freight
                                          </span>
                                        </h4>
                                        <p
                                          className="qodef-m-text"
                                        // style="margin-top: 18px"
                                        style={{marginTop : "18px"}}
                                        >
                                          Vix ut ignota deserunt partien ad,
                                          pros tale falli periculis ad, idque
                                          deseruisse constituam.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section
                          className="elementor-section elementor-top-section elementor-element elementor-element-2c89377 elementor-section-full_width qodef-elementor-content-grid elementor-section-height-default elementor-section-height-default"
                          data-id="2c89377"
                          data-element_type="section"
                          data-settings='{"background_background":"classic"}'
                        >
                          <div className="elementor-container elementor-column-gap-no">
                            <div
                              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-26fc046"
                              data-id="26fc046"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-bf43c56 elementor-widget elementor-widget-globefarer_core_divided_image_info"
                                  data-id="bf43c56"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_divided_image_info.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="qodef-shortcode qodef-m  qodef-divided-image-info qodef-layout--image-right qodef-separator--on  qodef-breakpoint--1024 qodef-appear-animation--yes qodef-appear-animation-type--roll-out">
                                      <div
                                        className="qodef-m-content"
                                      // style="margin-top: 10px;padding-left: 0px;padding-right: 4%"
                                      style={{marginTop: "10 px", paddingLeft: "0px", paddingRight: "4%"}}
                                      >
                                        <h2
                                          itemprop="name"
                                          className="qodef-m-title"
                                        // style="margin-bottom: 29px"
                                        style={{marginTop : "29px"}}
                                        >
                                          Secure courier for all your packages{" "}
                                        </h2>
                                        <p className="qodef-m-text">
                                          Lorem ipsum dolor sit amet, et sale ad
                                          mutat nusqua ius ea has autem aeterno
                                          divine sum.{" "}
                                        </p>
                                        <a
                                          className="qodef-shortcode qodef-m qodef-m-button qodef-button qodef-layout--textual  qodef-html--link"
                                          href="https://globefarer.qodeinteractive.com/about-us/"
                                          target="_self"
                                        >
                                          {" "}
                                          <span className="qodef-m-button-icon">
                                            <img src="../public/svg/view_more.svg" />
                                          </span>{" "}
                                          <span className="qodef-m-button-text">
                                            View more
                                            <br /> about our services
                                          </span>{" "}
                                        </a>
                                      </div>
                                      <div
                                        className="qodef-m-image"
                                      // style="width: 63%;padding-left: 5.8%;padding-right: 0px"
                                      style={{width: "63%", paddingLeft: "5.8%", paddingRight:"0px" }}
                                      >
                                        <img
                                          width="800"
                                          height="408"
                                          src="assets/image/main-home-img-2.jpg"
                                          className="attachment-full size-full"
                                          alt="d"
                                          srcset="assets/image/main-home-img-2.jpg 800w, assets/image/main-home-img-2-300x153.jpg 300w, assets/image/main-home-img-2-768x392.jpg 768w"
                                          sizes="(max-width: 800px) 100vw, 800px"
                                        />{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section
                          className="elementor-section elementor-top-section elementor-element elementor-element-ee4caa5 elementor-section-full_width elementor-section-height-min-height qodef-elementor-content-grid elementor-section-height-default elementor-section-items-middle"
                          data-id="ee4caa5"
                          data-element_type="section"
                          data-settings='{"background_background":"classic"}'
                        >
                          <div className="elementor-container elementor-column-gap-no">
                            <div
                              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7d7f4c3"
                              data-id="7d7f4c3"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-fa61764 elementor-widget__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-globefarer_core_section_title"
                                  data-id="fa61764"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_section_title.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="qodef-shortcode qodef-m  qodef-section-title qodef-alignment--left   qodef-appear-animation--no">
                                      <h1
                                        className="qodef-m-title"
                                      // style="color: #FFFFFF"
                                      style={{color: "#FFFFFF"}}
                                      >
                                        We provide the best and fastest courier
                                        services nowadays{" "}
                                      </h1>
                                      <p
                                        className="qodef-m-text"
                                      // style="margin-top: 30px;color: #FFFFFF"
                                      style={{marginTop: "30px", color: "#FFFFFF"}}
                                      >
                                        Id veniam malorum mel. At tempor euismod
                                        postulant commodo.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section
                          className="elementor-section elementor-top-section elementor-element elementor-element-e9169f3 elementor-section-full_width elementor-section-height-min-height qodef-elementor-content-grid elementor-section-content-middle elementor-section-height-default elementor-section-items-middle"
                          data-id="e9169f3"
                          data-element_type="section"
                          data-settings='{"background_background":"classic"}'
                        >
                          <div className="elementor-container elementor-column-gap-no">
                            <div
                              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-3c703cb"
                              data-id="3c703cb"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-c987fa3 elementor-widget__width-initial elementor-widget-tablet__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-globefarer_core_section_title"
                                  data-id="c987fa3"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_section_title.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="qodef-shortcode qodef-m  qodef-section-title qodef-alignment--center  qodef-custom-cursor--enabled qodef-appear-animation--no">
                                      <h2 className="qodef-m-title">
                                        <a
                                          itemprop="url"
                                          href="https://globefarer.qodeinteractive.com/what-we-do/"
                                          target="_self"
                                        >
                                          An innovative service for easy &amp;
                                          fast shipments, transportation
                                          coordinated by qualified staff{" "}
                                        </a>
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section
                          className="elementor-section elementor-top-section elementor-element elementor-element-d0a8899 qodef-elementor-content-grid elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                          data-id="d0a8899"
                          data-element_type="section"
                        >
                          <div className="elementor-container elementor-column-gap-default">
                            <div
                              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-4220659"
                              data-id="4220659"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-7a6f37d elementor-widget elementor-widget-globefarer_core_section_title"
                                  data-id="7a6f37d"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_section_title.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div className="qodef-shortcode qodef-m  qodef-section-title qodef-alignment--left   qodef-appear-animation--no">
                                      <h2 className="qodef-m-title">
                                        Latest blog posts{" "}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section
                          className="elementor-section elementor-top-section elementor-element elementor-element-597554c qodef-elementor-content-grid elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                          data-id="597554c"
                          data-element_type="section"
                        >
                          <div className="elementor-container elementor-column-gap-default">
                            <div
                              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-29a4321"
                              data-id="29a4321"
                              data-element_type="column"
                            >
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                  className="elementor-element elementor-element-a4a9efa elementor-widget elementor-widget-globefarer_core_blog_list"
                                  data-id="a4a9efa"
                                  data-element_type="widget"
                                  data-widget_type="globefarer_core_blog_list.default"
                                >
                                  <div className="elementor-widget-container">
                                    <div
                                      className="qodef-shortcode qodef-m  qodef-blog qodef-item-layout--divided-compact qodef-hover-animation--yes qodef-grid qodef-layout--columns  qodef-gutter--medium qodef-col-num--3 qodef-item-layout--divided-compact qodef--no-bottom-space qodef-pagination--off qodef-responsive--custom qodef-col-num--1440--3 qodef-col-num--1366--3 qodef-col-num--1024--1 qodef-col-num--768--1 qodef-col-num--680--1 qodef-col-num--480--1"
                                      data-options='{"plugin":"globefarer_core","module":"blog\/shortcodes","shortcode":"blog-list","post_type":"post","next_page":"2","max_pages_num":1,"behavior":"columns","images_proportion":"full","columns":"3","columns_responsive":"custom","columns_1440":"3","columns_1366":"3","columns_1024":"1","columns_768":"1","columns_680":"1","columns_480":"1","space":"medium","posts_per_page":"3","orderby":"date","order":"ASC","additional_params":"tax","tax":"category","tax_slug":"Agriculture","layout":"divided-compact","title_tag":"h4","excerpt_length":"72","button_text":"Read more","hover_animation":"yes","pagination_type":"no-pagination","object_class_name":"GlobeFarerCore_Blog_List_Shortcode","taxonomy_filter":"category","additional_query_args":{"tax_query":[{"taxonomy":"category","field":"slug","terms":"Agriculture"}]},"space_value":20}'
                                    >
                                      <div className="qodef-grid-inner clear">
                                        <article className="qodef-e qodef-blog-item qodef-grid-item qodef-item--full post-3050 post type-post status-publish format-standard has-post-thumbnail hentry category-agriculture tag-supplychain tag-travel tag-warehouse">
                                          <div className="qodef-e-inner">
                                            <div className="qodef-e-media">
                                              <div className="qodef-e-media-image">
                                                <a
                                                  itemprop="url"
                                                  href="https://globefarer.qodeinteractive.com/the-great-innovators/"
                                                ></a>
                                                <img
                                                  width="1400"
                                                  height="935"
                                                  src="assets/image/maih-home-blog-img1.jpg"
                                                  className="attachment-full size-full wp-post-image"
                                                  alt="f"
                                                  loading="lazy"
                                                  srcset="assets/image/maih-home-blog-img1.jpg 1400w, assets/image/maih-home-blog-img1-300x200.jpg 300w, assets/image/maih-home-blog-img1-1024x684.jpg 1024w, assets/image/maih-home-blog-img1-768x513.jpg 768w"
                                                  sizes="(max-width: 1400px) 100vw, 1400px"
                                                />
                                              </div>
                                            </div>
                                            <div className="qodef-e-content">
                                              <div className="qodef-e-left-holder">
                                                <a
                                                  itemprop="dateCreated"
                                                  href="https://globefarer.qodeinteractive.com/2021/08/"
                                                  className="qodef-e-date entry-date published updated"
                                                >
                                                  <span className="qodef-e-date-day">
                                                    09
                                                  </span>
                                                  <span className="qodef-e-date-month">
                                                    Aug
                                                  </span>
                                                </a>
                                                <div className="qodef-info-separator-end"></div>
                                              </div>
                                              <div className="qodef-e-right-holder">
                                                <div className="qodef-e-top-holder">
                                                  <div className="qodef-e-info">
                                                    <a
                                                      href="https://globefarer.qodeinteractive.com/category/agriculture/"
                                                      rel="tag"
                                                    >
                                                      Agriculture
                                                    </a>
                                                    <div className="qodef-info-separator-end"></div>{" "}
                                                  </div>
                                                </div>
                                                <div className="qodef-e-text">
                                                  <h4
                                                    itemprop="name"
                                                    className="qodef-e-title entry-title"
                                                  >
                                                    <a
                                                      itemprop="url"
                                                      className="qodef-e-title-link"
                                                      href="https://globefarer.qodeinteractive.com/the-great-innovators/"
                                                    >
                                                      The Great Innovators{" "}
                                                    </a>
                                                  </h4>
                                                  <p
                                                    itemprop="description"
                                                    className="qodef-e-excerpt"
                                                  >
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit.
                                                    In augue ligula
                                                  </p>
                                                </div>
                                                <div className="qodef-e-bottom-holder">
                                                  <div className="qodef-e-read-more">
                                                    <a
                                                      className="qodef-shortcode qodef-m  qodef-button qodef-layout--textual  qodef-html--link"
                                                      href="https://globefarer.qodeinteractive.com/the-great-innovators/"
                                                      target="_self"
                                                    >
                                                      {" "}
                                                      <span className="qodef-m-button-icon">
                                                        <img src="../public/svg/view_more.svg" />
                                                      </span>{" "}
                                                      <span className="qodef-m-button-text">
                                                        Read more
                                                      </span>{" "}
                                                    </a>{" "}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </article>
                                        <article className="qodef-e qodef-blog-item qodef-grid-item qodef-item--full post-3059 post type-post status-publish format-standard has-post-thumbnail hentry category-agriculture tag-shipping tag-supplychain tag-warehouse">
                                          <div className="qodef-e-inner">
                                            <div className="qodef-e-media">
                                              <div className="qodef-e-media-image">
                                                <a
                                                  itemprop="url"
                                                  href="https://globefarer.qodeinteractive.com/the-story-of-civilization/"
                                                ></a>
                                                <img
                                                  width="1400"
                                                  height="935"
                                                  src="assets/image/maih-home-blog-img2.jpg"
                                                  className="attachment-full size-full wp-post-image"
                                                  alt="d"
                                                  loading="lazy"
                                                  srcset="assets/image/maih-home-blog-img2.jpg 1400w, assets/image/maih-home-blog-img2-300x200.jpg 300w, assets/image/maih-home-blog-img2-1024x684.jpg 1024w, assets/image/maih-home-blog-img2-768x513.jpg 768w"
                                                  sizes="(max-width: 1400px) 100vw, 1400px"
                                                />
                                              </div>
                                            </div>
                                            <div className="qodef-e-content">
                                              <div className="qodef-e-left-holder">
                                                <a
                                                  itemprop="dateCreated"
                                                  href="https://globefarer.qodeinteractive.com/2021/08/"
                                                  className="qodef-e-date entry-date published updated"
                                                >
                                                  <span className="qodef-e-date-day">
                                                    09
                                                  </span>
                                                  <span className="qodef-e-date-month">
                                                    Aug
                                                  </span>
                                                </a>
                                                <div className="qodef-info-separator-end"></div>
                                              </div>
                                              <div className="qodef-e-right-holder">
                                                <div className="qodef-e-top-holder">
                                                  <div className="qodef-e-info">
                                                    <a
                                                      href="https://globefarer.qodeinteractive.com/category/agriculture/"
                                                      rel="tag"
                                                    >
                                                      Agriculture
                                                    </a>
                                                    <div className="qodef-info-separator-end"></div>{" "}
                                                  </div>
                                                </div>
                                                <div className="qodef-e-text">
                                                  <h4
                                                    itemprop="name"
                                                    className="qodef-e-title entry-title"
                                                  >
                                                    <a
                                                      itemprop="url"
                                                      className="qodef-e-title-link"
                                                      href="https://globefarer.qodeinteractive.com/the-story-of-civilization/"
                                                    >
                                                      The Story of Civilization{" "}
                                                    </a>
                                                  </h4>
                                                  <p
                                                    itemprop="description"
                                                    className="qodef-e-excerpt"
                                                  >
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit.
                                                    In augue ligula
                                                  </p>
                                                </div>
                                                <div className="qodef-e-bottom-holder">
                                                  <div className="qodef-e-read-more">
                                                    <a
                                                      className="qodef-shortcode qodef-m  qodef-button qodef-layout--textual  qodef-html--link"
                                                      href="https://globefarer.qodeinteractive.com/the-story-of-civilization/"
                                                      target="_self"
                                                    >
                                                      {" "}
                                                      <span className="qodef-m-button-icon">
                                                        <img src="../public/svg/view_more.svg" />
                                                      </span>{" "}
                                                      <span className="qodef-m-button-text">
                                                        Read more
                                                      </span>{" "}
                                                    </a>{" "}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </article>
                                        <article className="qodef-e qodef-blog-item qodef-grid-item qodef-item--full post-3065 post type-post status-publish format-standard has-post-thumbnail hentry category-agriculture tag-shipping tag-transport tag-warehouse">
                                          <div className="qodef-e-inner">
                                            <div className="qodef-e-media">
                                              <div className="qodef-e-media-image">
                                                <a
                                                  itemprop="url"
                                                  href="https://globefarer.qodeinteractive.com/building-for-society/"
                                                ></a>
                                                <img
                                                  width="1400"
                                                  height="935"
                                                  src="assets/image/maih-home-blog-img3.jpg"
                                                  className="attachment-full size-full wp-post-image"
                                                  alt="d"
                                                  loading="lazy"
                                                  srcset="assets/image/maih-home-blog-img3.jpg 1400w, assets/image/maih-home-blog-img3-300x200.jpg 300w, assets/image/maih-home-blog-img3-1024x684.jpg 1024w, assets/image/maih-home-blog-img3-768x513.jpg 768w"
                                                  sizes="(max-width: 1400px) 100vw, 1400px"
                                                />
                                              </div>
                                            </div>
                                            <div className="qodef-e-content">
                                              <div className="qodef-e-left-holder">
                                                <a
                                                  itemprop="dateCreated"
                                                  href="https://globefarer.qodeinteractive.com/2021/08/"
                                                  className="qodef-e-date entry-date published updated"
                                                >
                                                  <span className="qodef-e-date-day">
                                                    09
                                                  </span>
                                                  <span className="qodef-e-date-month">
                                                    Aug
                                                  </span>
                                                </a>
                                                <div className="qodef-info-separator-end"></div>
                                              </div>
                                              <div className="qodef-e-right-holder">
                                                <div className="qodef-e-top-holder">
                                                  <div className="qodef-e-info">
                                                    <a
                                                      href="https://globefarer.qodeinteractive.com/category/agriculture/"
                                                      rel="tag"
                                                    >
                                                      Agriculture
                                                    </a>
                                                    <div className="qodef-info-separator-end"></div>{" "}
                                                  </div>
                                                </div>
                                                <div className="qodef-e-text">
                                                  <h4
                                                    itemprop="name"
                                                    className="qodef-e-title entry-title"
                                                  >
                                                    <a
                                                      itemprop="url"
                                                      className="qodef-e-title-link"
                                                      href="https://globefarer.qodeinteractive.com/building-for-society/"
                                                    >
                                                      Building For Society{" "}
                                                    </a>
                                                  </h4>
                                                  <p
                                                    itemprop="description"
                                                    className="qodef-e-excerpt"
                                                  >
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit.
                                                    In augue ligula
                                                  </p>
                                                </div>
                                                <div className="qodef-e-bottom-holder">
                                                  <div className="qodef-e-read-more">
                                                    <a
                                                      className="qodef-shortcode qodef-m  qodef-button qodef-layout--textual  qodef-html--link"
                                                      href="https://globefarer.qodeinteractive.com/building-for-society/"
                                                      target="_self"
                                                    >
                                                      {" "}
                                                      <span className="qodef-m-button-icon">
                                                        <img src="../public/svg/view_more.svg" />
                                                      </span>{" "}
                                                      <span className="qodef-m-button-text">
                                                        Read more
                                                      </span>{" "}
                                                    </a>{" "}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </article>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <footer id="qodef-page-footer" role="contentinfo">
            <div id="qodef-page-footer-middle-area">
              <div
                id="qodef-page-footer-middle-area-inner"
                className="qodef-content-grid qodef-layout--predefined"
              >
                <div className="qodef-grid qodef-layout--columns qodef-responsive--custom qodef-col-num--5">
                  <div className="qodef-grid-inner clear">
                    <div className="qodef-grid-item">
                      <div
                        id="block-23"
                        className="widget widget_block widget_media_image"
                        data-area="qodef-footer-middle-area-column-1"
                      >
                        <figure className="wp-block-image size-full">
                          <a href="https://globefarer.qodeinteractive.com/">
                            <img
                              src="assets/image/logo.png"
                              alt="d"
                              className="wp-image-2178"
                            />
                          </a>
                        </figure>
                      </div>
                    </div>
                    <div className="qodef-grid-item">
                      <div
                        id="nav_menu-2"
                        className="widget widget_nav_menu"
                        data-area="qodef-footer-middle-area-column-2"
                      >
                        <h5 className="qodef-widget-title">Our Divisions</h5>
                        <div className="menu-footer-column-2-container">
                          <ul id="menu-footer-column-2" className="menu">
                            <li
                              id="menu-item-937"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-937"
                            >
                              <a href="https://globefarer.qodeinteractive.com/about-us/">
                                About Us
                              </a>
                            </li>
                            <li
                              id="menu-item-938"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-938"
                            >
                              <a href="https://globefarer.qodeinteractive.com/team/victoria-simens/">
                                Our Team
                              </a>
                            </li>
                            <li
                              id="menu-item-939"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-939"
                            >
                              <a href="https://globefarer.qodeinteractive.com/our-clients/">
                                Our Clients
                              </a>
                            </li>
                            <li
                              id="menu-item-940"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-940"
                            >
                              <a href="https://globefarer.qodeinteractive.com/meet-the-crew/">
                                Meet The Crew
                              </a>
                            </li>
                            <li
                              id="menu-item-941"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-941"
                            >
                              <a href="https://globefarer.qodeinteractive.com/available-positions/">
                                Available Positions
                              </a>
                            </li>
                            <li
                              id="menu-item-942"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-942"
                            >
                              <a href="https://globefarer.qodeinteractive.com/career-item/stocking-associate/">
                                Job Application
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="qodef-grid-item">
                      <div
                        id="nav_menu-3"
                        className="widget widget_nav_menu"
                        data-area="qodef-footer-middle-area-column-3"
                      >
                        <h5 className="qodef-widget-title">Company Service</h5>
                        <div className="menu-footer-column-3-container">
                          <ul id="menu-footer-column-3" className="menu">
                            <li
                              id="menu-item-943"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-943"
                            >
                              <a href="https://globefarer.qodeinteractive.com/our-services/">
                                Our Services
                              </a>
                            </li>
                            <li
                              id="menu-item-944"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-944"
                            >
                              <a href="https://globefarer.qodeinteractive.com/what-we-do/">
                                What We Do
                              </a>
                            </li>
                            <li
                              id="menu-item-945"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-945"
                            >
                              <a href="https://globefarer.qodeinteractive.com/step-1-3/">
                                Request a Freight
                              </a>
                            </li>
                            <li
                              id="menu-item-946"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-946"
                            >
                              <a href="https://globefarer.qodeinteractive.com/step-1-3/">
                                Track &#038; Trace
                              </a>
                            </li>
                            <li
                              id="menu-item-947"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-947"
                            >
                              <a href="https://globefarer.qodeinteractive.com/air-freight/">
                                Air Freight
                              </a>
                            </li>
                            <li
                              id="menu-item-948"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-948"
                            >
                              <a href="https://globefarer.qodeinteractive.com/rail-freight/">
                                Rail Freight
                              </a>
                            </li>
                            <li
                              id="menu-item-949"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-949"
                            >
                              <a href="https://globefarer.qodeinteractive.com/maritime-transport/">
                                Maritime Transport
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="qodef-grid-item">
                      <div
                        id="nav_menu-4"
                        className="widget widget_nav_menu"
                        data-area="qodef-footer-middle-area-column-4"
                      >
                        <h5 className="qodef-widget-title">Contact Us</h5>
                        <div className="menu-footer-column-4-container">
                          <ul id="menu-footer-column-4" className="menu">
                            <li
                              id="menu-item-950"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-950"
                            >
                              <a href="https://globefarer.qodeinteractive.com/get-in-touch/">
                                Find Us Here
                              </a>
                            </li>
                            <li
                              id="menu-item-951"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-951"
                            >
                              <a href="https://globefarer.qodeinteractive.com/get-in-touch/">
                                Get In Touch
                              </a>
                            </li>
                            <li
                              id="menu-item-952"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-952"
                            >
                              <a href="https://globefarer.qodeinteractive.com/faq-page/">
                                FAQ Page
                              </a>
                            </li>
                            <li
                              id="menu-item-953"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-953"
                            >
                              <a href="https://globefarer.qodeinteractive.com/global-network/">
                                Global Network
                              </a>
                            </li>
                            <li
                              id="menu-item-954"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-954"
                            >
                              <a href="https://globefarer.qodeinteractive.com/get-in-touch/">
                                Support 24/7
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="qodef-grid-item">
                      <div
                        id="nav_menu-5"
                        className="widget widget_nav_menu"
                        data-area="qodef-footer-middle-area-column-5"
                      >
                        <h5 className="qodef-widget-title">Latest News</h5>
                        <div className="menu-footer-column-5-container">
                          <ul id="menu-footer-column-5" className="menu">
                            <li
                              id="menu-item-955"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-955"
                            >
                              <a href="https://globefarer.qodeinteractive.com/expert-tips/">
                                Expert Tips
                              </a>
                            </li>
                            <li
                              id="menu-item-956"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-956"
                            >
                              <a href="https://globefarer.qodeinteractive.com/a-sustainable-future/">
                                A Sustainable Future
                              </a>
                            </li>
                            <li
                              id="menu-item-957"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-957"
                            >
                              <a href="https://globefarer.qodeinteractive.com/fresh-start/">
                                Fresh Start
                              </a>
                            </li>
                            <li
                              id="menu-item-958"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-958"
                            >
                              <a href="https://globefarer.qodeinteractive.com/clean-spaces/">
                                Clean Spaces
                              </a>
                            </li>
                            <li
                              id="menu-item-959"
                              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-959"
                            >
                              <a href="https://globefarer.qodeinteractive.com/tips-and-strategies/">
                                Tips &#038; Strategies
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="qodef-page-footer-bottom-area">
              <div
                id="qodef-page-footer-bottom-area-inner"
                className="qodef-content-grid qodef-layout--predefined"
              >
                <div className="qodef-grid qodef-layout--columns qodef-responsive--custom qodef-col-num--2">
                  <div className="qodef-grid-inner clear">
                    <div className="qodef-grid-item">
                      <div
                        id="block-14"
                        className="widget widget_block"
                        data-area="qodef-footer-bottom-area-column-1"
                      >
                        <p
                        // style="font-size: 15px"
                        style={{fontSize: "15px"}}
                        >
                          © 2021{" "}
                          <a
                            className="qodef-custom-link"
                            href="https://qodeinteractive.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            White Glove
                          </a>
                          , All Rights Reserved
                        </p>
                      </div>{" "}
                    </div>
                    <div className="qodef-grid-item">
                      <div
                        id="globefarer_core_social_icons_group-5"
                        className="widget widget_globefarer_core_social_icons_group"
                        data-area="qodef-footer-bottom-area-column-2"
                      >
                        {" "}
                        <div className="qodef-social-icons-group">
                          <span
                            className="qodef-shortcode qodef-m  qodef-icon-holder  qodef-layout--normal"
                            data-hover-color="#f7c600"
                          // style="margin: 13px 25px 0px 0px"
                          style={{margin : "13px 25px 0px 0px"}}
                          >
                          
                            {" "}
                            <a
                              itemprop="url"
                              href="https://twitter.com/QodeInteractive/"
                              target="_blank"
                            >
                              {" "}
                              <span
                                className="qodef-icon-font-awesome fab fa-twitter qodef-icon qodef-e"
                              // style="color: #e5e5e5;font-size: 20px"
                              style={{color: "#e5e5e5", fontSize: "20px"}}
                              ></span>{" "}
                            </a>{" "}
                          </span>
                          <span
                            className="qodef-shortcode qodef-m  qodef-icon-holder  qodef-layout--normal"
                            data-hover-color="#f7c600"
                          // style="margin: 13px 25px 0px 0px"
                          style={{margin : "13px 25px 0px 0px"}}
                          >
                            {" "}
                            <a
                              itemprop="url"
                              href="https://www.instagram.com/qodeinteractive/"
                              target="_blank"
                            >
                              {" "}
                              <span
                                className="qodef-icon-font-awesome fab fa-instagram qodef-icon qodef-e"
                              // style="color: #e5e5e5;font-size: 20px"
                              style={{color: "#e5e5e5", fontSize: "20px"}}
                              
                              ></span>{" "}
                            </a>{" "}
                          </span>
                          <span
                            className="qodef-shortcode qodef-m  qodef-icon-holder  qodef-layout--normal"
                            data-hover-color="#f7c600"
                          // style="margin: 13px 25px 0px 0px"
                          style={{margin : "13px 25px 0px 0px"}}
                          >
                            {" "}
                            <a
                              itemprop="url"
                              href="https://www.facebook.com/QodeInteractive/"
                              target="_blank"
                            >
                              {" "}
                              <span
                                className="qodef-icon-font-awesome fab fa-facebook-square qodef-icon qodef-e"
                              // style="color: #e5e5e5;font-size: 20px"
                              style={{color: "#e5e5e5", fontSize: "20px"}}
                              ></span>{" "}
                            </a>{" "}
                          </span>
                          <span
                            className="qodef-shortcode qodef-m  qodef-icon-holder  qodef-layout--normal"
                            data-hover-color="#F7C600"
                          // style="margin: 13px 0px 0px 0px"
                          style={{margin : "13px 25px 0px 0px"}}
                          >
                            {" "}
                            <a
                              itemprop="url"
                              href="https://vimeo.com/qodeinteractive/"
                              target="_blank"
                            >
                              {" "}
                              <span
                                className="qodef-icon-font-awesome fab fa-vimeo-v qodef-icon qodef-e"
                              // style="color: #e5e5e5;font-size: 18px"
                              style={{color: "#e5e5e5", fontSize: "18px"}}
                              ></span>{" "}
                            </a>{" "}
                          </span>{" "}
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <a id="qodef-back-to-top" href="#" className="qodef--predefined">
            <span className="qodef-back-to-top-icon">
              <img src="../public/svg/back_to_top.svg" />
            </span>
          </a>
          <div id="qodef-custom-cursor">
            <span className="qodef-cursor-dot"></span>
            <span className="qodef-cursor-text-holder">
              <span className="qodef-cursor-discover-text">Discover </span>
            </span>
            <span className="qodef-cursor-svg-holder">
              {/* <svg
                className="qodef-svg--video-button qodef-cursor-video-button-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="25"
                viewBox="0 0 20 25"
              >
                <g transform="translate(17 2) rotate(90)" fill="none">
                  <path d="M10.5-3,23,17H-2Z" stroke="none" />
                  <path
                    d="M 10.5 0.7735996246337891 L 1.608499526977539 15 L 19.39150047302246 15 L 10.5 0.7735996246337891 M 10.5 -3 L 23 17 L -2 17 L 10.5 -3 Z"
                    stroke="none"
                    fill="currentColor"
                  />
                </g>
              </svg>{" "}
              <svg
                className="qodef-svg--cursor-link qodef-cursor-link-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 27 27"
              >
                <g transform="translate(-1036.335 -984.207)">
                  <path
                    d="M1053.774,997.658c-.053-.072-.108-.143-.166-.212a6.025,6.025,0,0,0-.439-.488,6.3,6.3,0,0,0-8.892,0l-6.1,6.1a6.287,6.287,0,0,0,8.892,8.891l2.133-2.133a1.066,1.066,0,0,0-1.507-1.507l-2.132,2.133a4.157,4.157,0,0,1-5.879-5.878l6.1-6.1a4.163,4.163,0,0,1,5.879,0,3.962,3.962,0,0,1,.289.321c.037.045.074.094.111.144a1.092,1.092,0,0,0,1.49.219A1.067,1.067,0,0,0,1053.774,997.658Z"
                    transform="translate(0 -2.586)"
                    fill="currentColor"
                  />
                  <path
                    d="M1046.887,1002.834c.064.071.132.142.2.208a6.3,6.3,0,0,0,8.893,0l6.1-6.1a6.288,6.288,0,0,0-8.893-8.893l-2.151,2.152a1.066,1.066,0,0,0,1.507,1.507l2.151-2.152a4.157,4.157,0,0,1,5.879,5.879l-6.1,6.1a4.125,4.125,0,0,1-2.939,1.216h0a4.134,4.134,0,0,1-2.94-1.217l-.134-.139a1.065,1.065,0,1,0-1.57,1.439Z"
                    transform="translate(-0.585 -2)"
                    fill="currentColor"
                  />
                </g>
              </svg>{" "}
              <svg
                className="qodef-svg--close qodef-cursor-close-svg"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="19.778"
                height="19.778"
                viewBox="0 0 19.778 19.778"
              >
                <g transform="translate(-30 -30)">
                  <rect
                    width="13"
                    height="2"
                    transform="translate(31.414 30) rotate(45)"
                  />
                  <rect
                    width="13"
                    height="2"
                    transform="translate(48.364 49.778) rotate(-135)"
                  />
                  <rect
                    width="13"
                    height="2"
                    transform="translate(30 48.364) rotate(-45)"
                  />
                  <rect
                    width="13"
                    height="2"
                    transform="translate(49.778 31.414) rotate(135)"
                  />
                </g>
              </svg>{" "} */}
            </span>
          </div>
          <div id="qodef-side-area">
            <a
              href="javascript:void(0)"
              id="qodef-side-area-close"
              className="qodef-opener-icon qodef-m qodef-source--predefined qodef--opened"
            >
              <span className="qodef-m-icon qodef--close">
                <img src="../public/svg/menu_close.svg" />
              </span>
            </a>
            <div id="qodef-side-area-inner">
              <div
                id="block-21"
                className="widget widget_block widget_media_image"
                data-area="side-area"
              >
                <figure className="wp-block-image size-full">
                  <a href="https://globefarer.qodeinteractive.com/">
                    <img
                      src="assets/image/logo.png"
                      alt="d"
                      className="wp-image-2154"
                    />
                  </a>
                </figure>
              </div>
              <div
                id="block-22"
                className="widget widget_block"
                data-area="side-area"
              >
                <p
                // style="margin-top: -10px"
                style={{marginTop : "-10px"}}
                >
                  Everything your logistics business needs is already here!
                  White Glove, a theme made for transport service companies.
                </p>
              </div>
              <div
                id="block-10"
                className="widget widget_block"
                data-area="side-area"
              >
                <div
                // style="margin-bottom: 13px; margin-top: 13px; font-size: 14px"
                style={{marginBottom: "13px", paddingLtop: "13px", fontSize:"14px" }}
                >
                  Support center 24/7
                </div>
                <p>
                  <a
                    // style="color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.01em"
                    style={{color: "#ffffff", fontSize: "32px", fontWeight: "700", letterSpacing:"-0.01em"}}
                    href="tel:18005476842"
                  >
                    1800 547 68 42
                  </a>
                </p>
              </div>
              <div
                id="block-12"
                className="widget widget_block"
                data-area="side-area"
              >
                <div className="wp-container-3 wp-block-columns">
                  <div className="wp-container-1 wp-block-column">
                    <div
                    // style="margin-bottom: -5px; margin-top: -20px; font-size: 14px"
                    style={{marginBottom: "-5px", paddingTop: "-20px", fontSize:"14px" }}
                    >
                      You can find us at
                    </div>
                    <p>
                      <a
                        // style="color: #ffffff; font-size: 17px; line-height: 22px; font-weight: 700; letter-spacing: -0.01em"
                        style={{color: "#ffffff", fontSize: "17px", lineHeight:"22px", fontWeight:"700", letterSpacing:"-0.01em"}}
                        href="https://www.google.com/maps/@28.494333,77.021056,15z?hl=en"
                        target="_blank"
                        rel="noopener"
                      >
                        FLITTE Logistics Services Private Limited
                        <br />
                        22/18, 2nd Floor, Row B1,Opp. C2 Gate,
                        <br />
                        Near Ansal Corporate Plaza,
                        <br />
                        Gurgaon, India, 122017
                      </a>
                    </p>
                  </div>
                  <div className="wp-container-2 wp-block-column">
                    <div
                    // style="margin-bottom: -5px; margin-top: -20px; font-size: 14px"
                    style={{marginBottom: "-5px", paddingTop: "-20px", fontSize:"14px" }}
                    >
                      Get in touch with us
                    </div>
                    <p>
                      <a
                        // style="color: #ffffff; font-size: 17px; line-height: 22px; font-weight: 700; letter-spacing: -0.01em"
                        style={{color:"#ffffff", fontSize:"17px", lineHeight:"22px", fontWeigth:"700", letterSpacing:"-0.01em"}}
                        href="/cdn-cgi/l/email-protection#fe9992919c9bbe9b869f938e929bd09d9193"
                      >
                        <span
                          className="__cf_email__"
                          data-cfemail="c8afa4a7aaad88adb0a9a5b8a4ade6aba7a5"
                        >
                          inquiry@whiteglove.co.in
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;