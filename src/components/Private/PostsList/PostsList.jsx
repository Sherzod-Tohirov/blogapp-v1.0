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
      className="flex sm:flex-col lg:flex-row lg:flex-wrap sm:items-stretch lg:items-start justify-center gap-6 lg:p-8 list-none w-full"
    >
      {children}
    </motion.ul>
  );
};
