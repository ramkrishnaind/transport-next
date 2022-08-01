import "antd/dist/antd.css";
import { useRouter } from "next/router";
import {
  listUser,
  deleteUser,
  listoneUser,
} from "../../../services/admin-api-service";
import Link from "next/link";
import { Table, Space, Button, Divider, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const Users = () => {
  const router = useRouter();
  const saveFormData = async (formData) => {
    try {
      return await listUser(formData);
    } catch (err) {
      throw err;
      console.log(err);
    }
  };
  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            href={{ pathname: "users/adduser", query: { userid: record.id } }}
          >
            <a>
              <EditOutlined />
            </a>
          </Link>
          <a>
            <DeleteOutlined onClick={() => clickdelHandler(record.id)} />
          </a>
        </Space>
      ),
    },
  ];

  const [data, setdata] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const clickdelHandler = async (value) => {
    const formTOData = {
      userid: value,
    };
    const res = await deleteUser(formTOData);
    getData();
  };

  const clickeditHandler = async (values) => {
    const formTOData = {
      userId: values,
    };
    const res = await listoneUser(formTOData);
  };

  const getData = async () => {
    const value = 1;
    const res = await saveFormData(value);
    console.log("ashwani", res.data.message);

    setdata(
      res.data.message.map((row) => ({
        id: row._id,
        first_name: row.firstName,
        user_name: row.userName,
        last_name: row.lastName,
        mobile: row.mobile,
        email: row.email,
      }))
    );
  };

  return (
    <>
      <Row>
        <Col span={21}>
          <div className="grid">
            <h3 page="page-title">Users Management</h3>
            <small>Manage Users Here</small>
          </div>
        </Col>
        <Col span={3}>
          <Button
            size="large"
            shape="round"
            onClick={() => router.push("users/adduser")}
          >
            <UserAddOutlined /> Add User
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Users;
