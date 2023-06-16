import { useState, createContext } from "react";

export const ShowMenuContext = createContext();

export const ShowMenuContextProvider = ({children})=>{
  const [showMenu, setShowMenu] = useState(false)
  return(
    <ShowMenuContext.Provider value={{showMenu, setShowMenu}}>
      {children}
    </ShowMenuContext.Provider>
  )
}