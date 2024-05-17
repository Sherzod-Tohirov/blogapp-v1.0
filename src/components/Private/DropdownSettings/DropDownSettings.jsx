import { Link } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { meContext } from "../../../context/meContext";
import { tokenContext } from "../../../context/tokenContext";
import { settingsDropDownContext } from "../../../context/settingsDropdownContext";
export const DropDownSettings = ({ position }) => {
  const { setMe } = useContext(meContext);
  const { setToken } = useContext(tokenContext);
  const { settingsDropdown, setSettingsDropdown } = useContext(
    settingsDropDownContext,
  );
  function handleLogout() {
    setSettingsDropdown((prev) => !prev);
    setMe("");
    setToken("");
  }
  return (
    <>
      <ul
        className={`absolute w-full list-none flex flex-col shadow-md rounded-md z-[100] bg-white ${position} ${!settingsDropdown ? "hidden" : ""}`}
      >
        <li className="w-full flex">
          <Link
            onClick={() => setSettingsDropdown((prev) => !prev)}
            to={"/settings"}
            className="w-full flex items-center gap-2 px-2 py-3 text-lg text-slate-600 hover:bg-slate-100 font-medium transition"
          >
            Settings
            <IoIosSettings className="w-5 h-5" />
          </Link>
        </li>
        <li className="w-full flex">
          <Link
            onClick={handleLogout}
            to={"/"}
            className="w-full flex items-center  gap-2 px-2 py-3 text-lg text-red-600 hover:bg-slate-100 font-medium transition"
          >
            Logout
            <IoLogOut className="w-5 h-5" />
          </Link>
        </li>
      </ul>
    </>
  );
};
