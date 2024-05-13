import { createContext, useState } from "react";

export const settingsDropDownContext = createContext();

export const SettingsDropDownProvider = ({children}) => {
    const [settingsDropdown, setSettingsDropdown] = useState(false);
    return (<settingsDropDownContext.Provider value={{settingsDropdown, setSettingsDropdown}}>
        {children}
    </settingsDropDownContext.Provider>)
}
