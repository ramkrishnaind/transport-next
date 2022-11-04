import axios from "axios";

export const registerCustomer = async (params) => {
  return axios.post("/api/customer", params);
};

export const verifyOtp = async (params) => {
  return axios.post("/api/customer/verifyOtp", params);
};

export const collectBasicInfo = async (params) => {
  return axios.post("/api/customer/collectBasicInfo", params);
};

export const liftAvailability = async (params) => {
  return axios.put("/api/customer/liftAvailability", params);
};

export const misItem = async (params) => {
  return axios.put("/api/customer/misItem", params);
};

export const createbooking = async (params) => {
  return axios.post("/api/customer/createbooking", params);
};

export const cft = async (params) => {
  return axios.put("/api/customer/cft", params);
};
export const bookingItem = async (params) => {
  return axios.put("/api/customer/bookingItem", params);
};
export const getBookingItem = async (id) => {
  id = id || "632054939f0d21cf92594ca9";
  // debugger;
  return axios.get(`/api/customer/bookingItem/${id}`);
};
export const step3Item = async (params) => {
  return axios.put("/api/customer/step3", params);
};
export const step4Item = async (params) => {
  return axios.put("/api/customer/step4", params);
};
export const step5Item = async (params) => {
  return axios.put("/api/customer/step5", params);
};
