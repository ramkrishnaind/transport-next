"use strict";
(() => {
var exports = {};
exports.id = 175;
exports.ids = [175];
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

/***/ 5440:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3549);
/* harmony import */ var _database_Schemas_booking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1869);
/* harmony import */ var _middlewares_withProtect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1217);
// import connectMongo from "../../../database/connection";



const _ = __webpack_require__(6517);
const Joi = __webpack_require__(8506);
Joi.objectId = __webpack_require__(928)(Joi);
const bookingSchema = Joi.object({
    customerId: Joi.objectId().required(),
    shiftingFor: Joi.string().trim().required(),
    shiftingFrom: Joi.string().trim().required(),
    shiftingTo: Joi.string().trim().required(),
    shiftingOn: Joi.string().trim().required()
});
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */ async function createBooking(req, res) {
    await (0,_database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    try {
        if (req.method != "POST") {
            return res.json({
                status: false,
                error: true,
                message: "HTTP method not allowed"
            });
        }
        let validateData = bookingSchema.validate(req.body);
        if (validateData.error) {
            return res.json({
                status: false,
                error: validateData,
                message: "Invalid data"
            });
        }
        // pick data from req.body
        let bookingData = _.pick(req.body, [
            "customerId",
            "shiftingFor",
            "shiftingFrom",
            "shiftingTo",
            "shiftingOn"
        ]);
        const booking = await _database_Schemas_booking__WEBPACK_IMPORTED_MODULE_1__/* ["default"].create */ .Z.create(bookingData);
        return res.status(200).send({
            status: true,
            error: false,
            message: "Booking created",
            bookingId: booking._id
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            status: false,
            error: true,
            errorMessage: error
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middlewares_withProtect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(createBooking));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [992,869], () => (__webpack_exec__(5440)));
module.exports = __webpack_exports__;

})();