import { useEffect, useRef, useState } from "react";
import { userApi } from "../../services/userServices";

export const useGlobalChat = () => {
  const [page, setPage] = useState(1);

  const { data: userData } = userApi.useGetMeQuery(1, {
    // skip: user.user,
  });
  // dispatch(setAll(userData));
  const { data, isLoading, error, refetch } = userApi.useGetAllMessagesQuery(
    page,
    { skip: !userData, pollingInterval: 2000 }
  );

  return [data, isLoading, error, userData, setPage, page, { id: null }];
};
