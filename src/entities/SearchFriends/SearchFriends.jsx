import React, { useEffect, useState } from "react";

import styles from "./SearchFriends.module.css";
import cn from "classnames";

import { userApi } from "../services/userServices";
import { API_URL } from "../../shared/config";

import { ReactComponent as Search } from "./images/search.svg";
import { BeatLoader } from "react-spinners";

export const SearchFriends = () => {
  const [skip, setSkip] = useState(true);
  const [query, setQuery] = useState("");
  const [nickname, setNickname] = useState("");
  const {
    data: userData,
    isLoading,
    error,
  } = userApi.useFindUserQuery(nickname, { skip });
  const {
    data: randomUsers,
    isLoading: isloadingRandom,
    error: randomError,
    refetch: randRefetch,
  } = userApi.useFindRandomQuery();
  const {
    data: meData,
    isLoading: meIsLoading,
    error: MeError,
    refetch,
  } = userApi.useGetMeQuery();

  const [addFriend, { error: addFriendError }] = userApi.useAddFriendMutation();

  const handleChange = () => {
    setNickname(query);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setNickname(query);
    }
  };
  const clickHandler = async (val) => {
    await addFriend({
      id: val._id,
      nickname: meData.nickname,
      email: meData.email,
      avatarUrl: meData.avatarUrl,
    });
    randRefetch();
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      handleChange();
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [query]);

  if (meData) {
    const ids = meData.friends.map((el) => el._id);
  }
  return (
    <section className={styles.searchSection}>
      <div className={styles.searchBlock}>
        <h1>Find friend</h1>
        <div className={styles.searchInput}>
          <Search className={styles.img} />
          <input
            type="text"
            className={styles.input}
            placeholder="Search"
            onChange={(event) => setQuery(event.target.value)}
            onKeyPress={handleKeyPress}
            autoComplete="off"
          />
          <button
            className={styles.btn}
            onClick={() => setSkip((prev) => !prev)}
          >
            Search
          </button>
        </div>
      </div>
      {randomUsers && !userData && (
        <>
          <ul className={styles.listContainer}>
            {[...randomUsers.randomUsers].map((val, index) => (
              <li key={val._id} className={styles.listCard}>
                <div className={styles.listCardBlock}>
                  <img
                    className={styles.avatar}
                    src={API_URL + val.avatarUrl}
                    height={"40px"}
                    width={"40px"}
                    alt="avatar"
                  ></img>
                  <div className={styles.cardInfo}>
                    <div className={styles.nickname}>{val.nickname}</div>
                    <div>{val.email}</div>
                  </div>
                </div>
                {/* {console.log(val.friendsReq.map((el) => el._id))}
                {console.log(meData._id)}
                {console.log(
                  !val.friendsReq.map((el) => el._id).includes(meData._id)
                )} */}
                {!meData.friends.map((el) => el.userId).includes(val._id) &&
                !val.friendsReq.map((el) => el._id).includes(meData._id) ? (
                  <button
                    className={styles.btn}
                    onClick={() => clickHandler(val)}
                  >
                    add
                  </button>
                ) : (
                  <div className={styles.added}>Added</div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      {userData && (
        <div className={styles.listCard}>
          <img
            className={styles.avatar}
            src={API_URL + userData.avatarUrl}
            height={"40px"}
            width={"40px"}
            alt="avatar"
          ></img>
          <div className={styles.cardInfo}>
            <div className={styles.nickname}>{userData.nickname}</div>
            <div>{userData.email}</div>
          </div>
          {meData &&
          !userData.friendsReq.map((el) => el._id.includes(meData._id))
            .length ? (
            <button
              className={styles.btn}
              onClick={() => clickHandler(userData)}
            >
              add
            </button>
          ) : (
            <div className={styles.added}>Added</div>
          )}
        </div>
      )}
      {isloadingRandom && <BeatLoader color="#36d7b7" />}
    </section>
  );
};
