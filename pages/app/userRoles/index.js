import "antd/dist/antd.css";
import {
  deleteUserrole,
  userRoleList,
} from "../../../services/admin-api-service";
import { useRouter } from "next/router";
import Link from "next/link";
import { Space, Table, Row, Col, Button } from "antd";
import React, { useState, useEffect, useContext } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import PageHeader from "../../../components/helper/pageTitle";

const UserRoles = () => {
  const saveFormData = async (formData) => {
    try {
      return await userRoleList(formData);
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role Value",
      dataIndex: "role_value",
      key: "role_value",
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

  const router = useRouter();
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
      res.data.data.map((row) => ({

        id: row._id,
        role_name: row.roleName,
        role_value: row.roleValue,
      }))
    );
  };

  return (
    <>
      <PageHeader
          mainTitle="User Roles Management"
          subTitle="Manage User Roles Here"
          currentPage="User Roles"
      />
      <Row>
        <Col span={3}>
          <Button
            size="large"
            shape="round"
            onClick={() => router.push("userRoles/addUserRole")}
          >
            <UserAddOutlined /> Add Role
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default UserRoles;
