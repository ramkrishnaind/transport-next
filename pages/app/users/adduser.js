import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import {
  addUser,
  userByID,
  userRoleList,
} from "../../../services/admin-api-service";
import { Button, Form, Input, Select, Spin, Card, Divider } from "antd";
import PageHeader from "../../../components/helper/pageTitle";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const { Option } = Select;

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
const [roleList, setRoleList] = useState([]);
/////// Image Upload /////////
const [fileList, setFileList] = useState([]);

const onChange = ({ fileList: newFileList }) => {
  setFileList(newFileList);
};

const onPreview = async (file) => {
  let src = file.url;

  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);

      reader.onload = () => resolve(reader.result);
    });
  }

  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const [form] = Form.useForm();
  const getAllRoles = async (param) =>{
     let userRoleRes = await userRoleList(param);
    let roleOptions = userRoleRes.data.data.map((item)=>{
      return {value:item.roleName,
        label: item.roleName }
      
    })
    setRoleList(roleOptions)
  }
  useEffect(() => {
    if (router.isReady) {
      const { userid } = router.query;
      if(userid)
        getData(userid);
    }
    getAllRoles();
  }, [router.isReady]);
  

  const callCategoryData = async () => {
    let userRoleRes = await userRoleData("");
    categories = userRoleRes.data.message;

    setCategory(
      categories.map((row) => ({
        label: row.roleName,
        value: row.roleValue,
      }))
    );
  };
  
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
      <PageHeader
          mainTitle="Create New Users"
          subTitle="create and edit user here"
          currentPage="Create New User"
      />
      <Card size="small" title="Create New User">
        <h1>Personal Information</h1>
        <Divider />
        <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="mt-8 ml-8">
          <div className="flex flex-row ">
            <div className="basis-1/2">
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
            </div>
            <div className="basis-1/2">
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
            </div>
          </div>
          <div className="flex flex-row">
            <div className="basis-1/2">
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
            </div>
            <div className="basis-1/2">
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
            </div>
          </div>
          <div className="flex flex-row">
            <div className="basis-1/2">
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
            </div>
            <div className="basis-1/2">
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
                placeholder="Select Role"
                options={roleList}
                // defaultValue={roleList.roleName}
                //value={roleList[0].roleName}

              ></Select>
            </Form.Item>
            </div>
          </div>
        </div>
        <Card size="small" title="Upload Image">
        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
          </ImgCrop>
        </Card>
        <div className="mt-8 p-0 ml-16">
        <Form.Item>
        <Button htmlType="submit">
          Submit
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button htmlType="button" type="secondry">
          Reset
        </Button>
      </Form.Item>
        </div>
      </Form>
      </Card>
    </>
  );
};

export default App;
