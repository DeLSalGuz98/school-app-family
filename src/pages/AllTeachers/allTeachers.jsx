import { useEffect, useState } from "react"
import { useLocation } from "wouter";
import './allTeachers.css'

import {getMultipeDataWithCondition } from "../../services/getDataFirebase"
export function AllTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [location, setLocation] = useLocation();
  useEffect(()=>{
    getAllTeachers()
  },[])
  const getAllTeachers = async()=>{
    const res = await getMultipeDataWithCondition('user', 'permissions', '==', 'teacher')
    setTeachers(res)
  }
  const watchTeacher = (idTeacher)=>{
    setLocation(`/all-teachers/teacher/${idTeacher}`)
  }
  const deleteTeacher = (idTeacher)=>{
    //eliminar profesor + agregar un confirmacion
  }
  return(
    <div className="teachersPage">
      <table className="tableContainer">
        <thead className="tableHead">
          <tr>
            <th>Nombre del Docente</th>
            <th>DNI</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {
            teachers.map(t=>(
              <tr key={t.id}>
                <td>{t.name} {t.lastname}</td>
                <td>{t.id}</td>
                <td>
                  <button className="btnTable btnGreen" onClick={()=>watchTeacher(t.id)}>Ver</button> 
                  <button className="btnTable btnRed" onClick={()=>deleteTeacher(t.id)}>Eliminar</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}