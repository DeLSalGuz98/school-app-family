import { useState, useEffect, useContext } from "react"
import format from 'date-format'

//Resources
import { Message } from "../../components/message/message"
import { observer } from "../../services/authFirebase"
import { useLocation } from "wouter"
import { getMultipeDataWithCondition } from "../../services/getDataFirebase"
import { IdUserContext } from "../../context/idUserContext"
import { ViewMessages } from "../../components/message/viewMessage"
import { TableNewMessages } from "../../components/tableMessages/tableNewMessages"
import { TableSentMessages } from "../../components/tableMessages/tableSentMessages"

export function MessagePage(){
  const [message, setMessage] = useState(false)
  const [location, setLocation] = useLocation()
  const {idUser} = useContext(IdUserContext)
  // const [listMessages, setListMessages] = useState([])
  const [showTableMessages, setShowTableMessages] = useState(<></>)
  useEffect(()=>{
    const res = observer()
    if(res === null){
      setLocation('/')
    }else{
    }
  },[])
  const newMessage = ()=>{
    setMessage(true)
  }
  const close = ()=>{
    setMessage(false)
  }
  const getSentMessages = ()=>{
    // const res = await getMultipeDataWithCondition('messages','fromUser','==', idUser.id)
    // setListMessages(res)
    setShowTableMessages(<TableSentMessages/>)
  }
  const getNewMessages = async()=>{
    const res = await getMultipeDataWithCondition('messages','toUser','==', idUser.id)
    // setListMessages(res)
    setShowTableMessages(<TableNewMessages list={res}/>)
  }
  const getWatchedMessages = ()=>{

  }
  return(
    <div>
      <button onClick={newMessage}>Enviar Nuevo Mensaje</button>
      <div>
        <nav>
          <button onClick={getSentMessages}>Mensajes Enviados</button>
          <button onClick={getNewMessages}>Mensajes Nuevos</button>
          <button>Mensajes Leidos</button>
        </nav>
        <div>
          {showTableMessages}
        </div>
      </div>
      {
        message?
        <div>
          <Message/>
          <button onClick={close}>cerrar</button>
        </div>:<></>
      }
    </div>
  )
}
// function TableSentMessages({list}) {
//   return(
//     <table>
//       <thead>
//         <tr>
//           <th>Fecha</th>
//           <th>Asunto</th>
//           <th>Acciones</th>
//         </tr>
//       </thead>
//       <tbody>
//         {
//           list.map((m)=>{
//             const getDate = new Date(m.dateMessage.seconds*1000)
//             const formatDate = format('dd-mm-yy', getDate)
//             return(
//               <tr key={m.id}>
//                 <td>{formatDate}</td>
//                 <td>{m.affair}</td>
//                 <td><button>Ver</button></td>
//               </tr>
//             )
//           })
//         }
//       </tbody>
//     </table>
//   )
// }
// function TableNewMessages({list}) {
//   const [viewMessage, setViewMessage] = useState(false)
//   const [componentMessages, setComponentMessage] = useState(<></>)
//   const watchMessage =(message)=>{
//     setViewMessage(true)
//     setComponentMessage(<ViewMessages objMessage={message}/>)
//   }
//   const closeMessage = ()=>{
//     setViewMessage(false)
//   }
//   return(
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th>Fecha</th>
//             <th>Remitente</th>
//             <th>Asunto</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             list.map((m)=>{
//               const getDate = new Date(m.dateMessage.seconds*1000)
//               const formatDate = format('dd-mm-yy', getDate)
//               return(
//                 <tr key={m.id}>
//                   <td>{formatDate}</td>
//                   <td>{m.fromUserName}</td>
//                   <td>{m.affair}</td>
//                   <td><button onClick={()=>watchMessage(m)}>Ver</button></td>
//                 </tr>
//               )
//             })
//           }
//         </tbody>
//       </table>
//       {
//         viewMessage?
//         <div>
//           {componentMessages}
//           <button onClick={closeMessage}>Cerrar</button>
//         </div>:<></>
//       }
//     </>
//   )
// }
