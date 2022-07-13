"use strict";
exports.id = 992;
exports.ids = [992];
exports.modules = {

/***/ 3549:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
// /lib/dbConnect.js

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/ let dbString = "mongodb+srv://ramkrishnaindal:nWDMvHVL63V4wFbu@ramkrishna.yixfe.mongodb.net/transport?retryWrites=true&w=majority";
// const MONGODB_URI = process.env.MONGODB_URI
// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */ let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}
async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false
        };
        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(dbString, opts).then((mongoose1)=>{
            return mongoose1;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);


/***/ }),

/***/ 1217:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const withProtect = (handler)=>{
    return async (req, res)=>{
        // If error
        //   return res.status(400).json({
        //     success: false,
        //     message: 'Some error occured',
        //   });
        // add some custom data and forward the rquest
        //   // Grant access to protected route
        console.log("testing");
        req.user = "Ramkrishna";
        return handler(req, res);
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (withProtect);


/***/ })

};
;