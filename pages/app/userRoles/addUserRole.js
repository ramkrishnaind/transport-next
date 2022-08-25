import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import { addUserrole } from "../../../services/admin-api-service";
import { Button, Form, Input, InputNumber } from "antd";

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
  // const router = useRouter();
  // const query = router.query;
  // const UserId = query.userid;

  // const [data, setData] = useState("");

  // console.log('ram',query);

  const onFinish = async (values) => {
    const formData = {
      roleName: values.role.roleName,
      roleValue: values.role.roleValue,
    };

    let res = await addUserrole(formData);
    if (res.data.status == true) {
      alert("role added succesfully");
    }
  };

  return (
    //console.log("ahshshsh",data);
    <>
      <h1>Add/Edit User Role</h1>

      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["role", "roleName"]}
          label="Role Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* <Input /> */}
          <Input />
        </Form.Item>
        <Form.Item
          name={["role", "roleValue"]}
          label="Role Value"
          rules={[
            {
              type: Number,
              required: true,
            },
          ]}
        >
          <Input />
          {/* <Input defaultValue={response.data.data[0].lastName} /> */}
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
