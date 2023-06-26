import { useEffect, useState, useContext } from "react"
import format from 'date-format'

//Resources
import { ViewMessages } from "../message/viewMessage"
import { deleteOneDoc } from "../../services/deleteDataFirebase"
import { getMultipeDataWithCondition } from "../../services/getDataFirebase"
import { IdUserContext } from "../../context/idUserContext"

export function TableSentMessages() {
  const {idUser} = useContext(IdUserContext)
  const [viewMessage, setViewMessage] = useState(false)
  const [componentMessages, setComponentMessage] = useState(<></>)
  const [list, setList] = useState([])
  useEffect(()=>{getSentMessages()},[])
  const getSentMessages = async()=>{
    const res = await getMultipeDataWithCondition('messages','fromUser','==', idUser.id)
    // setListMessages(res)
    setList(res)
    // setShowTableMessages(<TableSentMessages list={res}/>)
  }
  const watchMessage =(message)=>{
    setViewMessage(true)
    setComponentMessage(<ViewMessages objMessage={message}/>)
  }
  const closeMessage = ()=>{
    setViewMessage(false)
  }
  const deleteMessage = async(idMessage)=>{
    const delConfirm = confirm('Esta seguro que quiere borrar el mensaje')
    if(delConfirm){
      const res = await deleteOneDoc('messages', idMessage)
      if(res){
        alert('Hubo un error, no se pudo eliminar el mensaje')
      }else{
        getSentMessages()
        alert('El mensaje se elimino correctamente')
      }
    }
  }
  return(
    <>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Asunto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((m)=>{
              const getDate = new Date(m.dateMessage.seconds*1000)
              const formatDate = format('dd-mm-yy', getDate)
              return(
                <tr key={m.id}>
                  <td>{formatDate}</td>
                  <td>{m.affair}</td>
                  <td>
                    <button onClick={()=>watchMessage(m)}>Ver</button>
                    <button onClick={()=>deleteMessage(m.id)}>Eliminar</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        viewMessage?
        <div>
          {componentMessages}
          <button onClick={closeMessage}>Cerrar</button>
        </div>:<></>
      }
    </>
  )
}