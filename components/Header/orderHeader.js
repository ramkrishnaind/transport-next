import React from "react";
import { Divider } from "antd";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AppHeader = () => {
  return (
    <>
    <nav className="sticky top-0 z-10 bg-white bg-opacity-30 border-b border-gray-200 firefox:bg-opacity-90">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div>
            <span className="text-2x font-semibold">
              logo  
            </span>
            <span>
            <FontAwesomeIcon icon="fa-solid fa-phone" />
            </span>
          </div>
          
            <div className="flex space-x-4 text-gray-900">
            ds
            </div>
        </div>
      </div>
    </nav>  
    </>
    // <>
    // <div>
    //   <div className="orderHeader grid grid-flow-col grid-cols-8 pl-16">
    //     <div>
    //       <Link href="/app/dashboard">
    //         {/* <img
    //                     className="w-96"
    //                     src="/images/home/logo/logo-white.png"
    //                     itemProp="image"
    //                     alt="main BannerImage"
    //                 /> */}
    //         <img
    //           className="w-96"
    //           src="/images/home/logo/logo-white.png"
    //           itemProp="image"
    //           alt="main BannerImage"
    //           />
    //       </Link>
    //     </div>
    //   </div>
    //   <Divider className="hederDivider" />
    //   </div>
    // </>
  );
};

export default AppHeader;
