import { Navigate } from 'react-router-dom'
// hooks
import useAuth from '../hooks/useAuth'
// routes
import { PATH_DASHBOARD } from '../routes/paths'


export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.linkBankAccount} />
  }
  
  return <>{ children }</>
}
