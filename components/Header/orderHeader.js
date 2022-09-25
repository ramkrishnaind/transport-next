import React from "react";
import { Divider } from "antd";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AppHeader = () => {
  return (
    <>
    <nav className="sticky top-0 z-10 bg-white   firefox:bg-opacity-90">
      <div className="w-full mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="whitespace-nowrap">
            <div className="grid gap-5 grid-flow-col">

            <span className="text-2x font-semibold">
            <img
            className=" w-24"
              src="/images/white_glove_logo.png"
              itemProp="image"
              alt="Image"
              />  
            </span>
            <span>
            <img
              className=" pt-5"
              src="/images/call.png"
              itemProp="image"
              alt="Image"
            />  
            </span>
              </div>
          </div>
          
            <div className="flex space-x-4 text-gray-900 font-medium">
            Rishi Lohan
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
