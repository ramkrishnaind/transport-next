import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
const pageHeader = (params) => {
    return (
        <>
            <div className="flex flex-row">
                <div className="basis-1/24 gap-2 pageHeader">
                    <UserOutlined/>
                </div>
                <div className="basis-4/5 gap-2 mt-2 ml-2">
                    <span className="pageTitle">{params.mainTitle}</span>
                    <small className="ml-1">{params.subTitle}</small>
                </div>
                <div className="flex-1 w-32 ml-1">
                    
                </div>
            </div>
            <div className="flex mt-2">
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span className="mt-4">{params.currentPage}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </>
    )
}

export default pageHeader;