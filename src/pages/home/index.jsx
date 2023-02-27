import React from "react";
import { GlobalForm } from "../../entities/GlobalChat/GlobalForm";
import { Header } from "../../entities/Header/Header";
import { Footer } from "../../entities/Nav(Footer)/Footer";

import styles from "./home.module.css";
const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <main className={styles.main}>
        <GlobalForm />
      </main>
      <Footer />
    </div>
  );
};
export default Home;
