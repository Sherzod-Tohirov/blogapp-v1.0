import { refineTimestamp } from "../../../../utils/index.js";
import { motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import { meContext } from "../../../../../../../context/meContext.jsx";
import {
  useEditPostMutation,
  useGetPostByIdQuery,
} from "../../../../../../../store/posts/postsApi.js";
import { notificationContext } from "../../../../../../../context/notificationContext.jsx";
export function ReplyComment({ reply, comment, data, seeReplies }) {
  const bodyReplyRef = useRef();
  const replyActionButtonRef = useRef();
  const [replyEditable, setReplyEditable] = useState(false);
  const { setMsg } = useContext(notificationContext);
  const { me } = useContext(meContext);
  const [
    mutation,
    {
      isLoading: editPostLoading,
      isError: editPostError,
      status: editPostStatus,
    },
  ] = useEditPostMutation();
  const post = useGetPostByIdQuery(data?.id);
  function handleReplyDelete(replyId) {
    const filteredReplies = comment.replies.filter(
      (item) => item.id !== replyId,
    );
    let index;
    for (let i = 0; i < data.comments.length; i++) {
      if (data.comments[i].id === comment.id) {
        index = i;
        break;
      }
    }
    const leftSide = data.comments.slice(0, index);
    const rightSide = data.comments.slice(index + 1);
    mutation({
      ...data,
      comments: [
        ...leftSide,
        {
          ...comment,
          replies: [...filteredReplies],
        },
        ...rightSide,
      ],
    });
    setMsg("Your reply is deleted successfully.");
  }

  function handleReplyEdit(replyId, new_value) {
    setReplyEditable((prev) => !prev);
    let index;
    for (let i = 0; i < data.comments.length; i++) {
      if (data.comments[i].id === comment.id) {
        index = i;
        break;
      }
    }
    const leftSide = data.comments.slice(0, index);
    const rightSide = data.comments.slice(index + 1);
    let indexReply;
    for (let i = 0; i < comment.replies.length; i++) {
      if (comment.replies[i].id === replyId) {
        indexReply = i;
        break;
      }
    }
    const leftSideReply = comment.replies.slice(0, indexReply);
    const rightSideReply = comment.replies.slice(indexReply + 1);
    const currentReply = comment.replies.find((item) => item.id === replyId);
    console.log("Index reply ", indexReply);
    console.log("Leftside reply", leftSideReply);
    console.log("Rightside reply", rightSideReply);
    console.log("Current reply", currentReply);
    mutation({
      ...post.data,
      comments: [
        ...leftSide,
        {
          ...comment,
          replies: [
            ...leftSideReply,
            {
              ...currentReply,
              body: new_value.replace(/<[^>]+>/g, ""),
            },
            ...rightSideReply,
          ],
        },
        ...rightSide,
      ],
    });
    if (editPostStatus === "fulfilled" && !editPostLoading) {
      setMsg("Your reply is edited successfully !");
    }
  }

  return (
    <motion.li
      layout
      key={reply.id}
      className={"flex items-start gap-4"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img
        className="rounded-full sm:w-6 sm:h-6 lg:w-8 lg:h-8 object-contain"
        src={reply.user_avatar || "../../../../public/default.webp"}
        alt=""
      />
      <div className={"flex flex-col items-start gap-2"}>
        <div className="flex items-center gap-4">
          <h3 className="m-0 font-medium text-slate-500">
            {me.id === reply.user_id ? "Your reply" : reply.user_fullname}
          </h3>
          <time className="text-slate-300">
            {refineTimestamp(reply.timestamp)}
          </time>
        </div>
        <p
          onKeyUp={() => {
            if (!bodyReplyRef.current.innerHTML.length) {
              replyActionButtonRef.current.disabled = true;
              replyActionButtonRef.current.classList.add("opacity-50");
            } else {
              replyActionButtonRef.current.disabled = false;
              replyActionButtonRef.current.classList.remove("opacity-50");
            }
          }}
          ref={bodyReplyRef}
          contentEditable={replyEditable}
          className={`font-light text-slate-950 ${replyEditable ? "border-2 p-1 border-slate-500 rounded-md max-w-[100%] break-words" : ""}`}
        >
          {reply.body}
        </p>
        {reply.user_id === me.id ? (
          <div className={"flex items-center gap-3"}>
            <button
              className={`text-red-300 font-medium hover:text-red-500`}
              onClick={() => handleReplyDelete(reply.id)}
            >
              Delete
            </button>
            <button
              ref={replyActionButtonRef}
              className={`text-blue-300 font-medium hover:text-blue-500 ${replyEditable ? "text-blue-500" : ""}`}
              onClick={() =>
                handleReplyEdit(reply.id, bodyReplyRef.current.innerHTML.trim())
              }
            >
              {replyEditable ? "Save" : "Edit"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </motion.li>
  );
}
