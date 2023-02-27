import React from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./footer.module.css";
import cn from "classnames";

import { ReactComponent as IconHome } from "./images/home.svg";
import { ReactComponent as IconProfile } from "./images/profile.svg";
import { ReactComponent as IconSearch } from "./images/search.svg";
import { ReactComponent as IconMoon } from "./images/moon.svg";
import { ReactComponent as IconSun } from "./images/sun.svg";
import { ReactComponent as IconChat } from "./images/chat.svg";
import { useTheme } from "../../shared/theme/hooks/useTheme";

export const Footer = () => {
  const [currentTheme, handlerTheme] = useTheme();
  const location = useLocation();
  const path = location.pathname;
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <ul className={styles.listBar}>
          <li>
            <Link
              to="/home"
              className={cn(styles.color, {
                [styles.primary]: path === "/home",
              })}
            >
              <IconHome alt="home" />
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={cn(styles.color, {
                [styles.primary]: path === "/profile",
              })}
            >
              <IconProfile />
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={cn(styles.color, {
                [styles.primary]: path === "/search",
              })}
            >
              <IconSearch />
            </Link>
          </li>
          <li>
            <Link
              to="/chats"
              className={cn(styles.color, {
                [styles.primary]: path === "/chats",
              })}
            >
              <IconChat />
            </Link>
          </li>
          <li onClick={handlerTheme}>
            {currentTheme === "light" ? <IconMoon /> : <IconSun />}
          </li>
        </ul>
      </nav>
    </footer>
  );
};
