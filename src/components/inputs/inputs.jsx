export function Input({type,id,name, handleChange}) {
  return (
    <div>
      <label htmlFor={id}>{name}</label>
      <input type={type} name={id} onChange={handleChange}/>
    </div>
  )
}