import { refineTimestamp, userReplySchema } from "../../utils/index.js";
import {
  FaComment,
  FaRegComment,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import {
  useEditPostMutation,
  useGetPostByIdQuery,
} from "../../../../../store/posts/postsApi.js";
import { notificationContext } from "../../../../../context/notificationContext.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { meContext } from "../../../../../context/meContext.jsx";
import { ReplyComment } from "./components/ReplyComment/index.js";

export function PostComment({ comment, data }) {
  const { me } = useContext(meContext);
  const date = new Date();
  const [replyInputShow, setReplyInputShow] = useState(false);
  const [commentLiked, setCommentLiked] = useState(false);
  const [commentUnliked, setCommentUnliked] = useState(false);
  const [seeReplies, setSeeReplies] = useState(false);
  const [
    mutation,
    {
      isLoading: editPostLoading,
      isError: editPostError,
      status: editPostStatus,
    },
  ] = useEditPostMutation();
  const post = useGetPostByIdQuery(data?.id);
  const bodyCommentRef = useRef();
  const commentActionButtonRef = useRef();
  const { setMsg } = useContext(notificationContext);
  const [commentEditable, setCommentEditable] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { isError, isLoading },
  } = useForm({
    resolver: yupResolver(userReplySchema),
  });
  useEffect(() => {
    const foundLike = comment.likes.find((item) => item.user_id === me.id);
    const foundDislike = comment.dislikes.find(
      (item) => item.user_id === me.id,
    );

    if (foundLike) {
      setCommentLiked(true);
    }

    if (foundDislike) {
      setCommentUnliked(true);
    }
  }, []);
  function handleDeleteComment(id) {
    const filteredData = data.comments.filter((item) => item.id !== id);
    mutation({
      ...data,
      comments: [...filteredData],
    });
    if (!isError) {
      setMsg("Post is deleted successfully!");
    }
  }
  function handleEditComment(id, new_value) {
    setCommentEditable((prev) => !prev);
    let index;
    for (let i = 0; i < data.comments.length; i++) {
      if (data.comments[i].id === id) {
        index = i;
        break;
      }
    }
    const leftSide = data.comments.slice(0, index);
    const rightSide = data.comments.slice(index + 1);
    mutation({
      ...post.data,
      comments: [
        ...leftSide,
        { ...comment, body: new_value.replace(/<[^>]+>/g, "") },
        ...rightSide,
      ],
    });
    if (editPostStatus === "fulfilled" && !editPostLoading) {
      setMsg("Post is edited successfully !");
    }
  }
  function onReplySubmit({ reply_comment }) {
    const filteredComments = data.comments.filter(
      (item) => item?.id !== comment?.id,
    );
    mutation({
      ...data,
      comments: [
        ...filteredComments,
        {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: window.crypto.randomUUID(),
              body: reply_comment,
              user_id: me?.id,
              user_fullname: `${me.firstname} ${me.lastname}`,
              user_avatar: me?.avatar,
              timestamp: date.getTime(),
            },
          ],
        },
      ],
    });
    reset();
    if (!editPostError) {
      setMsg(`Your replied to ${comment.user_fullname}'s comment`);
    }
  }

  function handleCommentLike() {
    let index;
    for (let i = 0; i < data.comments.length; i++) {
      if (data.comments[i].id === comment.id) {
        index = i;
        break;
      }
    }
    const leftSide = data.comments.slice(0, index);
    const rightSide = data.comments.slice(index + 1);
    const foundItem = comment.likes.find((item) => item.user_id === me.id);
    const filteredItem = comment.likes.filter((item) => item.user_id !== me.id);
    const filteredDislikeItems = comment.dislikes.filter(
      (item) => item.user_id !== me.id,
    );
    mutation({
      ...data,
      comments: [
        ...leftSide,
        {
          ...comment,
          likes: !foundItem
            ? [
                ...comment.likes,
                {
                  id: window.crypto.randomUUID(),
                  user_firstname: me.firstname,
                  user_lastname: me.lastname,
                  user_email: me.email,
                  user_avatar: me?.avatar,
                  user_id: me.id,
                },
              ]
            : [...filteredItem],
          dislikes: !foundItem
            ? [...filteredDislikeItems]
            : [...comment.dislikes],
        },
        ...rightSide,
      ],
    });
    if (!foundItem) {
      setCommentLiked(true);
      setCommentUnliked(false);
    } else {
      setCommentLiked(false);
    }
  }
  function handleCommentDislike() {
    let index;
    for (let i = 0; i < data.comments.length; i++) {
      if (data.comments[i].id === comment.id) {
        index = i;
        break;
      }
    }
    const leftSide = data.comments.slice(0, index);
    const rightSide = data.comments.slice(index + 1);
    const foundItem = comment.dislikes.find((item) => item.user_id === me.id);
    const filteredItem = comment.dislikes.filter(
      (item) => item.user_id !== me.id,
    );
    const filteredLikeItems = comment.likes.filter(
      (item) => item.user_id !== me.id,
    );
    mutation({
      ...data,
      comments: [
        ...leftSide,
        {
          ...comment,
          likes: !foundItem ? [...filteredLikeItems] : [...comment.likes],
          dislikes: !foundItem
            ? [
                ...comment.dislikes,
                {
                  id: window.crypto.randomUUID(),
                  user_firstname: me.firstname,
                  user_lastname: me.lastname,
                  user_email: me.email,
                  user_avatar: me?.avatar,
                  user_id: me.id,
                },
              ]
            : [...filteredItem],
        },
        ...rightSide,
      ],
    });
    if (!foundItem) {
      setCommentUnliked(true);
      setCommentLiked(false);
    } else {
      setCommentUnliked(false);
    }
  }

  return (
    <motion.li
      key={comment.id}
      className="flex items-start gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img
        className="rounded-full sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain"
        src={
          comment.user_id == me.id
            ? me.avatar || "../../../../public/default.webp"
            : comment.user_avatar || "../../../../public/default.webp"
        }
        alt=""
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <h3 className="m-0 font-medium text-slate-500">
            {me.id === comment.user_id ? "Your comment" : comment.user_fullname}
          </h3>
          <time className="text-slate-300">
            {refineTimestamp(comment.timestamp)}
          </time>
        </div>
        <div className={"flex"}>
          <p
            onKeyUp={() => {
              if (!bodyCommentRef.current.innerHTML.length) {
                commentActionButtonRef.current.disabled = true;
                commentActionButtonRef.current.classList.add("opacity-50");
              } else {
                commentActionButtonRef.current.disabled = false;
                commentActionButtonRef.current.classList.remove("opacity-50");
              }
            }}
            ref={bodyCommentRef}
            contentEditable={commentEditable}
            className={`font-light text-slate-950 lg:text-lg ${commentEditable ? "border-2 p-1 border-slate-500 rounded-md max-w-[100%] break-words" : ""}`}
          >
            {comment.body}
          </p>
        </div>
        {comment.user_id !== me.id ? (
          <AnimatePresence>
            <div className={"flex flex-col gap-3"}>
              <div className="flex items-center gap-2 mt-3">
                <button
                  className={`font-medium ${replyInputShow ? "text-slate-700" : "text-slate-500"}`}
                  onClick={() => setReplyInputShow((prev) => !prev)}
                >
                  Reply
                </button>
                <span className="flex w-1 h-1 rounded-full bg-slate-600"></span>
                <button
                  className="flex items-center gap-1 font-medium"
                  onClick={handleCommentLike}
                >
                  {commentLiked ? (
                    <FaThumbsUp
                      id="thumbsup-btn"
                      data-id={post.isSuccess && post.data.id}
                    />
                  ) : (
                    <FaRegThumbsUp
                      id="thumbsup-btn"
                      data-id={post.isSuccess && post.data.id}
                    />
                  )}{" "}
                  {comment.likes.length}
                </button>
                <button
                  className="flex items-center gap-1 font-medium"
                  onClick={handleCommentDislike}
                >
                  {commentUnliked ? (
                    <FaThumbsDown
                      id="thumbsup-btn"
                      data-id={post.isSuccess ? post.data.id : ""}
                    />
                  ) : (
                    <FaRegThumbsDown
                      id="thumbsup-btn"
                      data-id={post.isSuccess ? post.data.id : ""}
                    />
                  )}{" "}
                  {comment.dislikes.length}
                </button>
                <motion.button
                  className="flex items-center gap-1 text-lg font-medium"
                  onClick={() => setReplyInputShow((prev) => !prev)}
                  whileTap={{ scale: 0.89 }}
                  title="write comment"
                >
                  {replyInputShow ? <FaComment /> : <FaRegComment />}{" "}
                  {comment?.replies?.length}
                </motion.button>
              </div>
              {replyInputShow || seeReplies ? (
                <motion.div
                  className={"flex flex-col gap-3"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className={"flex items-start gap-2"}>
                    <div className={"flex"}>
                      <div className="relative flex">
                        <img
                          className="rounded-full sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain"
                          src={me?.avatar || "../../../../public/default.webp"}
                          alt="Image"
                        />
                        <span className="absolute z-10 flex w-2 h-2 rounded-full  bg-green-400 bottom-0 right-0"></span>
                      </div>
                    </div>
                    <div className={"flex flex-col gap-3"}>
                      {!seeReplies ? (
                        <form
                          className="flex flex-col gap-4"
                          onSubmit={handleSubmit(onReplySubmit)}
                        >
                          <textarea
                            {...register("reply_comment")}
                            className={`w-full min-h-[70px] max-h-[150px] p-2 font-medium border lg:text-lg rounded-sm ${
                              isError ? "border-red-400" : "border-slate-400"
                            }`}
                            placeholder="Reply here..."
                          ></textarea>
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
                                onClick={() => {
                                  setReplyInputShow(false);
                                  reset();
                                }}
                              >
                                Cancel
                              </motion.button>
                            </motion.div>
                          </AnimatePresence>
                        </form>
                      ) : (
                        ""
                      )}
                      <AnimatePresence>
                        <motion.ul className={"flex flex-col gap-6"}>
                          {comment.replies?.length ? (
                            comment.replies.map((reply) => (
                              <ReplyComment
                                key={reply.id}
                                reply={reply}
                                comment={comment}
                                data={data}
                                seeReplies={seeReplies}
                              />
                            ))
                          ) : (
                            <motion.li
                              className={
                                "text-slate-300 select-none opacity-65 lg:text-xl"
                              }
                            >
                              No replies yet #
                            </motion.li>
                          )}
                        </motion.ul>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ) : (
                ""
              )}
            </div>
          </AnimatePresence>
        ) : (
          <div className="flex items-center gap-3">
            <button
              className="text-red-300 font-medium hover:text-red-500"
              onClick={() => handleDeleteComment(comment.id)}
            >
              Delete
            </button>
            <button
              ref={commentActionButtonRef}
              className={`text-blue-300 font-medium hover:text-blue-500 ${commentEditable ? "text-blue-500" : ""}`}
              onClick={() =>
                handleEditComment(
                  comment.id,
                  bodyCommentRef.current.innerHTML.trim(),
                )
              }
            >
              {commentEditable ? "Save" : "Edit"}
            </button>
            <button
              className={"text-slate-400 font-medium hover:text-slate-600"}
              onClick={() => setSeeReplies((prev) => !prev)}
            >
              {seeReplies ? "See less..." : "See more..."}
            </button>
          </div>
        )}
        {seeReplies ? (
          <motion.div
            className={"flex flex-col gap-3 mt-3"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={"flex items-start gap-2"}>
              <div className={"flex flex-col gap-3"}>
                <AnimatePresence>
                  <motion.ul className={"flex flex-col gap-6"}>
                    {comment.replies?.length ? (
                      comment.replies.map((reply) => (
                        <ReplyComment
                          key={reply.id}
                          reply={reply}
                          comment={comment}
                          data={data}
                          seeReplies={seeReplies}
                        />
                      ))
                    ) : (
                      <motion.li
                        className={"text-slate-300 select-none opacity-65"}
                      >
                        No replies yet #
                      </motion.li>
                    )}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          ""
        )}
      </div>
    </motion.li>
  );
}
