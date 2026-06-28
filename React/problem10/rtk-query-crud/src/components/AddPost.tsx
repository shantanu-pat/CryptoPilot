import { useState } from "react";
import { useAddPostMutation } from "../services/postApi";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [addPost, { isLoading }] =
    useAddPostMutation();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title.trim() || !body.trim())
      return;

    try {
      await addPost({
        title,
        body,
        userId: 1,
      }).unwrap();

      setTitle("");
      setBody("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Post</h2>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Enter body"
        value={body}
        onChange={(e) =>
          setBody(e.target.value)
        }
      />

      <button type="submit">
        {isLoading
          ? "Adding..."
          : "Add Post"}
      </button>
    </form>
  );
};

export default AddPost;