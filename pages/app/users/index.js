import "antd/dist/antd.css";
import { useRouter } from "next/router";

import { Table, Space, Button, Divider, Row, Col } from "antd";
import { getAllUsers, deleteUser, getRoleByType } from "../../../services/admin-api-service";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/helper/pageTitle";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const Users = () => {
  const router = useRouter();

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
      title: "Mobile Number",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Roles",
      dataIndex: "user_role",
      key: "user_role",
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
            <DeleteOutlined onClick={() => deleteUserRecord(record.id)} />
          </a>
        </Space>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const deleteUserRecord = async (value) => {
  
    const formTOData = {
      userid: value,
    };
    const res = await deleteUser(formTOData);
    getData();
  };

  const getData = async () => {
    setIsLoading(true);
    const res = await getAllUsers();
    if(res.status){
        setIsLoading(false);
        setData(
            res.data.data.map((row) => ({
                id: row._id,
                first_name: row.firstName,
                user_name: row.userName,
                last_name: row.lastName,
                mobile: row.mobile,
                email: row.email,
                user_role: row.roleValue,
            }))
        );
    }
  };

  return (
    <>
        <PageHeader
            mainTitle="Users Management"
            subTitle="create and manage user here"
            currentPage="Users List"
        />
        <div className="flex flex-row">
            <div class="basis-11/12 ml-1 mt-4 tableTitle">Users List</div>
            <div class="basis-1/12 mb-2">
            <Button className="adminprimary"
                size="large"
                icon={<UserAddOutlined />}
                onClick={() => router.push("users/adduser")}
            >
                Add User
            </Button>
            </div>
        </div>
        {isLoading ? 
            <>
                <div className="centerSpiner">
                    <Spin size="large" />
                </div>
            </> :
            <>
                <Table columns={columns} dataSource={data} />
            </>
        }
    </>
  );
};

export default Users;
