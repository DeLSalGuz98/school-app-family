import './App.css'
import { Link, Route } from 'wouter'

//pages
import { NavBar } from './components/navbar/navbar'
import { HomePage } from './pages/HomePage/homePage'
import { RegisterPage } from './pages/RegisterPage/registerPage'
import { ProfilePage } from './pages/ProfilePage/profilePage'
import { AllTeachers } from './pages/AllTeachers/allTeachers'
import { TeacherDetail } from './pages/AllTeachers/TeacherDetails/teacherDetail'
import { MessagePage } from './pages/MessagePage/messagePage'

function App() {
  return (
    <div className='app'>
      <NavBar/>
      <div className='containerApp'>
        <Route path='/'component={HomePage} />
        <Route path='/register' component={RegisterPage}/>
        <Route path='/message'><MessagePage/></Route>
        <Route path='/profile/:id'>{(params)=><ProfilePage id={params.id}/>}</Route>
        <Route path='/all-teachers' component={AllTeachers}/>
        <Route path='/all-teachers/teacher/:id'>{(params)=><TeacherDetail id={params.id}/>}</Route>
      </div>
    </div>
  )
}

export default App
