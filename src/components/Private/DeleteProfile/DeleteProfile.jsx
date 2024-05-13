import axios from "axios";
import { Button } from "../../General/Button"
import { Modal } from "../../General/Modal"
import { useContext } from "react";
import { meContext } from "../../../context/meContext";
import { tokenContext } from "../../../context/tokenContext";

export const DeleteProfile = ({setProfileDeleteModal}) => {
    const {me, setMe} = useContext(meContext);
    const {token, setToken} = useContext(tokenContext);
    function handleProfileDelete() {
        axios.delete(`http://localhost:3000/users/${me.id}`)
        .then(res => {
            if(res?.status === 200) {
                setMe("");
                setToken("");
            }
        })
        .catch(err => console.log(err)); 
    }

    function handleCancel(e) {
        setProfileDeleteModal(false);
    }


  return (
    <Modal show={setProfileDeleteModal}>
                <div className="flex flex-col gap-5">
                    <p className="text-2xl text-slate-600 mb-5">Do you really want to delete your profile !</p>
                    <div className="flex items-center gap-5">
                        <Button type="info" onClick={handleCancel}>No, cancel</Button>
                        <Button type="danger" onClick={handleProfileDelete}>Yes, delete</Button>
                    </div>
                </div>
    </Modal>
  )
}
