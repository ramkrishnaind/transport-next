import "../public/globals.css";
import { useRouter } from "next/router";
import NormalLayout from "../components/UI/NormalLayout";
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
    default:
      component = (
        <NormalLayout>
          <Component {...pageProps} />
        </NormalLayout>
      );
      break;
  }
  return component;
  // return <Component {...pageProps} />;
}

export default MyApp;
