import React from "react";
import { FormRegister } from "../../entities/RegisterForm/ui/FormRegister";
import styles from "./register.module.css";
import { ReactComponent as LoginImg } from "./images/Global.svg";
import { ReactComponent as LoginImgDark } from "./images/DarkGlobal.svg";
import { useTheme } from "../../shared/theme/hooks/useTheme";

const Register = () => {
  const [currentTheme, _] = useTheme();
  return (
    <div className={styles.login}>
      {currentTheme === "light" ? (
        <LoginImg className={styles.img} width="375px" height="281px" />
      ) : (
        <LoginImgDark className={styles.img} width="375px" height="281px" />
      )}
      <FormRegister />
    </div>
  );
};
export default Register;
