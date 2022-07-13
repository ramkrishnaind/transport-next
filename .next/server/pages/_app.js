(() => {
var exports = {};
exports.id = 888;
exports.ids = [888,45];
exports.modules = {

/***/ 2144:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./components/LeftNavigation/index.js


const LeftNavigation = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "bg-gray-200",
        children: "Left Side Navigation"
    });
};
/* harmony default export */ const components_LeftNavigation = (LeftNavigation);

;// CONCATENATED MODULE: ./components/Header/index.js


const Header = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "bg-blue-100",
        children: "Header"
    });
};
/* harmony default export */ const components_Header = (Header);

;// CONCATENATED MODULE: ./components/Footer/index.js


const Footer = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "bg-red-300 m-0",
        children: "Footer"
    });
};
/* harmony default export */ const components_Footer = (Footer);

;// CONCATENATED MODULE: ./components/UI/NormalLayout/index.js





const index = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-col min-h-screen",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "grid grid-cols-1",
                children: /*#__PURE__*/ jsx_runtime_.jsx(components_Header, {})
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex-1 h-full",
                children: props.children
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "grid grid-cols-1 m-0",
                children: /*#__PURE__*/ jsx_runtime_.jsx(components_Footer, {})
            })
        ]
    });
};
/* harmony default export */ const NormalLayout = (index);

;// CONCATENATED MODULE: ./components/UI/AdminLayout/index.js





const AdminLayout_index = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-col",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "grid grid-cols-12",
                children: /*#__PURE__*/ jsx_runtime_.jsx(components_Header, {})
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "grid grid-cols-12 gap-4 flex-1",
                style: {
                    minHeight: "80vh"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "bg-blue-100 col-span-4",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(components_LeftNavigation, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "bg-red-100 col-span-8",
                        children: props.children
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "grid grid-cols-12",
                children: /*#__PURE__*/ jsx_runtime_.jsx(components_Footer, {})
            })
        ]
    });
};
/* harmony default export */ const AdminLayout = (AdminLayout_index);

// EXTERNAL MODULE: ./node_modules/antd/dist/antd.css
var antd = __webpack_require__(4722);
// EXTERNAL MODULE: external "next/script"
var script_ = __webpack_require__(4780);
// EXTERNAL MODULE: ./context/index.js
var context = __webpack_require__(3799);
// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-svg-core/styles.css
var styles = __webpack_require__(5800);
;// CONCATENATED MODULE: external "@fortawesome/fontawesome-svg-core"
const fontawesome_svg_core_namespaceObject = require("@fortawesome/fontawesome-svg-core");
;// CONCATENATED MODULE: ./pages/_app.js










 // import Font Awesome CSS



// import "../public/css/dripicons.min.css";
// import second from "elegant-icons.min.css";
// import "all.min.css";
// import "kiko-all.min.css";
// import "ionicons.min.css";
// import "linea-icons.min.css";
// import "linear-icons.min.css";
// import "https://fonts.googleapis.com/icon?family=Material+Icons&#038;ver=6.0";
// import "simple-line-icons.min.css";
// import "style.min.css";
// import "styles.css";
// import "cf7msm.css";
// import "rbt-modules.css";
// import "swiper.min.css";
// import "grid.min.css";
// import "helper-parts.min.css";
// import "plugins/main.min.css";
// import "perfect-scrollbar.css";
// import "main.min.css";
// import "globefarer-core.min.css";
// import "https://fonts.googleapis.com/css?family=Sarabun%3A200%2C400%2C500%2C700&#038;subset=latin-ext&#038;display=swap&#038;ver=1.0.0";
// import "grid.min.css";
// import "style.css";
// import "elementor.min.css";
// import "elementor-icons.min.css";
// import "custom-frontend-lite.min.css";
// import "post-7709.css";
// import "post-50.css";
// import 'main.css'
// import 'https://fonts.googleapis.com/css?family=Roboto%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CRoboto+Slab%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&#038;display=auto&#038;ver=6.0'
fontawesome_svg_core_namespaceObject.config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
// import "../database/connection";
function MyApp({ Component , pageProps  }) {
    const router = (0,router_.useRouter)();
    //const [isAuth, setIsAuth] = useState(false);
    if (!router || !router.asPath) return null;
    console.log("asPath", router?.asPath);
    let component;
    switch(true){
        case router?.asPath.startsWith("/auth"):
            component = /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            });
            break;
        case router?.asPath.startsWith("/admin"):
            component = /*#__PURE__*/ jsx_runtime_.jsx(AdminLayout, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                    ...pageProps
                })
            });
            break;
        default:
            component = /*#__PURE__*/ jsx_runtime_.jsx(NormalLayout, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                    ...pageProps
                })
            });
            break;
    }
    return /*#__PURE__*/ jsx_runtime_.jsx(context/* AppProvider */.w, {
        children: component
    });
// return <Component {...pageProps} />;
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 5800:
/***/ (() => {



/***/ }),

/***/ 4722:
/***/ (() => {



/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 4780:
/***/ ((module) => {

"use strict";
module.exports = require("next/script");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [799], () => (__webpack_exec__(2144)));
module.exports = __webpack_exports__;

})();