import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, getUserProducts } from '../../store/slices/userSlice'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.userData)
  const userProducts = useSelector(state => state.user.userProducts)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await dispatch(getUserData())
      await dispatch(getUserProducts())
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])

  const handleDelete = productId => {
    return e => {
      e.preventDefault()

      if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        console.log(`Suppression du produit #${productId}`)
      }
    }
  }

  if (isLoading) {
    return (
      <main className='app-main'>
        <section>
          <p>
            <strong>Chargement…</strong>
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className='app-main'>
      <section>
        {userData ? (
          <>
            <h1>
              {userData.bakeryName?.length > 0 // Utilise l'opérateur de chaînage optionnel ici
                ? userData.bakeryName
                : 'Bienvenue sur votre application de gestion de Boulangerie !'}
            </h1>
            <p>
              Vous êtes connecté avec le compte <em>{userData.email}</em>.
            </p>
            {userData.role === 'ROLE_ADMIN' && (
              <p>
                Vous êtes <em>Administrateur</em>.
              </p>
            )}
            {userData.role !== 'ROLE_ADMIN' &&
              userProducts &&
              userProducts.length > 0 && (
                <>
                  <h2>Vos Produits :</h2>

                  <ul>
                    {userProducts.map(product => (
                      <li key={product._id}>
                        {product.name}
                        &nbsp;:&nbsp;
                        {product.price.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR'
                        })}
                        <br />
                        <em>{product.status}</em>
                        <br />
                        <a href='#' className='text-info'>
                          modifier
                        </a>
                        &nbsp;|&nbsp;
                        <a
                          href='#'
                          className='text-danger'
                          onClick={handleDelete(product._id)}
                        >
                          supprimer
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href='#' className='text-success'>
                        Ajouter un produit
                      </a>
                    </li>
                  </ul>
                </>
              )}
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
