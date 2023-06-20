import { useEffect, useState } from "react";
import { useLocation } from "wouter";
//resources
import { RegisterForm } from "../../components/registerForm/registerForm";
import { observer } from "../../services/authFirebase";
import { RegisterStudent } from "../../components/registerForm/registerStudent";

export function RegisterPage() {
  const [location, setLocation] = useLocation()
  const [typeUserRegister, setTypeUserRegister] = useState('teacher');
  useEffect(()=>{
    const res = observer();
    if(res === null){
      setLocation('/')
    }
  });
  const handleChange = (e)=>{
    const {value} = e.target;
    setTypeUserRegister(value);
  }
  return(
    <>
      <form>
        <label htmlFor="typeUser">Seleccione el tipo de usuario que desea registrar</label>
        <select name="typeUser" id="typeUser" defaultValue='teacher' onChange={handleChange}>
          <option value="teacher">Docente</option>
          <option value="student">Estudiante</option>
          <option value="parent">Padre de Familia</option>
          <option value="admin">Administrador</option>
        </select>
      </form>
      {
        typeUserRegister === 'teacher'?
        <RegisterForm titleForm='Docente' collection='teacher'></RegisterForm>:
        typeUserRegister === 'student'?
        <RegisterStudent titleForm='Estudiante' collection='student'></RegisterStudent>:
        typeUserRegister === 'parent'?
        <RegisterForm titleForm='Padre de Familia' collection='parents'></RegisterForm>:
        typeUserRegister === 'admin'?
        <RegisterForm titleForm='Administrador' collection='admin'></RegisterForm>:
        <></>
      }
    </>
  )
}