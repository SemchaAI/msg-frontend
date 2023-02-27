import React from "react";
import { Header } from "../../entities/Header/Header";
import { Footer } from "../../entities/Nav(Footer)/Footer";
import { UserInfo } from "../../entities/UserInfo/UserInfo";

import styles from "./profile.module.css";

const Profile = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <UserInfo />
      </main>
      <Footer />
    </>
  );
};
export default Profile;
