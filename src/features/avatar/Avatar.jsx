import cn from "classnames";
import { API_URL } from "../../shared/config";
import styles from "./avatar.module.css";

export const Avatar = ({ data, size, upload }) => {
  return (
    <img
      className={cn(styles.img, {
        [styles.normal]: size > 60,
        [styles.small]: size <= 60,
        [styles.male]: data.gender === "male",
        [styles.female]: data.gender === "female",
        [styles.stone]: data.gender === "stone",
      })}
      src={API_URL + data.avatarUrl}
      width={`${size}px`}
      height={`${size}px`}
      alt="Avatar"
      onClick={() => upload?.current.click()}
    ></img>
  );
};
