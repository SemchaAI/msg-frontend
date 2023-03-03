import styles from "./chatLocal.module.css";
import cn from "classnames";
import { useRef, useState } from "react";
import { userApi } from "../services/userServices";
import { useParams } from "react-router-dom";
import { API_URL } from "../../shared/config";

import { ReactComponent as ChevronL } from "./images/chevronL.svg";
import { ReactComponent as ChevronR } from "./images/chevronR.svg";
import { SendMsgForm } from "../../features/sendMsg/SendMsgForm";

export const ChatLocal = () => {
  const messagesEndRef = useRef(null);
  const params = useParams();

  const [page, setPage] = useState(1);
  const [hidden, setHidden] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop === 0) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  const { data, isLoading, error, refetch } = userApi.useGetChatQuery(
    {
      id: params.id,
      page,
    },
    { pollingInterval: 2000 }
  );
  const { data: userData } = userApi.useGetMeQuery(null, {
    pollingInterval: 5000,
  });

  // if (data) {
  //   console.log(data);
  //   console.log(
  //     data
  //       .slice(0)
  //       .reverse()
  //       .map((el) => el.text)
  //   );
  // }

  return (
    <section className={styles.globalChat}>
      {data && (
        <>
          <ul className={styles.msgList} onScroll={handleScroll}>
            {data
              .slice(0)
              .reverse()
              .map((elem) => (
                <li
                  key={elem._id}
                  className={cn(styles.msgBlock, {
                    [styles.right]: userData._id !== elem.user,
                    [styles.left]: userData._id === elem.user,
                  })}
                >
                  <p className={styles.message}>{elem.text}</p>
                  <div className={styles.userInfo}>
                    <h3 className={styles.nickname}>{elem.nickname}</h3>
                    {elem.avatarUrl ? (
                      <img
                        className={styles.avatar}
                        src={API_URL + elem.avatarUrl}
                        height={"40px"}
                        width={"40px"}
                        alt="avatar"
                      ></img>
                    ) : (
                      <img
                        className={styles.avatar}
                        src={"./images/avatar.svg"}
                        height={"40px"}
                        width={"40px"}
                        alt="avatar"
                      ></img>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </li>
              ))}
          </ul>
          <div className={styles.pageControls}>
            <button
              onClick={() => setPage(page + 1)}
              className={cn(styles.button, {
                [styles.hidden]: hidden === true,
                [styles.btn]: hidden === false,
              })}
            >
              <ChevronL />
            </button>
            <button
              onClick={() => setPage(1)}
              className={cn(styles.button, {
                [styles.hidden]: hidden === true,
                [styles.btn]: hidden === false,
              })}
            >
              Last
            </button>
            <button
              onClick={() => setPage(page - 1)}
              className={cn(styles.button, {
                [styles.hidden]: hidden === true,
                [styles.btn]: hidden === false,
              })}
            >
              <ChevronR />
            </button>
          </div>
          <SendMsgForm
            id={params.id}
            nickname={userData.nickname}
            avatarUrl={userData.avatarUrl}
          />
        </>
      )}
      {isLoading && <div>Loading</div>}
      {error && <div>Error</div>}
    </section>
  );
};
