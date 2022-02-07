import { Navigate, useRoutes } from 'react-router-dom'
import AuthGuard from '../guards/AuthGuard'
import GuestGuard from '../guards/GuestGuard'
import AuthLayout from '../pages/auth/AuthLayout'
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
import DashboardLayout from '../pages/dashboard/DashboardLayout'
import {LinkAccount} from '../pages/dashboard/LinkAccount'
import {PATH_AUTH, PATH_DASHBOARD} from './paths'


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
      ],
    },
    {
      path: PATH_DASHBOARD.root,
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: PATH_DASHBOARD.linkBankAccount, element: <LinkAccount /> },
      ],
    },
    {
      path: '*', element: <Navigate to={ PATH_AUTH.signin } replace />
    }
  ])
}
