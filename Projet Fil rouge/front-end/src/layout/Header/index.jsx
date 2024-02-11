import { NavLink } from 'react-router-dom'
import reactLogo from '../../assets/react.svg'
import './index.scss'

const Header = () => {
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
        <NavLink to='/connexion'>Connexion</NavLink>
      </nav>
    </header>
  )
}

export default Header
