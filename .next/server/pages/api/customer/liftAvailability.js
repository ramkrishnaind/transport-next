"use strict";
(() => {
var exports = {};
exports.id = 259;
exports.ids = [259];
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

/***/ 3510:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3549);
/* harmony import */ var _database_Schemas_booking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1869);
/* harmony import */ var _middlewares_withProtect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1217);



const _ = __webpack_require__(6517);
const Joi = __webpack_require__(8506);
Joi.objectId = __webpack_require__(928)(Joi);
const bookingSchema = Joi.object({
    bookingId: Joi.objectId().required(),
    currentFloor: Joi.string().trim().required(),
    isLiftAvailableOnCurrentFloor: Joi.boolean().required(),
    movingOnFloor: Joi.string().trim().required(),
    isLiftAvailableOnMovingFloor: Joi.boolean().required()
});
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */ async function updateBooking(req, res) {
    await (0,_database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    try {
        if (req.method != "PUT") {
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
            "bookingId",
            "currentFloor",
            "isLiftAvailableOnCurrentFloor",
            "movingOnFloor",
            "isLiftAvailableOnMovingFloor"
        ]);
        let setData = {
            currentFloor: bookingData.currentFloor,
            isLiftAvailableOnCurrentFloor: bookingData.isLiftAvailableOnCurrentFloor,
            movingOnFloor: bookingData.movingOnFloor,
            isLiftAvailableOnMovingFloor: bookingData.isLiftAvailableOnMovingFloor
        };
        let updatedData = await _database_Schemas_booking__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOneAndUpdate */ .Z.findOneAndUpdate({
            _id: bookingData.bookingId
        }, {
            $set: setData
        });
        return res.json({
            status: true,
            error: false,
            message: "Booking updated."
        });
    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            error: true,
            errorMessage: error
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middlewares_withProtect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(updateBooking));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [992,869], () => (__webpack_exec__(3510)));
module.exports = __webpack_exports__;

})();