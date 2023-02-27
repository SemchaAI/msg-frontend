import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setAll } from "../redux/user";

import styles from "./userInfo.module.css";

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
  } = userApi.useGetMeQuery();

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
      <div className="inProcess">Here will be some settings in future</div>
    </>
  );
};
