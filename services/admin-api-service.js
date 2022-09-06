import axios from "axios";

export const addUser = async (params) => {
  return axios.post("/api/user/adduser", params);
};
export const getAllUsers = async (params) => {
  return axios.post("/api/user/getAllUsers", params);
};
export const getUserByID = async (params) => {
  return axios.post("/api/user/getUserByID", params);
};
export const deleteUser = async (params) => {
  return axios.post("/api/user/deleteuser", params);
};
export const editUser = async (params) => {
  return axios.post("/api/user/edituser", params);
};

export const addUserrole = async (params) => {
  return axios.post("/api/userRoles/addUserRole", params);
};

export const userRoleList = async (params) => {
  return axios.post("/api/userRoles/listUserRole", params);
};

export const deleteUserrole = async (params) => {
  return axios.post("/api/userRoles/deleteUserRole", params);
};
