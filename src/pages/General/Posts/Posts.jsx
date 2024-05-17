import { PostCard } from "../../../components/Private/PostCard/index.js";
import { PostsList } from "../../../components/Private/PostsList/index.js";
import { Loader } from "../../../components/General/Loader/index.js";
import { useGetPostsQuery } from "../../../store/posts/postsApi.js";
import notfound from "../../../assets/images/empty.png";
import { Title } from "../../../components/General/Title/index.js";
export const Posts = () => {
  const { data: posts, isError, isLoading } = useGetPostsQuery();
  return (
    <div className="container mx-auto px-3 py-5">
      <PostsList>
        {posts?.length ? (
          posts.map((post) => <PostCard key={post?.id} data={post} />)
        ) : (
          <div className={"flex flex-col items-center justify-centers gap-5"}>
            <img src={notfound} />
            <p
              className={
                "text-3xl tracking-widest text-slate-500 opacity-60 select-none"
              }
            >
              No posts yet #
            </p>
          </div>
        )}

        {isLoading ? <Loader /> : ""}

        {isError ? (
          <h1 className="text-center text-red-500 text-3xl py-10">
            Something went wrong, error...
          </h1>
        ) : (
          ""
        )}
      </PostsList>
    </div>
  );
};
