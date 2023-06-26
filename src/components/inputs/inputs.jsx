import './inputs.css'
export function Input({type,id,name, handleChange, value}) {
  return (
    <div className="inputContainer">
      <label className="inputLabel" htmlFor={id}>{name}</label>
      <input className="input" type={type} name={id} onChange={handleChange} value={value}/>
    </div>
  )
}
export function InputSubmit({value, setDisabled = false}) {
  return(
    <input className='submit' type="submit" value={value} disabled={setDisabled}/>
  )
}