import { React, useEffect, useState, useContext } from "react";
import TransportContext from "../../../context";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import { addQuotation } from "../../../services/admin-api-service";
import { Button, Form, Input, Select, Card, Divider, message } from "antd";
import PageHeader from "../../../components/helper/pageTitle";
import { cond } from "lodash";
const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
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
  const context = useContext(TransportContext);
  const { step1State } = context;
  const { step2State } = context;
  const { step3State } = context;
  const { customerDetails } = context;
  console.log('car is-',step3State.Vehicle[1].count);

  let addedTotalCharge = 0;
  let percentage = 0;
  let percentageFinal = 0;

  const totalSumOnChange = (e) => {
    const totalTransConveyance = form.getFieldValue("totalTransConveyance");
    const packingMaterialCost = form.getFieldValue("packingMaterialCost");
    const localTransConveyance_yes = form.getFieldValue(
      "localTransConveyance_yes"
    );
    const loadingCharges = form.getFieldValue("loadingCharges");
    const unloadingCharges = form.getFieldValue("unloadingCharges");
    const anyOtherCharges_yes = form.getFieldValue("anyOtherCharges_yes");

    if (isNaN(totalTransConveyance)) {
      totalTransConveyance = 0;
    }
    if (isNaN(packingMaterialCost)) {
      packingMaterialCost = 0;
    }
    if (isNaN(localTransConveyance_yes)) {
      localTransConveyance_yes = 0;
    }
    if (isNaN(loadingCharges)) {
      loadingCharges = 0;
    }
    if (isNaN(unloadingCharges)) {
      unloadingCharges = 0;
    }
    if (isNaN(anyOtherCharges_yes)) {
      anyOtherCharges_yes = 0;
    }

    addedTotalCharge =
      parseInt(totalTransConveyance) +
      parseInt(packingMaterialCost) +
      parseInt(localTransConveyance_yes) +
      parseInt(loadingCharges) +
      parseInt(unloadingCharges) +
      parseInt(anyOtherCharges_yes);

    if (parseInt(addedTotalCharge) > 0) {
      percentage = (parseInt(addedTotalCharge) * 30) / 100;
      percentageFinal = parseInt(percentage) + parseInt(addedTotalCharge);
      form.setFieldsValue({
        totalCharges: addedTotalCharge,
        margin: percentage,
        afterMarginTotalCharges: percentageFinal,
      });
    }
  };

  const onLocalTransportConveyanceChange = (value) => {
    switch (value) {
      case "yes":
        return;
      case "no":
    }
  };

  const onAnyOtherChargesChange = (value) => {
    switch (value) {
      case "yes":
        return;
      case "no":
    }
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let userName = localStorage.getItem("userName");
    form.setFieldsValue({
      quotationUserId: userName,
      customer_id: customerDetails.customerId,
      customerfullName: customerDetails.fullName,
      customerMobileNo: customerDetails.mobile,
      customerEmailId: customerDetails.email,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);

    if (values.localTransConveyance === "no") {
      values.localTransConveyance_yes = "00";
    }
    if (values.anyOtherCharges === "no") {
      values.anyOtherCharges_yes = "00";
    }

    const formData = {
      customerfullName: values.customerfullName,
      customerMobileNo: values.customerMobileNo,
      customerEmailId: values.customerEmailId,
      customerId: values.customer_id,
      typeOTransport: values.typeOfTrans,
      totalTConveyance: values.totalTransConveyance,
      estimatedDeliveryTime: values.estimatedDeliveryTime,
      packingMCost: values.packingMaterialCost,
      loadingCharges: values.loadingCharges,
      //  localTConveyance Start
      localTConveyance: values.localTransConveyance,
      localTConveyance_yes: values.localTransConveyance_yes,
      //  localTConveyance End
      unloadingCharges: values.unloadingCharges,
      //  otherCharges Start
      otherCharges: values.anyOtherCharges,
      otherCharges_yes: values.anyOtherCharges_yes,
      //  otherCharges End
      notes: values.anyNotes,
      totalCharges: values.totalCharges,
      margin: values.margin,
      afterMarginTotalCharges: values.afterMarginTotalCharges,
      quotationUserId: values.quotationUserId,
    };

    const formData1 = {
      customerfullName: values.customerfullName,
      customerMobileNo: values.customerMobileNo,
      customerEmailId: values.customerEmailId,
      customerId: values.customer_id,
      typeOTransport: values.typeOfTrans,
      totalTConveyance: values.totalTransConveyance,
      estimatedDeliveryTime: values.estimatedDeliveryTime,
      packingMCost: values.packingMaterialCost,
      loadingCharges: values.loadingCharges,
      //  localTConveyance Start
      localTConveyance: values.localTransConveyance,
      localTConveyance_yes: values.localTransConveyance_yes,
      //  localTConveyance End
      unloadingCharges: values.unloadingCharges,
      //  otherCharges Start
      otherCharges: values.anyOtherCharges,
      otherCharges_yes: values.anyOtherCharges_yes,
      //  otherCharges End
      notes: values.anyNotes,
      totalCharges: values.totalCharges,
      margin: values.margin,
      afterMarginTotalCharges: values.afterMarginTotalCharges,
      quotationUserId: values.quotationUserId,
      firstName: localStorage.getItem("firstName"),
      mobile: localStorage.getItem("mobile"),
      lastName: localStorage.getItem("lastName"),
      email: localStorage.getItem("email"),
    };

    context.setQuotation(formData1);
    let res = await addQuotation(formData);
    if (res.data.status == true) {
      successFunction(res.data.message);
      setLoading(false);
      router.push("/app/quotation/quotationPDF/");
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

      <div>
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
                  <Form.Item name="customer_id" label="Customer ID">
                    <Input readOnly={true} />
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="basis-1/2">
                  <Form.Item name="customerfullName" label="Customer Name">
                    <Input readOnly={true} />
                  </Form.Item>
                </div>
                <div className="basis-1/2">
                  <Form.Item name="customerMobileNo" label="Customer Mobile No">
                    <Input readOnly={true} />
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="basis-1/2">
                  <Form.Item name="customerEmailId" label="Customer Email Id">
                    <Input readOnly={true} />
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
                    name="totalTransConveyance"
                    label="Total Transport Conveyance"
                    onChange={totalSumOnChange}
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
                    name="estimatedDeliveryTime"
                    label="Estimated Delivery Time"
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
                    name="packingMaterialCost"
                    label="Packing Material Cost"
                    onChange={totalSumOnChange}
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
                    onChange={totalSumOnChange}
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
                    <Select
                      placeholder="Select Local Transport Conveyance"
                      onChange={onLocalTransportConveyanceChange}
                    >
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.localTransConveyance !==
                      currentValues.localTransConveyance
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("localTransConveyance") === "yes" ? (
                        <Form.Item
                          name="localTransConveyance_yes"
                          label="If Yes Transport Charge"
                          onChange={totalSumOnChange}
                        >
                          <Input />
                        </Form.Item>
                      ) : null
                    }
                  </Form.Item>
                </div>
                <div className="basis-1/2">
                  <Form.Item
                    name="unloadingCharges"
                    label="Unloading Charges"
                    onChange={totalSumOnChange}
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
                    <Select
                      placeholder="Select Any Other Charges"
                      onChange={onAnyOtherChargesChange}
                    >
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.anyOtherCharges !==
                      currentValues.anyOtherCharges
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("anyOtherCharges") === "yes" ? (
                        <Form.Item
                          name="anyOtherCharges_yes"
                          label="If Yes Any Other Charges"
                          onChange={totalSumOnChange}
                        >
                          <Input />
                        </Form.Item>
                      ) : null
                    }
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
                    name="totalCharges"
                    label="Total Charges"
                    onChange={totalSumOnChange}
                  >
                    <Input readOnly={true} />
                  </Form.Item>
                </div>
                <div className="basis-1/2">
                  <Form.Item name="margin" label="Margin">
                    <Input readOnly={true} />
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="basis-1/2">
                  <Form.Item
                    name="afterMarginTotalCharges"
                    label="After Margin Total Charges"
                  >
                    <Input readOnly={true} />
                  </Form.Item>
                </div>
                <div className="basis-1/2">
                  <Form.Item name="quotationUserId" label="quotation User Id">
                    <Input readOnly={true} />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="mt-8 p-0 ml-16">
              <Form.Item>
                <Button htmlType="submit">Generate Pdf</Button>
                &nbsp;&nbsp;&nbsp;
                <Button htmlType="button" type="secondry">
                  Reset
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default App;
