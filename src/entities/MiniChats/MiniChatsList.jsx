import styles from "./miniChatList.module.css";
import cn from "classnames";
import { userApi } from "../services/userServices";
import { API_URL } from "../../shared/config";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../../features/avatar/Avatar";

export const MiniChatsList = () => {
  const { data, error, isLoading } = userApi.useGetMeQuery();

  const navigate = useNavigate();

  const clickHandler = (_id) => {
    navigate(`/chat/${_id}`);
  };

  return (
    <div className={styles.listContainer}>
      {data && (
        <ul className={styles.listCard}>
          {data.friends.map((el) => {
            return (
              <li
                key={el._id}
                className={styles.listCardBlock}
                onClick={() => clickHandler(el._id)}
              >
                <Avatar data={el} size={40} />
                <div className={styles.cardInfo}>
                  <h3 className={styles.nickname}>{el.nickname}</h3>
                  <div>Tap To Open chat</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
