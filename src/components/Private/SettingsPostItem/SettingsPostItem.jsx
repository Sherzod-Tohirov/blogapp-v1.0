import { CiEdit } from "react-icons/ci";
import { motion } from "framer-motion";
export const SettingsPostItem = ({ data, setEditPostModal }) => {
  function handleEditPostModal() {
    localStorage.setItem("post", data?.id);
    setEditPostModal(true);
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <motion.li
        variants={item}
        initial="hidden"
        animate="visible"
        exit={{hidden: {
           opacity: 1
        }, visible: {
            opacity: 0
        }}}
        layout
        value={data}
        key={data?.id}
        className="flex justify-between items-center p-3 px-5 shadow-md shadow-slate-400 bg-slate-200 rounded-md  hover:bg-teal-300 transition cursor-pointer"
      >
        <div className="flex flex-col">
          <p className="text-2xl text-slate-800">{data?.title}</p>
          <p className="font-medium">Category: {data?.category}</p>
          <time className="text-sm text-slate-600 font-medium" dateTime="00:00">
            {data?.date}
          </time>
        </div>
        <div>
          <button
            onClick={handleEditPostModal}
            className="flex items-center justify-center text-4xl hover:text-slate-700 active:scale-95 transition"
          >
            <CiEdit />
          </button>
        </div>
      </motion.li>
    </>
  );
};
