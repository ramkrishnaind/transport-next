import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import {
  addUserrole,
  listMenu,
  listUserrole,
} from "../../../services/admin-api-service";
import { Button, Form, Input, InputNumber, Checkbox } from "antd";

const App = () => {
  const [form] = Form.useForm();
  let categories = [];
  let finres = [];
  const router = useRouter();

  const listFormData = async (roleId) => {
    try {
      const formData = { roleId: roleId };
      return await listUserrole(formData);
    } catch (err) {
      throw err;
      console.log(err);
    }
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
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
  // const router = useRouter();
  const [roleitem, setRoleitem] = useState([]);
  const [category, setCategory] = useState([]);
  const listMenuData = async () => {
    try {
      return await listMenu();
    } catch (err) {
      throw err;
      console.log(err);
    }
  };
  const getData = async (roleId) => {
    if (roleId) {
      const listres = await listFormData(roleId);
      finres = listres.data.message;
      form.setFieldsValue({
        roleId: finres[0]._id,
        roleName: finres[0].roleName,
        roleValue: finres[0].roleValue,
        permission: finres[0].permission,
      });
    }
      const res = await listMenuData();
      categories = res.data.data;
      setCategory(
        categories.map((row) => ({
          label: row.name,
          value: row.name,
        }))
      );
   
  };
  useEffect(() => {
    if (router.isReady) {
      const { roleId } = router.query;
      getData(roleId);
    }
  }, [router.isReady]);
  const onFinish = async (values) => {
    const formData = {
      roleId: values.roleId,
      roleName: values.roleName,
      roleValue: values.roleValue,
      permission: values.permission,
    };
    console.log(formData);

    let res = await addUserrole(formData);
    if (res.data.status == true) {
      alert("role added succesfully");
    }
  };

  return (
    <>
      <h1>Add/Edit User Role</h1>

      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="roleId" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          name={["roleName"]}
          label="Role Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["roleValue"]}
          label="Role Value"
          rules={[
            {
              type: Number,
              required: true,
            },
          ]}
        >
          <Input />

        </Form.Item>
        <Form.Item name={["permission"]} label="Permission">
          <Checkbox.Group options={category} />
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
