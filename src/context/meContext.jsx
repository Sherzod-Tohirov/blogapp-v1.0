import { createContext } from "react";
import { useState } from "react";

export const meContext = createContext();
export const MeProvider = ({children}) => {
    const [me, setMe] = useState(JSON.parse(localStorage.getItem("me")) || "");
    if(!me) {
        localStorage.removeItem('me');
    }
    if(typeof me !== 'object' && me) {
        setMe(() => JSON.parse(me));
    }
    return <meContext.Provider value={{me, setMe}}>{children}</meContext.Provider>
}

