import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import { addUser, listoneUser } from "../../../services/admin-api-service";
import { Button, Form, Input, InputNumber } from "antd";



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

const App = () => {
  const router = useRouter();
  useEffect(() => {
      if(router.isReady){
          const { userid } = router.query;
          if (!userid) return null;
          getData(userid)
      }
  }, [router.isReady]);
  // const query = router.query;
  // const UserId = query.userid;

  const [data, setData] = useState("");
  
  //  console.log('ram',query);

  const onFinish = async (values) => {

    const formData = {
      firstName: values.user.firstName,
      lastName: values.user.lastName,
      userName: values.user.userName,
      password: values.user.password,
      email: values.user.email,
      mobile: values.user.mobile,
    };

    let res = await addUser(formData);
    if (res.data.status == true) {
      alert("user added succesfully");
    }
  };



  const getData = async (UserId) => {
    console.log('form data',UserId);
    let res= await saveFormData(UserId);
    console.log("data entered is ",res);
    setData(res);
  };

  const saveFormData = async (values) => {
    try {
      const formTOData = {
        userId: values,
      };
      // console.log('values',formTOData);
      // return
       let result = await listoneUser(formTOData);
       console.log('result',result);
    } catch (err) {
      throw err;
      console.log(err);
    }
   
  };

 
  return (
    //console.log("ahshshsh",data);
    <>
      <h1>Add/Edit User</h1>

      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "firstName"]}
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* <Input /> */}
          <Input defaultValue={data} />
        </Form.Item>
        <Form.Item
          name={["user", "lastName"]}
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
          {/* <Input defaultValue={response.data.data[0].lastName} /> */}
        </Form.Item>

        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
          {/* <Input defaultValue={response.data.data[0].email} /> */}
        </Form.Item>
        <Form.Item
          name={["user", "mobile"]}
          label="Mobile"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
          {/* <Input defaultValue={response.data.data[0].mobile} /> */}
        </Form.Item>
        <Form.Item
          name={["user", "userName"]}
          label="UserName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
          {/* <Input defaultValue={response.data.data[0].userName} /> */}
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
          {/* <Input defaultValue={response.data.data[0].password} /> */}
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
