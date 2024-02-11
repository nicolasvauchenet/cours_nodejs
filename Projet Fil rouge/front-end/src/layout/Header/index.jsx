import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUserData } from '../../store/slices/userSlice'
import reactLogo from '../../assets/react.svg'
import './index.scss'

const Header = () => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = e => {
    e.preventDefault()
    if (window.confirm('Vous partez ?')) {
      dispatch(removeUserData())
      navigate('/')
    }
  }

  return (
    <header className='app-header'>
      <NavLink to='/' className='app-logo'>
        <img src={reactLogo} alt='Logo' />
      </NavLink>

      <NavLink to='/' className='app-sitename'>
        Cours Node.js - Front-End
      </NavLink>

      <nav className='app-navigation'>
        <NavLink to='/'>Accueil</NavLink>
        {token ? (
          <a href='#' onClick={handleLogout}>
            Déconnexion
          </a>
        ) : (
          <NavLink to='/connexion'>Connexion</NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header
