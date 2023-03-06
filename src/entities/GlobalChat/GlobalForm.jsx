import { ChatList } from "../ChatList/ChatList";
import { useGlobalChat } from "./hooks/useGlobalChat";

export const GlobalForm = () => {
  const [data, isLoading, error, userData, setPage, page] = useGlobalChat();

  return (
    <>
      {data && (
        <ChatList
          data={data}
          userData={userData}
          setPage={setPage}
          page={page}
          params={{ id: null }}
        />
      )}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
    </>
  );
};
