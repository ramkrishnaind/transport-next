"use strict";
(() => {
var exports = {};
exports.id = 541;
exports.ids = [541];
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

/***/ 5611:
/***/ ((module) => {

module.exports = import("nanoid");;

/***/ }),

/***/ 6191:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const userSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String
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
        createdAt: "userCreationDate",
        updatedAt: "updated"
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
    collection: "user"
});
const User = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.user || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)("user", userSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ }),

/***/ 7475:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3549);
/* harmony import */ var _database_Schemas_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6191);
/* harmony import */ var _middlewares_withProtect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1217);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5611);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([nanoid__WEBPACK_IMPORTED_MODULE_2__]);
nanoid__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// import connectMongo from "../../../database/connection";



const _ = __webpack_require__(6517);
const Joi = __webpack_require__(8506);

const numbers = "0123456789";
const userSignUpSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    email: Joi.string().email().trim(),
    mobile: Joi.number().required()
});
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */ async function createUserHandler(req, res) {
    await (0,_database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    try {
        if (req.method != "POST") {
            return res.json({
                status: false,
                error: true,
                message: "HTTP method not allowed"
            });
        }
        let validateData = userSignUpSchema.validate(req.body);
        if (validateData.error) {
            return res.json({
                status: false,
                error: validateData,
                message: "Invalid data"
            });
        }
        // pick data from req.body
        let userData = _.pick(req.body, [
            "firstName",
            "email",
            "mobile"
        ]);
        let getHash = (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.customAlphabet)(numbers, 4);
        let otp = getHash();
        userData.otp = otp;
        //
        let findData = await _database_Schemas_user__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
            mobile: userData.mobile
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
            return res.json({
                status: true,
                error: false,
                message: "OTP Sent to " + userData.mobile,
                OTP: userData.otp,
                alreadyAUser: true
            });
        } else {
            const customer = await _database_Schemas_user__WEBPACK_IMPORTED_MODULE_1__/* ["default"].create */ .Z.create(userData);
            return res.json({
                status: true,
                error: false,
                message: "OTP Sent to " + userData.mobile,
                OTP: userData.otp
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            error
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middlewares_withProtect__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(createUserHandler)); // export default handler

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [992], () => (__webpack_exec__(7475)));
module.exports = __webpack_exports__;

})();