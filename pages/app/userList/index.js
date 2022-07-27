import "antd/dist/antd.css";
import {
  listUser,
  deleteUser,
  editUser,
  listoneUser,
} from "../../../services/admin-api-service";
import { Space, Table, Row, Col, Icon, Modal, Button, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import Layout, { Header, Content, Footer } from "antd/lib/layout/layout";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
    title: "Delete",
    dataIndex: "delete",
    key: "delete",
  },
  {
    title: "Edit",
    dataIndex: "edit",
    key: "edit",
  },
];

const ListUser = () => {
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
    
    Modal.confirm({
      title: "User Info",
      content: (
        <div className="modal_data_wrapper">
          {/* {values} */}
          <Form>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "First Name is required!",
                },
              ]}
            >
              <Input defaultValue={res.data.data[0].firstName} />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Last Name is required!",
                },
              ]}
            >
              <Input defaultValue={res.data.data[0].lastName} />
            </Form.Item>

            <Form.Item
              name="userName"
              label="User Name"
              rules={[
                {
                  required: true,
                  message: "User Name is required!",
                },
              ]}
            >
              <Input defaultValue={res.data.data[0].userName} />
            </Form.Item>

            <Form.Item
              name="mobile"
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: "Mobile Number is required!",
                },
              ]}
            >
              <Input defaultValue={res.data.data[0].mobile} />
            </Form.Item>

            <Form.Item
              name="email"
              label="User Email"
              rules={[
                {
                  required: true,
                  message: "Email is required!",
                },
              ]}
            >
              <Input defaultValue={res.data.data[0].email} />
            </Form.Item>
          </Form>
        </div>
      ),
      style: { top: 0, height: "83vh" },
      width: "70%",
      onOk() {},
      onCancel() {},
    });
  };

  const getData = async () => {
    const value = 1;
    const res = await saveFormData(value);
    console.log("ashwani", res.data.message);

    setdata(
      res.data.message.map((row) => ({
        first_name: row.firstName,
        user_name: row.userName,
        last_name: row.lastName,
        mobile: row.mobile,
        email: row.email,
        delete: <DeleteOutlined onClick={() => clickdelHandler(row._id)} />,
        edit: <EditOutlined onClick={() => clickeditHandler(row._id)} />,
      }))
    );
  };

  return (
    <>
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default ListUser;
