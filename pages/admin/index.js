import React, { useEffect, useState } from "react";
import antd, { Alert, Checkbox, Form, Input, Button } from 'antd';
import { useRouter } from "next/router";
const AdminLoginPage = () => {
    const router = useRouter();
    const saveFormData = async () => {
        const response = await fetch('/api/', {
            method: 'POST',
            body: JSON.stringify(values)
        });
        if (response.status !== 200) {
            throw new Error(`Request failed: ${response.status}`);
        }
        else {
            return response;
        }
    }

    const onFinish = async (values) => {
        console.log('Clicked', values)


        if (!values.username || !values.password) return;
        try {
            //let result = await saveFormData();
            console.log(enteredName + enteredEmail + enteredPhoneNumber);
            router.push("/app/dashboard")

        } catch (e) {
            alert(`Submission failed! ${e.message}`);
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="illustration-wrapper">
                    <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
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
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            placeholder="Username"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            LOGIN
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AdminLoginPage;