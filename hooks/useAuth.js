// import {
//   logout,
//   isLoggedIn,
//   getRole,
// } from "@services/customer-api-service";
//import { getCustomerProfile } from "@services/customer-api.service";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAuth = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const saveToken = (jwtToken) => {

    localStorage.setItem("jwtToken", jwtToken);
  };

  const saveIsAdmin = () => {
    localStorage.setItem("isAdmin", "true");
  };

  const saveUserId = (userId) => {
    setUserId(userId);
    localStorage.setItem("userId", userId);
  };

  const saveCustomer = (customer) => {
    console.log("customer is", customer);
    setCustomer(customer);
    localStorage.setItem("customer", JSON.stringify(customer));
  };
  const saveBooking = (bookingInfo) => {
    setBookingInfo(bookingInfo);
    localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
  };

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("jwtToken");
  };

  const removeIsAdmin = () => {
    localStorage.removeItem("isAdmin");
  };

  const removeUserId = () => {
    setUserId(null);
    localStorage.removeItem("userId");
  };

  const removeCustomer = () => {
    setCustomer(null);
    localStorage.removeItem("customer");
  };

  const platformLogout = async () => {
    await logout();

    removeToken();
    removeUserId();
    removeCustomer();
    setAuthenticated(false);

    if (router.pathname !== "/") {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  useEffect(() => {

    const customer = localStorage.getItem("customer");
    if (customer) {
      setCustomer(JSON.parse(customer));
    }
    const booking = localStorage.getItem("bookingInfo");
    if (booking) {
      setBookingInfo(JSON.parse(booking));
    }

    const localToken = localStorage.getItem("jwtToken");
    setToken(localToken);

    const localUserId = localStorage.getItem("userId");
    if (localUserId) {
      setUserId(localUserId);
    }

    const isAuthenticated = localStorage.getItem("jwtToken");
    if (isAuthenticated) {
      setAuthenticated(true);
    }

  }, []);



  const getUserRole = (jwtToken) => {
    return new Promise(async (resolve) => {
      const { data } = await getRole(jwtToken);
      if (data.status === 'error') {
        notification.error({ message: 'Internal Server Error' });
        resolve('error');
      } else {
        resolve(data.role);
      }
    });
  }

  const clearStorage = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
  }


  return {
    token,
    saveToken,
    saveIsAdmin,
    removeCustomer,
    removeIsAdmin,
    removeToken,
    removeUserId,
    authenticated,
    userId,
    saveUserId,
    saveCustomer,
    saveBooking,
    customer,
    showLogout,
    platformLogout,
    userRole,
    getUserRole,
    bookingInfo
  };
};
export default useAuth;
