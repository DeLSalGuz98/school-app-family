import './App.css'
import { Link, Route } from 'wouter'

//pages
import { RegisterPage } from './pages/RegisterPage/registerPage'
import { ProfilePage } from './pages/ProfilePage/profilePage'

function Message(params) {
  return <h2>message</h2>
}

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link href='/register'><a>Registrar nuevo usuario</a></Link></li> {/*admin*/}
          <li><Link href='/message'><a>Message</a></Link></li>{/*everyone*/}
          <li><Link href={`/profile/${'id_qwe'}`}><a>Perfil</a></Link></li>{/*everyone*/}
        </ul>
      </nav>
      <Route path='/register' component={RegisterPage}/>
      <Route path='/message'><Message></Message></Route>
      <Route path='/profile/:id'>{(params)=><ProfilePage id={params.id}/>}</Route>
    </>
  )
}

export default App
