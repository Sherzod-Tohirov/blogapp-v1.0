import { useContext } from "react";
import { tokenContext } from "../context/tokenContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "../components/Private/Header";
import { Home } from "../pages/Private";
import { Posts } from "../pages/General/Posts";
import { meContext } from "../context/meContext";
import { Notification } from "../components/General/Notification";
import { Settings } from "../pages/Private/Settings";
import "react-toastify/dist/ReactToastify.css";
import { Register } from "../pages/Public/index.js";
import { NotFound } from "../pages/General/NotFound/index.js";

export const Private = () => {
  const { setToken } = useContext(tokenContext);
  const { me } = useContext(meContext);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Notification type="success" show={true} />
    </>
  );
};
