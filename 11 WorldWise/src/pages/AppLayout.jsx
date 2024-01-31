import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import User from "../components/User";
import { useFakeAuth } from "../Context/FakeAuthContext";
import Message from "../components/Message";

function AppLayout() {
  const { isAuthenticated } = useFakeAuth();

  if (!isAuthenticated) return <Message message="Please Log in" />;

  return (
    <div className={styles.app}>
      {isAuthenticated && (
        <>
          <Sidebar />
          <Map />
          <User></User>
        </>
      )}
    </div>
  );
}

export default AppLayout;
