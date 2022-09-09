import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { listBooking } from "../../../services/admin-api-service";
import Link from "next/link";
import { Table, Space, Button, Divider, Row, Col, Tag } from "antd";
import React, { useState, useEffect, useContext } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import PageHeader from "../../../components/helper/pageTitle";

const BookingList = () => {
  const router = useRouter();
  const saveFormData = async (formData) => {
    try {
      return await listBooking(formData);
    } catch (err) {
      throw err;
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Move Date",
      dataIndex: "move_date",
      key: "move_date",
    },
    {
      title: "Move Type",
      dataIndex: "move_type",
      key: "move_type",
    },
    {
      title: "Est. Volume",
      dataIndex: "est_volume",
      key: "est_volume",
    },
    {
      title: "Cust Id",
      dataIndex: "cust_id",
      key: "cust_id",
    },
    {
      title: "Cust Name",
      dataIndex: "cust_name",
      key: "cust_name",
    },
    {
      title: "Move From",
      dataIndex: "move_from",
      key: "move_from",
    },
    {
      title: "Move To",
      dataIndex: "move_to",
      key: "move_to",
    },
    {
      title: "Customer comments",
      dataIndex: "cust_comm",
      key: "cust_comm",
    },
    {
      title: "Lead Souce",
      dataIndex: "lead_source",
      key: "lead_source",
    },
    {
      title: "Date Recieved",
      dataIndex: "date_recieved",
      key: "date_recieved",
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
        cust_comm: row.mobile,
        lead_source: row.email,
        date_recieved: row.createdAt,
        cust_id: row._id,
        cust_name: row.fullName,
        est_volume: row.listbooking.movingOnFloor,
        move_from: row.listbooking.shiftingFrom,
        move_to: row.listbooking.shiftingTo,
        move_date: row.listbooking.shiftingOn,
        move_type: row.listbooking.shiftingFor,
      }))
    );
  };

  return (
    <>
      <PageHeader
            mainTitle="Booking Management"
            subTitle="manage booking here"
            currentPage="Booking Management"
        />

        <div className="flex flex-row">
            <div className="basis-11/12 ml-1 mt-4 tableTitle">All Booking</div>
            <div className="basis-1/12 mb-2">
            <Button className="adminprimary"
                size="large"
                icon={<UserAddOutlined />}
                // to create booking add on the function
                // onClick={() => router.push("users/adduser")} 
            >
                Create Booking
            </Button>
            </div>
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

export default BookingList;
