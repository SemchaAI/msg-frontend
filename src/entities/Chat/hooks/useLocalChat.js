import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { userApi } from "../../services/userServices";

export const useLocalChat = () => {
  const params = useParams();
  const [page, setPage] = useState(1);

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

  return useMemo(() => {
    return [data, isLoading, error, userData, setPage, page, params];
  }, [data, isLoading, error, userData, page, params]);
};
