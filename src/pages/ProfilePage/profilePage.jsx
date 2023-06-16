import { useEffect, useContext, useState } from "react"
import { useLocation } from "wouter"
//resources
import { exitSession, observer } from "../../services/authFirebase"
import { getOneDoc } from "../../services/getDataFirebase"

//context
import { ShowMenuContext } from "../../context/showMenuContext"
import { IdUserContext } from "../../context/idUserContext"

export function ProfilePage({id}) {
  const {setShowMenu} = useContext(IdUserContext)
  const [location, setLocation] = useLocation()
  const [user, setUser] = useState({})
  useEffect(()=>{
    const res = observer();
    if(res === null){
      setLocation('/')
    }else{
      getDataUser(res);
    }
  },[])
  const getDataUser = async(userId)=>{
    const res = await getOneDoc('user', userId)
    setUser(res.data())
  }
  const logOut = async()=>{
    const res = await exitSession()
    if(res.message && res.message === 'log-out'){
      setShowMenu('')
      setLocation('/')
    }
  }
  return(
    <div>
      <h2>{user.name} {user.lastname}</h2>
      <p>telf: {user.phone}</p>
      <p>correo: {user.email}</p>
      <button onClick={logOut}>Salir de la Cuenta</button>
    </div>
  )
}