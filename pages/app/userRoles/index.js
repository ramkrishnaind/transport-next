// import "antd/dist/antd.css";
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
      title: "Role Permission",
      dataIndex: "role_permission",
      key: "role_permission",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            href={{
              pathname: "userRoles/addUserRole",
              query: { roleId: record.id },
            }}
          >
            <a>
              <EditOutlined />
            </a>
          </Link>
          <a>
            <DeleteOutlined onClick={() => clickdelHandler(record.role_name)} />
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
    alert(res.data.message);
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
    setdata(
      res.data.message.map((row) => ({
        id: row._id,
        role_name: row.roleName,
        role_permission: row.permission,
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
      <div className="flex flex-row">
        <div className="basis-11/12 ml-1 mt-4 tableTitle">All Role</div>
        <div className="basis-1/12 mb-2">
          <Button
            className="adminprimary"
            size="large"
            shape="round"
            icon={<UserAddOutlined />}
            onClick={() => router.push("userRoles/addUserRole")}
          >
            Add Role
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default UserRoles;
