import { useState } from "react"
import format from 'date-format'

//Resources
import { ViewMessages } from "../message/viewMessage"

export function TableNewMessages({list}) {
  const [viewMessage, setViewMessage] = useState(false)
  const [componentMessages, setComponentMessage] = useState(<></>)
  const watchMessage =(message)=>{
    setViewMessage(true)
    setComponentMessage(<ViewMessages objMessage={message}/>)
  }
  const closeMessage = ()=>{
    setViewMessage(false)
  }
  return(
    <>
      <table>
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
              const formatDate = format('dd-mm-yy', getDate)
              return(
                <tr key={m.id}>
                  <td>{formatDate}</td>
                  <td>{m.fromUserName}</td>
                  <td>{m.affair}</td>
                  <td><button onClick={()=>watchMessage(m)}>Ver</button></td>
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