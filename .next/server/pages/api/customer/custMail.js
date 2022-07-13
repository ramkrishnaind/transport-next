"use strict";
(() => {
var exports = {};
exports.id = 202;
exports.ids = [202];
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

/***/ 5184:
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ 9340:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3549);
/* harmony import */ var _middlewares_withProtect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1217);
// import connectMongo from "../../../database/connection";


const _ = __webpack_require__(6517);
const nodemailer = __webpack_require__(5184);
const Joi = __webpack_require__(8506);
Joi.objectId = __webpack_require__(928)(Joi);
const sendMail_Schema = Joi.object({
    from: Joi.string().required(),
    to: Joi.string().required(),
    subject: Joi.string().required(),
    messageBody: Joi.string().required()
});
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */ async function mailSend(req, res) {
    await (0,_database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    try {
        if (req.method != "POST") {
            return res.json({
                status: false,
                error: true,
                message: "HTTP method not allowed"
            });
        }
        let validateData = sendMail_Schema.validate(req.body);
        if (validateData.error) {
            return res.json({
                status: false,
                error: validateData,
                message: "Invalid data"
            });
        }
        // pick data from req.body
        let sendMailData = _.pick(req.body, [
            "from",
            "to",
            "subject",
            "messageBody"
        ]);
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "Dummy",
                pass: "Dummy"
            }
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: sendMailData.from,
            to: sendMailData.to,
            subject: sendMailData.subject,
            html: sendMailData.messageBody
        });
        console.log("Message sent: %s", info.messageId);
        return res.json({
            status: true,
            error: false,
            response: "Email Send Successfully " + info.response
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middlewares_withProtect__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(mailSend));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [992], () => (__webpack_exec__(9340)));
module.exports = __webpack_exports__;

})();