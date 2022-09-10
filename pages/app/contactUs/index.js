import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { getAllContactUs } from "../../../services/admin-api-service";
import Link from "next/link";
import { Table, Space, Button, Divider, Row, Col, Tag } from "antd";
import React, { useState, useEffect, useContext } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import PageHeader from "../../../components/helper/pageTitle";

const getAllContactUsList = () => {
  const router = useRouter();
  const saveFormData = async (formData) => {
    try {
      return await getAllContactUs(formData);
    } catch (err) {
      throw err;
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email Id",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Action Taken",
      dataIndex: "actionTaken",
      key: "actionTaken",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  const [data, setdata] = useState([]);
  const [item, setbookitem] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const value = 1;
    const res = await saveFormData(value);
    console.log("ashwani", res.data.message);

    setdata(
      res.data.message.map((row) => ({
        name: row.name,
        phone: row.phone,
        email: row.email,
        message: row.message,
        actionTaken: row.actionTaken,
        createdAt: row.createdAt,
      }))
    );
  };

  return (
    <>
      <PageHeader
            mainTitle="Contact Us Management"
            subTitle="manage Contact Us here"
            currentPage="Contact Us Management"
        />
        <div className="flex flex-row">
            <div className="basis-11/12 ml-1 mt-4 tableTitle">All Contact Us Inquiry</div>
        </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1100, y: 400 }}
      />
    </>
  );
};

export default getAllContactUsList;
