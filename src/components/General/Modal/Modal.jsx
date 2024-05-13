import { IoClose } from "react-icons/io5";

export const Modal = ({children, show}) => {
  function handleOverlay(e) {
    if(e.target.matches('.overlay')) {
        show(false);
    }
  }

  function handleClose() {
        show(false);
  }
  return (
    <div className={"overlay"} onClick={handleOverlay}>
        <div className="flex flex-col gap-5 sm:w-full md:w-6/12 bg-slate-50 rounded-md p-7 overflow-auto max-h-[90%] shadow-sm">
            <button className="flex items-center justify-center text-4xl ml-auto active:scale-90 transition " onClick={handleClose}><IoClose /></button>
            {children}
        </div>
    </div>
  )
}
