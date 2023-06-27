import { useEffect, useContext, useState } from "react"
import { useLocation } from "wouter"
import './profilePage.css'
//resources
import { exitSession, observer } from "../../services/authFirebase"
import { getOneDoc } from "../../services/getDataFirebase"
import userSvg from '../../assets/user.svg'
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
    <div className="profileContainer">
      <div className="profileCard">
        <header className="profileHeaderCard">
          <img className="profileUserImage" src={userSvg} alt="avatar user" />
          <h2 className="profileUserName">{user.name} {user.lastname}</h2>
        </header>
        <div className="profileDescriptionCard">
          <p>telf: {user.phone}</p>
          <p>correo: {user.email}</p>
          {
            idUser.permissions === 'parents'?
            <p>Hijo(a): {student.name} {student.lastname}</p>
            :<></>
          }
          <button onClick={logOut}>Salir de la Cuenta</button>
        </div>
      </div>
    </div>
  )
}