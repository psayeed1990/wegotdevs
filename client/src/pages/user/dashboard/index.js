import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import UserLayout from "../../../layouts/UserLayout";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <UserLayout>
      <div className="content">
        <h1 className="heading">Dashboard</h1>
        <div className={styles.dashboard}>
          <h5 className={styles.boldText}>{user?.name}</h5>
          <h5 className={styles.boldText}>{user?.email}</h5>
          <h5 className={styles.boldText}>{user?.phone}</h5>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
