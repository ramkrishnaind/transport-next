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

export const bookingItem = async (params) => {
  return axios.put("/api/customer/bookingItem", params);
};
export const step4Item = async (params) => {
  return axios.put("/api/customer/step4", params);
};
export const misItem = async (params) => {
  return axios.put("/api/customer/misItem", params);
};
