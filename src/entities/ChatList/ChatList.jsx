import React, { useEffect, useState } from "react";
import styles from "./chatList.module.css";
import cn from "classnames";
import { API_URL } from "../../shared/config";

import { ReactComponent as ChevronL } from "./images/chevronL.svg";
import { ReactComponent as ChevronR } from "./images/chevronR.svg";
import { SendMsgForm } from "../../features/sendMsg/SendMsgForm";
import { useChatList } from "./hooks/useChatList";
import { Avatar } from "../../features/avatar/Avatar";
import { useNavigate } from "react-router-dom";

export const ChatList = ({ data, userData, setPage, page, params }) => {
  const [messagesEndRef, hidden, scrollToBottom, handleScroll] = useChatList();

  const navigate = useNavigate();
  const clickHandler = (id) => {
    navigate("/profile", {
      state: {
        id: id,
      },
    });
  };

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
                    [styles.unRead]: elem.saw === false,
                  })}
                >
                  <p className={styles.message}>{elem.text}</p>
                  <div
                    className={styles.userInfo}
                    onClick={() => clickHandler(elem.user)}
                  >
                    <h3 className={styles.nickname}>{elem.nickname}</h3>
                    <Avatar data={elem} size={40} />
                  </div>
                </li>
              ))}
            <div ref={messagesEndRef} />
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
            scroll={scrollToBottom}
            id={params.id}
            nickname={userData.nickname}
            avatarUrl={userData.avatarUrl}
            gender={userData.gender}
          />
        </>
      )}
    </section>
  );
};
