import { ChatList } from "../ChatList/ChatList";
import { useLocalChat } from "./hooks/useLocalChat";

export const ChatLocal = () => {
  const [data, isLoading, error, userData, setPage, page, params] =
    useLocalChat();
  return (
    <>
      {data && userData && (
        <ChatList
          data={data}
          userData={userData}
          setPage={setPage}
          page={page}
          params={params}
        />
      )}
      {isLoading && <div>Loading</div>}
      {error && <div>Error</div>}
    </>
  );
};
