import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// import { isLoggedIn, logout } from "@services/auth.service";
import { Button, Menu, Switch, Divider } from "antd";
// import {
//   developerMenuItems,
//   adminMenuItems,
// } from "@components/constants/sideBar";
import { SettingOutlined } from "@ant-design/icons";

// import { AuthContext } from "context/useAuth";
// import useAuth from "@hooks/useAuth";

const { SubMenu } = Menu;

import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UserOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
// import withPrivate from "./auth/_router-protector";

function Sidebar() {
  // const { setIsAuth, isAdmin } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState("0");

  // const sideBarItems = isAdmin
  //   ? adminMenuItems.items
  //   : developerMenuItems.items;
  const menuitems = [
    {
      key: "0",
      icon: <DashboardOutlined />,
      name: "Dashboard",
      link: "/app/dashboard",
      rel: "noopener noreferrer",
    },
    {
      key: "1",
      icon: <UserOutlined />,
      name: "Customers",
      link: "/app/customers",
      rel: "noopener noreferrer",
    },
    {
      key: "2",
      icon: <SettingOutlined />,
      name: "Booking",
      link: "/app/booking",
      rel: "noopener noreferrer",
    },
    {
      key: "3",
      icon: <LaptopOutlined />,
      name: "Users Roles",
      link: "/app/userRoles",
      rel: "noopener noreferrer",
    },
    // {
    //   key: "4",
    //   icon: <UserOutlined />,
    //   name: "Add Users",
    //   link: "/app/users/adduser",
    //   rel: "noopener noreferrer",
    // },
    {
      key: "4",
      icon: <UserOutlined />,
      name: "Users",
      link: "/app/users",
      rel: "noopener noreferrer",
    },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  // const handleLogout = async () => {
  //   setLoading(true);
  //   await logout();
  //   localStorage.clear();
  //   setLoading(false);
  //   setIsAuth(false);
  //   if (isAdmin) {
  //     router.push("/login");
  //   } else {
  //     router.push("/developers/login");
  //   }
  // };
  useEffect(() => {
    let currentPath = router.pathname;
    const result = menuitems.find((item) => item.link === currentPath);
    setSelectedMenu(result ? result.key : "0");
  }, [router.pathname]);
  return (
    <>
      <div className="sideBar">
        <Menu
          defaultSelectedKeys={[selectedMenu]}
          selectedKeys={[selectedMenu]}
          mode="inline"
          inlineCollapsed={collapsed}
          theme="light"
        >
          <br />
          <br />
          <Menu.Item
            onClick={toggleCollapsed}
            key={"collaps"}
            icon={collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
          ></Menu.Item>
          {menuitems.map((item) => {
            return (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link key={item.key} href={item.link}>
                  <a rel={item.rel}>{item.name}</a>
                </Link>
              </Menu.Item>
            );
          })}
          <Menu.Divider />
          {/* <Menu.Item
            key='logOut'
            icon={<LogoutOutlined />}
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </Menu.Item> */}
        </Menu>
      </div>
    </>
  );
}
export default Sidebar;
