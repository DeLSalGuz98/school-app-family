import { useState } from "react";
//resources
import { Input } from "../inputs/inputs";
import { saveData } from "../../services/saveFirebase";

export function RegisterForm({titleForm, collection, children}) {
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
    const res = await saveData(collection, dataUser);
    console.log(res)
  }
  return (
    <form onSubmit={handleSubmit}>
      <span>Registrar {titleForm}</span>
      <Input type='text' id='name' name='Nombres' handleChange={handleChange} />
      <Input type='text' id='lastname' name='Apellido' handleChange={handleChange} />
      <Input type='text' id='phone' name='Telefono' handleChange={handleChange} />
      <div>
        <span>Sexo</span>
        <label htmlFor="man">
          <input type="radio" name="sex" id="man" value="Hombre" onChange={handleChange}/>Hombre
        </label>
        <label htmlFor="woman">
          <input type="radio" name="sex" id="woman" value="Mujer" onChange={handleChange}/>Mujer
        </label>
      </div>
      <Input type='email' id='email' name='Correo' handleChange={handleChange} />
      <Input type='password' id='password' name='Contraseña' handleChange={handleChange} />
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
      <input type="submit" value="Register" />
    </form>
  )
}