import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, setClear } from "../redux/user";

import styles from "./header.module.css";

import { ReactComponent as LocationPoint } from "./images/location.svg";

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const pathname = window.location.pathname.split("/")[1];

  const clickHandler = () => {
    localStorage.removeItem("token");
    dispatch(setClear());
    if (user.token === "") {
      navigate("/login");
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.location}>
        <LocationPoint className={styles.locationImg} />
        <p className={styles.locationName}>{pathname}</p>
      </div>
      <button className={styles.signOut} onClick={clickHandler}>
        Sign Out
      </button>
    </header>
  );
};
