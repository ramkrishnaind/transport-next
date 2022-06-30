import "../public/globals.css";
import { useRouter } from "next/router";
import NormalLayout from "../components/UI/NormalLayout";
import AdminLayout from "../components/UI/AdminLayout";
import "antd/dist/antd.css";
import "../public/overRide.css";
import Script from "next/script";
import { AppProvider } from "../context";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import "../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
// import "../database/connection";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
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
