import { useEffect, useState } from "react";
import './registerForm.css';
//resources
import { Input, InputSubmit } from "../inputs/inputs";
import { saveDataId, saveData } from "../../services/saveFirebase";
import { createUser } from "../../services/authFirebase";
import { getParentsFromFirebase } from "../../services/getDataFirebase";
import { RegisterCourse } from "../registerCourse/registerCourse";

export function RegisterForm({titleForm, collection}) {
  const dataNewUser = {
    'name':'',
    'lastname':'',
    'phone':'',
    'sex':'',
    'email':'',
    'password':'',
    'permissions': ''
  }
  const [dataUser, setDataUser] = useState(dataNewUser);
  const [allParents, setAllParents] = useState([])
  useEffect(()=>{
    if(collection==='student'){
      getParents()
    }
  },[collection])
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setDataUser({...dataUser, [name]: value, 'permissions': collection})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(collection === 'student'){
      console.log(dataUser)
    }else{
      const data = {
        'name': dataUser.name,
        'lastname': dataUser.lastname,
        'phone': dataUser.phone,
        'sex': dataUser.sex,
        'email': dataUser.email,
        'permissions': dataUser.permissions
      }
      const newUser = await createUser(dataUser.email, dataUser.password);
      const res = await saveDataId('user', newUser.uid, data);
      if(res.message){
        alert(res.message)
      }
    }
    setDataUser(dataNewUser)
  }
  const getParents = async()=>{
    const res = await getParentsFromFirebase();
    console.log(res)
    setAllParents(res)
  }
  return (
    <div className="registerContainer">
      <form className="registerForm" onSubmit={handleSubmit}>
      <p className="registerTitle">Registrar {titleForm}</p>
        <Input type='text' id='name' name='Nombres' handleChange={handleChange} value={dataUser.name}/>
        <Input type='text' id='lastname' name='Apellido' handleChange={handleChange} value={dataUser.lastname}/>
        <Input type='text' id='phone' name='Telefono' handleChange={handleChange} value={dataUser.phone}/>
        <div className="radioContainer">
          <p className="radioLabel">Sexo</p>
          <label className="radioText" htmlFor="man">
            <input className="radioInput" type="radio" name="sex" id="man" value="man" onChange={handleChange}/>Hombre
          </label>
          <label className="radioText" htmlFor="woman">
            <input className="radioInput" type="radio" name="sex" id="woman" value="woman" onChange={handleChange}/>Mujer
          </label>
        </div>
        <Input type='email' id='email' name='Correo' handleChange={handleChange} value={dataUser.email}/>
        <Input type='password' id='password' name='Contraseña' handleChange={handleChange} value={dataUser.password}/>
        <InputSubmit value="Register" />
      </form>
    </div>
  )
}