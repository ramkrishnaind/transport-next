import axios from "axios";

export const registerCustomer = async (params) => {
  return axios.post("/api/user", params);
};
export const listUser = async (params) => {
  return axios.post("/api/user/listuser", params);
};
export const listoneUser = async (params) => {
  return axios.post("/api/user/listoneuser", params);
};
export const deleteUser = async (params) => {
  return axios.post("/api/user/deleteuser", params);
};