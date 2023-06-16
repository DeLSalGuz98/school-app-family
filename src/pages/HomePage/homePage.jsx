import { useState, useContext, useEffect } from "react"
import { useLocation } from "wouter"
//resources
import { Input, InputSubmit } from "../../components/inputs/inputs"
import { authUser, observer } from "../../services/authFirebase"


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
    console.log(res)
    if(res !== null){
      setLocation(`/profile/${res}`);
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
      setIdUser(res.uid)
    }
    setLocation(`/profile/${res.uid}`)
    setCredentials(dataForm);
  }
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <Input type='email' id='email' name='Correo' handleChange={handleChange} value={credentials.email}/>
        <Input type='password' id='password' name='Contraseña' handleChange={handleChange} value={credentials.password}/>
        <InputSubmit value='Iniciar Sesión'/>
      </form>
    </div>
  )
}