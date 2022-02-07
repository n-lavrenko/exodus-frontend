// hooks
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
// routes
import { PATH_DASHBOARD } from '../routes/paths'


export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth()
  let navigate = useNavigate()
  
  if (isAuthenticated) {
    return navigate(PATH_DASHBOARD)
  }
  
  return <>{ children }</>
}
