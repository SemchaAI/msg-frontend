import React from "react";
import { Header } from "../../entities/Header/Header";
import { MiniChatsList } from "../../entities/MiniChats/MiniChatsList";
import { Footer } from "../../entities/Nav(Footer)/Footer";

const Chats = () => {
  return (
    <div>
      <Header />
      <MiniChatsList />
      <Footer />
    </div>
  );
};
export default Chats;
