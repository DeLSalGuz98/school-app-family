import './App.css'
import { Link, Route } from 'wouter'
import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'

//pages
import { HomePage } from './pages/HomePage/homePage'
import { RegisterPage } from './pages/RegisterPage/registerPage'
import { ProfilePage } from './pages/ProfilePage/profilePage'
import { useContext } from 'react'
//resources
import { observer } from './services/authFirebase'

//context
import { IdUserContext } from './context/idUserContext'

function Message(params) {
  return <h2>message</h2>
}

function App() {
  const {idUser} = useContext(IdUserContext);
  const [location, setLocation] = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  useEffect(()=>{
    const res = observer()
    console.log(res)
    if(idUser !== '' || res !== null){
      setShowMenu(true)
    }else{
      setShowMenu(false)
    }
  },[idUser]);
  return (
    <>
      {
        showMenu?
        <nav>
          <ul>
            <li><Link href='/'><a>Home</a></Link></li>
            <li><Link href='/register'><a>Registrar nuevo usuario</a></Link></li> {/*admin*/}
            <li><Link href='/message'><a>Message</a></Link></li>{/*everyone*/}
            <li><Link href={`/profile/${'id_qwe'}`}><a>Perfil</a></Link></li>{/*everyone*/}
          </ul>
        </nav>:
        <></>
      }
      <Route path='/'component={HomePage} />
      <Route path='/register' component={RegisterPage}/>
      <Route path='/message'><Message></Message></Route>
      <Route path='/profile/:id'>{(params)=><ProfilePage id={params.id}/>}</Route>
    </>
  )
}

export default App
