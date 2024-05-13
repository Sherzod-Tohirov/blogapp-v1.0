import { Input } from "../../../components/General/Input";
import { BsFillPostcardFill } from "react-icons/bs";
import { formatDate, validate } from "../../../lib/customFunctions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateTypes } from "../../../lib/customFunctions";
import { meContext } from "../../../context/meContext";
import { Modal } from "../../General/Modal";
import { useContext, useRef, useState } from "react";
import { SelectCategory } from "../SelectCategory";
import { notificationContext } from "../../../context/notificationContext";
import { useAddPostMutation } from "../../../store/posts/postsApi";

export const AddPostModal = ({ setAddPostModal }) => {
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
  const { me, setMe } = useContext(meContext);
  const { setMsg } = useContext(notificationContext);
  const [addPost, { isSuccess, isError, isLoading, error }] =
    useAddPostMutation();
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
      addPost({
        title: titleRef.current.value,
        body: bodyRef.current.value,
        category: categoryRef.current.value,
        image: urlRef.current.value,
        date: formatDate(),
        likes: [],
        comments: [],
        user_id: me?.id,
      });
      console.log(isSuccess, isError, isLoading);
    }
  }

  if (isSuccess) {
    setAddPostModal(false);
    setMsg("New post is added successfully!");
  }

  if (isError) {
    console.log(error);
  }
  return (
    <Modal show={setAddPostModal}>
      <h2 className="text-4xl text-center text-slate-600 my-8">Add new post</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center justify-center w-full bg-red"
      >
        <Input name={"Title"} ref={titleRef} error={titleError} />
        <Input as="textarea" name={"Body"} ref={bodyRef} error={bodyError} />
        <SelectCategory error={categoryError} ref={categoryRef} />
        <Input
          type={"url"}
          name={"Post image url"}
          ref={urlRef}
          error={urlError}
          icon={<BsFillPostcardFill className={iconStyles} />}
        />
        <button className="flex items-center justify-center w-full mt-3 p-4 rounded-md bg-teal-400 text-white text-lg">
          Submit
        </button>
      </form>
    </Modal>
  );
};
