import { Link, Route } from 'wouter'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
//resources
import { observer } from '../../services/authFirebase'
import { getOneDoc, getMultipeDataWithCondition } from '../../services/getDataFirebase'
import userSvg from '../../assets/user.svg'
//context
import { IdUserContext } from '../../context/idUserContext'
import { StudentContext } from '../../context/studentContext'

export function NavBar(params) {
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
  const [menuClass, setMenuClass] = useState('showMenu')
  const closeMenu = ()=>{
    setMenuClass('hiddeMenu')
  }
  const openMenu = ()=>{
    setMenuClass('showMenu')
  }
  return(
    <>
    {
      showMenu === true?
      <>
        <div className='btnMenuContainer'>
          <button className='btnMenu' onClick={openMenu}>
            <ion-icon name="grid-outline"></ion-icon>
          </button>
        </div>
        <nav className={`menuContainer ${menuClass}`}>
          <div className='btnMenuContainer'>
            <button className='btnMenu closeMenu' onClick={closeMenu}>
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <div className='menuHeader'>
            <div className='menuUser'>
              <img className='menuUser-img' src={userSvg} alt="avatar user" />
              <span className='menuUser-name'>{idUser.name} {idUser.lastname}</span><br />
            </div>
            {
              idUser.permissions === 'parents'?
              <div className='selectContainer menuSelect'>
                <span className='selectLabel'>Hijo(a): </span>
                {
                  children.length === 1?<p>{children[0].name} {children[0].lastname}</p>:
                  <select className='selectInput' name="child" id="child" defaultValue="" onChange={selectChild}>
                    <option value="" disabled> -select a child- </option>
                    {
                      children.map(child =>{
                        return <option key={child.id} value={child.id}>{child.name} {child.lastname}</option>
                      })
                    }
                  </select>
                }
              </div>:<></>
            }
          </div>
          <ul className='menu'>
            {/* <li><Link href='/'><a>Home</a></Link></li> */}
            {
              idUser.permissions === 'admin'?
              <>
              <li className='menuItem'><Link onClick={closeMenu} href='/register'><a>Registrar nuevo usuario</a></Link></li> {/*admin*/}
              <li className='menuItem'><Link onClick={closeMenu} href='/all-teachers'><a>Ver Profesores</a></Link></li> {/*admin*/}
              </>:
              idUser.permissions === 'teacher'?
              <>
              </>:
              idUser.permissions === 'parents'?
              <>
              </>:<></>
            }
            <li className='menuItem'><Link onClick={closeMenu} href='/message'><a>Message</a></Link></li>{/*everyone*/}
            <li className='menuItem'><Link onClick={closeMenu} href={`/profile/${idUser.id}`}><a>Perfil</a></Link></li>{/*everyone*/}
          </ul>
        </nav>
      </>:<></>
      
    }
    </>
  )
}