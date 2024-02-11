import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../store/slices/userSlice'
import './index.scss'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    document.getElementById('errorEmail').innerHTML = ''
    document.getElementById('errorPassword').innerHTML = ''

    dispatch(authenticateUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch(error => {
        if (error.status === 404) {
          document.getElementById('errorEmail').innerHTML = error.message
        } else if (error.status === 401) {
          document.getElementById('errorPassword').innerHTML = error.message
        }
      })
  }

  return (
    <main className='app-main'>
      <section>
        <h1>Authentification</h1>
      </section>

      <form className='app-form' onSubmit={handleSubmit}>
        <fieldset className='form-fieldset'>
          <legend className='form-legend'>Saisissez vos identifiants</legend>

          <div className='form-group'>
            <label htmlFor='userEmail' className='form-label required'>
              Votre e-mail
            </label>
            <input
              type='email'
              id='userEmail'
              className='form-control'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            <p id='errorEmail' className='error'></p>
          </div>

          <div className='form-group'>
            <label htmlFor='userPassword' className='form-label required'>
              Votre mot de passe
            </label>
            <input
              type='password'
              id='userPassword'
              className='form-control'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <p id='errorPassword' className='error'></p>
          </div>
        </fieldset>

        <button type='submit' className='app-btn cta'>
          Connexion
        </button>
      </form>
    </main>
  )
}

export default Login
