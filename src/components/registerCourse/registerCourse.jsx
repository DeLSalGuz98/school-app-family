import { useState } from "react"
//resources
import { saveData } from "../../services/saveFirebase"
import { InputSubmit } from "../inputs/inputs"

export function RegisterCourse({idTeacher, nameTeacher}) {
  const [disabledInput, setDisabledInput] = useState(false)
  const [course, setCourse] = useState({
    'curso':'',
    'grado': ''
  })
  const sections = []
  const handleChange =(e)=>{
    const {name, value} = e.target
    setCourse({...course, [name]:value})
  }
  const chooseSection = (e)=>{
    if(e.target.checked === true){
      sections.push(e.target.value)
    }else if(e.target.checked === false){
      const index = sections.findIndex(element => element === e.target.value)
      sections.splice(index, 1)
    }
  }
  const saveCourse = (event)=>{
    event.preventDefault()
    sections.map(async(e)=>{
      const dataCourse = {
        'curso':course.curso,
        'grado': course.grado,
        'seccion': e,
        'idTeacher':idTeacher,
        'nameTeacher': nameTeacher
      }
      await saveData('course', dataCourse)
      setDisabledInput(true)
    })
  }
  // const deleteCourse =(idCourse)=>{
  //   const index = list.findIndex(e=> e.id === idCourse)
  //   list.splice(index,1)
  //   setListCourses(list)
  // } 
  return(
    <form onSubmit={saveCourse}>
      <div>
        <label htmlFor="curso">Curso:</label>
          <select required name="curso" id="curso" value={course.curso} onChange={handleChange} disabled={disabledInput?true:false}>
            <option value="" disabled> -seleccione uno- </option>
            <option value="Matemática">Matemática</option>
            <option value="Comunicación">Comunicación</option>
            <option value="informática">Informática</option>
          </select>
        </div>
      <div>
        <label htmlFor="grado">Grado:</label>
        <select required name="grado" id="grado" value={course.grado} onChange={handleChange} disabled={disabledInput?true:false}>
          <option value="" disabled> -seleccione uno- </option>
          <option value="primero">Primero</option>
          <option value="segundo">Segundo</option>
          <option value="tercero">Tercero</option>
          <option value="cuarto">Cuarto</option>
          <option value="quinto">Quinto</option>
          <option value="sexto">Sexto</option>
        </select>
      </div>
      <div>
        <p>Seccion</p>
        <label htmlFor="seccion">
          <input type="checkbox" name="seccion" id="a" value='A' onChange={chooseSection} disabled={disabledInput?true:false}/>A
        </label>
        <label htmlFor="seccion">
          <input type="checkbox" name="seccion" id="b" value='B' onChange={chooseSection} disabled={disabledInput?true:false}/>B
        </label>
        <label htmlFor="seccion">
          <input type="checkbox" name="seccion" id="c" value='C' onChange={chooseSection} disabled={disabledInput?true:false}/>C
        </label>
      </div>
      <InputSubmit value='Añadir Curso' setDisabled={disabledInput?true:false}/>
      {/* <input type="button" value="Add Course" onClick={addCourseToList}/> */}
    </form>
  )
}