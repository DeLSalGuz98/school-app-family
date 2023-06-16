import { useState } from "react";
//resources
import { Input, InputSubmit } from "../inputs/inputs";
import { saveDataId } from "../../services/saveFirebase";
import { createUser } from "../../services/authFirebase";

export function RegisterForm({titleForm, collection}) {
  const dataNewUser = {
    'name':'',
    'lastname':'',
    'phone':'',
    'sex':'',
    'email':'',
    'password':'',
    'permissions': collection
  }
  const [dataUser, setDataUser] = useState(dataNewUser);
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setDataUser({...dataUser, [name]: value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
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
    console.log(res)
    setDataUser(dataNewUser)
  }
  return (
    <form onSubmit={handleSubmit}>
      <span>Registrar {titleForm}</span>
      <Input type='text' id='name' name='Nombres' handleChange={handleChange} value={dataUser.name}/>
      <Input type='text' id='lastname' name='Apellido' handleChange={handleChange} value={dataUser.lastname}/>
      <Input type='text' id='phone' name='Telefono' handleChange={handleChange} value={dataUser.phone}/>
      <div>
        <span>Sexo</span>
        <label htmlFor="man">
          <input type="radio" name="sex" id="man" value="man" onChange={handleChange}/>Hombre
        </label>
        <label htmlFor="woman">
          <input type="radio" name="sex" id="woman" value="woman" onChange={handleChange}/>Mujer
        </label>
      </div>
      <Input type='email' id='email' name='Correo' handleChange={handleChange} value={dataUser.email}/>
      <Input type='password' id='password' name='Contraseña' handleChange={handleChange} value={dataUser.password}/>
      {
        collection === 'student'?
        <>
        <div>
          <label htmlFor="level">Grado</label>
          <select name="level" id="level" defaultValue='primero' onChange={handleChange}>
            <option value="primero">Primero</option>
            <option value="segundo">Segundo</option>
            <option value="tercero">Tercero</option>
            <option value="cuarto">Cuarto</option>
            <option value="quinto">Quinto</option>
            <option value="sexto">Sexto</option>
          </select>
        </div>
        <div>
          <label htmlFor="section">Seccion</label>
          <select name="section" id="section" defaultValue='A' onChange={handleChange}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div>
          <label htmlFor="parent">Padre o Madre del Estudiante</label>
          <select name="parent" id="parent" defaultValue='' onChange={handleChange}>
            <option value="" disabled> -Seleccione uno- </option>
            <option value="id_qwe">Maria Peres</option>
            <option value="id_asd">Juan Salomon</option>
            <option value="id_zxc">Ugardina Tepez</option>
          </select>
        </div>
        </>
        :<></>
      }
      <InputSubmit value="Register" />
    </form>
  )
}