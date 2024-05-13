import { forwardRef } from "react";

export const Input = forwardRef(({type, name, icon, error, info, value, as, stylex}, ref) => {
    const styles = "w-full p-4 border-2 pr-11 border-slate-200 shadow text-lg rounded-md";
    return (
      <div className="w-full relative">
      {
        !as ? <input ref={ref} defaultValue={value || ""} className={styles + " " + stylex || ""} type={type || "text"} placeholder={name} /> : <textarea ref={ref} defaultValue={value || ""} className={styles + " " + stylex || ""} placeholder={name} />
      }
      {
          icon ? icon : ""
      }
        <span className="absolute flex text-[12px] left-3 text-teal-400">{info}</span>
        <span className={`absolute left-2 z-10 w-full text-red-500 ml-1 text-sm bottom-[` + `${type === 'password' ? '-35px' : '-20px'}]`}>{error}</span>
      </div>
    )
  
});

Input.displayName = "InputComponent";

