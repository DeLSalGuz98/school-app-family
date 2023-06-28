export function ViewMessages({objMessage, children}) {
  return(
    <div className="viewMessage">
      <p>De: {objMessage.fromUserName}</p>
      <p>Asunto: {objMessage.affair}</p>
      <div className="viewMessageContent">
        <p>{objMessage.greeting}</p>
        <p>{objMessage.contendMessage}</p>
      </div>
      {children}
    </div>
  )
}