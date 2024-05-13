import { motion } from "framer-motion";

export const PostsList = ({ children }) => {
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
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center gap-6 p-10 list-none"
    >
      {children}
    </motion.ul>
  );
};
