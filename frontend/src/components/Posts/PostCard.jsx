import api from "../../services/api";
import { useState } from "react";
import userImage from "../../assets/userImage.png";

export default function PostCard({ post, refreshPosts }) {
  const [loading, setLoading] = useState(false);

  const react = async (value) => {
    if (loading) return;
    setLoading(true);

    try {
      await api.post(`/posts/react/${post.id}/`, { value });
      refreshPosts();
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  // 🗑 DELETE POST
  const deletePost = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await api.delete(`/posts/delete/${post.id}/`);
      refreshPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow relative">
      
      {/* ❌ DELETE BUTTON (OWNER ONLY) */}
      {post.is_owner && (
        <button
          onClick={deletePost}
          className="absolute top-3 right-3 text-black text-xl hover:text-red-600"
          title="Delete post"
        >
          X
        </button>
      )}

      {/* USER INFO */}
      <div className="flex items-center gap-3 mb-2">
        <img
          src={post.user_profile_pic || userImage}
          className="w-10 h-10 rounded-full object-cover"
          alt="user"
        />
        <p className="font-semibold">{post.user}</p>
      </div>

      {/* CONTENT */}
      <p className="mb-2">{post.description}</p>

      <p className="text-gray-500 text-sm">
        Posted on - {post.created_at}
      </p>

      {/* POST IMAGE */}
      {post.image && (
        <img
          src={post.image}
          className="rounded-lg mt-2 w-full max-h-[500px] object-contain"
          alt="post"
        />
      )}

      {/* LIKE / DISLIKE */}
      <div className="flex gap-6 mt-4 text-blue-600 cursor-pointer">
        <span onClick={() => react(1)}>
          👍 Like {post.likes}
        </span>
        <span onClick={() => react(-1)}>
          👎 Dislike {post.dislikes}
        </span>
      </div>

      {loading && (
        <p className="text-gray-400 text-sm mt-2">Updating...</p>
      )}
    </div>
  );
}
