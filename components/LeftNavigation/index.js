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
  getItem("Calender", "3", <DesktopOutlined />),
  getItem("Task", "4", <DesktopOutlined />),
  getItem("Sales", "sub1", <UserOutlined />, [
    getItem("Lead Grabber", "5"),
    getItem("Follow Ups", "6"),
    getItem("Surveys", "7"),
    getItem("Contacts", "8"),
    getItem("Send Email Log", "9"),
    getItem("Sales Report", "10"),
  ]),
  getItem("Operations", "sub2", <TeamOutlined />, [
    getItem("Up Coming Jobs", "11"),
  ]),
  getItem("Billing", "sub3", <UserOutlined />, [
    getItem("Move Inovices", "12"),
    getItem("Payments", "13"),
    getItem("Past Due Inovices", "14"),
    getItem("Storage Billing", "15"),
  ]),
  getItem("Quik Setup", "16", <DesktopOutlined />),
  getItem("Resource Management", "sub4", <TeamOutlined />, [
    getItem("Sales Team", "17"),
    getItem("Support Team", "18"),
    getItem("Operations", "19"),
    getItem("Contractors", "20"),
    getItem("Vehicles", "21"),
    getItem("Worker", "22"),
    getItem("Worker Absence", "23"),
    getItem("Worker Availability", "24"),
    getItem("Comission Setup", "25"),
    getItem("Payroll", "26"),
    getItem("Reports", "27"),
    getItem("Tech Team", "28"),
    getItem("Third Party", "29"),
  ]),
  getItem("Marketing", "sub5", <TeamOutlined />, [
    getItem("Email Automation", "30"),
    getItem("Text Automations", "31"),
    getItem("Review Automations", "32"),
    getItem("Contact Forms", "33"),
    getItem("Third Party Leads", "34"),
    getItem("Refrells", "35"),
    getItem("Lead Sources", "36"),
  ]),
  getItem("Apps & Integrations", "37", <FileOutlined />),
];

const LeftNavigation = ({ children, href }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  function clickHandler(e) {
    switch (e.key) {
      case "2":
        router.push("dashboard");
      case "3":
        router.push("userList");
      // return <h1>item2</h1>;
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
