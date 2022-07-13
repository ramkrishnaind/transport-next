"use strict";
(() => {
var exports = {};
exports.id = 27;
exports.ids = [27];
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

/***/ 9413:
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
const booking_itemSchema = Joi.object({
    bookingId: Joi.objectId().required(),
    sofaSets: Joi.array(),
    tables: Joi.array(),
    chairs: Joi.array(),
    cots: Joi.array(),
    mattress: Joi.array(),
    cupBoards: Joi.array(),
    tvs: Joi.array(),
    refrigerators: Joi.array(),
    washingMachines: Joi.array(),
    ovens: Joi.array(),
    airConditioners: Joi.array(),
    fansCoolers: Joi.array(),
    bikes: Joi.array(),
    cars: Joi.array(),
    cycles: Joi.array()
});
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */ async function booking_item(req, res) {
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
            "sofaSets",
            "tables",
            "chairs",
            "cots",
            "mattress",
            "cupBoards",
            "tvs",
            "refrigerators",
            "washingMachines",
            "ovens",
            "airConditioners",
            "fansCoolers",
            "bikes",
            "cars",
            "cycles"
        ]);
        //  var sofaData = [
        //     {
        //       capcity:3,
        //       name:"2+1",
        //       storage:true,
        //       mateial:"lather",
        //       reclyner:true,
        //       CFT:120
        //     },
        //     {
        //       capcity:3,
        //       name:"2+1",
        //       storage:true,
        //       mateial:"lather",
        //       reclyner:true,
        //       CTF:150
        //     }
        //   ];
        let setData = {
            sofaSets: booking_itemData.sofaSets,
            tables: booking_itemData.tables,
            chairs: booking_itemData.chairs,
            cots: booking_itemData.cots,
            mattress: booking_itemData.mattress,
            cupBoards: booking_itemData.cupBoards,
            tvs: booking_itemData.tvs,
            refrigerators: booking_itemData.refrigerators,
            washingMachines: booking_itemData.washingMachines,
            ovens: booking_itemData.ovens,
            airConditioners: booking_itemData.airConditioners,
            fansCoolers: booking_itemData.fansCoolers,
            bikes: booking_itemData.bikes,
            cars: booking_itemData.cars,
            cycles: booking_itemData.cycles
        };
        // update data from req.body
        // console.log("Value updated",sofaData);
        let booking_item = await _database_Schemas_booking__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOneAndUpdate */ .Z.findOneAndUpdate({
            _id: booking_itemData.bookingId
        }, {
            $set: setData
        });
        return res.json({
            status: true,
            error: false,
            message: "Booking updated.",
            bookingId: booking_itemData.bookingId
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middlewares_withProtect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(booking_item));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [992,869], () => (__webpack_exec__(9413)));
module.exports = __webpack_exports__;

})();