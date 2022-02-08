import { useState } from 'react'
import {Navigate, useLocation} from 'react-router-dom'
// hooks
import useAuth from '../hooks/useAuth'
// other
import {PATH_AUTH} from '../routes/paths'


export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth()
  const { pathname } = useLocation()
  const [requestedLocation, setRequestedLocation] = useState(null)
  
  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }
    return <Navigate to={PATH_AUTH.signin}/>
  }
  
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null)
    return <Navigate to={requestedLocation}/>
  }
  
  return <>{ children }</>
}
