import axios from "axios";
import { Input } from "../../../components/General/Input";
import { BsFillPostcardFill } from "react-icons/bs";
import { formatDate, validate } from "../../../lib/customFunctions";
import { validateTypes } from "../../../lib/customFunctions";
import { meContext } from "../../../context/meContext";
import { Modal } from "../../General/Modal";
import { useContext, useEffect, useRef, useState } from "react";
import { SelectCategory } from "../SelectCategory";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { notificationContext } from "../../../context/notificationContext";
import {
  useDeletePostMutation,
  useEditPostMutation,
} from "../../../store/posts/postsApi";
export const EditPostModal = ({ setEditPostModal }) => {
  const id = localStorage.getItem("post") || 1;
  const iconStyles =
    "w-[25px] h-[25px] absolute right-4 top-[50%] translate-y-[-50%]";
  const titleRef = useRef();
  const bodyRef = useRef();
  const categoryRef = useRef();
  const urlRef = useRef();
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [post, setPost] = useState({});
  const { setMsg } = useContext(notificationContext);
  const [
    deletePost,
    { isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError },
  ] = useDeletePostMutation();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setPost(res?.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const { me, setMe } = useContext(meContext);
  const [editPost, { isSuccess, isError, error }] = useEditPostMutation();
  function handleDeletePost() {
    deletePost({id});
  }

  if (deleteIsSuccess) {
    setEditPostModal(false);
    setMsg("Post is deleted successfully");
  }

  if(deleteIsError) {
    console.log(deleteError);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate(titleRef, validateTypes.empty, "Title", setTitleError))
      return;
    if (!validate(bodyRef, validateTypes.empty, "Body", setBodyError)) return;
    if (
      !validate(categoryRef, validateTypes.empty, "Category", setCategoryError)
    )
      return;
    if (!titleError && !bodyError && !categoryError) {
      editPost({
        id: post?.id,
        title: titleRef.current.value,
        body: bodyRef.current.value,
        category: categoryRef.current.value,
        image: urlRef.current.value,
        date: formatDate(),
        user_id: me?.id,
      });
    }
  }

  if (isSuccess) {
    setEditPostModal(false);
    setMsg("Post is updated successfully!");
  }

  if (isError) {
    console.log(error);
  }

  return (
    <Modal show={setEditPostModal}>
      <h2 className="text-4xl text-center text-slate-600 my-8">Edit post</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center justify-center w-full bg-red"
      >
        <Input
          value={post?.title}
          name={"Title"}
          ref={titleRef}
          error={titleError}
        />
        <Input
          value={post?.body}
          as="textarea"
          name={"Body"}
          ref={bodyRef}
          error={bodyError}
        />
        <SelectCategory
          value={post?.category}
          error={categoryError}
          ref={categoryRef}
        />
        <Input
          value={post?.image}
          type={"url"}
          name={"Post image url"}
          ref={urlRef}
          error={urlError}
          icon={<BsFillPostcardFill className={iconStyles} />}
        />
        <div className="flex items-center w-full">
          <button
            className="flex items-center gap-2 justify-center w-1/2 mt-3 p-4 rounded-md rounded-r-none bg-red-500 text-white text-lg"
            type="button"
            onClick={handleDeletePost}
          >
            <MdDelete />
            Delete
          </button>
          <button
            className="flex items-center gap-2 justify-center w-1/2 mt-3 p-4 rounded-md rounded-l-none bg-teal-400 text-white text-lg"
            type="submit"
          >
            <MdEdit />
            Edit
          </button>
        </div>
      </form>
    </Modal>
  );
};
