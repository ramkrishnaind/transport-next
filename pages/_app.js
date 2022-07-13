import "../globals.css";
import { useState } from "react";
import { useRouter } from "next/router";
import NormalLayout from "../components/UI/NormalLayout";
import AdminLayout from "../components/UI/AdminLayout";
import "antd/dist/antd.css";
import "../overRide.css";
import Script from "next/script";
import { AppProvider } from "../context";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import "../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import "../css/first.css";
// import "../css/dripicons.min.css";
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
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
// import "../database/connection";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  //const [isAuth, setIsAuth] = useState(false);
  if (!router || !router.asPath) return null;
  console.log("asPath", router?.asPath);
  let component;
  switch (true) {
    case router?.asPath.startsWith("/auth"):
      component = <Component {...pageProps} />;
      break;
    case router?.asPath.startsWith("/admin"):
      component = (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      );
      break;
    default:
      component = (
        <NormalLayout>
          <Component {...pageProps} />
        </NormalLayout>
      );
      break;
  }

  return <AppProvider>{component}</AppProvider>;
  // return <Component {...pageProps} />;
}

export default MyApp;
