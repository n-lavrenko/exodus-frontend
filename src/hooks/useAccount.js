import { useContext } from 'react'
import {AccountContext} from '../contexts/AccountContext'



const useAccount = () => {
  const context = useContext(AccountContext)
  
  if (!context) throw new Error('Auth context must be use inside AuthProvider')
  
  return context
}

export default useAccount
