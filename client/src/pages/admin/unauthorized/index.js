import Head from "next/head";
//layout
import WebLayout from "./../../../layouts/WebLayout";
import styles from "./Unauthorized.module.css";

const Unauthorized = () => {
  return (
    <WebLayout>
      <Head>
        <title>Unauthorized</title>
      </Head>
      <div className="content">
        <h1 className="heading">Unauthorized page</h1>
        <div className={styles.unauthorized}></div>
      </div>
    </WebLayout>
  );
};

export default Unauthorized;
