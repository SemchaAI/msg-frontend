import React from "react";
import styles from "./login.module.css";
import { ReactComponent as SurfingImg } from "./images/surfing.svg";
import { FormLogin } from "../../entities/LoginForm/ui/FormLogin";

const Login = () => {
  return (
    <div className={styles.login}>
      <SurfingImg className={styles.img} width="279px" height="194px" />
      <FormLogin />
    </div>
  );
};
export default Login;
