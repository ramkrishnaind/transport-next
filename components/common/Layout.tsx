import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
};

const Layout = ({
  children,
  title = "Best packers and Movers service",
  description = "I am a default Description",
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link
        rel='icon'
        type='image/x-icon'
        href='https://whiteglove23.s3.ap-south-1.amazonaws.com/favicon.png'
      ></link>

      <meta name='description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
    </Head>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
