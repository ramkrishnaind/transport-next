import "antd/dist/antd.css";
import {
  listUserrole,
  deleteUserrole,
} from "../../../services/admin-api-service";
import { Space, Table, Row, Col, Icon, Modal, Button, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import Layout, { Header, Content, Footer } from "antd/lib/layout/layout";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const saveFormData = async (formData) => {
  try {
    return await listUserrole(formData);
  } catch (err) {
    throw err;
    console.log(err);
  }
};
const columns = [
  {
    title: "Role Name",
    dataIndex: "role_name",
    key: "role_name",
  },
  {
    title: "Role Value",
    dataIndex: "role_value",
    key: "role_value",
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

const ListUserrole = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const clickdelHandler = async (value) => {
    const formTOData = {
      roleid: value,
    };
    const res = await deleteUserrole(formTOData);
    getData();
  };

  const clickeditHandler = async (values) => {
    const formTOData = {
      roleId: values,
    };
  };

  const getData = async () => {
    const value = 1;
    const res = await saveFormData(value);
    console.log("ashwani", res.data.message);

    setdata(
      res.data.message.map((row) => ({
        role_name: row.roleName,
        role_value: row.roleValue,
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

export default ListUserrole;
