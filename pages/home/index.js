import React, { useEffect, useState, useContext } from "react";
import { Button } from "antd";
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
                    <div className="subBannerTitle w-96 ml-32 mt-32">
                        Moving Made Modern
                    </div>
                    <p className="subBanner-p w-96 ml-32">
                        By choosing White Glove Packers and Movers, you’re guaranteeing a great moving day. All customers receive transparent pricing, flexible service and payment options, Quality Packaging Material, industry-best customer support, and an easy-to-access online dashboard.
                    </p>
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
        </>
    )
}
export default HomePage;