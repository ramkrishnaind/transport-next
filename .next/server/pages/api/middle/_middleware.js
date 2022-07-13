// runtime can't be in strict mode because a global variable is assign and maybe created.
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[631],{

/***/ 962:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(384);

        

        // The condition is true when the "process" module is provided
        if (process !== __webpack_require__.g.process) {
          // prefer local process but global.process has correct "env"
          process.env = __webpack_require__.g.process.env;
          __webpack_require__.g.process = process;
        }

        var mod = __webpack_require__(682)
        var handler = mod.middleware || mod.default;

        if (typeof handler !== 'function') {
          throw new Error('The Middleware "pages/api/middle/_middleware" must export a `middleware` or a `default` function');
        }

        /* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(opts) {
          return (0,next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_0__/* .adapter */ .V)({
              ...opts,
              page: "/api/middle/_middleware",
              handler,
          })
        }
    

/***/ }),

/***/ 682:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleware": () => (/* binding */ middleware)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(301);
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_server__WEBPACK_IMPORTED_MODULE_0__);
// import type { NextFetchEvent, NextRequest } from "next/server";

// In rewrite method you pass a page folder name(as a string). which // you create to handle underConstraction  functionalty.
function middleware(req, ev) {
    //   return NextResponse.rewrite("/underConstraction");
    //   return NextResponse.json({ message: "Hi" });
    console.log("hello");
    req.user = "Ram";
    // return NextResponse.json({ user: req.user });
    // console.log("user", req.user);
    return new Response(JSON.stringify({
        message: "Not authenticated."
    }), {
        status: 401,
        headers: {
            "Content-Type": "application/json"
        }
    });
// return NextResponse.next();
//   return NextResponse.redirect()
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [177], () => (__webpack_exec__(962)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES)["middleware_pages/api/middle/_middleware"] = __webpack_exports__;
/******/ }
]);