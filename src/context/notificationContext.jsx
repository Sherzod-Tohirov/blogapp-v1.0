import { createContext } from "react";
import { useState } from "react";

export const notificationContext = createContext();
export const NotificationProvider = ({children}) => {
    const [msg, setMsg] = useState("");
    return <notificationContext.Provider value={{msg, setMsg}}>{children}</notificationContext.Provider>
}

