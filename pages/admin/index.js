import React, { useEffect, useState } from "react";
import antd, { Alert, Checkbox, Form, Input, Button, Spin } from "antd";
import { useRouter } from "next/router";
import { registerUser } from "../../services/admin-api-service";
import { values } from "lodash";
import Image from "next/image";

const AdminLoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const saveFormData = async (values) => {
    try {
      setLoading(true);
      const formData = {
        username: values.username,
        password: values.password,
      };
      console.log(formData, "form TO Data");
      return await registerUser(formData);
    } catch (err) {
      setLoading(false);
      throw err;
      console.log(err);
    }
  };

  const onFinish = async (values) => {
    if (!values.username || !values.password) return;
    try {
      let result = await saveFormData(values);
      console.log("mylogindata", result);
      setLoading(false);
      if (!result.data.status) {
        alert("Invalid Username Or Password!");
      } else {
        localStorage.setItem("userName", result.data.logindata.userName);
        localStorage.setItem("Password", result.data.logindata.password);
        localStorage.setItem("permission", result.data.roledata.permission);
        router.push("./../app/dashboard");
      }
    } catch (e) {
      alert(`Submission failed! ${e.message}`);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">White Glove</p>
          <p>Login to the Admin</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {loading && <Spin />} LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
