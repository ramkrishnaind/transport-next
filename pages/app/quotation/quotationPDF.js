import { userquotation } from "../../../services/admin-api-service";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import TransportContext from "../../../context";
import moment from 'moment';

const QuotationPDF = () => {
  const ctx = useContext(TransportContext);
  const { quotation } = ctx;

  // console.log('quotation is here',quotation);

  const SavePdfButton = () => {
   return window.print();
  }; 

  const [customerName, setcustomerName] = useState("");
  const [customerEmail, setcustomerEmail] = useState("");
  const [customerMobile, setcustomerMobile] = useState("");
  const [customerBooking_id, setcustomerBooking_id] = useState("");
  const [customerfirstName, setcustomerfirstName] = useState("");
  const [customerlastName, setcustomerlastName] = useState("");
  const [clientmobile, setclientmobile] = useState("");
  const [clientemail, setclientemail] = useState("");
  const [
    customerIsLiftAvailableOnCurrentFloor,
    setcustomerIsLiftAvailableOnCurrentFloor,
  ] = useState("");
  const [customerCurrentFloor, setcustomerCurrentFloor] = useState("");
  const [customerShiftingFrom, setcustomerShiftingFrom] = useState("");
  const [
    customerIsLiftAvailableOnMovingFloor,
    setcustomerIsLiftAvailableOnMovingFloor,
  ] = useState("");
  const [customerMovingOnFloor, setcustomerMovingOnFloor] = useState("");
  const [customerShiftingTo, setcustomerShiftingTo] = useState("");
  const [customerShiftingOn, setcustomerShiftingOn] = useState("");

  const [afterMarginTotalCharges, setAfterMarginTotalCharges] = useState("");
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("");
  

  
  const saveFormData = async (v) => {
    try {
      const formData = {
        bookingId: v,
      };
      return await userquotation(formData);
    } catch (err) {
      throw err;
      console.log(err);
    }
  };

  useEffect(() => {
    if (quotation.customerId != null) getData(quotation.customerId);
  }, []);

  const getData = async (value) => {
    const res = await saveFormData(value);
    console.log("booking Data=", res);
    // Customer Data
    setcustomerfirstName(quotation.firstName);
    setcustomerlastName(quotation.lastName);
    setclientmobile(quotation.mobile);
    setclientemail(quotation.email);
    setcustomerName(res.data.customerdata.fullName);
    setcustomerEmail(res.data.customerdata.email);
    setcustomerMobile(res.data.customerdata.mobile);
    // "booking Data
    setcustomerBooking_id(res.data.bookingdata.booking_id); // "WG2022817"
    setcustomerIsLiftAvailableOnCurrentFloor(
      res.data.bookingdata.isLiftAvailableOnCurrentFloor
    ); // false
    setcustomerCurrentFloor(res.data.bookingdata.currentFloor); // "8th"
    setcustomerShiftingFrom(res.data.bookingdata.shiftingFrom); // "Hisar"
    setcustomerIsLiftAvailableOnMovingFloor(
      res.data.bookingdata.isLiftAvailableOnMovingFloor
    ); // true
    setcustomerMovingOnFloor(res.data.bookingdata.movingOnFloor); // "8th"
    setcustomerShiftingTo(res.data.bookingdata.shiftingTo); // "Jind"
    setcustomerShiftingOn(res.data.bookingdata.shiftingOn); // "2022-09-28T06:13:08.000Z"

    setAfterMarginTotalCharges(quotation.afterMarginTotalCharges);
    setEstimatedDeliveryTime(quotation.estimatedDeliveryTime);
  };

  return (
    <>
     
    </>
  );
};

export default QuotationPDF;
