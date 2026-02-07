import { useEffect, useState } from "react";
import api from "../services/api";
import ProfileCard from "../components/Profile/ProfileCard";
import CreatePostCard from "../components/Posts/CreatePostCard";
import PostCard from "../components/Posts/PostCard";
import { logoutUser } from "../services/auth";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/accounts/profile/");
      setProfile(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts/all/");
      setPosts(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, []);

  return (
    <div className="bg-[#e5e6ec] min-h-screen p-6">

      {/* HEADER ROW */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Social Network</h1>

        <button
          onClick={logoutUser}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT PROFILE CARD */}
        {profile && <ProfileCard user={profile} />}

        {/* RIGHT SIDE (Create + Posts) */}
        <div className="md:col-span-2 space-y-6">

          {/* CREATE POST */}
          <CreatePostCard refreshPosts={fetchPosts} />

          {/* POSTS LIST */}
          {posts.map((p) => (
            <PostCard key={p.id} post={p} refreshPosts={fetchPosts} />
          ))}
        </div>
      </div>
    </div>
  );
}
