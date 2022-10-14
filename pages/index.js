import React, { useEffect, useState, useContext } from "react";
import { Divider, Tabs, Collapse, Carousel } from "antd";
import HomeForm from "../components/Home";
import Image from "next/image";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const text = (
  <p style={{ paddingLeft: 24 }}>
    Try to provide moving companies with as much notice as possible, especially if you are moving during the summer months (mid-May to mid-September) or at the beginning or end of a month (regardless of the season). We recommend making arrangements at least four to six weeks before your desired moving date. This will increase your likelihood of securing the pickup and delivery dates you desire. Add even more time to make a decision if you are obligated by your employer to submit estimates for approval.
  </p>
);
const contentStyle = {
  marginLeft: 'auto',
  marginRight: 'auto'
};
//import
const HomePage = () => {
  return (
    <>
      <div className="index_font_color">
        <div className="Index_background1">
          <div className=" flex justify-center items-center">
            <img className="Index_movers-Burnaby_1 absolute pt-52 lg:mt-80" src="/images/index_image/truck_and_movers.png" itemProp="image"
              alt="main BannerImage" />

            {/* <img className="Truck_Mockup_1 absolute ml-14 mt-24" src="/images/index_image/Truck_Mockup_1.png" itemProp="image"
              alt="main BannerImage" /> */}
          </div>
        </div>
        <div className="index_font_color pb-2">
          <div className="mx-6 bg-white rounded-xl flex flex-col my-3 items-center">
            <div className="index_Calculate_price_Box-text-1 text-xl pt-6">Shifting Happiness</div>
            <div className="index_Calculate_price_Box-text-2 font-bold px-20 text-center py-4">We make your Moving Easy</div>
            <div className="pb-4">
              <button type="button" className="yellowButton px-5 py-3.5 text-lg">
                Calculate Moving Prices
                <img className="arrow-png pl-3" src="/images/index_image/arrow.png" itemProp="image"
                  alt="main BannerImage" />
              </button>
            </div>
          </div>
        </div>
        <div className="Index_background2 px-7 py-10 TrackYourOrderBox">
          <div className=" text"><img className="location_on mr-2" src="/images/index_image/location_on.svg" itemProp="image"
            alt="main BannerImage" />Track your Order
          </div>
          <div className="index_orderType-text pt-8">Choose order type</div>
          <div className="index_orderType-text2 pb-7">LTL shipment (LRN)</div>
          <div className="bg-white rounded-md py-3">
            <div className="index_orderType-text3 px-4">LRN Number</div>
          </div>
          <button className="yellowButton text-center Index-track-button py-4 mt-6">Track</button>
        </div>
        <div className="Index_background3 mt-9 h-full p-10 ">
          <div className="Index-MovingMadeModern_text py-4">Moving Made<br />Modern</div>
          <div className="Index-MovingMadeModern_text_2">
            by choosing Whit&apos;Glove Packers and Movers, you&apos;re guaranteeing a great moving day. All customers receive transparent pricing, flexible service and payment options, Quality Packaging Material, industry-best customer support, and an easy-to-access online dashboard.
          </div>
        </div>
        <Carousel autoplay className="mb-5">
          <div className="index_card1 " style={contentStyle}>
            <div className="mb-20 mt-7">
              <img className="ml-auto mr-auto index-Worldwide-delivery-1" src="/images/index_image/Worldwide-delivery-1.png" itemProp="image"
                alt="Worldwide delivery " />
            </div>
            <div className="flex flex-row mx-10 pb-10">
              <div className="my-auto"><img className="index-globe" src="/images/index_image/globe.svg" itemProp="image"
                alt="GLOBE" /></div>
              <div className=" index-international_Relocation-text pl-3.5">International<br />Relocation</div>
            </div>
            <div className="pb-6 index_card1_text font-bold mx-10">
              Great &#38; Affordable <br /> Shifting Services
            </div>
            <div className="index_card1_text-2 mx-10 pb-6">
              rexeive fixed-price, individualized plan and reserve your move without having to worry about hidden fees.
            </div>
            <div className="mx-10 pb-7">Read More</div>
          </div>
          <div className="index_card1  " style={contentStyle}>
            <div className="mb-20 mt-7">
              <img className="ml-auto mr-auto index-Worldwide-delivery-1" src="/images/index_image/Worldwide-delivery-1.png" itemProp="image"
                alt="Worldwide delivery " />
            </div>
            <div className="flex flex-row mx-10 pb-10">
              <div className="my-auto"><img className="index-globe" src="/images/index_image/globe.svg" itemProp="image"
                alt="GLOBE" /></div>
              <div className=" index-international_Relocation-text pl-3.5">International<br />Relocation</div>
            </div>
            <div className="pb-6 index_card1_text font-bold mx-10">
              Great &#38; Affordable <br /> Shifting Services
            </div>
            <div className="index_card1_text-2 mx-10 pb-6">
              rexeive fixed-price, individualized plan and reserve your move without having to worry about hidden fees.
            </div>
            <div className="mx-10 pb-7">Read More</div>
          </div>
        </Carousel>
        <div className="Index_background4 mx-5 p-7">
          <div className="Index-WhatDoYou-text pb-3">what do you want<br />to ship?</div>
          <div className="Index-WhatDoYou-text-2 font-small py-4 mb-5">Get local advice for your request.<br />Our team is always there for you</div>
          <button type="button" className="BlackButton px-5 py-4 text-lg">
            Lets talk
            <img className="arrow-png pl-3" src="/images/index_image/arrow_blue.png" itemProp="image"
              alt="main BannerImage" />
          </button>
        </div>
        <div className="p-5">image of packeditem</div>

        <div className="index_card_of_details_parient bg-white p-5">
          <div className="index_card_of_details">
            <img className="arrow-png pl-3" src="/images/index_image/pin_drop.png" itemProp="image"
              alt="main BannerImage" />
            <div className="index_card_of_details-text">Number of Location</div>
            <div className="index_card_of_details-text-2">359</div>
          </div>
          <div className="index_card_of_details">
            <img className="arrow-png pl-3" src="/images/index_image/local_shipping.png" itemProp="image"
              alt="main BannerImage" />
            <div className="index_card_of_details-text">Delivered Packages</div>
            <div className="index_card_of_details-text-2">500+</div>
          </div>
          <div className="index_card_of_details">
            <img className="arrow-png pl-3" src="/images/index_image/speed.png" itemProp="image"
              alt="main BannerImage" />
            <div className="index_card_of_details-text">Kilometer Per Month</div>
            <div className="index_card_of_details-text-2">500+</div>
          </div>
          <div className="index_card_of_details">
            <img className="arrow-png pl-3" src="/images/index_image/package.png" itemProp="image"
              alt="main BannerImage" />
            <div className="index_card_of_details-text">Tons</div>
            <div className="index_card_of_details-text-2">500+</div>
          </div>
          <div className="index_card_of_details">
            <img className="arrow-png pl-3" src="/images/index_image/sentiment_satisfied.png" itemProp="image"
              alt="main BannerImage" />
            <div className="index_card_of_details-text">Satisfied Clients</div>
            <div className="index_card_of_details-text-2">150+</div>
          </div>
        </div>
        <div className="Index_city_card-background py-14">
          <div className=" text-center Index_city_card-text">Our Top Cities</div>
          <div className=" text-center Index_city_card-text-2">Find Movers Near You</div>
        </div>
        <Carousel autoplay>
          <div>
            <div className="Index_city_card p-6" style={contentStyle} >
              <img className="mx-auto" src="/images/index_image/Group_57.png" itemProp="image"
                alt="main BannerImage" />
              <div className=" text-center Index_city_card-text-3 pt-6">Delhi</div>
            </div>
          </div>
          <div>
            <div className="Index_city_card2 p-6" style={contentStyle}>
              <img className="mx-auto" src="/images/index_image/Group_57_1.png" itemProp="image"
                alt="main BannerImage" />
              <div className=" text-center Index_city_card-text-4  pt-6">Gurugram</div>
            </div>
          </div>
          <div>
            <div className="Index_city_card p-6" style={contentStyle}>
              <img className="mx-auto" src="/images/index_image/Group_57.png" itemProp="image"
                alt="main BannerImage" />
              <div className=" text-center Index_city_card-text-3 pt-6">Delhi</div>
            </div>
          </div>
          <div>
            <div className="Index_city_card2 p-6" style={contentStyle}>
              <img className="mx-auto" src="/images/index_image/Group_57_1.png" itemProp="image"
                alt="main BannerImage" />
              <div className=" text-center Index_city_card-text-4  pt-6">Gurugram</div>
            </div>
          </div>
        </Carousel>
        <div className="Index_city_card-background py-14" >
          <button type="button" className="WhiteButton w-56 mx-auto py-4 text-lg">
            Explore All Cities
            <img className="arrow-png pl-3" src="/images/index_image/arrow_blue.png" itemProp="image"
              alt="main BannerImage" />
          </button>
        </div>
        <div className="bg-white px-5 py-8 flex flex-col justify-center">
          <div className="Index_fAQ_text px-12 text-center font-bold">FAQ about Packers and Movers</div>
          <div>
            <Collapse bordered={false} defaultActiveKey={['1']}>
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
          <button type="button" className="WhiteButton px-7 mx-auto py-4 text-lg">
            View All FAQs
            <img className="arrow-png pl-3" src="/images/index_image/arrow_blue.png" itemProp="image"
              alt="main BannerImage" />
          </button>
        </div>
        <div className="Index_background5 p-4">
          <div className="index_card_experience_text">
            Our <span className="index_card_experience_text-2">Best experience</span> in Excellent Logistics Fulfillment
          </div>
          <div className="index_card_experience p-5 " >
            <div className="index_card_experience_text-3  pb-5">01</div>
            <img className="pb-4" src="/images/index_image/sticky_note_2.png" itemProp="image"
              alt="main BannerImage" />
            <div className="index_card_experience_text-4 pb-3">Convenient Booking</div>
            <div className="index_card_experience_text-5">Book on your schedule and get estimates instantly with the help of our dedicated customer service agents.
            </div>
          </div>
        </div>
        <div className="bg-white p-5">
          <div className=" text-center Index_blog-text-3 py-7">Our Latest blog</div>
          <div>
            <img className="pb-4" src="/images/index_image/Rectangle_9.png" itemProp="image"
              alt="main BannerImage" />
          </div>
          <div className=" py-4">
            <button type="button" className="GreyButton px-7 mx-auto py-3 text-lg">
              Agriculture
            </button>
            <span className="Index_blog-text m-auto pl-8">
              27 Aug, 2022
            </span>
          </div>
          <div className="Index_blog-text-2 pb-8">
            Griha Pravesh Muhurat 2021: Auspicious Dates for Home Shifting
          </div>
          <div>
            <img className="pb-4" src="/images/index_image/Rectangle_10.png" itemProp="image"
              alt="main BannerImage" />
          </div>
          <div className=" py-4">
            <button type="button" className="GreyButton px-7 mx-auto py-3 text-lg">
              LifeStyle
            </button>
            <span className="Index_blog-text m-auto pl-8">
              06 May, 2022
            </span>
          </div>
          <div className="Index_blog-text-2 pb-8">
            How to Find the Right House in Bangalore?
          </div>
          <div>
            <img className="pb-4" src="/images/index_image/Rectangle_8.png" itemProp="image"
              alt="main BannerImage" />
          </div>
          <div className=" py-4">
            <button type="button" className="GreyButton px-7 mx-auto py-3 text-lg">
              LifeStyle
            </button>
            <span className="Index_blog-text m-auto pl-8">
              27 Aug, 2022
            </span>
          </div>
          <div className="Index_blog-text-2 pb-8">
            A Comprehensive Guide for Moving into a New Home
          </div>
          <div className=" flex justify-center">
            <button type="button" className="WhiteButton px-7    py-4 text-lg">
              View all Blogs
              <img className="arrow-png pl-5" src="/images/index_image/arrow_blue.png" itemProp="image"
                alt="main BannerImage" />
            </button>
          </div>
        </div>
        <div className="Index_background6 p-7 ">
          <div className="Index_Clint_card-Heading text-center px-6 py-11">
            What our Clients are Saying
          </div>
          <div className="Index_Clint_card p-6">
            <div className="Index_Clint_card-item pb-7">
              <div>
                <img className="pb-4" src="/images/index_image/Rectangle_11.png" itemProp="image"
                  alt="main BannerImage" />
              </div>
              <div>
                <div className="Index_Clint_card-item-text pb-5">Mainak Chakraborty</div>
                <div className="Index_Clint_card-item-text-2 pb-4">Co-founder &amp; CEO, GPS Renewables</div>
                <div className="Index_Clint_card-item-text-3">Relocated from Bangalore to Hyderabad</div>
              </div>
            </div>
            <div className="Index_Clint_card-text">
              I moved from Whitefield, Bangalore to Hyderabad with Pikkol recently. I had been in Bangalore for many years, so, had considerable number of items. My Whitefield house was a duplex villa (without a lift) with many of these items in the first floor.
            </div>
          </div>
          <div className="Index-Clint_trust-Heading py-12 ">150+ Clients Trust White Glove</div>
        </div>
      </div>
    </>
    // <div className="index_font_color">




    //   <div className="Index_background1 relative">
    //     <div>
    //       {/* <img
    //         className="Index_movers-Burnaby_1 absolute ml-44 mt-24"
    //         src="/images/index_image/Index_movers-Burnaby-Signature-Moving-scaled-removebg.png"
    //         itemProp="image"
    //         alt="Movers"
    //       />
    //       <img
    //         className="Truck_Mockup_1 absolute ml-14 mt-24"
    //         src="/images/index_image/Truck_Mockup_1.png"
    //         itemProp="image"
    //         alt="Trunk Mockup image"
    //       /> */}

    //     </div>
    //   </div>

    //   <div className="index_font_color pb-2">
    //     <div className="mx-6 bg-white rounded-xl flex flex-col my-3 items-center">
    //       <div className="index_Calculate_price_Box-text-1 text-xl pt-6">Shifting Happiness</div>
    //       <div className="index_Calculate_price_Box-text-2 font-bold px-20 text-center py-4">We make your Moving Easy</div>
    //       <div className="pb-4">
    //         <button type="button" className="yellowButton px-5 py-3.5 text-lg">
    //           Calculate Moving Prices
    //           <img className="arrow-png pl-3" src="/images/index_image/arrow.png" itemProp="image"
    //             alt="main BannerImage" />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="Index_background2 px-7 py-10 TrackYourOrderBox">
    //     <div className=" text"><img className="location_on mr-2" src="/images/index_image/location_on.svg" itemProp="image"
    //       alt="main BannerImage" />Track your Order
    //     </div>
    //     <div className="index_orderType-text pt-8">Choose order type</div>
    //     <div className="index_orderType-text2 pb-7">LTL shipment (LRN)</div>
    //     <div className="bg-white rounded-md py-3">
    //       <div className="index_orderType-text3 px-4">LRN Number</div>
    //     </div>
    //     <button className="yellowButton text-center Index-track-button py-4 mt-6">Track</button>
    //   </div>
    //   <div className="Index_background3 mt-9 h-full p-10 ">
    //     <div className="Index-MovingMadeModern_text py-4">Moving Made<br />Modern</div>
    //     <div className="Index-MovingMadeModern_text_2">
    //       by choosing Whit&apos;Glove Packers and Movers, you&apos;re guaranteeing a great moving day. All customers receive transparent pricing, flexible service and payment options, Quality Packaging Material, industry-best customer support, and an easy-to-access online dashboard.
    //     </div>
    //   </div>


    //   <Carousel autoplay className="mb-5">
    //     <div className="index_card1 " style={contentStyle}>
    //       <div className="mb-20 mt-7">
    //         <img className="ml-auto mr-auto index-Worldwide-delivery-1" src="/images/index_image/Worldwide-delivery-1.png" itemProp="image"
    //           alt="Worldwide delivery " />
    //       </div>
    //       <div className="flex flex-row mx-10 pb-10">
    //         <div className="my-auto"><img className="index-globe" src="/images/index_image/globe.svg" itemProp="image"
    //           alt="GLOBE" /></div>
    //         <div className=" index-international_Relocation-text pl-3.5">International<br />Relocation</div>
    //       </div>
    //       <div className="pb-6 index_card1_text font-bold mx-10">
    //         Great &#38; Affordable <br /> Shifting Services
    //       </div>
    //       <div className="index_card1_text-2 mx-10 pb-6">
    //         rexeive fixed-price, individualized plan and reserve your move without having to worry about hidden fees.
    //       </div>
    //       <div className="mx-10 pb-7">Read More</div>
    //     </div>


    //     <div className="index_card1  " style={contentStyle}>
    //       <div className="mb-20 mt-7">
    //         <img className="ml-auto mr-auto index-Worldwide-delivery-1" src="/images/index_image/Worldwide-delivery-1.png" itemProp="image"
    //           alt="Worldwide delivery " />
    //       </div>
    //       <div className="flex flex-row mx-10 pb-10">
    //         <div className="my-auto"><img className="index-globe" src="/images/index_image/globe.svg" itemProp="image"
    //           alt="GLOBE" /></div>
    //         <div className=" index-international_Relocation-text pl-3.5">International<br />Relocation</div>
    //       </div>
    //       <div className="pb-6 index_card1_text font-bold mx-10">
    //         Great &#38; Affordable <br /> Shifting Services
    //       </div>
    //       <div className="index_card1_text-2 mx-10 pb-6">
    //         rexeive fixed-price, individualized plan and reserve your move without having to worry about hidden fees.
    //       </div>
    //       <div className="mx-10 pb-7">Read More</div>
    //     </div>
    //   </Carousel>



    //   <div className="Index_background4 mx-5 p-7">
    //     <div className="Index-WhatDoYou-text pb-3">what do you want<br />to ship?</div>
    //     <div className="Index-WhatDoYou-text-2 font-small py-4 mb-5">Get local advice for your request.<br />Our team is always there for you</div>
    //     <button type="button" className="BlackButton px-5 py-4 text-lg">
    //       Lets talk
    //       <img className="arrow-png pl-3" src="/images/index_image/arrow_blue.png" itemProp="image"
    //         alt="main BannerImage" />
    //     </button>
    //   </div>
    //   <div className="p-5">image of packeditem</div>

    //   <div className="index_card_of_details_parient bg-white p-5">
    //     <div className="index_card_of_details">
    //       <img className="arrow-png pl-3" src="/images/index_image/pin_drop.png" itemProp="image"
    //         alt="main BannerImage" />
    //       <div className="index_card_of_details-text">Number of Location</div>
    //       <div className="index_card_of_details-text-2">359</div>
    //     </div>
    //     <div className="index_card_of_details">
    //       <img className="arrow-png pl-3" src="/images/index_image/local_shipping.png" itemProp="image"
    //         alt="main BannerImage" />
    //       <div className="index_card_of_details-text">Delivered Packages</div>
    //       <div className="index_card_of_details-text-2">500+</div>
    //     </div>

    //     <div className="index_card_of_details">
    //       <img className="arrow-png pl-3" src="/images/index_image/speed.png" itemProp="image"
    //         alt="main BannerImage" />
    //       <div className="index_card_of_details-text">Kilometer Per Month</div>
    //       <div className="index_card_of_details-text-2">500+</div>
    //     </div>

    //     <div className="index_card_of_details">
    //       <img className="arrow-png pl-3" src="/images/index_image/package.png" itemProp="image"
    //         alt="main BannerImage" />
    //       <div className="index_card_of_details-text">Tons</div>
    //       <div className="index_card_of_details-text-2">500+</div>
    //     </div>

    //     <div className="index_card_of_details">
    //       <img className="arrow-png pl-3" src="/images/index_image/sentiment_satisfied.png" itemProp="image"
    //         alt="main BannerImage" />
    //       <div className="index_card_of_details-text">Satisfied Clients</div>
    //       <div className="index_card_of_details-text-2">150+</div>
    //     </div>
    //   </div>



    //   <div className="Index_city_card-background py-14">
    //     <div className=" text-center Index_city_card-text">Our Top Cities</div>
    //     <div className=" text-center Index_city_card-text-2">Find Movers Near You</div>

    //   </div>
    //   <Carousel autoplay>
    //     <div>
    //       <div className="Index_city_card p-6" style={contentStyle} >
    //         <img className="mx-auto" src="/images/index_image/Group_57.png" itemProp="image"
    //           alt="main BannerImage" />
    //         <div className=" text-center Index_city_card-text-3 pt-6">Delhi</div>
    //       </div>
    //     </div>
    //     <div>
    //       <div className="Index_city_card2 p-6" style={contentStyle}>
    //         <img className="mx-auto" src="/images/index_image/Group_57_1.png" itemProp="image"
    //           alt="main BannerImage" />
    //         <div className=" text-center Index_city_card-text-4  pt-6">Gurugram</div>
    //       </div>
    //     </div>
    //     <div>
    //       <div className="Index_city_card p-6" style={contentStyle}>
    //         <img className="mx-auto" src="/images/index_image/Group_57.png" itemProp="image"
    //           alt="main BannerImage" />
    //         <div className=" text-center Index_city_card-text-3 pt-6">Delhi</div>
    //       </div>
    //     </div>
    //     <div>
    //       <div className="Index_city_card2 p-6" style={contentStyle}>
    //         <img className="mx-auto" src="/images/index_image/Group_57_1.png" itemProp="image"
    //           alt="main BannerImage" />
    //         <div className=" text-center Index_city_card-text-4  pt-6">Gurugram</div>
    //       </div>
    //     </div>
    //   </Carousel>
    //   <div className="Index_city_card-background py-14" >

    //     <button type="button" className="WhiteButton w-56 mx-auto py-4 text-lg">
    //       Explore All Cities
    //       <img className="arrow-png pl-3" src="/images/index_image/arrow_blue.png" itemProp="image"
    //         alt="main BannerImage" />
    //     </button>
    //   </div>
    //   <div className="bg-white px-5 py-8 flex flex-col justify-center">
    //     <div className="Index_fAQ_text px-12 text-center font-bold">FAQ about Packers and Movers</div>
    //     <div>
    //       <Collapse bordered={false} defaultActiveKey={['1']}>
    //         <Panel header="This is panel header 1" key="1">
    //           {text}
    //         </Panel>
    //         <Panel header="This is panel header 2" key="2">
    //           {text}
    //         </Panel>
    //         <Panel header="This is panel header 3" key="3">
    //           {text}
    //         </Panel>
    //       </Collapse>
    //     </div>
    //     <button type="button" className="WhiteButton px-7 mx-auto py-4 text-lg">
    //       View All FAQs
    //       <img className="arrow-png pl-3" src="/images/index_image/arrow_blue.png" itemProp="image"
    //         alt="main BannerImage" />
    //     </button>
    //   </div>


    //   <div className="Index_background5 p-4">
    //     <div className="index_card_experience_text">
    //       Our <span className="index_card_experience_text-2">Best experience</span> in Excellent Logistics Fulfillment
    //     </div>


    //     <div className="index_card_experience p-5 " >
    //       <div className="index_card_experience_text-3  pb-5">01</div>
    //       <img className="pb-4" src="/images/index_image/sticky_note_2.png" itemProp="image"
    //         alt="main BannerImage" />
    //       <div className="index_card_experience_text-4 pb-3">Convenient Booking</div>
    //       <div className="index_card_experience_text-5">Book on your schedule and get estimates instantly with the help of our dedicated customer service agents.
    //       </div>
    //     </div>
    //   </div>


    //   <div className="bg-white p-5">
    //     <div className=" text-center Index_blog-text-3 py-7">Our Latest blog</div>
    //     <div>
    //       <img className="pb-4" src="/images/index_image/Rectangle_9.png" itemProp="image"
    //         alt="main BannerImage" />
    //     </div>
    //     <div className=" py-4">
    //       <button type="button" className="GreyButton px-7 mx-auto py-3 text-lg">
    //         Agriculture
    //       </button>
    //       <span className="Index_blog-text m-auto pl-8">
    //         27 Aug, 2022
    //       </span>
    //     </div>
    //     <div className="Index_blog-text-2 pb-8">
    //       Griha Pravesh Muhurat 2021: Auspicious Dates for Home Shifting
    //     </div>


    //     <div>
    //       <img className="pb-4" src="/images/index_image/Rectangle_10.png" itemProp="image"
    //         alt="main BannerImage" />
    //     </div>
    //     <div className=" py-4">
    //       <button type="button" className="GreyButton px-7 mx-auto py-3 text-lg">
    //         LifeStyle
    //       </button>
    //       <span className="Index_blog-text m-auto pl-8">
    //         06 May, 2022
    //       </span>
    //     </div>
    //     <div className="Index_blog-text-2 pb-8">
    //       How to Find the Right House in Bangalore?
    //     </div>


    //     <div>
    //       <img className="pb-4" src="/images/index_image/Rectangle_8.png" itemProp="image"
    //         alt="main BannerImage" />
    //     </div>
    //     <div className=" py-4">
    //       <button type="button" className="GreyButton px-7 mx-auto py-3 text-lg">
    //         LifeStyle
    //       </button>
    //       <span className="Index_blog-text m-auto pl-8">
    //         27 Aug, 2022
    //       </span>
    //     </div>
    //     <div className="Index_blog-text-2 pb-8">
    //       A Comprehensive Guide for Moving into a New Home
    //     </div>

    //     <div className=" flex justify-center">
    //       <button type="button" className="WhiteButton px-7    py-4 text-lg">
    //         View all Blogs
    //         <img className="arrow-png pl-5" src="/images/index_image/arrow_blue.png" itemProp="image"
    //           alt="main BannerImage" />
    //       </button>
    //     </div>
    //   </div>
    //   <div className="Index_background6 p-7 ">
    //     <div className="Index_Clint_card-Heading text-center px-6 py-11">
    //       What our Clients are Saying
    //     </div>
    //     <div className="Index_Clint_card p-6">
    //       <div className="Index_Clint_card-item pb-7">
    //         <div>
    //           <img className="pb-4" src="/images/index_image/Rectangle_11.png" itemProp="image"
    //             alt="main BannerImage" />
    //         </div>
    //         <div>
    //           <div className="Index_Clint_card-item-text pb-5">Mainak Chakraborty</div>
    //           <div className="Index_Clint_card-item-text-2 pb-4">Co-founder &amp; CEO, GPS Renewables</div>
    //           <div className="Index_Clint_card-item-text-3">Relocated from Bangalore to Hyderabad</div>
    //         </div>
    //       </div>
    //       <div className="Index_Clint_card-text">
    //         I moved from Whitefield, Bangalore to Hyderabad with Pikkol recently. I had been in Bangalore for many years, so, had considerable number of items. My Whitefield house was a duplex villa (without a lift) with many of these items in the first floor.
    //       </div>
    //     </div>
    //     <div className="Index-Clint_trust-Heading py-12 ">150+ Clients Trust White Glove</div>
    //   </div>






    // </div>
    // <div className="grid grid-cols-1 md:grid-cols-5  lg:grid-cols-5 gap-2 mb-16">
    //   <div className="col-span-3">
    // <img
    //   className="bannerImage"
    //   src="/images/home/BannerImage.png"
    //   itemProp="image"
    //   alt="main BannerImage"
    // />
    //   </div>
    //   <div className="col-span-2">
    //     {/* <div className="bannerTitle self-center space-y-4 w-96 mt-64">
    //                   Shifting Happiness
    //               </div>
    //               <div className="bannerSubTitle w-96">
    //                   We Make Your Moving Easy
    //               </div> */}
    //     {/* <p className="w-96">Lorem ipsum Get complete care from top L,,to bottom with your own moving expert.  Get complete care from top to bottom with your own moving expert. </p>
    //               <Button className="">Calculate Moving Price</Button> */}
    //     <HomeForm />
    //   </div>
    // </div>
    // <div className="grid grid-cols-1 p-8 md:grid-cols-5  lg:grid-cols-5 modernMoving">
    //   <div className="col-span-2">
    //     <div>
    //       <div className="subBannerTitle w-96 mt-16 sm:ml-16 md:ml-24 lg:ml-32">
    //         Moving Made Modern
    //       </div>
    //       <p className="subBanner-p w-96 sm:ml-16 md:ml-24 lg:ml-32">
    //         By choosing White Glove Packers and Movers, you’re guaranteeing a
    //         great moving day. All customers receive transparent pricing,
    //         flexible service and payment options, Quality Packaging Material,
    //         industry-best customer support, and an easy-to-access online
    //         dashboard.
    //       </p>
    //     </div>
    //     <Divider />
    //     {/* Create a component for this */}
    //     <div className="movingList mt-16 sm:ml-16 md:ml-24 lg:ml-32 justify">
    //       <span className="mListIcon">+</span>
    //       <span className="movingListContant w-48 pl-4">
    //         Get Price Get Free Quote Now
    //       </span>
    //     </div>
    //     <div className="movingList mt-16 sm:ml-16 md:ml-24 lg:ml-32 justify">
    //       <span className="mListIcon">+</span>
    //       <span className="movingListContant w-48 pl-4">
    //         Get Price Get Free Quote Now
    //       </span>
    //     </div>
    //     <div className="movingList mt-16 sm:ml-16 md:ml-24 lg:ml-32 justify">
    //       <span className="mListIcon">+</span>
    //       <span className="movingListContant w-48 pl-4">
    //         Get Price Get Free Quote Now
    //       </span>
    //     </div>
    //   </div>
    //   <div className="col-span-3">
    //     <img
    //       className="bannerImage"
    //       src="/images/home/modern-moving.png"
    //       itemProp="image"
    //       alt="main BannerImage"
    //     />
    //   </div>
    // </div>
    // <div className="ml-16 mr-16 mt-16 mb-2">
    //   <Tabs defaultActiveKey="1">
    //     <TabPane tab="Domestic Relocation" key="1">
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-16">
    //         <div>
    //           <img
    //             className="mt-16"
    //             src="/images/home/main-home-tabbed-info-1.png"
    //             itemProp="image"
    //             alt="main BannerImage"
    //           />
    //         </div>
    //         <div>
    //           <div className="homeTabInfoTitle w-96 md:ml-32 lg:ml-32 mt-16 justify">
    //             Secure Sifting for small & big moves
    //           </div>
    //           <p className="homeTabInfo w-104 md:ml-32 lg:ml-32 mt-16 justify">
    //             Get complete care from top to bottom with your own moving
    //             expert. This customer care expert organizes your experience
    //             from the second you book until the moment you realize you`re
    //             home. Your representative offers an effective plan for a
    //             seamless, easy, and unforgettable domestic moving experience.
    //           </p>
    //           <Divider />
    //           <div className="movingList mt-8 md:ml-32 lg:ml-32 justify">
    //             <span className="mListIcon">+</span>
    //             <span className="movingListContant w-48 pl-4">
    //               Get Price Get Free Quote Now
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </TabPane>
    //     <TabPane tab="International Relocation" key="2">
    //       {/* Content of Tab Pane 2 */}
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-16">
    //         <div>
    //           <img
    //             className="mt-16"
    //             src="/images/home/international-relocation.png"
    //             itemProp="image"
    //             alt="main BannerImage"
    //           />
    //         </div>
    //         <div>
    //           <div className="homeTabInfoTitle w-96 md:ml-32 lg:ml-32 mt-16 justify">
    //             Great & affordable shifting services
    //           </div>
    //           <p className="homeTabInfo w-104 md:ml-32 lg:ml-32 mt-16 justify">
    //             Receive fixed-price, individualized plans and reserve your
    //             move without having to worry about hidden fees. Our house
    //             estimates come at affordable rates while offering a
    //             full-service moving experience.
    //           </p>
    //           <Divider />
    //           <div className="movingList mt-8 md:ml-32 lg:ml-32 justify">
    //             <span className="mListIcon">+</span>
    //             <span className="movingListContant w-48 pl-4">
    //               Get Price Get Free Quote Now
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </TabPane>
    //     <TabPane tab="Corporate Relocation" key="3">
    //       {/* Content of Tab Pane 3 */}
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-16">
    //         <div>
    //           <img
    //             className="mt-16"
    //             src="/images/home/corporate-relocation.png"
    //             itemProp="image"
    //             alt="main BannerImage"
    //           />
    //         </div>
    //         <div>
    //           <div className="homeTabInfoTitle w-96 md:ml-32 lg:ml-32 mt-16 justify">
    //             It`s a Office or Factory we’ll be there
    //           </div>
    //           <p className="homeTabInfo w-104 md:ml-32 lg:ml-32 mt-16 justify">
    //             Moving an office & factory is both time-consuming and a
    //             stressful experience. Complete office and commercial
    //             relocations take a significant amount of time, energy, and
    //             resources, so it is critical to have sound pre-move plans and
    //             estimate in advance. When you`re moving your current office
    //             space with your team, or relocating the contents of an entire
    //             building, White Glove Packers and Movers has your back!
    //           </p>
    //           <Divider />
    //           <div className="movingList mt-8 md:ml-32 lg:ml-32 justify">
    //             <span className="mListIcon">+</span>
    //             <span className="movingListContant w-48 pl-4">
    //               Get Price Get Free Quote Now
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </TabPane>
    //     <TabPane tab="Vehicle Relocation" key="4" mb-16>
    //       {/* Content of Tab Pane 4 */}
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-16">
    //         <div>
    //           <img
    //             className="mt-16"
    //             src="/images/home/vehicle-relocation.png"
    //             itemProp="image"
    //             alt="main BannerImage"
    //           />
    //         </div>
    //         <div>
    //           <div className="homeTabInfoTitle w-96 md:ml-32 lg:ml-32 mt-16 justify">
    //             Weather it`s Bike, Car or SUV
    //           </div>
    //           <p className="homeTabInfo w-104 md:ml-32 lg:ml-32 mt-16 justify">
    //             Our 360° vehicle shifting services include packing, moving,
    //             and point to point delivery, at transparent and affordable
    //             prices. You can trust White Glove to provide quality services
    //             with no damage to your vehicle.
    //           </p>
    //           <Divider />
    //           <div className="movingList mt-8 md:ml-32 lg:ml-32 justify">
    //             <span className="mListIcon">+</span>
    //             <span className="movingListContant w-48 pl-4">
    //               Get Price Get Free Quote Now
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </TabPane>
    //     <TabPane tab="Storage" key="5">
    //       {/* Content of Tab Pane 5 */}
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-16">
    //         <div>
    //           <img
    //             className="mt-16"
    //             src="/images/home/storage.png"
    //             itemProp="image"
    //             alt="main BannerImage"
    //           />
    //         </div>
    //         <div>
    //           <div className="homeTabInfoTitle w-96 md:ml-32 lg:ml-32 mt-16 justify">
    //             Are you looking for a new place to store your belongings?
    //           </div>
    //           <p className="homeTabInfo w-104 md:ml-32 lg:ml-32 mt-16 justify">
    //             You’ve come to the right place! White Glove Packers and Movers
    //             offer affordable and convenient with our partnered
    //             self-storage solutions. Whether you need storage for a few
    //             months or just want some extra space, we have what you need.
    //           </p>
    //           <Divider />
    //           <div className="movingList mt-8 md:ml-32 lg:ml-32 justify">
    //             <span className="mListIcon">+</span>
    //             <span className="movingListContant w-48 pl-4">
    //               Get Price Get Free Quote Now
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </TabPane>
    //   </Tabs>
    // </div>
    // <div className="xs:columns-1 sm:columns-2 lg:columns-4 pl-16 pr-16 pt-16 pb-16 shortCodeMain">
    //   <div>
    //     <div style={{ minHeight: 80 }} className="p-8">
    //       <img
    //         className="iconImage"
    //         src="/images/home/icon/booking.png"
    //         itemProp="image"
    //         alt="main BannerImage"
    //       />
    //     </div>
    //     <div>
    //       <div className="shortCodeTitle p-8 ">Convenient Booking</div>
    //       <p className=" " style={{ padding: "0 2rem" }}>
    //         Book on your schedule and get estimates instantly with the help of
    //         our dedicated customer service agents. Without an in-home estimate
    //         start the quote process right away with our handy inventory tool.
    //       </p>
    //     </div>
    //   </div>
    //   <div>
    //     <div style={{ minHeight: 80 }} className="p-8">
    //       <img
    //         className="iconImage"
    //         src="/images/home/icon/price.png"
    //         itemProp="image"
    //         alt="main BannerImage"
    //       />
    //     </div>
    //     <div>
    //       <div className="shortCodeTitle p-8 ">A Non-to-Exceed quote</div>
    //       <p className=" " style={{ padding: "0 2rem" }}>
    //         Receive fixed-price, individualized plans and reserve your move
    //         without having to worry about hidden fees. Our house estimates
    //         come at affordable rates with Not-to-Exceed amount.
    //       </p>
    //     </div>
    //   </div>
    //   <div>
    //     <div style={{ minHeight: 80 }} className="p-8">
    //       <img
    //         className="iconImage"
    //         src="/images/home/icon/precise-delivery.png"
    //         itemProp="image"
    //         alt="main BannerImage"
    //       />
    //     </div>
    //     <div>
    //       <div className="shortCodeTitle p-8 ">
    //         Precise pickup and delivery
    //       </div>
    //       <p className=" " style={{ padding: "0 2rem" }}>
    //         There`s no need to get held up by service windows. With White
    //         Glove Packers and Movers, you can relax knowing your movers and
    //         belongings will be there exactly when they are requested to be
    //         there.
    //       </p>
    //     </div>
    //   </div>
    //   <div>
    //     <div style={{ minHeight: 80 }} className="p-8">
    //       <img
    //         className="iconImage"
    //         src="/images/home/icon/truck.png"
    //         itemProp="image"
    //         alt="main BannerImage"
    //       />
    //     </div>
    //     <div>
    //       <div className="shortCodeTitle p-8 ">Dedicated Trucks</div>
    //       <p className=" " style={{ padding: "0 2rem" }}>
    //         Don`t worry about sharing your truck space or move-day with anyone
    //         else. Opt for a dedicated rental truck packed by professional
    //         movers with you in mind and driven directly to your new home.
    //       </p>
    //     </div>
    //   </div>
    // </div>
    // <div className="grid grid-cols-1 p-8 md:grid-cols-2 lg:grid-cols-3 mb-16 ">
    //   <div>
    //     <div className="homeTabInfoTitle w-96  md:ml-32 lg:ml-32 mt-16 justify">
    //       Relax while your White Glove pros get the job done.
    //     </div>
    //     <p className="homeTabInfo w-104  md:ml-32 lg:ml-32 mt-16 justify">
    //       Your lead White Glove pro will get in touch on the day of your
    //       service to let you know your team is on the way. Once they arrive,
    //       they’ll conduct a brief walk-through, take note of any special
    //       instructions, and then get to work
    //     </p>
    //     <Divider />
    //     <div className="movingList mt-8  md:ml-32 lg:ml-32 justify">
    //       <span className="mListIcon">+</span>
    //       <span className="movingListContant w-48 pl-4">
    //         Get Price Get Free Quote Now
    //       </span>
    //     </div>
    //   </div>
    //   <div className="col-span-2">
    //     <img
    //       className="mt-16"
    //       src="/images/home/whiteglove-pro.png"
    //       itemProp="image"
    //       alt="main BannerImage"
    //     />
    //   </div>
    // </div>
    // <div className="grid  md:pl-48 md:pr-32 md:pt-64 md:pb-64 shortCodeMain">
    //   <div className="p-8 tagMsgSection">
    //     An innovative service for easy & fast shifting, transportation
    //     coordinated by qualified staff
    //   </div>
    // </div>
    // <div className="mt-16 ml-8 mb-16">
    //   <div className="ml-16 mb-8 blogPostTitle">Latest blog posts</div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-16">
    //     <div>
    //       <div>
    //         <img
    //           className="mt-8 w-96 mb-16"
    //           src="/images/home/maih-home-blog-img2.jpeg"
    //           itemProp="image"
    //           alt="main BannerImage"
    //         />
    //       </div>
    //       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
    //         <div className="blogDate">
    //           <div className="blogDateDig">10</div>
    //           <div>May</div>
    //         </div>
    //         <div className="col-span-5">
    //           <div className="blogClass">LifeStyle</div>
    //           <div className="blogTitle">Problem while shifting?</div>
    //           <div className="flex blogshortDesc w-80 mt-3">
    //             You’ll definitely have a pleasant moving day if you choose
    //             White Glove Packers and Movers.
    //           </div>
    //           <Divider />
    //           <div className="movingList mt-2 justify">
    //             <span className="mListIcon">+</span>
    //             <span className="movingListContant w-48 p-4">Read More</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <div>
    //         <img
    //           className="mt-8 w-96  mb-16"
    //           src="/images/home/maih-home-blog-img3.jpeg"
    //           itemProp="image"
    //           alt="main BannerImage"
    //         />
    //       </div>
    //       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
    //         <div className="blogDate">
    //           <div className="blogDateDig">10</div>
    //           <div>May</div>
    //         </div>
    //         <div className="col-span-5">
    //           <div className="blogClass">LifeStyle</div>
    //           <div className="blogTitle">Problem while shifting?</div>
    //           <div className="flex blogshortDesc w-80 mt-3">
    //             You’ll definitely have a pleasant moving day if you choose
    //             White Glove Packers and Movers.
    //           </div>
    //           <Divider />
    //           <div className="movingList mt-2 justify">
    //             <span className="mListIcon">+</span>
    //             <span className="movingListContant w-48 p-4">Read More</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <div>
    //         <img
    //           className="mt-8 w-96 mb-16"
    //           src="/images/home/maih-home-blog-img2.jpeg"
    //           itemProp="image"
    //           alt="main BannerImage"
    //         />
    //       </div>
    //       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
    //         <div className="blogDate">
    //           <div className="blogDateDig">10</div>
    //           <div>May</div>
    //         </div>
    //         <div className="col-span-5">
    //           <div className="blogClass">LifeStyle</div>
    //           <div className="blogTitle">Problem while shifting?</div>
    //           <div className="flex blogshortDesc w-80 mt-3">
    //             You’ll definitely have a pleasant moving day if you choose
    //             White Glove Packers and Movers.
    //           </div>
    //           <Divider />
    //           <div className="movingList mt-2 justify">
    //             <span className="mListIcon">+</span>
    //             <span className="movingListContant w-48 p-4">Read More</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default HomePage;
