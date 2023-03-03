import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../shared/config";
import { selectUser, setAll } from "../redux/user";
import { userApi } from "../services/userServices";

import { ReactComponent as ChevronL } from "./images/chevronL.svg";
import { ReactComponent as ChevronR } from "./images/chevronR.svg";

import styles from "./globalChat.module.css";
import cn from "classnames";
import { SendMsgForm } from "../../features/sendMsg/SendMsgForm";

export const GlobalForm = () => {
  // const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  // const user = useSelector(selectUser);
  // console.log(user);
  const [page, setPage] = useState(1);
  const [hidden, setHidden] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop === 0) {
      setHidden(false);
      //console.log(hidden);
    } else {
      setHidden(true);
    }
    // console.log(event.currentTarget.scrollTop);
    // console.log(hidden);
  };

  const { data: userData } = userApi.useGetMeQuery(1, {
    // skip: user.user,
  });
  // dispatch(setAll(userData));
  const { data, isLoading, error, refetch } = userApi.useGetAllMessagesQuery(
    page,
    { skip: !userData, pollingInterval: 2000 }
  );

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <section className={styles.globalChat}>
      {data && userData && (
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
                    <img
                      className={styles.avatar}
                      src={API_URL + elem.avatarUrl}
                      height={"40px"}
                      width={"40px"}
                      alt="avatar"
                    ></img>
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
