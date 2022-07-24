import React, { useEffect, useState } from "react";
import antd, { Alert, Checkbox, Form, Input, Button } from "antd";
import Image from "next/image";
const AdminLoginPage = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");

  const [nameBlur, setNameBlur] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [phoneNumberBlur, setPhoneNumberBlur] = useState(false);

  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);

  useEffect(() => {
    if (enteredName) {
      console.log("Name is valid");
    }
  }, [enteredName]);

  useEffect(() => {
    if (enteredEmail) {
      console.log("Email is valid");
    }
  }, [enteredEmail]);

  useEffect(() => {
    if (enteredPhoneNumber) {
      console.log("PhoneNumber is valid");
    }
  }, [enteredPhoneNumber]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    // validateEmail(event.target.value);
    // if(enteredEmailIsValid){
    setEnteredEmail(event.target.value);
    // }
  };

  const phoneNumberInputChangeHandler = (event) => {
    setEnteredPhoneNumber(event.target.value);
  };

  function validateEmail(email) {
    setEnteredEmailIsValid(false);
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result) {
      setEnteredEmailIsValid(true);
    }
  }

  // const [values, setValues] = useState({
  //   name: '',
  //   email: '',
  //   phoneNumber: ''
  // });

  // const set = name => {
  //   return ({ target: { value } }) => {
  //     setValues(oldValues => ({...oldValues, [name]: value }));
  //   }
  // };

  const saveFormData = async () => {
    const response = await fetch("/api/", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    setNameBlur(true);
    setEmailBlur(true);
    setPhoneNumberBlur(true);

    if (!enteredName || !enteredEmail || !enteredPhoneNumber) return;
    try {
      //await saveFormData();
      console.log(enteredName + enteredEmail + enteredPhoneNumber);
      alert("Success!");
      setEnteredName("");
      setEnteredEmail("");
      setEnteredPhoneNumber("");
    } catch (e) {
      alert(`Submission failed! ${e.message}`);
    }
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
          //onFinish={onFinish}
          //onFinishFailed={onFinishFailed}
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
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
