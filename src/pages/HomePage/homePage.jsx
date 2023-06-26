import { useState, useContext, useEffect } from "react"
import { useLocation } from "wouter"
import './homePage.css'

//resources
import { Input, InputSubmit } from "../../components/inputs/inputs"
import { authUser, observer } from "../../services/authFirebase"
import { getOneDoc } from "../../services/getDataFirebase"

//context
import { IdUserContext } from "../../context/idUserContext"

export function HomePage() {
  const {setIdUser} = useContext(IdUserContext)
  const [location, setLocation] = useLocation()
  const dataForm = {
    'email': '',
    'password':''
  }
  const [credentials, setCredentials] = useState(dataForm)
  useEffect(()=>{
    const res = observer();
    if(res !== null){
      setLocation(`/profile/${res.uid}`);
    }
  },[]);
  const handleChange = (e)=>{
    const {name, value} = e.target
    setCredentials({...credentials, [name]: value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await authUser(credentials);
    if(res.uid){
      const getUser = await getOneDoc('user', res.uid)
      const user = {...getUser.data(), 'id': getUser.id}
      setIdUser(user)
      setLocation(`/profile/${res.uid}`)
    }else{
      alert('Hubo un error con las credenciales')
      console.log(res)
    }
    setCredentials(dataForm);
  }
  return(
    <div className="homeContainer">
      <form className="formSignin" onSubmit={handleSubmit}>
        <Input type='email' id='email' name='Correo' handleChange={handleChange} value={credentials.email}/>
        <Input type='password' id='password' name='Contraseña' handleChange={handleChange} value={credentials.password}/>
        <InputSubmit value='Iniciar Sesión'/>
      </form>
    </div>
  )
}