import { useState, useRef } from "react";
import api from "../../services/api";

export default function CreatePostCard({ refreshPosts }) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);

    // FIX: reset file input for next upload
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePost = async () => {
    if (!description.trim()) {
      setMsg("Write something before posting.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("description", description);
      if (image) formData.append("image", image);

      await api.post("/posts/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setDescription("");
      setImage(null);
      setPreview(null);

      if (fileInputRef.current) fileInputRef.current.value = "";

      refreshPosts();
    } catch (err) {
      setMsg("Failed to create post.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-5 shadow-xl rounded-2xl w-full">
      <p className="font-semibold mb-3 text-lg">Add Post</p>

      <textarea
        className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        rows={3}
        placeholder="What’s on your mind?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {preview && (
        <div className="relative mt-4">
          <img
            src={preview}
            className="rounded-xl w-full max-h-80 object-contain bg-gray-100"
          />
          <button
            onClick={removeImage}
            className="absolute top-3 right-3 bg-white shadow px-2 py-1 text-sm rounded-full"
          >
            X
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePost}
          disabled={loading}
          className={`px-5 py-2 rounded-xl text-white ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Posting..." : "Post"}
        </button>

        <label className="text-blue-600 cursor-pointer font-medium">
          Add Image
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      {msg && <p className="text-red-500 mt-3">{msg}</p>}
    </div>
  );
}
