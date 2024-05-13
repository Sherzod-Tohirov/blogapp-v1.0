import { PostCard } from "../../../components/Private/PostCard";
import { PostsList } from "../../../components/Private/PostsList";
import { Loader } from "../../../components/General/Loader";
import { useGetPostsQuery } from "../../../store/posts/postsApi";

export const Posts = () => {
    const {data: posts, isError, isLoading} = useGetPostsQuery();
    return (
      <div className="container mx-auto px-3">
          <h1 className="text-center text-4xl mt-8 mb-10">Posts</h1>
          <PostsList>
              {
                posts?.length ? posts.map(post => <PostCard key={post?.id} data={post} />) : ""
              }

              {
                isLoading ? <Loader /> : ""
              }

              {
                isError ? <h1 className="text-center text-red-500 text-3xl py-10">Something went wrong, error...</h1> : ""
              }
          </PostsList>
      </div>
    )
  }
  