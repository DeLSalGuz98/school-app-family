import { useState } from "react";
import { RegisterForm } from "../../components/registerForm/registerForm"
import { Link, Route, Router, Switch } from "wouter";

export function RegisterPage() {
  const [typeUserRegister, setTypeUserRegister] = useState('teacher')
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
        <RegisterForm titleForm='Docente'/>:
        typeUserRegister === 'student'?
        <RegisterForm titleForm='Estudiante'/>:
        typeUserRegister === 'parent'?
        <RegisterForm titleForm='Padre de Familia'/>:
        typeUserRegister === 'admin'?
        <RegisterForm titleForm='Administrador'/>:
        <></>
      }
    </>
  )
}