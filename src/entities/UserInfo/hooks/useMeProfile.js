import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setAll } from "../../redux/user";
import { userApi } from "../../services/userServices";

import React from "react";

export const useMeProfile = (idObj) => {
  const [removeFriendReq, { error: removeErr }] =
    userApi.useRemoveFriendReqMutation();
  const [addFriendReq, { error: addErr }] = userApi.useAddFriendReqMutation();

  const [statusFlag, setStatusFlag] = useState(true);

  const clickHandlerRemove = async (id) => {
    await removeFriendReq(id);
    refetch();
  };
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
  // const {
  //   data,
  //   isLoading,
  //   error: getMeError,
  //   refetch,
  // } = userApi.useGetMeQuery(null, { pollingInterval: 5000 });
  const { data, isLoading, getMeError, refetch } = userApi.useGetUserQuery(
    { id: idObj },
    { pollingInterval: 5000 }
  );

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
      if (User.avatarUrl && User.avatarUrl !== "/uploads/avatar.svg") {
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
  return [
    data,
    inputFileRef,
    changeFileHandler,
    setStatusFlag,
    statusFlag,
    clickHandlerAdd,
    clickHandlerRemove,
  ];
};
