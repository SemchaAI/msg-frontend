import React from "react";
import { Header } from "../../entities/Header/Header";
import { Footer } from "../../entities/Nav(Footer)/Footer";
import { SearchFriends } from "../../entities/SearchFriends/SearchFriends";

const Search = () => {
  return (
    <div>
      <Header />
      <SearchFriends />
      <Footer />
    </div>
  );
};
export default Search;
