import { useEffect, useState, useRef } from "react";
//resources
import { Input, InputSubmit } from "../inputs/inputs";
import { saveData } from "../../services/saveFirebase";
import { getParentsFromFirebase } from "../../services/getDataFirebase";

export function RegisterStudent({titleForm, collection}) {
  const form = useRef(null)
  const dataNewUser = {
    'name':'',
    'lastname':'',
    'phone':'',
    'sex':'',
    'level':'',
    'section':'',
    'parent':''
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
    setDataUser({...dataUser, [name]: value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(collection === 'student'){
      const res = await saveData(collection, dataUser)
      if(res.id){
        alert('Estudiante registrado correctamente')
      }
    }
    form.current.reset()
    setDataUser(dataNewUser)
  }
  const getParents = async()=>{
    const res = await getParentsFromFirebase();
    setAllParents(res)
  }
  return(
    <form onSubmit={handleSubmit} ref={form}>
      <span>Registrar {titleForm}</span>
      <Input type='text' id='name' name='Nombres' handleChange={handleChange} value={dataUser.name}/>
      <Input type='text' id='lastname' name='Apellido' handleChange={handleChange} value={dataUser.lastname}/>
      <Input type='text' id='phone' name='Telefono' handleChange={handleChange} value={dataUser.phone}/>
      <div>
        <span>Sexo</span>
        <label htmlFor="man">
          <input type="radio" name="sex" id="man" value="hombre" onChange={handleChange}/>Hombre
        </label>
        <label htmlFor="woman">
          <input type="radio" name="sex" id="woman" value="mujer" onChange={handleChange}/>Mujer
        </label>
      </div>
      <div>
        <label htmlFor="level">Grado</label>
        <select name="level" id="level" defaultValue="" onChange={handleChange} required>
          <option value="" disabled> -Seleccione uno- </option>
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
        <select name="section" id="section" defaultValue="" onChange={handleChange} required>
          <option value="" disabled> -Seleccione uno- </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
      <div>
        <label htmlFor="parent">Padre o Madre del Estudiante</label>
        <select name="parent" id="parent" defaultValue='' onChange={handleChange} required>
          <option value="" disabled> -Seleccione uno- </option>
          {
            allParents.map(p =>{
              return <option key={p.id} value={p.id}>{p.name} {p.lastname}</option>
            })
          }
        </select>
      </div>
      <InputSubmit value="Register" />
    </form>
  )
}