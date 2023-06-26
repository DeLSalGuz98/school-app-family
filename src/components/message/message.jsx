import { useEffect, useContext, useState } from "react"
//resources
import { IdUserContext } from "../../context/idUserContext"
import { StudentContext } from "../../context/studentContext"
import { observer } from "../../services/authFirebase"
import { getListTeacherForMessage, getListParentsForMessage } from "../../services/getDataFirebase"
import { saveData } from "../../services/saveFirebase"

export function Message({}) {
  const {student} = useContext(StudentContext)
  const {idUser} = useContext(IdUserContext)
  // const [user, setUser] = useState({})
  const [selectList, setSelectList] = useState([])
  const [greeting, setGreeting] = useState('')
  const [levelAndSection, setLevelAndSection] = useState({'level':'','section':''})
  const [message, setMessage] = useState({
    'fromUser':'',
    'fromUserName': `${idUser.name} ${idUser.lastname}`,
    'toUser':'',
    'affair':'',
    'greeting':'',
    'contendMessage':'',
    'dateMessage':'',
    'statusMessage':'' // status message s: send, n: new, w:watched
  });
  const [disabledInput, setDisabledInput] = useState(false)
  useEffect(()=>{
    const res = observer()
    if(res !== null){
      getListOfTo()
    }
  },[])
  const getListOfTo = async()=>{
    if(idUser.permissions === 'parents'){
      setGreeting(`Saludos profesor Soy el Padre/Madre de: ${student.name} ${student.lastname} - ${student.level} ${student.section}`)
      const res = await getListTeacherForMessage(student.level, student.section)
      setSelectList(res)
    }
  }
  const selectLevelAndSection = (e)=>{
    const {name, value} = e.target
    setLevelAndSection({...levelAndSection, [name]:value})
  }
  const searchParents = async(e)=>{
    e.preventDefault()
    if(idUser.permissions === 'teacher'){
      setGreeting(`Saludos Sr. Padre de familia`)
      const res = await getListParentsForMessage(levelAndSection.level, levelAndSection.section)
      setSelectList(res)
    }
  }
  const handleMessage = (e)=>{
    const {name, value} = e.currentTarget
    const today = new Date();
    setMessage({...message, [name]:value, 'fromUser': idUser.id, 'greeting':  greeting, 'statusMessage': 'n', 'dateMessage':today})

  }
  const sendMessage = async(e)=>{
    e.preventDefault()
    setDisabledInput(true)
    const res = await saveData('messages', message);
    if(res.message && res.message === 'success'){
      alert('mensaje enviado satisfactoriamente')
    }else{
      alert('Sucedio un error, porfavor intentelo nuevamente')
    }
  }
  return(
    <div>
      {
        idUser.permissions === 'teacher'?
        <form onSubmit={searchParents}>
          <div>
            <label htmlFor="level">Grado</label>
            <select name="level" id="level" defaultValue="" onChange={selectLevelAndSection} required>
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
            <select name="section" id="section" defaultValue="" onChange={selectLevelAndSection} required>
              <option value="" disabled> -Seleccione uno- </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <input type="submit" value="Establecer grado y seccion" />
        </form>
        :<></>
      }
      <form onSubmit={sendMessage}>
        <p>De: {idUser.name} {idUser.lastname}</p>
        <div>
          <label htmlFor="listTo">Para:</label>
          <select name="toUser" id="listTo" defaultValue={''} onChange={handleMessage} disabled={disabledInput}>
            <option value="" disabled> -Seleccione al Receptor- </option>
            {
              selectList.map(e=>{
                if(idUser.permissions === 'parents'){
                  return <option key={e.id} value={e.idTeacher}>{e.nameTeacher} - {e.curso}</option>
                }else if(idUser.permissions === 'teacher'){
                  //nota: en caso del docente lo que muestra es el nombre del estudiante, pero el mensaje se envia al id del padre
                  return <option key={e.id} value={e.idParent}>{e.name} {e.lastname}</option>
                }
              })
            }
          </select>
        </div>
        <div>
          <label htmlFor="affair">Asunto:</label>
          <input type="text" name='affair' id="affair" onChange={handleMessage} disabled={disabledInput}/>
        </div>
        <p>{greeting}</p>
        <textarea name="contendMessage" id="" cols="30" rows="10" maxLength={500} onChange={handleMessage} disabled={disabledInput}></textarea>
        <input type="submit" value="Enviar Mensaje"/>
      </form>
    </div>
  )
}