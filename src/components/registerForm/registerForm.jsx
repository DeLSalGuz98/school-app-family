import { useState } from "react";
//resources
import { Input } from "../inputs/inputs";
import { saveData } from "../../services/saveFirebase";

export function RegisterForm({titleForm}) {
  const dataNewUser = {
    'name':'',
    'lastname':'',
    'phone':'',
    'sex':'',
    'email':'',
    'password':''
  }
  const [dataUser, setDataUser] = useState(dataNewUser);
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setDataUser({...dataUser, [name]: value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await saveData('docente', dataUser);
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
      <input type="submit" value="Register" />
    </form>
  )
}