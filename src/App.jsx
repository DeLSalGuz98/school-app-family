import './App.css'
import { Link, Route } from 'wouter'

//pages
import { RegisterPage } from './pages/RegisterPage/registerPage'

function Message(params) {
  return <h2>message</h2>
}

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link href='/register'><a>Registrar nuevo usuario</a></Link></li>
          <li><Link href='/message'><a>Message</a></Link></li>
        </ul>
      </nav>
      <Route path='/register' component={RegisterPage}/>
      <Route path='/message'><Message></Message></Route>
      
    </>
  )
}

export default App
