import { useState } from "react";

import AddPost from "./components/AddPost";
import PostList from "./components/PostList";
import SearchBar from "./components/SearchBar";

import "./App.css";

function App() {
  const [search, setSearch] =
    useState("");

  return (
    <div className="container">
      <h1>RTK Query CRUD App</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <AddPost />

      <PostList search={search} />
    </div>
  );
}

export default App;