import { useEffect, useState, useContext  } from "react"
import format from 'date-format'
import './tableMessage.css'

//Resources
import { ViewMessages } from "../message/viewMessage"
import { getMultipeDataWithCondition, getMessagesToUser } from "../../services/getDataFirebase"
import { IdUserContext } from "../../context/idUserContext"
import { updateDocValue } from "../../services/saveFirebase"

export function TableNewMessages() {
  const {idUser} = useContext(IdUserContext)
  const [viewMessage, setViewMessage] = useState(false)
  const [componentMessages, setComponentMessage] = useState(<></>)
  const [list, setList] = useState([])
  useEffect(()=>{getNewtMessages()},[])
  const getNewtMessages = async()=>{
    if(idUser.permissions !== 'admin'){
      const res = await getMessagesToUser(idUser.id, 'n')
      setList(res)
    }else{
      const res = await getMessagesToUser('schoolDirector', 'n')
      setList(res)
    }
  }
  const watchMessage =(message)=>{
    setViewMessage(true)
    setComponentMessage(<ViewMessages objMessage={message}><button onClick={()=>messageReaded(message.id)}>Marcar como mensaje leido</button></ViewMessages>)
  }
  const messageReaded = async(idMessage)=>{
    const confirmAction = confirm('Seguro que quiere marcar el mensaje como leido')
    if(confirmAction){
      const res = await updateDocValue('messages', idMessage, {'statusMessage': 'r'})
      if(res){
        alert('algo salio mal, intentelo nuevamente')
      }else{
        getNewtMessages()
      }
    }
  }
  const closeMessage = ()=>{
    setViewMessage(false)
  }
  return(
    <>
      <h2>Mensajes Nuevos</h2>
      {
        list.length === 0?<p>No hay nuevos mensajes</p>:
        <table className="tableMessage">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Remitente</th>
              <th>Asunto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              
              list.map((m)=>{
                const getDate = new Date(m.dateMessage.seconds*1000)
                const formatDate = format('dd-MM-yy', getDate)
                return(
                  <tr key={m.id}>
                    <td>{formatDate}</td>
                    <td>{m.fromUserName}</td>
                    <td>{m.affair}</td>
                    <td><button className="btnGreen" onClick={()=>watchMessage(m)}>Ver</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      }
      {
        viewMessage?
        <div className="viewWindow">
          {componentMessages}
          <button className="btnRed" onClick={closeMessage}>Cerrar</button>
        </div>:<></>
      }
    </>
  )
}