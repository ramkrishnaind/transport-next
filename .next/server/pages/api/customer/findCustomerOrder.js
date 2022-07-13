"use strict";
(() => {
var exports = {};
exports.id = 564;
exports.ids = [564];
exports.modules = {

/***/ 8506:
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ 928:
/***/ ((module) => {

module.exports = require("joi-objectid");

/***/ }),

/***/ 6517:
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 9351:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3549);
/* harmony import */ var _database_Schemas_misItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7916);
/* harmony import */ var _database_Schemas_booking__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1869);
/* harmony import */ var _middlewares_withProtect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1217);
// import connectMongo from "../../../database/connection";




const _ = __webpack_require__(6517);
const Joi = __webpack_require__(8506);
Joi.objectId = __webpack_require__(928)(Joi);
const booking_itemSchema = Joi.object({
    bookingId: Joi.objectId().required(),
    customerId: Joi.objectId().required()
});
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */ async function billnumfunc(req, res) {
    await (0,_database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    try {
        if (req.method != "POST") {
            return res.json({
                status: false,
                error: true,
                message: "HTTP method not allowed"
            });
        }
        let validateData = booking_itemSchema.validate(req.body);
        if (validateData.error) {
            return res.json({
                status: false,
                error: validateData,
                message: "Invalid data"
            });
        }
        // pick data from req.body
        let booking_itemData = _.pick(req.body, [
            "bookingId",
            "customerId"
        ]);
        let findData1 = await _database_Schemas_booking__WEBPACK_IMPORTED_MODULE_2__/* ["default"].findOne */ .Z.findOne({
            customerId: booking_itemData.customerId
        });
        let findData = await _database_Schemas_misItem__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
            customerId: booking_itemData.customerId
        });
        if (findData || findData1) {
            return res.json({
                status: true,
                error: false,
                message: "Data." + findData + findData1
            });
        } else {
            return res.json({
                status: false,
                error: false,
                message: "Data not found."
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            error: true,
            errorMessage: error
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middlewares_withProtect__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(billnumfunc));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [992,869,916], () => (__webpack_exec__(9351)));
module.exports = __webpack_exports__;

})();