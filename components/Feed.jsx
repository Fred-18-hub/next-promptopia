"use client";

import { useState, useEffect, useMemo } from "react";
import PromptCard from "./PromptCard";
import Loading from "@components/Loading";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredPosts = useMemo(() => {
    const searchTextLower = searchText.toLowerCase();

    return posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(searchTextLower) ||
        post.tag.toLowerCase().includes(searchTextLower) ||
        post.creator.username.toLowerCase().includes(searchTextLower)
    );
  }, [posts, searchText]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      {isLoading ? (
        <div className="mt-16">
          <Loading />
        </div>
      ) : (
        <PromptCardList
          data={filteredPosts}
          handleTagClick={(tag) => setSearchText(tag)}
        />
      )}
    </section>
  );
};

export default Feed;
