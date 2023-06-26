import { useState, createContext } from "react";

export const IdUserContext = createContext();

export const IdUserContextProvider = ({children})=>{
  const [idUser, setIdUser] = useState({})
  return(
    <IdUserContext.Provider value={{idUser, setIdUser}}>
      {children}
    </IdUserContext.Provider>
  )
}