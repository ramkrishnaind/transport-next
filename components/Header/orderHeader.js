import React, { useState } from "react";
import { Divider, Drawer } from "antd";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
//import Hamburger from "./orderHamburgur";
const AppHeader = () => {
  const { customer, authenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const router = useRouter();
  const showDefaultDrawer = () => {
    setSize("default");
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleMyOrder = () => {
    router.push("/order/step7"); 
  };
  const handleLogout = () =>{
    localStorage.clear()
    router.push("/")
  }
  const logo = () => (
      <>
        White Gloves
      </>
    );

  console.log("customer in header is ", customer)
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
                <span className=" md:hidden lg:hidden xl:hidden"><a href="tel:180012097225"><img
                  className=" pt-5"
                  src="/images/call.png"
                  itemProp="image"
                  alt="Image"
                /></a>
                </span>
                <a href="tel:180012097225">
                <span className="text-gray-900 font-medium hidden md:block lg:block xl:block"><img
                  className=" pt-5"
                  src="/images/call.png"
                  itemProp="image"
                  alt="Image"
                
                />
                </span>
                </a>
                <span className="text-gray-900 font-medium hidden md:block lg:block xl:block phonenumber-text">
                  1800 1209 7225
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 text-gray-900 font-medium">

              {customer?.customerName}
              <div onClick={showDefaultDrawer}>
                <img
                  className="p-3"
                  src="/images/icons8-menu.png"
                  itemProp="image"
                  alt="Image"
                />
              </div>
            </div>

          </div>
        </div>
      </nav>
      <Drawer
        title={customer?.customerName}
        placement="right"
        size={size}
        width={248}
        onClose={onClose}
        open={open}>
        <div className="flex flex-col gap-y-3 text">
          {/* <p onClick={onClose} className=" font-semibold">My Profile</p> */}
          {/* <hr />
          <p onClick={onClose} className=" font-semibold">Move Now</p> 
          <p onClick={onClose} className=" font-semibold">My Order</p>
          <hr /> */}
          <div className=" font-semibold">
            <button onClick={onClose}>
            My Profile
            </button>
          </div>
          <hr></hr>
          <div className=" font-semibold">
            <button onClick={handleMyOrder}>
            My Order
            </button>
          </div>
          <hr></hr>
          <div className=" font-semibold">
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </Drawer>
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
