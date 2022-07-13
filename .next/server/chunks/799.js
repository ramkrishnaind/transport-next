"use strict";
exports.id = 799;
exports.ids = [799];
exports.modules = {

/***/ 3799:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "w": () => (/* binding */ AppProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


//Please add more properties as needed
const initContext = {
    isAuth: Boolean,
    setIsAuth: ()=>{},
    booking: {},
    setBooking: ()=>{},
    userState: {},
    customerDetails: {},
    setCustomerDetails: ()=>{},
    setUserState: ()=>{},
    step3State: {},
    setUserState: ()=>{},
    setStep3State: ()=>{}
};
const TransportContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(initContext);
const AppProvider = ({ children  })=>{
    const { 0: userState , 1: setUserState  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: step3State , 1: setStep3State  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: isAuth , 1: setIsAuth  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: customerDetails , 1: setCustomerDetails  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: booking , 1: setBooking  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TransportContext.Provider, {
        value: {
            isAuth,
            setIsAuth,
            customerDetails,
            setCustomerDetails,
            booking,
            setBooking,
            userState,
            step3State,
            setUserState,
            setStep3State
        },
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TransportContext);


/***/ })

};
;