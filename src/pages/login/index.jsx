import React from "react";
import styles from "./login.module.css";
import { ReactComponent as SurfingImg } from "./images/surfing.svg";
import { ReactComponent as SurfingImgDark } from "./images/surfingDark.svg";
import { FormLogin } from "../../entities/LoginForm/ui/FormLogin";
import { useTheme } from "../../shared/theme/hooks/useTheme";

const Login = () => {
  const [currentTheme, _] = useTheme();
  return (
    <div className={styles.login}>
      {currentTheme === "light" ? (
        <SurfingImg className={styles.img} width="279px" height="194px" />
      ) : (
        <SurfingImgDark className={styles.img} width="279px" height="194px" />
      )}
      <FormLogin />
    </div>
  );
};
export default Login;
