import { useState, useEffect, useContext } from "react"
import './messagePage.css'

//Resources
import { Message } from "../../components/message/message"
import { observer } from "../../services/authFirebase"
import { useLocation } from "wouter"
import { IdUserContext } from "../../context/idUserContext"
import { TableNewMessages } from "../../components/tableMessages/tableNewMessages"
import { TableSentMessages } from "../../components/tableMessages/tableSentMessages"
import { TableReadedMessages } from "../../components/tableMessages/tableReadedMessage"

export function MessagePage(){
  const [message, setMessage] = useState(false)
  const [location, setLocation] = useLocation()
  const {idUser} = useContext(IdUserContext)
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
    setShowTableMessages(<TableSentMessages/>)
  }
  const getNewMessages =()=>{
    setShowTableMessages(<TableNewMessages/>)
  }
  const getWatchedMessages = ()=>{
    setShowTableMessages(<TableReadedMessages/>)
  }
  return(
    <div>
      <button className="btnCreateMessage" onClick={newMessage}>Enviar Nuevo Mensaje</button>
      <div>
        <nav className="btnListContainer">
          <button className="btnListMessage" onClick={getSentMessages}>Mensajes Enviados</button>
          <button className="btnListMessage" onClick={getNewMessages}>Mensajes Nuevos</button>
          <button className="btnListMessage" onClick={getWatchedMessages}>Mensajes Leidos</button>
        </nav>
        <div className="containerTableMessage">
          {showTableMessages}
        </div>
      </div>
      {
        message?
        <div className="viewWindow">
          <Message/>
          <button className="btnRed" onClick={close}>cerrar</button>
        </div>:<></>
      }
    </div>
  )
}