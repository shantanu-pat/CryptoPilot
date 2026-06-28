import type { Post } from "../types/post";
import EditPost from "./EditPost";
import { useDeletePostMutation } from "../services/postApi";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [deletePost, { isLoading }] =
    useDeletePostMutation();

  const handleDelete = async () => {
    try {
      await deletePost(post.id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h3>{post.title}</h3>

      <p>{post.body}</p>

      <div className="actions">
        <EditPost post={post} />

        <button
          onClick={handleDelete}
          disabled={isLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;