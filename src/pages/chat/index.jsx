import React from "react";
import { ChatLocal } from "../../entities/Chat/ChatLocal";
import { Header } from "../../entities/Header/Header";
import { Footer } from "../../entities/Nav(Footer)/Footer";

const Chat = () => {
  return (
    <div>
      <Header />
      <ChatLocal />
      <Footer />
    </div>
  );
};
export default Chat;
