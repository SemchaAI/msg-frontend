import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setAll } from "../redux/user";

import styles from "./userInfo.module.css";

import { ReactComponent as Add } from "./images/add.svg";
import { ReactComponent as Decline } from "./images/decline.svg";

import { ReactComponent as Avatar } from "./images/avatar.svg";
import { userApi } from "../services/userServices";
import { API_URL } from "../../shared/config";
export const UserInfo = () => {
  const dispatch = useDispatch();
  const User = useSelector(selectUser);

  // const [avatar, setAvatar] = useState();

  const inputFileRef = useRef();

  const [uploadAvatar, { error }] = userApi.useUploadImageUserMutation();
  const [changeAvatar, { error: avatarError }] =
    userApi.useChangeAvatarUserMutation();
  const [deleteOldAvatar, { error: deleteAvatar }] =
    userApi.useDeleteOldAvatarMutation();
  const [updateAvatars, { error: updAva }] = userApi.useUpdateAvatarsMutation();
  const {
    data,
    isLoading,
    error: getMeError,
    refetch,
  } = userApi.useGetMeQuery(null, { pollingInterval: 5000 });

  const [removeFriendReq, { error: removeErr }] =
    userApi.useRemoveFriendReqMutation();
  const [addFriendReq, { error: addErr }] = userApi.useAddFriendReqMutation();

  const clickHandlerRemove = async (id) => {
    await removeFriendReq(id);
    refetch();
  };
  const clickHandlerAdd = async (id) => {
    await addFriendReq(id);
    refetch();
  };

  useEffect(() => {
    dispatch(setAll(data));
  }, [data, dispatch, changeAvatar]);

  const changeFileHandler = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await uploadAvatar(formData);
      // console.log(data);
      // console.log(data.url);
      const currLink = {
        url: data.url,
      };
      await changeAvatar(currLink);
      await updateAvatars(currLink);
      if (User.avatarUrl) {
        const oldlink = {
          linkImg: User.avatarUrl,
        };
        await deleteOldAvatar(oldlink);
      }
      refetch();
    } catch (error) {
      //  console.log(error);
    }
  };
  return (
    <>
      <section className={styles.allAboutUser}>
        {data && (
          <>
            <div className={styles.personalInfo}>
              {data.avatarUrl ? (
                <img
                  className={styles.img}
                  src={API_URL + data.avatarUrl}
                  width="96px"
                  height="96px"
                  onClick={() => inputFileRef.current.click()}
                  alt="default avatar"
                ></img>
              ) : (
                <>
                  <Avatar onClick={() => inputFileRef.current.click()}></Avatar>
                </>
              )}
              <input
                ref={inputFileRef}
                onChange={changeFileHandler}
                type={"file"}
                hidden
              ></input>
              <div className={styles.userInfo}>
                <h3>{data.nickname}</h3>
                <h3 className={`${styles.email}`}>{data.email}</h3>
                <h3 className={styles.text}>
                  Status: <p>Some day, dev will add this posibility</p>
                </h3>
              </div>
            </div>
          </>
        )}
      </section>
      {/* <div className="inProcess">Here will be some settings in future</div> */}
      {data && data.friendsReq ? (
        <>
          <h3 className={styles.listH3}>Friend requests</h3>
          <ul className={styles.listContainer}>
            {data.friendsReq.map((val, index) => (
              <li key={val._id} className={styles.listCard}>
                <div className={styles.listCardBlock}>
                  {val.avatarUrl ? (
                    <img
                      className={styles.avatar}
                      src={API_URL + val.avatarUrl}
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
                  <div className={styles.cardInfo}>
                    <div className={styles.nickname}>{val.nickname}</div>
                    <div>{val.email}</div>
                  </div>
                </div>
                {/* {!data.friends.map((el) => el._id.includes(data.friends._id))
                  .length ? ( */}
                <>
                  <button
                    onClick={() => clickHandlerAdd(val._id)}
                    className={styles.btnAdd}
                  >
                    <Add />
                  </button>
                  <button
                    onClick={() => clickHandlerRemove(val._id)}
                    className={styles.btnDecline}
                  >
                    <Decline />
                  </button>
                </>
                {/* ) : (
                  <div className={styles.added}>Added</div>
                )} */}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>No requests</div>
      )}
    </>
  );
};
