export function ViewMessages({objMessage}) {
  return(
    <div>
      <p>De: {objMessage.fromUserName}</p>
      <p>Asunto: {objMessage.affair}</p>
      <div>
        <p>{objMessage.greeting}</p>
        <p>{objMessage.contendMessage}</p>
      </div>
    </div>
  )
}