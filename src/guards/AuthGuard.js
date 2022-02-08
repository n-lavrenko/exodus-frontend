import { useState } from 'react'
import {Navigate, useLocation} from 'react-router-dom'
// hooks
import useAuth from '../hooks/useAuth'
// pages
import Login from '../pages/auth/SignIn'


export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth()
  const { pathname } = useLocation()
  const [requestedLocation, setRequestedLocation] = useState(null)
  
  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }
    return <Login />
  }
  
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null)
    return <Navigate to={requestedLocation}/>
  }
  
  return <>{ children }</>
}
