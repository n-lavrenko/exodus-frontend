import './App.css';
import useAuth from './hooks/useAuth';
import SignIn from './pages/auth/SignIn';


function App() {
  const { isInitialized } = useAuth();
  
  return (
    <SignIn/>
  );
}

export default App;
