// hooks
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
// routes
import { PATH_DASHBOARD } from '../routes/paths'


export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth()
  let navigate = useNavigate()
  
  if (isAuthenticated) {
    navigate(PATH_DASHBOARD.linkBankAccount)
    return <></>
  }
  
  return <>{ children }</>
}
