import { useEffect, useRef, useState } from "react";

export const useChatList = () => {
  const messagesEndRef = useRef(null);
  const [hidden, setHidden] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop === 0) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);
  return [messagesEndRef, hidden, scrollToBottom, handleScroll];
};
