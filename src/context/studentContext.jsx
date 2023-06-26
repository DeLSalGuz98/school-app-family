import { createContext, useState } from "react";

export const StudentContext = createContext();

export const StudentContextProvider = ({children})=>{
  const [student, setStudent] = useState({})
  return(
    <StudentContext.Provider value={{student, setStudent}}>
      {children}
    </StudentContext.Provider>
  )
}