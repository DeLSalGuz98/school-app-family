export function Input({type,id,name, handleChange, value}) {
  return (
    <div>
      <label htmlFor={id}>{name}</label>
      <input type={type} name={id} onChange={handleChange} value={value}/>
    </div>
  )
}
export function InputSubmit({value}) {
  return(
    <input type="submit" value={value} />
  )
}