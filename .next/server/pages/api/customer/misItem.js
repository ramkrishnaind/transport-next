"use strict";
(() => {
var exports = {};
exports.id = 783;
exports.ids = [783];
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

/***/ 8485:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3549);
/* harmony import */ var _database_Schemas_misItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7916);
/* harmony import */ var _middlewares_withProtect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1217);
// import connectMongo from "../../../database/connection";



const _ = __webpack_require__(6517);
const Joi = __webpack_require__(8506);
Joi.objectId = __webpack_require__(928)(Joi);
const utilityItem_Schema = Joi.object({
    bookingId: Joi.objectId().required(),
    customerId: Joi.objectId().required(),
    cartonboxes: Joi.array(),
    wetgrinders: Joi.array(),
    frames: Joi.array(),
    swings: Joi.array(),
    waterdrums: Joi.array(),
    waterpurifiers: Joi.array(),
    cockerysets: Joi.array(),
    excercisecycles: Joi.array(),
    cribes: Joi.array(),
    vacumcleaners: Joi.array(),
    hometheatres: Joi.array(),
    treadmils: Joi.array(),
    lpgcylinders: Joi.array(),
    dishwashers: Joi.array(),
    showpieces: Joi.array(),
    infantcycles: Joi.array(),
    Trunks: Joi.array(),
    desktops: Joi.array(),
    barcabinets: Joi.array(),
    flowerpot: Joi.array(),
    batteries: Joi.array(),
    swingmachines: Joi.array(),
    lamps: Joi.array(),
    flowerpotlarge: Joi.array(),
    kitchenracks: Joi.array(),
    stoves: Joi.array(),
    temples: Joi.array(),
    beanbags: Joi.array()
});
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */ async function utility_itemfunc(req, res) {
    await (0,_database_lib_dbConnect__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    try {
        if (req.method != "POST") {
            return res.json({
                status: false,
                error: true,
                message: "HTTP method not allowed"
            });
        }
        let validateData = utilityItem_Schema.validate(req.body);
        if (validateData.error) {
            return res.json({
                status: false,
                error: validateData,
                message: "Invalid data"
            });
        }
        // pick data from req.body
        let utility_itemData = _.pick(req.body, [
            "bookingId",
            "customerId",
            "cartonboxes",
            "wetgrinders",
            "frames",
            "swings",
            "waterdrums",
            "waterpurifiers",
            "cockerysets",
            "excercisecycles",
            "cribes",
            "vacumcleaners",
            "hometheatres",
            "treadmils",
            "lpgcylinders",
            "dishwashers",
            "showpieces",
            "infantcycles",
            "Trunks",
            "desktops",
            "barcabinets",
            "flowerpot",
            "batteries",
            "swingmachines",
            "lamps",
            "flowerpotlarge",
            "kitchenracks",
            "stoves",
            "temples",
            "beanbags", 
        ]);
        let setData = {
            customerId: utility_itemData.customerId,
            cartonboxes: utility_itemData.cartonboxes,
            wetgrinders: utility_itemData.wetgrinders,
            frames: utility_itemData.frames,
            swings: utility_itemData.swings,
            waterdrums: utility_itemData.waterdrums,
            waterpurifiers: utility_itemData.waterpurifiers,
            cockerysets: utility_itemData.cockerysets,
            excercisecycles: utility_itemData.excercisecycles,
            cribes: utility_itemData.cribes,
            vacumcleaners: utility_itemData.vacumcleaners,
            hometheatres: utility_itemData.hometheatres,
            treadmils: utility_itemData.treadmils,
            lpgcylinders: utility_itemData.lpgcylinders,
            dishwashers: utility_itemData.dishwashers,
            showpieces: utility_itemData.showpieces,
            infantcycles: utility_itemData.infantcycles,
            Trunks: utility_itemData.Trunks,
            desktops: utility_itemData.desktops,
            barcabinets: utility_itemData.barcabinets,
            flowerpot: utility_itemData.flowerpot,
            batteries: utility_itemData.batteries,
            swingmachines: utility_itemData.swingmachines,
            lamps: utility_itemData.lamps,
            flowerpotlarge: utility_itemData.flowerpotlarge,
            kitchenracks: utility_itemData.kitchenracks,
            stoves: utility_itemData.stoves,
            temples: utility_itemData.temples,
            beanbags: utility_itemData.beanbags
        };
        // get data from req.body
        let findData = await _database_Schemas_misItem__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOneAndUpdate */ .Z.findOneAndUpdate({
            bookingId: utility_itemData.bookingId
        }, {
            $set: setData
        });
        if (findData) {
            return res.json({
                status: true,
                error: false,
                message: "Misc Item Updated For " + utility_itemData.bookingId
            });
        } else {
            const misc_item = await _database_Schemas_misItem__WEBPACK_IMPORTED_MODULE_1__/* ["default"].create */ .Z.create(utility_itemData);
            return res.json({
                status: true,
                error: false,
                message: "Misc Item Insert Successfully For " + utility_itemData.bookingId
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middlewares_withProtect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(utility_itemfunc));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [992,916], () => (__webpack_exec__(8485)));
module.exports = __webpack_exports__;

})();