import { useContext, useState } from "react"
import { meContext } from "../../../context/meContext"
import { IoMdMailUnread } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { EditProfile } from "../../../components/Private/EditProfile";
import { DeleteProfile } from "../../../components/Private/DeleteProfile";

export const SettingsProfile = () => {
    const {me} = useContext(meContext);
    const [profileDeleteModal, setProfileDeleteModal] = useState(false);
    const [profileEditModal, setProfileEditModal] = useState(false);

    function handleProfileDeleteModal() {
        setProfileDeleteModal(true);
    }

    function handleProfileEditModal() {
        setProfileEditModal(true);
    }
    return (
        <>
            <div className="flex flex-col items-center sm:w-full md:w-4/12  p-8 shadow-md shadow-slate-400 ">
                    <img className="rounded-full mb-8" src={me?.avatar || "../../../../public/default.webp"} alt={me.firstname} width={200} height={200} />
                    <p className="text-2xl text-slate-600 mb-5">{me?.firstname} {me?.lastname}</p>
                    <p className="flex items-center gap-2 mb-8 text-xl text-blue-500 hover:underline cursor-pointer"><IoMdMailUnread /> {me?.email}</p>
                    <div className="flex items-center gap-5">
                        <button onClick={handleProfileEditModal} className="flex items-center gap-2 min-w-36 px-4 py-3 rounded-md bg-teal-500 text-white text-lg font-medium active:scale-95 transition"><MdOutlineEdit />Edit Profile</button>
                        <button onClick={handleProfileDeleteModal} className="flex items-center gap-2 min-w-36 px-4 py-3 rounded-md bg-red-500 text-white text-lg font-medium active:scale-95 transition"><RiDeleteBin6Line className="text-lg" />Delete account</button>
                    </div>
            </div>

            {
                profileDeleteModal ? (
                    <DeleteProfile setProfileDeleteModal={setProfileDeleteModal} />
                ) : ''
            }

            {
                profileEditModal ? (
                    <EditProfile setProfileEditModal={setProfileEditModal} />
                ) : ''
            }
        </>
    )
}
