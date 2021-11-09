import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import AdminLayout from "../../../layouts/AdminLayout";
import styles from "./AdminDashboard.module.css";
import Head from "next/head";

const AdminDashboard = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <AdminLayout>
      <Head>
        <title>Dashboard - Admin</title>
      </Head>
      <div className="content">
        <div className={styles.dashboard}>
          <h1 className="heading">Dashboard</h1>
          <h5 className={styles.boldText}>{user?.name}</h5>
          <h5 className={styles.boldText}>{user?.email}</h5>
          <h5 className={styles.boldText}>{user?.phone}</h5>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
