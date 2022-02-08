import {createContext, useEffect, useReducer} from 'react'
// utils
import axios from '../utils/axios'
import {checkAccount, setSession, unsetSession} from '../utils/jwt'


const Types = {
  Initial: 'INITIALIZE',
  SignIn: 'SIGNIN',
  Logout: 'LOGOUT'
}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
}

const AuthReducer = (state, action) => {
  switch (action.type) {
    case Types.Initial:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      }
    case Types.SignIn:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      }
    case Types.Logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    
    default:
      return state
  }
}

const AuthContext = createContext(null)

function AuthProvider({children}) {
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        const {success, account} = await checkAccount(accessToken)
        if (success) {
          setSession(accessToken, account)
          
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user: account
            }
          })
        } else {
          unsetSession()
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null
            }
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null
          }
        })
      }
    }
    
    initialize()
  }, [])
  
  const signIn = async (email, password) => {
    try {
      const response = await axios.post('/api/user/signin', {
        email,
        password
      })
      const {accessToken, user} = response.data
      
      setSession(accessToken, user)
      dispatch({
        type: Types.SignIn,
        payload: {
          user
        }
      })
    } catch (e) {
      e.message && alert(e.message)
    }
  }
  
  const signUp = async (data) => {
    try {
      const response = await axios.post('/api/user/signup', data)
      const {accessToken, user} = response.data
      
      setSession(accessToken, user)
      dispatch({
        type: Types.SignIn,
        payload: {
          user
        }
      })
      
    } catch (e) {
      e.message && alert(e.message)
    }
  }
  
  const signOut = async () => {
    unsetSession()
    dispatch({type: Types.Logout})
  }
  
  return (
    <AuthContext.Provider
      value={ {
        ...state,
        signIn,
        signUp,
        signOut
      } }
    >
      { children }
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}