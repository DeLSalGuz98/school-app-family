import { useEffect, useState } from "react"
import { useLocation } from "wouter"
import './teacherDetail.css'
//resources
import { observer } from "../../../services/authFirebase"
import { getOneDoc, getMultipeDataWithCondition } from "../../../services/getDataFirebase"
import { RegisterCourse } from "../../../components/registerCourse/registerCourse"
import { deleteOneDoc } from "../../../services/deleteDataFirebase"


export function TeacherDetail({id}) {
  const [location, setLocation] = useLocation()
  const [user, setUser] = useState({})
  const [hiddeForm, setHiddeForm] = useState(true)
  const [listCourses, setListCourses] = useState([]);
  useEffect(()=>{
    const res = observer();
    if(res === null){
      setLocation('/')
    }else{
      getDataUser(id);
      getTeacherCourses();
    }
  },[])
  const getDataUser = async(userId)=>{
    const res = await getOneDoc('user', userId)
    setUser(res.data())
  }
  const getTeacherCourses = async()=>{
    const res = await getMultipeDataWithCondition('course', 'idTeacher', '==', id)
    setListCourses(res)
  }
  const showForm = ()=>{
    setHiddeForm(false)
  }
  const closeForm = () =>{
    setHiddeForm(true)
    getTeacherCourses();
  }
  const deleteCourse = async(idCourse)=>{
    const del = confirm('Este elemento se eliminara')
    if(del){
      const res = await deleteOneDoc('course', idCourse)
      if(res){
        alert('Error: algo salio mal')
        console.log(res)
      }else{
        alert('El elemento se elimino correctamente')
        getTeacherCourses();
      }
    }
  }
  //course's list
  return(
    <div className="teacherDetail">
      <div className="teacherInfo">
        <h2>{user.name} {user.lastname}</h2>
        <p>telf: {user.phone}</p>
        <p>correo: {user.email}</p>
        <button className="btnNewCourse" onClick={showForm}>Asignar Nuevo curso</button>
      </div>
      <div className="listCourses">
        <p>Lista de Cursos </p>
        <div className="tableTeacherCourseContainer">
          <table className="tableTeacherCourses">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Nivel</th>
                <th>Seccion</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            {
              listCourses.map(c=>{
                return(
                  <tbody key={c.id}>
                    <tr>
                      <td>{c.curso}</td>
                      <td>{c.grado}</td>
                      <td>{c.seccion}</td>
                      <td><button className="btnRed" onClick={()=>deleteCourse(c.id)}>Eliminar</button></td>
                    </tr>
                  </tbody>
                )
              })
            }
          </table>
        </div>
        </div>
        {
          hiddeForm?<></>:
          <div className="viewWindow">
            <RegisterCourse idTeacher={id} nameTeacher={`${user.name} ${user.lastname}`}/>
            <button className="btnRed" onClick={closeForm}>Cerrar</button>
          </div>
        }
    </div>
  )
}