import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { notificationContext } from "../../../context/notificationContext";

export const Notification = ({type, show}) => {
    const {msg} = useContext(notificationContext);
    const notify = () => toast[type](msg || "", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true
    });

    useEffect(() => {
        if(msg) notify();  
    }, [msg]);

    return (
        <>
         <ToastContainer />
        </>
    )
}
