import { Navigate, useRoutes } from 'react-router-dom'
import GuestGuard from '../guards/GuestGuard'
import AuthLayout from '../pages/auth/AuthLayout'
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
import { PATH_AUTH } from './paths'


export function AppRouter() {
  
  return useRoutes([
    {
      path: PATH_AUTH.root,
      element: (
        <GuestGuard>
          <AuthLayout />
        </GuestGuard>
      ),
      children: [
        { path: PATH_AUTH.signup, element: <SignUp /> },
        { path: PATH_AUTH.signin, element: <SignIn /> }
      ]
    },
    { path: '*', element: <Navigate to={PATH_AUTH.signin} replace /> }
  ])
}
