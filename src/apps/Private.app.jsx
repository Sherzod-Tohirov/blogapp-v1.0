import { useContext } from "react"
import { tokenContext } from "../context/tokenContext"
import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "../components/Private/Header";
import { Home, Posts } from "../pages/Private";
import { meContext } from "../context/meContext";
import { Notification } from "../components/General/Notification";
import { Settings } from "../pages/Private/Settings";
import "react-toastify/dist/ReactToastify.css";

export const Private = () => {
  const {setToken} = useContext(tokenContext);
  const {me} = useContext(meContext);
  const navigate = useNavigate();
  return (
      <>
        <Header  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Notification type="success" show={true} />
      </>
    )
}
