import React from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../../entities/Header/Header";
import { Footer } from "../../entities/Nav(Footer)/Footer";
import { UserInfo } from "../../entities/UserInfo/UserInfo";

import styles from "./profile.module.css";

const Profile = ({ route, navigation }) => {
  const id = useLocation();
  return (
    <>
      <Header />
      <main className={styles.main}>
        <UserInfo idObj={id?.state?.id} />
      </main>
      <Footer />
    </>
  );
};
export default Profile;
