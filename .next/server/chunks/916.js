"use strict";
exports.id = 916;
exports.ids = [916];
exports.modules = {

/***/ 7916:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8506);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);


const utilityItemSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__.Schema({
    bookingId: {
        type: mongoose__WEBPACK_IMPORTED_MODULE_1__.mongoose.Schema.Types.ObjectId,
        ref: "booking",
        default: null
    },
    customerId: {
        type: mongoose__WEBPACK_IMPORTED_MODULE_1__.mongoose.Schema.Types.ObjectId,
        ref: "customer",
        default: null
    },
    cartonboxes: {
        type: Array
    },
    wetgrinders: {
        type: Array
    },
    frames: {
        type: Array
    },
    swings: {
        type: Array
    },
    waterdrums: {
        type: Array
    },
    waterpurifiers: {
        type: Array
    },
    cockerysets: {
        type: Array
    },
    excercisecycles: {
        type: Array
    },
    cribes: {
        type: Array
    },
    vacumcleaners: {
        type: Array
    },
    hometheatres: {
        type: Array
    },
    treadmils: {
        type: Array
    },
    lpgcylinders: {
        type: Array
    },
    dishwashers: {
        type: Array
    },
    showpieces: {
        type: Array
    },
    infantcycles: {
        type: Array
    },
    Trunks: {
        type: Array
    },
    desktops: {
        type: Array
    },
    barcabinets: {
        type: Array
    },
    flowerpot: {
        type: Array
    },
    batteries: {
        type: Array
    },
    swingmachines: {
        type: Array
    },
    lamps: {
        type: Array
    },
    flowerpotlarge: {
        type: Array
    },
    kitchenracks: {
        type: Array
    },
    stoves: {
        type: Array
    },
    temples: {
        type: Array
    },
    beanbags: {
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
    collection: "utilityItem"
});
const UtilityItem = mongoose__WEBPACK_IMPORTED_MODULE_1__.models.utilityItem || (0,mongoose__WEBPACK_IMPORTED_MODULE_1__.model)("utilityItem", utilityItemSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UtilityItem);


/***/ })

};
;