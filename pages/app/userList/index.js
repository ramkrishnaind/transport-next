import "antd/dist/antd.css";
import { listuser } from "../../../services/admin-api-service";
import { Space, Table, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

const saveFormData = async (formData) => {
  try {
    return await listuser(formData);
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
    title: "email",
    dataIndex: "email",
    key: "first_name",
  },
];

const ListUser = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getData();
  });
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Length": "43",
    "Content-Type": "application/json",
  };
  const getData = async () => {
    const res = await axios.post("/api/user/listuser", headers);
    console.log("ashwani", res.data.message[0].firstName);

    setdata(
      res.data.message.map((row) => ({
        first_name: row.firstName,
        last_name: row.lastName,
        email: row.email,
      }))
    );
  };

  return (
    <>
      <Row>
        <Col>
          <Table dataSource={data} columns={columns} />
        </Col>
      </Row>
    </>
  );
};

export default ListUser;
