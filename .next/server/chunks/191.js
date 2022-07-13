"use strict";
exports.id = 191;
exports.ids = [191];
exports.modules = {

/***/ 7191:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const customerSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        lowercase: true
    },
    otp: {
        type: Number,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    verificationDate: {
        type: Date
    },
    forgetPasswordToken: {
        type: String
    },
    active: {
        type: Number,
        default: true
    },
    lastLoginTime: {
        type: Date
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    },
    id: false,
    toJSON: {
        getters: true,
        virtuals: true
    },
    toObject: {
        getters: true,
        virtuals: true
    }
}, {
    collection: "customer"
});
const Customer = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.customer || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)("customer", customerSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);


/***/ })

};
;