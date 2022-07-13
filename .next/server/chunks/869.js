"use strict";
exports.id = 869;
exports.ids = [869];
exports.modules = {

/***/ 1869:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8506);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);


const bookingSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__.Schema({
    customerId: {
        type: mongoose__WEBPACK_IMPORTED_MODULE_1__.mongoose.Schema.Types.ObjectId,
        ref: "customer",
        default: null
    },
    shiftingFor: {
        type: String,
        required: true,
        trim: true
    },
    shiftingFrom: {
        type: String,
        required: false,
        trim: true
    },
    shiftingTo: {
        type: String,
        required: false,
        trim: true
    },
    shiftingOn: {
        type: Date,
        required: false
    },
    currentFloor: {
        type: String
    },
    isLiftAvailableOnCurrentFloor: {
        type: Boolean
    },
    movingOnFloor: {
        type: String
    },
    isLiftAvailableOnMovingFloor: {
        type: Boolean
    },
    sofaSets: {
        type: Array
    },
    tables: {
        type: Array
    },
    chairs: {
        type: Array
    },
    cots: {
        type: Array
    },
    mattress: {
        type: Array
    },
    cupBoards: {
        type: Array
    },
    tvs: {
        type: Array
    },
    refrigerators: {
        type: Array
    },
    washingMachines: {
        type: Array
    },
    ovens: {
        type: Array
    },
    airConditioners: {
        type: Array
    },
    fansCoolers: {
        type: Array
    },
    bikes: {
        type: Array
    },
    cars: {
        type: Array
    },
    cycles: {
        type: Array
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
    collection: "booking"
});
const Booking = mongoose__WEBPACK_IMPORTED_MODULE_1__.models.booking || (0,mongoose__WEBPACK_IMPORTED_MODULE_1__.model)("booking", bookingSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Booking);


/***/ })

};
;