import { Logo } from "../../General/Logo";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    {
      id: 1,
      title: "Login",
      link: "/login",
    },
    {
      id: 2,
      title: "Register",
      link: "/register",
    },
  ];
  return (
    <header className="py-5 border-b-2 border-slate-200 shadow-sm">
      <div className="container mx-auto px-3">
        <div className="flex items-center lg:justify-between flex-wrap gap-10 sm:justify-center">
          <div className="flex items-center gap-12">
            <Logo />
            <nav>
              <ul className="list-none flex items-center gap-8">
                <li>
                  <NavLink
                    to={"/"}
                    className={({ isActive }) => {
                      return (
                        "text-xl " +
                        (isActive ? "text-teal-500" : "text-slate-700 ")
                      );
                    }}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/posts"}
                    className={({ isActive }) => {
                      return (
                        "text-xl " +
                        (isActive ? "text-teal-500" : "text-slate-700 ")
                      );
                    }}
                  >
                    Posts
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-8">
            <Link
              className="w-[120px] p-3 text-slate-700 border-none rounded-md text-center text-lg shadow transition active:scale-95"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="w-[120px] p-3 bg-teal-400 text-white border-none rounded-md text-center text-lg shadow transition active:scale-95"
              to={"/register"}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
