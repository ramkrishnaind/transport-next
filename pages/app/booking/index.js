import "antd/dist/antd.css";
import {
  listBooking,
  bookingByUserId,
} from "../../../services/admin-api-service";
import { getBookingItem } from "../../../services/customer-api-service";
import { Table, Button, Row, Col, Tag, Drawer, Form, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import moment from 'moment';
import Card from "../../Card";
import TransportContext from "../../../context";
import CustomerOrderDetail from "./customerOrderDetail";

const BookingList = () => {
  const columns = [
    {
      title: "Move Date",
      dataIndex: "move_date",
      key: "move_date",
    },
    {
      title: "Move Type",
      dataIndex: "move_type",
      key: "move_type",
    },
    {
      title: "Est. Volume",
      dataIndex: "est_volume",
      key: "est_volume",
    },
    {
      title: "Booking Id",
      dataIndex: "booking_id",
      key: "booking_id",
    },
    {
      title: "Cust Name",
      dataIndex: "cust_name",
      key: "cust_name",
    },
    {
      title: "Move From",
      dataIndex: "move_from",
      key: "move_from",
    },
    {
      title: "Move To",
      dataIndex: "move_to",
      key: "move_to",
    },
    {
      title: "Customer mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Lead Source",
      dataIndex: "lead_source",
      key: "lead_source",
    },
    {
      title: "Date Recieved",
      dataIndex: "date_recieved",
      key: "date_recieved",
    },
  ];

  const context = useContext(TransportContext);
  const [state, setState] = useState([]);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const [form] = Form.useForm();
  const { Title } = Typography;

  // todo - mover planner and manager name comes from where
  const [moverPlanner] = useState("Charmee Kothari");
  const [moverPlannerNo] = useState("08047094008");
  const [moveManager] = useState("Not Assigned");

  const cancel = (e) => {
    console.log(e);
  };

  const handleOk = (e) => {
    console.log(e);
  };

  const onClose = () => {
    setOpen(false);
  };

  const saveFormData = async (formData) => {
    try {
      return await listBooking(formData);
    } catch (err) {
      throw err;
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const showDrawer = async (v) => {
    const formData = {
      bookingId: v.listbooking._id,
    };
    const bookingDet = await bookingByUserId(formData);
    console.log("BookingDetails data=", bookingDet.data.bookingdata);

    const Step1 = [];
    const Step2 = [];
    const customerData = [];
    setStartDate(bookingDet.data.bookingdata.shiftingOn);

    Step1 = {
      bookingId: v.listbooking._id,
      shiftingFrom: bookingDet.data.bookingdata.shiftingFrom,
      shiftingTo: bookingDet.data.bookingdata.shiftingTo,
      shiftingFor: bookingDet.data.bookingdata.shiftingFor,
      shiftingOn: startDate,
    };
    context.setStep1State(Step1);

    Step2 = {
      bookingId: v.listbooking.booking_id,
      currentFloor: bookingDet.data.bookingdata.currentFloor,
      isLiftAvailableOnCurrentFloor:
        bookingDet.data.bookingdata.isLiftAvailableOnCurrentFloor,
      isLiftAvailableOnMovingFloor:
        bookingDet.data.bookingdata.isLiftAvailableOnMovingFloor,
      movingOnFloor: bookingDet.data.bookingdata.movingOnFloor,
    };
    context.setStep2State(Step2);

    customerData = {
      customerId: bookingDet.data.bookingdata.customerId,
      fullName: bookingDet.data.customerdata.fullName,
      email: bookingDet.data.customerdata.email,
      mobile: bookingDet.data.customerdata.mobile,
    };
    context.setCustomerDetails(customerData);
    context.setStep3State(bookingDet.data.bookingdata.step3);
    setOpen(true);
  };

  const getData = async () => {
    const value = 1;
    const res = await saveFormData(value);
    setdata(
      res.data.message.map((row) => ({
        move_date: moment(row.listbooking.shiftingOn).format('DD MMM, YY'),
        move_type: row.listbooking.shiftingFor,
        est_volume: row.listbooking.movingOnFloor,
        booking_id: row.listbooking.booking_id,
        cust_name: row.fullName,
        move_from: row.listbooking.shiftingFrom,
        move_to: row.listbooking.shiftingTo,
        mobile: (
          <a href="#" onClick={() => showDrawer(row)}>
            {" "}
            {row.mobile}
          </a>
        ),
        lead_source: row.email,
        date_recieved: moment(row.createdAt).format('DD MMM, YY'),
      }))
    );
  };

  return (
    <>
      <Row>
        <Col span={19}>
          <div className="grid">
            <h3 page="page-title">Booking Management</h3>
            <small>manage booking here</small>
          </div>
        </Col>
        <Col span={5}>
          <Button
            size="large"
            shape="round"
            onClick={() => router.push("booking/createbooking")}
          >
            <UserAddOutlined /> Create Booking
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1100, y: 400 }}
      />

      <Drawer
        title="Booking Details"
        placement="right"
        closable={true}
        width="1300"
        onClose={onClose}
        visible={open}
      >
        <CustomerOrderDetail />
      </Drawer>
    </>
  );
};

export default BookingList;
