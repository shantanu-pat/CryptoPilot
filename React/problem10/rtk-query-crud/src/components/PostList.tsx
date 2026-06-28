import { useGetPostsQuery } from "../services/postApi";
import PostCard from "./PostCard";

interface PostListProps {
  search: string;
}

const PostList = ({
  search,
}: PostListProps) => {
  const {
    data: posts,
    isLoading,
    error,
  } = useGetPostsQuery();

  if (isLoading)
    return <h2>Loading Posts...</h2>;

  if (error)
    return <h2>Error Fetching Posts</h2>;

  const filteredPosts =
    posts?.filter((post) =>
      post.title
        .toLowerCase()
        .includes(search.toLowerCase())
    ) || [];

  return (
    <div>
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
};

export default PostList;