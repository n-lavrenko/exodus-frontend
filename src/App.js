import './App.css'
import {LoadingScreen} from './components/LoadingScreen'
import useAuth from './hooks/useAuth'
import { AppRouter } from './routes'

function App() {
  const {isInitialized} = useAuth()
  
  return (
    isInitialized ? <AppRouter /> : <LoadingScreen />
  )
  
}

export default App
