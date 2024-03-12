import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Error404 from '../pages/Error404'

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App component={<Home />} />
    },
    {
      path: '/connexion',
      element: <App component={<Login />} />
    },
    {
      path: '*',
      element: <App component={<Error404 />} />
    }
  ])

  return <RouterProvider router={router} />
}

export default AppRouter
