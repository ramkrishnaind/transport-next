"use strict";
(() => {
var exports = {};
exports.id = 792;
exports.ids = [792];
exports.modules = {

/***/ 8506:
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ 6517:
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5963:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3549);
/* harmony import */ var _database_Schemas_customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7191);
/* harmony import */ var _middlewares_withProtect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1217);
// import connectMongo from "../../../database/connection";



const _ = __webpack_require__(6517);
const Joi = __webpack_require__(8506);
const customersignUpSchema = Joi.object({
    otp: Joi.number().required(),
    mobile: Joi.number().required()
});
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */ async function verifyOtp(req, res) {
    await (0,_database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    try {
        if (req.method != "POST") {
            return res.json({
                status: false,
                error: true,
                message: "HTTP method not allowed"
            });
        }
        let validateData = customersignUpSchema.validate(req.body);
        if (validateData.error) {
            return res.json({
                status: false,
                error: validateData,
                message: "Invalid data"
            });
        }
        // pick data from req.body
        let customerData = _.pick(req.body, [
            "otp",
            "mobile"
        ]);
        let findData = await _database_Schemas_customer__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
            mobile: customerData.mobile
        }).lean();
        console.log("findData is", findData);
        if (findData) {
            if (findData.otp == customerData.otp) {
                if (!findData.verified) {
                    const verifyData = {
                        verified: true,
                        verificationDate: new Date()
                    };
                    const verifyCustomer = await _database_Schemas_customer__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOneAndUpdate */ .Z.findOneAndUpdate({
                        mobile: customerData.mobile
                    }, {
                        $set: verifyData
                    });
                }
                return res.status(200).send({
                    status: true,
                    error: false,
                    message: "OTP Varified",
                    customerData: findData
                });
            }
        } else {
            return res.status(500).send({
                status: false,
                error: true,
                message: "Invalid OTP"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            status: false,
            error: true,
            errorMessage: error
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middlewares_withProtect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(verifyOtp));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [992,191], () => (__webpack_exec__(5963)));
module.exports = __webpack_exports__;

})();