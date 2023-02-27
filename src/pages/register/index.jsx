import React from "react";
import { FormRegister } from "../../entities/RegisterForm/ui/FormRegister";
import styles from "./register.module.css";
import { ReactComponent as LoginImg } from "./images/Global.svg";

const Register = () => {
  return (
    <div className={styles.login}>
      <LoginImg className={styles.img} width="375px" height="281px" />
      <FormRegister />
    </div>
  );
};
export default Register;
