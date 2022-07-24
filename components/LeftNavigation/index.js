import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Bookings", "9", <FileOutlined />),
];

const LeftNavigation = ({ children, href }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  function clickHandler(e) {
    switch (e.key) {
      case "2":
        router.push("userList");
      case "4":
        return <h1>item2</h1>;
      default:
        break;
    }
  }

  return (
    <Sider>
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={clickHandler}
      />
    </Sider>
  );
};

export default LeftNavigation;
