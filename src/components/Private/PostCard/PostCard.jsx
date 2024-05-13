import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { MdNoAccounts } from "react-icons/md";
import { meContext } from "../../../context/meContext";
import {
  useEditPostMutation,
  useGetPostByIdQuery,
} from "../../../store/posts/postsApi";
export const PostCard = ({ data }) => {
  const { me } = useContext(meContext);
  const [user, setUser] = useState({});
  const post = useGetPostByIdQuery(data?.id);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const itemRef = useRef();
  useEffect(() => {
    if (data?.likes?.find((item) => item.user_id == me.id)) {
      setLiked(true);
    }
  }, []);
  const [
    editPost,
    { isSuccess: editSuccess, isError: editIsError, error: editError },
  ] = useEditPostMutation();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${data?.user_id}`)
      .then((res) => {
        if (res.status === 200) {
          setUser(res?.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function handleLike() {
    const likeExists =
      post.data.likes.length &&
      post.data.likes.find((item) => item.user_id == me.id);
    console.log("Like exists", likeExists);
    if (!likeExists) {
      setLiked(true);
      editPost({
        ...post.data,
        likes: [
          ...post.data.likes,
          {
            user_id: me.id,
            user_firstname: me.firstname,
            user_lastname: me.lastname,
            user_email: me.email,
            user_avatar: me.avatar,
          },
        ],
      });
    } else {
      setLiked(false);
      editPost({
        ...post.data,
        likes: [...post.data.likes.filter((item) => item.user_id !== me.id)],
      });
    }
  }

  function handleComment(e) {
    setShowComments((prev) => !prev);
    console.log(itemRef.current.style);
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      <motion.li
        variants={item}
        className="sm:w-full p-8 shadow-md shadow-slate-500 rounded-md flex flex-col transition"
        ref={itemRef}
      >
        <div className="flex items-start">
          <img
            src={data?.image || "../../../../public/react.png"}
            className="object-contain rounded-md flex-shrink-0"
            width={250}
          />
          <div className="flex flex-col px-5">
            <h3 className="text-slate-800 text-3xl mb-3">{data?.title}</h3>
            <p className="text-slate-600 mb-8 text-lg md:pr-10">{data?.body}</p>
            <div className="flex flex-col mb-5">
              <p className="text-slate-600 font-medium flex items-center gap-2 mb-2">
                <span className="font-semibold text-black mr-2">
                  Posted by:
                </span>{" "}
                {user.id ? (
                  <img
                    className="object-cover rounded-full"
                    src={user?.avatar || "../../../../public/default.webp"}
                    width={25}
                    height={25}
                  />
                ) : (
                  <MdNoAccounts className="text-red-500 w-[25px] h-[25px]" />
                )}{" "}
                {`${user?.firstname || "Account"} ${
                  user?.lastname || "deleted"
                }`}
              </p>
              <time
                className="flex items-center gap-2 font-medium font-mono text-slate-600"
                dateTime="00:00"
              >
                <CiCalendar className="text-xl" />
                {data?.date}
              </time>
            </div>
            <div className="flex items-center gap-4">
              <button
                className={`flex items-center gap-1 text-lg font-medium hover:opacity-75 transition`}
                title="positive feedback"
                onClick={handleLike}
              >
                {liked ? (
                  <FaThumbsUp
                    id="thumbsup-btn"
                    data-id={post.isSuccess && post.data.id}
                  />
                ) : (
                  <FaRegThumbsUp
                    id="thumbsup-btn"
                    data-id={post.isSuccess && post.data.id}
                  />
                )}
                {post?.isSuccess && post?.data?.likes?.length}
              </button>
              <button
                className={`flex items-center gap-1 text-lg font-medium hover:opacity-75 transition`}
                title="positive feedback"
                onClick={handleLike}
              >
                <FaRegThumbsDown />
                {post?.isSuccess && post?.data?.likes?.length}
              </button>
              <motion.button
                className="flex items-center gap-1 text-lg font-medium"
                onClick={handleComment}
                whileTap={{ scale: 0.89 }}
                title="write comment"
              >
                <FaRegComment />{" "}
                {post?.isSuccess && post?.data?.comments?.length}
              </motion.button>
            </div>
            {showComments ? (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="flex flex-col py-5 gap-8">
                <div className="flex">
                  <div className="flex items-start gap-3 w-full">
                    <div className="relative flex">
                      <img
                        className="rounded-full w-8 h-8 object-contain"
                        src={data?.avatar || "../../../../public/default.webp"}
                        alt="Image"
                      />
                      <span className="absolute z-10 flex w-2 h-2 rounded-full  bg-green-400 bottom-0 right-0"></span>
                    </div>
                    <div className="flex flex-col gap-8 w-full">
                      <form className="flex flex-col gap-4">
                        <textarea
                          className="w-full min-h-[70px] max-h-[150px] p-2 font-medium border border-slate-400 rounded-sm"
                          placeholder="Write your comment..."
                        ></textarea>
                        <div className="flex items-center gap-2 w-full">
                          <button
                            type="button"
                            className="bg-blue-500 text-white rounded-md p-1 px-3"
                          >
                            Post it
                          </button>
                          <button
                            type="button"
                            className="bg-red-400 text-white rounded-md p-1 px-3"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                      <ul className="list-unstyled flex flex-col gap-6">
                        <li className="flex items-start gap-4">
                          <img
                            className="rounded-full w-8 h-8 object-contain"
                            src="../../../../public/default.webp"
                            alt=""
                          />
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-4">
                              <h3 className="m-0 font-medium">John Doe</h3>
                              <time className="text-slate-300">3h 4m ago</time>
                            </div>
                            <p>Something comment</p>
                            <div className="flex items-center gap-2 mt-3">
                              <button className="text-slate-500 font-medium">
                                Reply
                              </button>
                              <span className="flex w-1 h-1 rounded-full bg-slate-600"></span>
                              <button className="flex items-center gap-1 font-medium">
                                <FaRegThumbsUp
                                  id="thumbsup-btn"
                                  data-id={post.isSuccess && post.data.id}
                                />{" "}
                                120
                              </button>
                              <button className="flex items-center gap-1 font-medium">
                                <FaRegThumbsDown
                                  id="thumbsup-btn"
                                  data-id={post.isSuccess && post.data.id}
                                />{" "}
                                0
                              </button>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <img
                            className="rounded-full w-8 h-8 object-contain"
                            src="../../../../public/default.webp"
                            alt=""
                          />
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-4">
                              <h3 className="m-0 font-medium">Bob doe</h3>
                              <time className="text-slate-300">3h 4m ago</time>
                            </div>
                            <p>
                              A Promise is a proxy for a value not necessarily
                              known when the promise is created. It allows you
                              to associate handlers with an asynchronous
                              actions eventual success value or failure reason.
                              This lets asynchronous methods return values like
                              synchronous methods: instead of immediately
                              returning the final value, the asynchronous method
                              returns a promise to supply the value at some
                              point in the future. A Promise is in one of these
                              states: pending: initial state, neither fulfilled
                              nor rejected. fulfilled: meaning that the
                              operation was completed successfully. rejected:
                              meaning that the operation failed.
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <button className="text-slate-500 font-medium">
                                Reply
                              </button>
                              <span className="flex w-1 h-1 rounded-full bg-slate-600"></span>
                              <button className="flex items-center gap-1 font-medium">
                                <FaRegThumbsUp
                                  id="thumbsup-btn"
                                  data-id={post.isSuccess && post.data.id}
                                />{" "}
                                120
                              </button>
                              <button className="flex items-center gap-1 font-medium">
                                <FaRegThumbsDown
                                  id="thumbsup-btn"
                                  data-id={post.isSuccess && post.data.id}
                                />{" "}
                                0
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              ""
            )}
          </div>
        </div>
      </motion.li>
    </AnimatePresence>
  );
};
