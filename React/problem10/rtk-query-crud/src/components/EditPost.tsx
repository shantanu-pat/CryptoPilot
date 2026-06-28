import { useState } from "react";
import type { Post } from "../types/post";
import { useUpdatePostMutation } from "../services/postApi";

interface EditPostProps {
  post: Post;
}

const EditPost = ({
  post,
}: EditPostProps) => {
  const [isEditing, setIsEditing] =
    useState(false);

  const [title, setTitle] = useState(
    post.title
  );

  const [body, setBody] = useState(
    post.body
  );

  const [updatePost] =
    useUpdatePostMutation();

  const handleUpdate = async () => {
    try {
      await updatePost({
        id: post.id,
        title,
        body,
      }).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() =>
          setIsEditing(true)
        }
      >
        Edit
      </button>
    );
  }

  return (
    <div>
      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        value={body}
        onChange={(e) =>
          setBody(e.target.value)
        }
      />

      <button onClick={handleUpdate}>
        Save
      </button>
    </div>
  );
};

export default EditPost;