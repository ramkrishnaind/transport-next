"use strict";
(() => {
var exports = {};
exports.id = 858;
exports.ids = [858];
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

/***/ 5184:
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ 5611:
/***/ ((module) => {

module.exports = import("nanoid");;

/***/ }),

/***/ 7051:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const _ = __webpack_require__(6517);
const nodemailer = __webpack_require__(5184);
const config = __webpack_require__(6777);
module.exports = sendEmail;
async function sendEmail(to, subject, html) {
    let mailFrom = config.smtpOptions.auth.user;
    const transporter = nodemailer.createTransport(config.smtpOptions);
    await transporter.sendMail({
        mailFrom,
        to,
        subject,
        html
    }, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
//await transporter.sendMail(emailOption);
}


/***/ }),

/***/ 4555:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3549);
/* harmony import */ var _database_Schemas_customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7191);
/* harmony import */ var _middlewares_withProtect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1217);
/* harmony import */ var _helperFunction_nodeMail_sendEmail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7051);
/* harmony import */ var _helperFunction_nodeMail_sendEmail__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_helperFunction_nodeMail_sendEmail__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5611);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([nanoid__WEBPACK_IMPORTED_MODULE_3__]);
nanoid__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// import connectMongo from "../../../database/connection";




const _ = __webpack_require__(6517);
const Joi = __webpack_require__(8506);

const numbers = "0123456789";
const customersignUpSchema = Joi.object({
    fullName: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    mobile: Joi.number().required()
});
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */ async function createCustomer(req, res) {
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
            "fullName",
            "email",
            "mobile"
        ]);
        let getHash = (0,nanoid__WEBPACK_IMPORTED_MODULE_3__.customAlphabet)(numbers, 4);
        let otp = getHash();
        customerData.otp = otp;
        //
        let findData = await _database_Schemas_customer__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
            $or: [
                {
                    mobile: customerData.mobile
                },
                {
                    email: customerData.email
                }
            ]
        });
        if (findData) {
            if (!findData.active) {
                return res.json({
                    status: false,
                    error: true,
                    message: "Your account has been disabled. Please contact admin",
                    adminDisable: true,
                    statusCode: 401
                });
            }
            _helperFunction_nodeMail_sendEmail__WEBPACK_IMPORTED_MODULE_2___default()(customerData.email, "Customer Login OTP", customerData.otp);
            return res.json({
                status: true,
                error: false,
                message: "OTP Sent to " + customerData.mobile,
                OTP: customerData.otp,
                alreadyAUser: true
            });
        } else {
            const customer = await _database_Schemas_customer__WEBPACK_IMPORTED_MODULE_1__/* ["default"].create */ .Z.create(customerData);
            _helperFunction_nodeMail_sendEmail__WEBPACK_IMPORTED_MODULE_2___default()(customerData.email, "New Customer Login OTP", customerData.otp);
            return res.json({
                status: true,
                error: false,
                message: "OTP Sent to " + customerData.mobile,
                OTP: customerData.otp
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middlewares_withProtect__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(createCustomer));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6777:
/***/ ((module) => {

module.exports = JSON.parse('{"smtpOptions":{"host":"smtpout.secureserver.net","port":465,"auth":{"user":"development@flitte.in","pass":"Develop@333"}}}');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [992,191], () => (__webpack_exec__(4555)));
module.exports = __webpack_exports__;

})();