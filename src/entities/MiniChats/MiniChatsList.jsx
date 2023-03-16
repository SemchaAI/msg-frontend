import styles from "./miniChatList.module.css";
import cn from "classnames";
import { userApi } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../../features/avatar/Avatar";
import { BounceLoader } from "react-spinners";

export const MiniChatsList = () => {
  const { data, error, isLoading } = userApi.useGetMeQuery(null, {
    pollingInterval: 2000,
  });

  const navigate = useNavigate();

  const clickHandler = (_id, userId) => {
    navigate(`/chat/${_id}/${userId}`);
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
                onClick={() => clickHandler(el._id, el.userId)}
              >
                <Avatar data={el} size={40} />
                <div className={styles.cardInfo}>
                  <h3 className={styles.nickname}>{el.nickname}</h3>
                  <div>Tap To Open chat</div>
                </div>
                <div
                  className={cn({
                    [styles.alert]: el.alert === true,
                    [styles.hidden]: el.alert === false,
                  })}
                >
                  <div>New</div>
                  <BounceLoader color="#34C369" size={20} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
