import './App.css'
import { Link, Route } from 'wouter'
import { useEffect, useState } from 'react'
import { useContext } from 'react'

//pages
import { HomePage } from './pages/HomePage/homePage'
import { RegisterPage } from './pages/RegisterPage/registerPage'
import { ProfilePage } from './pages/ProfilePage/profilePage'
import { AllTeachers } from './pages/AllTeachers/allTeachers'
import { TeacherDetail } from './pages/AllTeachers/TeacherDetails/teacherDetail'
//resources
import { observer } from './services/authFirebase'
import { getOneDoc } from './services/getDataFirebase'

//context
import { IdUserContext } from './context/idUserContext'

function Message(params) {
  return <h2>message</h2>
}

function App() {
  const {idUser} = useContext(IdUserContext);
  const [showMenu, setShowMenu] = useState(false);
  const [userId, setUserId] = useState('')
  const [permissions, setPermissions] = useState('')
  useEffect(()=>{
    const res = observer()
    if(res !== null){
      setShowMenu(true)
      setUserId(res.uid)
      getPermisions(res.uid)
    }else{
      setShowMenu(false)
    }
  },[idUser]);
  const getPermisions = async(id)=>{
    const res = await getOneDoc('user', id)
    setPermissions(res.data().permissions)
  }
  return (
    <>
      {
        showMenu === true?
        <nav>
          <ul>
            {/* <li><Link href='/'><a>Home</a></Link></li> */}
            {
              permissions === 'admin'?
              <>
              <li><Link href='/register'><a>Registrar nuevo usuario</a></Link></li> {/*admin*/}
              <li><Link href='/all-teachers'><a>Ver Profesores</a></Link></li> {/*admin*/}
              </>:
              permissions === 'teacher'?
              <>
              </>:
              permissions === 'parent'?
              <>
              </>:<></>
            }
            <li><Link href='/message'><a>Message</a></Link></li>{/*everyone*/}
            <li><Link href={`/profile/${userId}`}><a>Perfil</a></Link></li>{/*everyone*/}
          </ul>
        </nav>:
        <></>
      }
      <Route path='/'component={HomePage} />
      <Route path='/register' component={RegisterPage}/>
      <Route path='/message'><Message></Message></Route>
      <Route path='/profile/:id'>{(params)=><ProfilePage id={params.id}/>}</Route>
      <Route path='/all-teachers' component={AllTeachers}/>
      <Route path='/all-teachers/teacher/:id'>{(params)=><TeacherDetail id={params.id}/>}</Route>
    </>
  )
}

export default App
