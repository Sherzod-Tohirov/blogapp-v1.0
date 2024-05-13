import { NavLink } from "react-router-dom"
import { Logo } from "../../General/Logo";
import { useContext, useState } from "react";
import { meContext } from "../../../context/meContext";
import { DropDownSettings } from "../DropdownSettings";
import { settingsDropDownContext } from "../../../context/settingsDropdownContext";

export const Header = () => {
  const {me}  = useContext(meContext);
  const {settingsDropdown, setSettingsDropdown} = useContext(settingsDropDownContext);
  function handleSettingsDropdown() {
    setSettingsDropdown(prev => !prev);
  }
  return (
    <header className="py-5 border-b-2 border-slate-200 shadow-sm">
            <div className="container mx-auto px-3">
                <div className="flex items-center lg:justify-between flex-wrap gap-10 sm:justify-center">
                    <div className="flex items-center gap-12">
                        <Logo />
                        <nav>
                            <ul className="list-none flex items-center gap-5">
                              <li>
                                <NavLink to={'/'} className={({isActive}) => {
                                   return ("text-xl text-center p-2 px-6 " + (isActive ? "bg-teal-500 text-white rounded-full" : "text-slate-700 "))
                                }}>Home</NavLink>
                              </li>
                              <li>
                              <NavLink to={'/posts'} className={({isActive}) => {
                                   return ("text-xl text-center p-2 px-6 " + (isActive ? "bg-teal-500 text-white rounded-full" : "text-slate-700"))
                                }}>Posts</NavLink>
                              </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="relative flex items-stretch">
                        <button onClick={handleSettingsDropdown} className="relative flex items-center gap-3 text-xl font-medium text-slate-600 active:scale-95 transition">
                            {me?.firstname || "User"} {me?.lastname || ""} <img src={me?.avatar || '../../../../public/default.webp'} className="rounded-full object-cover" width={30} height={30} />
                        </button>
                        <DropDownSettings position={"bottom-[-125px]"} />
                    </div>
                </div>
            </div>
    </header>
  )
}
