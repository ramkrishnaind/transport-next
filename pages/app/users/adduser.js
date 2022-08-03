import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import {
  addUser,
  listoneUser,
  listUserrole,
} from "../../../services/admin-api-service";
import { Button, Form, Input, Select, Spin } from "antd";
const { Option } = Select;
let finalvalue = [];
let categories = [];

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const App = () => {
  const router = useRouter();
  // const query = router.query;
  // const UserId = query.userid;
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const [form] = Form.useForm();

  useEffect(async () => {
    // const UserId = query.userid;
    if (router.isReady) {
      const { userid } = router.query;
      if (!userid) return null;
      getData(userid);

      let userRoleRes = await userRoleData("");
      categories = userRoleRes.data.message;

      setCategory(
        categories.map((row) => ({
          label: row.roleName,
          value: row.roleValue,
        }))
      );
      console.log("category values is-------->", category);
    }
  }, [router.isReady]);

  const userRoleData = async (dummyvalue) => {
    let formData = { roleId: dummyvalue };
    try {
      return await listUserrole(formData);
    } catch (err) {
      throw err;
      console.log(err);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    const formData = {
      uid: values.uid,
      firstName: values.firstName,
      lastName: values.lastName,
      userName: values.userName,
      password: values.password,
      email: values.email,
      mobile: values.mobile,
      roleValue: values.user_role,
    };

    let res = await addUser(formData);
    if (res.data.status == true) {
      if (UserId) {
        alert("user Updated succesfully");
      } else {
        alert("user added succesfully");
      }
      setLoading(false);
      router.push("/app/users");
    }
  };

  const getData = async (UserId) => {
    // const value = 1;

    if (UserId) {
      let res = await saveFormData();
      finalvalue = res.data.data;

      let userRoleRes = await userRoleData(finalvalue.roleValue);
      categories = userRoleRes.data.message[0];
      // console.log("user list data", userRoleRes);
      // console.log("user categories data", categories);

      form.setFieldsValue({
        uid: UserId,
        firstName: finalvalue.firstName,
        lastName: finalvalue.lastName,
        userName: finalvalue.userName,
        password: finalvalue.password,
        email: finalvalue.email,
        mobile: finalvalue.mobile,
        user_role: categories.roleValue,
      });
    }
  };

  const saveFormData = async () => {
    try {
      const formTOData = {
        userId: UserId,
      };
      return await listoneUser(formTOData);
    } catch (err) {
      throw err;
      console.log(err);
    }
  };

  return (
    <>
      <h1>Add/Edit User</h1>
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="uid" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mobile"
          label="Mobile"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="userName"
          label="UserName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="user_role"
          label="Assign User Role"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select Role"
            options={category}
            // defaultValue={categories.roleValue}
            // value={categories.roleName}
          ></Select>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
          <Button type="primary" htmlType="submit">
            {loading && <Spin />} Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
