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
import { MessagePage } from './pages/MessagePage/messagePage'
//resources
import { observer } from './services/authFirebase'
import { getOneDoc, getMultipeDataWithCondition } from './services/getDataFirebase'

//context
import { IdUserContext } from './context/idUserContext'
import { StudentContext } from './context/studentContext'

function App() {
  const {idUser} = useContext(IdUserContext)
  const {setStudent} = useContext(StudentContext)
  const [showMenu, setShowMenu] = useState(false)
  const [userId, setUserId] = useState('')
  // const [permissions, setPermissions] = useState('')
  const [children, setChildren] = useState([])
  useEffect(()=>{
    const res = observer()
    if(res !== null){
      setShowMenu(true)
      if(idUser.permissions === 'parents'){
        getChildren(idUser.id)
      }
    }else{
      setShowMenu(false)
    }
  },[idUser]);
  const getChildren = async (idParent)=>{
    const res = await getMultipeDataWithCondition('student', 'parent', '==', idParent)
    if(res.length < 2){
      setStudent(res[0])
    }
    setChildren(res)
  }
  const selectChild = (e)=>{
    const {value} = e.target
    const index = children.findIndex(child => child.id === value)
    setStudent(children[index])
  }
  return (
    <>
      {
        showMenu === true?
        <nav>
          <span>{idUser.name} {idUser.lastname}</span><br />
          {
            idUser.permissions === 'parents'?
            <><span>Hijo(a): </span>
              {
                children.length === 1?<p>{children[0].name} {children[0].lastname}</p>:
                <select name="child" id="child" defaultValue="" onChange={selectChild}>
                  <option value="" disabled> -select a child- </option>
                  {
                    children.map(child =>{
                      return <option key={child.id} value={child.id}>{child.name} {child.lastname}</option>
                    })
                  }
                </select>
              }
            </>:<></>
          }
          <ul>
            {/* <li><Link href='/'><a>Home</a></Link></li> */}
            {
              idUser.permissions === 'admin'?
              <>
              <li><Link href='/register'><a>Registrar nuevo usuario</a></Link></li> {/*admin*/}
              <li><Link href='/all-teachers'><a>Ver Profesores</a></Link></li> {/*admin*/}
              </>:
              idUser.permissions === 'teacher'?
              <>
              </>:
              idUser.permissions === 'parents'?
              <>
              </>:<></>
            }
            <li><Link href='/message'><a>Message</a></Link></li>{/*everyone*/}
            <li><Link href={`/profile/${idUser.id}`}><a>Perfil</a></Link></li>{/*everyone*/}
          </ul>
        </nav>:
        <></>
      }
      <Route path='/'component={HomePage} />
      <Route path='/register' component={RegisterPage}/>
      <Route path='/message'><MessagePage/></Route>
      <Route path='/profile/:id'>{(params)=><ProfilePage id={params.id}/>}</Route>
      <Route path='/all-teachers' component={AllTeachers}/>
      <Route path='/all-teachers/teacher/:id'>{(params)=><TeacherDetail id={params.id}/>}</Route>
    </>
  )
}

export default App
