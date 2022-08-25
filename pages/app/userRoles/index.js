import "antd/dist/antd.css";
import { useRouter } from "next/router";
import {
  listUserrole,
  deleteUserrole,
} from "../../../services/admin-api-service";
import Link from "next/link";
import { Table, Row, Col, Button, Space,message, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";





const ListUserrole = () => {
  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
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
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            href={{ pathname: "/app/userRoles/addUserRole", query: { roleId: record.id } }}
          >
            <a>
              <EditOutlined />
            </a>
          </Link> <Popconfirm
    title="Are you sure to delete this role?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
          <a>
            <DeleteOutlined onClick={() => clickdelHandler(record.id)} />
          </a></Popconfirm>
        </Space>
      ),
    },
  ];
  const [data, setdata] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getData();
  }, []);

  const saveFormData = async (formData) => {
    try {
      return await listUserrole(formData);
    } catch (err) {
      throw err;
      console.log(err);
    }
  };
  
  const clickdelHandler = async (value) => {
    const formTOData = {
      roleid: value,
    };
   
   // console.log(formTOData);
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
        id:row._id,
        role_name: row.roleName,
        role_value: row.roleValue,
       
          permission : JSON.stringify(row.permission),
        //  permission:row.permission.map((subitem, i) => {
        //   return (
        //      {subitem}
        //   )
        // })
        //  permission: row.permission.map(subrow),
        
      }))
    );
   
      
}

  return (
    <>
    <Row>
        <Col span={20}>
          <div className="grid">
            <h3 page="page-title">List of Users Role</h3>
            <small></small>
          </div>
        </Col>
        <Col span={4}>
          <Button
            size="large"
            shape="round"
            onClick={() => router.push("/app/userRoles/addUserRole")}
          >
            <UserAddOutlined /> Add UserRole
          </Button>
        </Col>
      </Row>
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default ListUserrole;
