import { useEffect, useContext, useState } from "react"
import { useLocation } from "wouter"
//resources
import { exitSession, observer } from "../../services/authFirebase"
import { getOneDoc } from "../../services/getDataFirebase"

//context
import { IdUserContext } from "../../context/idUserContext"
import { StudentContext } from "../../context/studentContext"

export function ProfilePage({id}) {
  const {idUser, setIdUser} = useContext(IdUserContext)
  const { student, setStudent } = useContext(StudentContext)
  const [location, setLocation] = useLocation()
  const [user, setUser] = useState({})
  useEffect(()=>{
    const res = observer();
    if(res === null){
      setLocation('/')
    }else{
      getDataUser(res.uid);
    }
  },[])
  const getDataUser = async(userId)=>{
    const res = await getOneDoc('user', userId)
    setUser(res.data())
  }
  const logOut = async()=>{
    const res = await exitSession()
    if(res.message && res.message === 'log-out'){
      setIdUser({})
      setStudent({})
      setLocation('/')
    }
  }
  return(
    <div>
      <h2>{user.name} {user.lastname}</h2>
      <p>telf: {user.phone}</p>
      <p>correo: {user.email}</p>
      {
        idUser.permissions === 'parents'?
        <p>Hijo(a): {student.name} {student.lastname}</p>
        :<></>
      }
      <button onClick={logOut}>Salir de la Cuenta</button>
    </div>
  )
}