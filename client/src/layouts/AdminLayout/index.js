import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect } from "react";
import Footer from "../../components/footer";
import AdminHeader from "../../components/header/adminHeader";
import AdminSidebar from "../../components/sidebar/adminSidebar";
import { LoaderContext } from "../../contexts/LoaderContext";
import { UserContext } from "../../contexts/UserContext";
import styles from "./AdminLayout.module.css";

const AdminLayout = ({ children }) => {
  const [loader, setLoader] = useContext(LoaderContext);
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (loader) {
      return;
    }
    if (user) {
      const admin = user.role === "admin";
      if (!admin) {
        return router.push("/admin/unauthorized");
      } else {
        return;
      }
    } else {
      return router.push("/user/auth/login");
    }
  }, [loader, user]);

  return (
    <Fragment>
      <AdminHeader />
      {!loader && user ? (
        <main className={styles.AdminLayout}>
          <AdminSidebar />
          {children}
        </main>
      ) : (
        <h1 className="heading">Fetching user...</h1>
      )}
      <Footer />
    </Fragment>
  );
};

export default AdminLayout;
