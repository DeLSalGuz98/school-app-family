import { useEffect, useState } from "react"
import { useLocation } from "wouter";

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
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre del Docente</th>
            <th>DNI</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            teachers.map(t=>(
              <tr key={t.id}>
                <td>{t.name} {t.lastname}</td>
                <td>{t.id}</td>
                <td><button onClick={()=>watchTeacher(t.id)}>Ver</button> <button onClick={()=>deleteTeacher(t.id)}>Eliminar</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}