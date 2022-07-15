import React, { useEffect, useState, useContext } from "react";
import { Button, Divider, Tabs } from "antd";

const { TabPane } = Tabs;
//import 
const HomePage = () => {
    return (
        <>
            <div className="grid grid-flow-col grid-cols-5 gap-2 mb-16">
                <div className="col-span-3">
                    <img
                        className="bannerImage"
                        src="/images/home/BannerImage.png"
                        itemProp="image"
                        alt="main BannerImage"
                    />
                </div>
                <div className="col-span-2">
                    <div className="bannerTitle self-center space-y-4 w-96 mt-64">
                        Shifting Happiness
                    </div>
                    <div className="bannerSubTitle w-96">
                        We Make Your Moving Easy
                    </div>
                    <p className="w-96">Lorem ipsum Get complete care from top to bottom with your own moving expert.  Get complete care from top to bottom with your own moving expert. </p>
                    <Button>Calculate Moving Price</Button>
                </div>
            </div>
            <div className="grid grid-flow-col grid-cols-5 modernMoving">
                <div className="col-span-2">
                    <div>
                        <div className="subBannerTitle w-96 ml-32 mt-32">
                            Moving Made Modern
                        </div>
                        <p className="subBanner-p w-96 ml-32">
                            By choosing White Glove Packers and Movers, you’re guaranteeing a great moving day. All customers receive transparent pricing, flexible service and payment options, Quality Packaging Material, industry-best customer support, and an easy-to-access online dashboard.
                        </p>
                    </div>
                    <Divider />
                    <div className="movingList mt-16 ml-32 justify">
                        <span className="mListIcon">+</span>
                        <span className="movingListContant w-48 pl-4">Get Price  Get Free Quote Now</span>
                    </div>
                    <div className="movingList mt-16 ml-32 justify">
                        <span className="mListIcon">+</span>
                        <span className="movingListContant w-48 pl-4">Get Price  Get Free Quote Now</span>
                    </div>
                    <div className="movingList mt-16 ml-32 justify">
                        <span className="mListIcon">+</span>
                        <span className="movingListContant w-48 pl-4">Get Price  Get Free Quote Now</span>
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
            <div className="ml-16 mr-16 md:mt-16 mb-2">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Domestic Relocation" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="International Relocation" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Corporate Relocation" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="Vehicle Relocation" key="4">
                        Content of Tab Pane 4
                    </TabPane>
                    <TabPane tab="Storage" key="5">
                        Content of Tab Pane 5
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}
export default HomePage;