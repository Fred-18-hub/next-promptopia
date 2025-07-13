"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
      setIsLoading(false);
    };

    session?.user.id && fetchPosts();
  }, [session]);

  const handleEdit = (postId) => {
    router.push(`/update-prompt?id=${postId.toString()}`);
  };

  const handleDelete = async (postId) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${postId.toString()}`, {
          method: "DELETE",
        });

        if (response.ok)
          setPosts((prev) => prev.filter((p) => p._id !== postId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. 
        Share your exceptional prompts and inspire others with the power of your imagination."
      data={posts}
      isLoading={isLoading}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
