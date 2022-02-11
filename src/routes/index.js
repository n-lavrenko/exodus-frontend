import { Navigate, useRoutes } from 'react-router-dom'
import {AccountProvider} from '../contexts/AccountContext'
import AuthGuard from '../guards/AuthGuard'
import GuestGuard from '../guards/GuestGuard'
import AuthLayout from '../pages/auth/AuthLayout'
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
import {BuyBTC} from '../pages/dashboard/BuyBTC'
import {MyWallet} from '../pages/dashboard/MyWallet'
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
          <AccountProvider>
            <DashboardLayout />
          </AccountProvider>
        </AuthGuard>
      ),
      children: [
        { path: PATH_DASHBOARD.linkBankAccount, element: <LinkAccount /> },
        { path: PATH_DASHBOARD.buyBTC, element: <BuyBTC /> },
        { path: PATH_DASHBOARD.myWallet, element: <MyWallet /> },
      ],
    },
    {
      path: '*', element: <Navigate to={ PATH_AUTH.signin } replace />
    }
  ])
}
