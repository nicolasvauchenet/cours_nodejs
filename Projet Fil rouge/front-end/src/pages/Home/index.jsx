import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../store/slices/userSlice'

const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.userData)

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  return (
    <main className='app-main'>
      <section>
        {userData ? (
          <>
            <h1>{userData.bakeryName}</h1>
            <p>
              Vous êtes connecté avec le compte <em>{userData.email}</em>.
            </p>
          </>
        ) : (
          <>
            <h1>Bienvenue sur votre application de gestion de Boulangerie !</h1>
            <p>Vous n'êtes pas connecté.</p>
          </>
        )}
      </section>
    </main>
  )
}

export default Home
