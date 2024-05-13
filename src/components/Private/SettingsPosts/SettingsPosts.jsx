import { useContext, useEffect, useState } from "react";
import { Button } from "../../General/Button";
import { SettingsPostItem } from "../SettingsPostItem";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { AddPostModal } from "../AddPostModal";
import { EditPostModal } from "../EditPostModal";
import { meContext } from "../../../context/meContext";
import { AnimatePresence, motion } from "framer-motion";
import emptyImage from "../../../assets/images/empty.png";
import axios from "axios";
export const SettingsPosts = () => {
  const [addPostModal, setAddPostModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const { me } = useContext(meContext);
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  function handleAddPostModal() {
    setAddPostModal(true);
  }
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        if (res?.status === 200) {
          if (res?.data?.length) {
            setPosts(res?.data.filter((item) => +item.user_id === +me?.id));
          }
        }
      })
      .catch((err) => console.log(err));
  }, [addPostModal, editPostModal]);
  return (
    <AnimatePresence>
      <div className="sm:w-full md:w-7/12 flex flex-col items-center p-5 shadow-md shadow-slate-400">
        <h2 className="text-3xl text-slate-600 mb-8">My Posts</h2>
        <motion.ul
          variants={container}
          initial="hidden"
          animate="visible"
          className="list-none flex flex-col gap-3 pr-4 w-full max-h-[80%]"
          values={posts}
        >
          {posts?.length ? (
            posts.map((item) => {
              return (
                <SettingsPostItem
                  data={item}
                  key={item?.id}
                  setEditPostModal={setEditPostModal}
                />
              );
            })
          ) : (
            <li className="flex flex-col justify-center items-center">
              <img src={emptyImage} width={250} />
              <span className="text-2xl select-none opacity-70">
                no posts yet #
              </span>
            </li>
          )}
        </motion.ul>
        <Button
          onClick={handleAddPostModal}
          stylex="mt-5 mr-auto text-lg justify-center gap-3"
        >
          Add new post <MdOutlineCreateNewFolder className="text-xl" />
        </Button>
      </div>
      {addPostModal ? <AddPostModal setAddPostModal={setAddPostModal} /> : ""}

      {editPostModal ? (
        <EditPostModal setEditPostModal={setEditPostModal} />
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};
