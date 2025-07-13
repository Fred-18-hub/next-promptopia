"use client";

import { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const OtherProfilesPage = ({ params }) => {
  const searchParams = useSearchParams();

  const userId = use(params).creatorId;
  const userName = searchParams.get("username");

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setPosts(data);
      setIsLoading(false);
    };

    userId && fetchPosts();
  }, [userId]);

  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s personalized profile page. 
        Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={posts}
      isLoading={isLoading}
    />
  );
};

export default OtherProfilesPage;
