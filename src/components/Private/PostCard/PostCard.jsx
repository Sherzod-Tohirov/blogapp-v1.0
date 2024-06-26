import axios from "axios";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { MdNoAccounts } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { meContext } from "../../../context/meContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useEditPostMutation,
  useGetPostByIdQuery,
} from "../../../store/posts/postsApi";
import { userCommentSchema } from "./utils";
import { notificationContext } from "../../../context/notificationContext";
import { PostComment } from "./components/PostComment/index.js";
export const PostCard = ({ data }) => {
  const { me } = useContext(meContext);
  const { setMsg } = useContext(notificationContext);
  const [user, setUser] = useState({});
  const {
    handleSubmit,
    register,
    reset,
    formState: { isError, isLoading },
  } = useForm({
    resolver: yupResolver(userCommentSchema),
  });
  const post = useGetPostByIdQuery(data?.id);
  const [liked, setLiked] = useState(false);
  const [unliked, setUnliked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showActionBtns, setShowActionBtns] = useState(true);
  const [mutation, { isLoading: addCommentLoading, isError: addCommentError }] =
    useEditPostMutation();
  const date = new Date();
  const [scope, animate] = useAnimate({});
  const [scalePostImage, setScalePostImage] = useState(false);
  const itemRef = useRef();
  useEffect(() => {
    if (data?.likes?.find((item) => item.user_id == me.id)) {
      setLiked(true);
    }

    if (data?.dislikes?.find((item) => item.user_id == me.id)) {
      setUnliked(true);
    }
  }, []);
  useEffect(() => {
    if (scalePostImage) {
      animate(scope.current, { scale: 4, x: 400, y: 100 });
    } else {
      animate(scope.current, { scale: 1, y: 0, x: 0 });
    }
  }, [scalePostImage]);
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
        dislikes: unliked
          ? post?.data?.dislikes?.length
            ? [...post.data.dislikes.filter((item) => item.user_id != me.id)]
            : []
          : post?.data?.dislikes?.length
            ? [...post.data.dislikes]
            : [],
      });
      if (unliked) {
        setUnliked(false);
      }
    } else {
      setLiked(false);
      editPost({
        ...post.data,
        likes: [...post.data.likes.filter((item) => item.user_id !== me.id)],
      });
    }
  }

  function handleUnlike() {
    if (!data?.dislikes) {
      editPost({
        ...post.data,
        dislikes: [],
      });
    }

    const dislikeExists = post.data?.dislikes?.find(
      (item) => item.user_id === me.id,
    );

    if (!dislikeExists) {
      setUnliked(true);
      editPost({
        ...post.data,
        dislikes: [
          ...post.data.dislikes,
          {
            user_id: me.id,
            user_firstname: me.firstname,
            user_lastname: me.lastname,
            user_email: me.email,
            user_avatar: me.avatar,
          },
        ],
        likes: liked
          ? post?.data?.likes?.length
            ? [...post.data.likes.filter((item) => item.user_id != me.id)]
            : []
          : post?.data?.likes?.length
            ? [...post.data.likes]
            : [],
      });
      if (liked) {
        setLiked(false);
      }
    } else {
      setUnliked(false);
      editPost({
        ...post.data,
        dislikes: [
          ...post.data.dislikes.filter((item) => item.user_id !== me.id),
        ],
      });
    }
  }

  function handleComment() {
    setShowComments((prev) => !prev);
  }

  function onCommentSubmit({ user_comment }) {
    mutation({
      ...data,
      comments: data?.comments
        ? [
            ...data.comments,
            {
              id: window.crypto.randomUUID(),
              body: user_comment,
              user_id: me?.id,
              user_fullname: `${me.firstname} ${me.lastname}`,
              user_avatar: me?.avatar,
              replies: [],
              likes: [],
              dislikes: [],
              timestamp: date.getTime(),
            },
          ]
        : [],
    });
    reset();
    if (!addCommentError) {
      setMsg("Your comment is added successfully !");
    }
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
        // layout
        // layoutId="underline"
        // transition={{
        //   type: "spring",
        //   stiffness: 800,
        //   bounceStiffness: 100,
        //   duration: 0.2,
        // }}
        variants={item}
        className="sm:w-full p-8 shadow-md shadow-slate-500 rounded-md flex flex-col transition"
        ref={itemRef}
      >
        <div className="flex items-start">
          {scalePostImage ? (
            <div
              className={"overlay"}
              onClick={() => setScalePostImage(false)}
            ></div>
          ) : (
            ""
          )}
          <div className={"relative z-40"} ref={scope}>
            <motion.img
              src={data?.image || "../../../../public/react.png"}
              onClick={() => setScalePostImage((p) => !p)}
              className={`object-contain rounded-md flex-shrink-0 cursor-pointer `}
              width={250}
            />
            {scalePostImage ? (
              <button
                className={
                  "flex items-center justify-center p-[2px] rounded-full bg-white text-black absolute top-[-15px] right-[-8px]"
                }
                onClick={() => setScalePostImage(false)}
              >
                {" "}
                <IoClose size={9} />
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col px-5 w-full">
            <h3 className="text-slate-800 text-3xl mb-3">{data?.title}</h3>
            <p className="text-slate-600 mb-8 text-lg md:pr-10">{data?.body}</p>
            <div className="flex flex-col mb-5">
              <p className="text-slate-600 font-medium flex items-center gap-2 mb-2">
                <span className="font-semibold text-black mr-2">
                  Posted by:
                </span>{" "}
                {user.id ? (
                  <img
                    className="object-cover rounded-full post-img"
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
            <div className="flex items-center gap-3">
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
                {post?.isSuccess && post?.data?.likes?.length
                  ? post.data.likes.length
                  : 0}
              </button>
              <button
                className={`flex items-center gap-1 text-lg font-medium hover:opacity-75 transition`}
                title="negative feedback"
                onClick={handleUnlike}
              >
                {unliked ? (
                  <FaThumbsDown
                    id="thumbsdown-btn"
                    data-id={post.isSuccess && post.data.id}
                  />
                ) : (
                  <FaRegThumbsDown
                    id="thumbsdown-btn"
                    data-id={post.isSuccess && post.data.id}
                  />
                )}
                {post?.isSuccess ? post?.data?.dislikes?.length || 0 : ""}
              </button>
              <motion.button
                className="flex items-center gap-1 text-lg font-medium"
                onClick={handleComment}
                whileTap={{ scale: 0.89 }}
                title="write comment"
              >
                {showComments ? <FaComment /> : <FaRegComment />}{" "}
                {post?.isSuccess && (post?.data?.comments?.length || 0)}
              </motion.button>
            </div>
            {showComments ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col py-5 gap-8"
              >
                <div className="flex">
                  <div className="flex items-start gap-3 w-full">
                    <div className="relative flex">
                      <img
                        className="rounded-full w-8 h-8 object-contain"
                        src={me?.avatar || "../../../../public/default.webp"}
                        alt="Image"
                      />
                      <span className="absolute z-10 flex w-2 h-2 rounded-full  bg-green-400 bottom-0 right-0"></span>
                    </div>
                    <div className="flex flex-col gap-8 w-full">
                      <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit(onCommentSubmit)}
                      >
                        <textarea
                          {...register("user_comment")}
                          className={`w-full min-h-[70px] max-h-[150px] p-2 font-medium border rounded-sm ${
                            isError ? "border-red-400" : "border-slate-400"
                          }`}
                          placeholder="Write your comment..."
                          onFocus={() => setShowActionBtns(true)}
                        ></textarea>
                        {showActionBtns ? (
                          <AnimatePresence>
                            <motion.div className="flex items-center gap-2 w-full">
                              <motion.button
                                type="submit"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-blue-500 text-white rounded-md p-1 px-3"
                              >
                                Send
                              </motion.button>
                              <motion.button
                                type="button"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-red-400 text-white rounded-md p-1 px-3"
                                onClick={() => setShowActionBtns(false)}
                              >
                                Cancel
                              </motion.button>
                            </motion.div>
                          </AnimatePresence>
                        ) : (
                          ""
                        )}
                      </form>
                      <AnimatePresence>
                        <ul className="list-unstyled flex flex-col gap-6">
                          {data?.comments?.length ? (
                            data?.comments.map((comment) => (
                              <PostComment
                                key={comment.id}
                                comment={comment}
                                data={data}
                              />
                            ))
                          ) : (
                            <li className="text-lg font-mono select-none opacity-50">
                              No comments yet #
                            </li>
                          )}
                        </ul>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="text-lg text-slate-600 flex items-center gap-2"
            onClick={() => setShowComments((prev) => !prev)}
          >
            {showComments ? <IoIosArrowUp /> : <IoIosArrowDown />}
            Show {showComments ? "less" : "more"}
          </button>
        </div>
      </motion.li>
    </AnimatePresence>
  );
};
