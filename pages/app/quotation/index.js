import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import {
  Button,
  Form,
  Input,
  Select,
  Spin,
  Card,
  Divider,
  message,
} from "antd";
import PageHeader from "../../../components/helper/pageTitle";

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

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

  const [form] = Form.useForm();

  useEffect(() => {
    if (router.isReady) {
      const { userid } = router.query;
      if (userid) getData(userid);
    }
  }, [router.isReady]);

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
      successFunction(res.data.message);
      setLoading(false);
      router.push("/app/users");
    } else {
      errorFunction(
        res.data.error.error
          ? res.data.error.error.details[0].message
              .replace('"', "")
              .replace('"', "")
          : res.data.message
      );
    }
  };

  const getData = async (UserId) => {
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

  const errorFunction = (msg) => {
    message.error(msg);
  };

  const successFunction = (msg) => {
    message.success(msg);
  };

  return (
    <>
      <PageHeader
        mainTitle="Create New Quotation"
        subTitle="create and edit Quotation here"
        currentPage="Create New Quotation"
      />
      <Card size="small" title="Create New Quotation">
        <h1>Customer Information</h1>
        <center>
          <h1>
            <b>Customer Total 400 CFT</b>
          </h1>
        </center>
        <Divider />
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <div className="mt-8 ml-8">
            <div className="flex flex-row">
              <div className="basis-1/2">
                <Form.Item
                  name="totalTransConveyance"
                  label="Total Transport Conveyance"
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
                  name="typeOfTrans"
                  label="Type Of Transport"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select Transport Type">
                    <Option value="dedicated">Dedicated</Option>
                    <Option value="sharing">Sharing</Option>
                    <Option value="international">International</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="basis-1/2">
                <Form.Item
                  name="packingMaterialCost"
                  label="Packing Material Cost"
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
                  name="loadingCharges"
                  label="Loading Charges"
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
                  name="localTransConveyance"
                  label="If Local Transport Conveyance"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select Local Transport Conveyance">
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="basis-1/2">
                <Form.Item
                  name="unloadingCharges"
                  label="Unloading Charges"
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
                  name="anyOtherCharges"
                  label="Any Other Charges"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select Any Other Charges">
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="basis-1/2">
                <Form.Item
                  name="anyNotes"
                  label="Any Notes"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Please Write your Notes here if any..."
                    maxLength={6}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="basis-1/2">
                <Form.Item
                  name="margin"
                  label="Margin"
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
                  name="totalCharges"
                  label="Total Charges"
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
          </div>
          <div className="mt-8 p-0 ml-16">
            <Form.Item>
              <Button htmlType="submit">Sent</Button>
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
