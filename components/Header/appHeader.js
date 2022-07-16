import React from "react";
import { Divider } from "antd";
import Link from 'next/link';
const AppHeader = () => {
    return <>
        <div className="appHeader grid grid-flow-col grid-cols-8 pl-16">
            <div>
                <Link href="/app/dashboard">
                    <img
                        className="w-96"
                        src="/images/home/logo/logo-white.png"
                        itemProp="image"
                        alt="main BannerImage"
                    />
                </Link>
            </div>
        </div>
        <Divider className="hederDivider" />
    </>;
};

export default AppHeader;
