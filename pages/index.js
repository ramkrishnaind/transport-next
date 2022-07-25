import React, { useEffect, useState, useContext } from "react";
import { Button, Divider, Tabs } from "antd";
import HomeForm from "../components/Home";
import Image from "next/image";
const { TabPane } = Tabs;
//import
const HomePage = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5  lg:grid-cols-5 gap-2 mb-16">
        <div className="col-span-3">
          <img
            className="bannerImage"
            src="/images/home/BannerImage.png"
            itemProp="image"
            alt="main BannerImage"
          />
        </div>
        <div className="col-span-2">
          {/* <div className="bannerTitle self-center space-y-4 w-96 mt-64">
                        Shifting Happiness
                    </div>
                    <div className="bannerSubTitle w-96">
                        We Make Your Moving Easy
                    </div> */}
          {/* <p className="w-96">Lorem ipsum Get complete care from top to bottom with your own moving expert.  Get complete care from top to bottom with your own moving expert. </p>
                    <Button className="">Calculate Moving Price</Button> */}
          <HomeForm />
        </div>
      </div>
      <div className="grid grid-cols-1 p-8 md:grid-cols-5  lg:grid-cols-5 modernMoving">
        <div className="col-span-2">
          <div>
            <div className="subBannerTitle w-96 mt-16 sm:ml-16 md:ml-24 lg:ml-32">
              Moving Made Modern
            </div>
            <p className="subBanner-p w-96 sm:ml-16 md:ml-24 lg:ml-32">
              By choosing White Glove Packers and Movers, you’re guaranteeing a
              great moving day. All customers receive transparent pricing,
              flexible service and payment options, Quality Packaging Material,
              industry-best customer support, and an easy-to-access online
              dashboard.
            </p>
          </div>
          <Divider />
          {/* Create a component for this */}
          <div className="movingList mt-16 sm:ml-16 md:ml-24 lg:ml-32 justify">
            <span className="mListIcon">+</span>
            <span className="movingListContant w-48 pl-4">
              Get Price Get Free Quote Now
            </span>
          </div>
          <div className="movingList mt-16 sm:ml-16 md:ml-24 lg:ml-32 justify">
            <span className="mListIcon">+</span>
            <span className="movingListContant w-48 pl-4">
              Get Price Get Free Quote Now
            </span>
          </div>
          <div className="movingList mt-16 sm:ml-16 md:ml-24 lg:ml-32 justify">
            <span className="mListIcon">+</span>
            <span className="movingListContant w-48 pl-4">
              Get Price Get Free Quote Now
            </span>
          </div>
        </div>
        <div className="col-span-3">
          <img
            className="bannerImage"
            src="/images/home/modern-moving.png"
            itemProp="image"
            alt="main BannerImage"
          />
        </div>
      </div>
      <div className="ml-16 mr-16 mt-16 mb-2">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Domestic Relocation" key="1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-16">
              <div>
                <img
                  className="mt-16"
                  src="/images/home/main-home-tabbed-info-1.png"
                  itemProp="image"
                  alt="main BannerImage"
                />
              </div>
              <div>
                <div className="homeTabInfoTitle w-96 md:ml-32 lg:ml-32 mt-16 justify">
                  Secure Sifting for small & big moves
                </div>
                <p className="homeTabInfo w-104 md:ml-32 lg:ml-32 mt-16 justify">
                  Get complete care from top to bottom with your own moving
                  expert. This customer care expert organizes your experience
                  from the second you book until the moment you realize you`re
                  home. Your representative offers an effective plan for a
                  seamless, easy, and unforgettable domestic moving experience.
                </p>
                <Divider />
                <div className="movingList mt-8 md:ml-32 lg:ml-32 justify">
                  <span className="mListIcon">+</span>
                  <span className="movingListContant w-48 pl-4">
                    Get Price Get Free Quote Now
                  </span>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="International Relocation" key="2">
            {/* Content of Tab Pane 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-16">
              <div>
                <img
                  className="mt-16"
                  src="/images/home/international-relocation.png"
                  itemProp="image"
                  alt="main BannerImage"
                />
              </div>
              <div>
                <div className="homeTabInfoTitle w-96 md:ml-32 lg:ml-32 mt-16 justify">
                  Great & affordable shifting services
                </div>
                <p className="homeTabInfo w-104 md:ml-32 lg:ml-32 mt-16 justify">
                  Receive fixed-price, individualized plans and reserve your
                  move without having to worry about hidden fees. Our house
                  estimates come at affordable rates while offering a
                  full-service moving experience.
                </p>
                <Divider />
                <div className="movingList mt-8 md:ml-32 lg:ml-32 justify">
                  <span className="mListIcon">+</span>
                  <span className="movingListContant w-48 pl-4">
                    Get Price Get Free Quote Now
                  </span>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Corporate Relocation" key="3">
            {/* Content of Tab Pane 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-16">
              <div>
                <img
                  className="mt-16"
                  src="/images/home/corporate-relocation.png"
                  itemProp="image"
                  alt="main BannerImage"
                />
              </div>
              <div>
                <div className="homeTabInfoTitle w-96 md:ml-32 lg:ml-32 mt-16 justify">
                  It`s a Office or Factory we’ll be there
                </div>
                <p className="homeTabInfo w-104 md:ml-32 lg:ml-32 mt-16 justify">
                  Moving an office & factory is both time-consuming and a
                  stressful experience. Complete office and commercial
                  relocations take a significant amount of time, energy, and
                  resources, so it is critical to have sound pre-move plans and
                  estimate in advance. When you`re moving your current office
                  space with your team, or relocating the contents of an entire
                  building, White Glove Packers and Movers has your back!
                </p>
                <Divider />
                <div className="movingList mt-8 md:ml-32 lg:ml-32 justify">
                  <span className="mListIcon">+</span>
                  <span className="movingListContant w-48 pl-4">
                    Get Price Get Free Quote Now
                  </span>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Vehicle Relocation" key="4" mb-16>
            {/* Content of Tab Pane 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-16">
              <div>
                <img
                  className="mt-16"
                  src="/images/home/vehicle-relocation.png"
                  itemProp="image"
                  alt="main BannerImage"
                />
              </div>
              <div>
                <div className="homeTabInfoTitle w-96 md:ml-32 lg:ml-32 mt-16 justify">
                  Weather it`s Bike, Car or SUV
                </div>
                <p className="homeTabInfo w-104 md:ml-32 lg:ml-32 mt-16 justify">
                  Our 360° vehicle shifting services include packing, moving,
                  and point to point delivery, at transparent and affordable
                  prices. You can trust White Glove to provide quality services
                  with no damage to your vehicle.
                </p>
                <Divider />
                <div className="movingList mt-8 md:ml-32 lg:ml-32 justify">
                  <span className="mListIcon">+</span>
                  <span className="movingListContant w-48 pl-4">
                    Get Price Get Free Quote Now
                  </span>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Storage" key="5">
            {/* Content of Tab Pane 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-16">
              <div>
                <img
                  className="mt-16"
                  src="/images/home/storage.png"
                  itemProp="image"
                  alt="main BannerImage"
                />
              </div>
              <div>
                <div className="homeTabInfoTitle w-96 md:ml-32 lg:ml-32 mt-16 justify">
                  Are you looking for a new place to store your belongings?
                </div>
                <p className="homeTabInfo w-104 md:ml-32 lg:ml-32 mt-16 justify">
                  You’ve come to the right place! White Glove Packers and Movers
                  offer affordable and convenient with our partnered
                  self-storage solutions. Whether you need storage for a few
                  months or just want some extra space, we have what you need.
                </p>
                <Divider />
                <div className="movingList mt-8 md:ml-32 lg:ml-32 justify">
                  <span className="mListIcon">+</span>
                  <span className="movingListContant w-48 pl-4">
                    Get Price Get Free Quote Now
                  </span>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div className="flex flex-col-1 md:flex-cols-3 lg:flex-cols-4 pl-16 pr-16 pt-16 pb-16 shortCodeMain">
        <div>
          <div style={{ minHeight: 80 }} className="p-8">
            <img
              className="iconImage"
              src="/images/home/icon/booking.png"
              itemProp="image"
              alt="main BannerImage"
            />
          </div>
          <div>
            <div className="shortCodeTitle p-8 ">Convenient Booking</div>
            <p className=" " style={{ padding: "0 2rem" }}>
              Book on your schedule and get estimates instantly with the help of
              our dedicated customer service agents. Without an in-home estimate
              start the quote process right away with our handy inventory tool.
            </p>
          </div>
        </div>
        <div>
          <div style={{ minHeight: 80 }} className="p-8">
            <img
              className="iconImage"
              src="/images/home/icon/price.png"
              itemProp="image"
              alt="main BannerImage"
            />
          </div>
          <div>
            <div className="shortCodeTitle p-8 ">A Non-to-Exceed quote</div>
            <p className=" " style={{ padding: "0 2rem" }}>
              Receive fixed-price, individualized plans and reserve your move
              without having to worry about hidden fees. Our house estimates
              come at affordable rates with Not-to-Exceed amount.
            </p>
          </div>
        </div>
        <div>
          <div style={{ minHeight: 80 }} className="p-8">
            <img
              className="iconImage"
              src="/images/home/icon/precise-delivery.png"
              itemProp="image"
              alt="main BannerImage"
            />
          </div>
          <div>
            <div className="shortCodeTitle p-8 ">
              Precise pickup and delivery
            </div>
            <p className=" " style={{ padding: "0 2rem" }}>
              There`s no need to get held up by service windows. With White
              Glove Packers and Movers, you can relax knowing your movers and
              belongings will be there exactly when they are requested to be
              there.
            </p>
          </div>
        </div>
        <div>
          <div style={{ minHeight: 80 }} className="p-8">
            <img
              className="iconImage"
              src="/images/home/icon/truck.png"
              itemProp="image"
              alt="main BannerImage"
            />
          </div>
          <div>
            <div className="shortCodeTitle p-8 ">Dedicated Trucks</div>
            <p className=" " style={{ padding: "0 2rem" }}>
              Don`t worry about sharing your truck space or move-day with anyone
              else. Opt for a dedicated rental truck packed by professional
              movers with you in mind and driven directly to your new home.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 p-8 md:grid-cols-2 lg:grid-cols-3 mb-16 ">
        <div>
          <div className="homeTabInfoTitle w-96  md:ml-32 lg:ml-32 mt-16 justify">
            Relax while your White Glove pros get the job done.
          </div>
          <p className="homeTabInfo w-104  md:ml-32 lg:ml-32 mt-16 justify">
            Your lead White Glove pro will get in touch on the day of your
            service to let you know your team is on the way. Once they arrive,
            they’ll conduct a brief walk-through, take note of any special
            instructions, and then get to work
          </p>
          <Divider />
          <div className="movingList mt-8  md:ml-32 lg:ml-32 justify">
            <span className="mListIcon">+</span>
            <span className="movingListContant w-48 pl-4">
              Get Price Get Free Quote Now
            </span>
          </div>
        </div>
        <div className="col-span-2">
          <img
            className="mt-16"
            src="/images/home/whiteglove-pro.png"
            itemProp="image"
            alt="main BannerImage"
          />
        </div>
      </div>
      <div className="grid  md:pl-48 md:pr-32 md:pt-64 md:pb-64 shortCodeMain">
        <div className="p-8 tagMsgSection">
          An innovative service for easy & fast shifting, transportation
          coordinated by qualified staff
        </div>
      </div>
      <div className="mt-16 ml-8 mb-16">
        <div className="ml-16 mb-8 blogPostTitle">Latest blog posts</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-16">
          <div>
            <div>
              <img
                className="mt-8 w-96 mb-16"
                src="/images/home/maih-home-blog-img2.jpeg"
                itemProp="image"
                alt="main BannerImage"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <div className="blogDate">
                <div className="blogDateDig">10</div>
                <div>May</div>
              </div>
              <div className="col-span-5">
                <div className="blogClass">LifeStyle</div>
                <div className="blogTitle">Problem while shifting?</div>
                <div className="flex blogshortDesc w-80 mt-3">
                  You’ll definitely have a pleasant moving day if you choose
                  White Glove Packers and Movers.
                </div>
                <Divider />
                <div className="movingList mt-2 justify">
                  <span className="mListIcon">+</span>
                  <span className="movingListContant w-48 p-4">Read More</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <img
                className="mt-8 w-96  mb-16"
                src="/images/home/maih-home-blog-img3.jpeg"
                itemProp="image"
                alt="main BannerImage"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <div className="blogDate">
                <div className="blogDateDig">10</div>
                <div>May</div>
              </div>
              <div className="col-span-5">
                <div className="blogClass">LifeStyle</div>
                <div className="blogTitle">Problem while shifting?</div>
                <div className="flex blogshortDesc w-80 mt-3">
                  You’ll definitely have a pleasant moving day if you choose
                  White Glove Packers and Movers.
                </div>
                <Divider />
                <div className="movingList mt-2 justify">
                  <span className="mListIcon">+</span>
                  <span className="movingListContant w-48 p-4">Read More</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <img
                className="mt-8 w-96 mb-16"
                src="/images/home/maih-home-blog-img2.jpeg"
                itemProp="image"
                alt="main BannerImage"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <div className="blogDate">
                <div className="blogDateDig">10</div>
                <div>May</div>
              </div>
              <div className="col-span-5">
                <div className="blogClass">LifeStyle</div>
                <div className="blogTitle">Problem while shifting?</div>
                <div className="flex blogshortDesc w-80 mt-3">
                  You’ll definitely have a pleasant moving day if you choose
                  White Glove Packers and Movers.
                </div>
                <Divider />
                <div className="movingList mt-2 justify">
                  <span className="mListIcon">+</span>
                  <span className="movingListContant w-48 p-4">Read More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
