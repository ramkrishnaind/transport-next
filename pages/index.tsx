import Layout from "components/common/Layout";
import Banner from "components/page/home/Banner";
import Moving from "components/page/home/MovingMade";
import Tracker from "components/page/home/TrackerForm";

const IndexPage = () => (
  <Layout>
    <Banner />
    <Tracker />
    <Moving />
  </Layout>
);

export default IndexPage;
