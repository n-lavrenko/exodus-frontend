import {createContext, useEffect, useReducer} from 'react'
import {authService} from '../services/auth.service'


const actionTypes = {
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
    case actionTypes.Initial:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      }
    case actionTypes.SignIn:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      }
    case actionTypes.Logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    
    default:
      return state
  }
}

const AuthContext = createContext(initialState)

function AuthProvider({children}) {
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        const {success, account} = await authService.checkAccount(accessToken)
        if (success) {
          authService.setSession(accessToken, account)
          dispatch({
            type: actionTypes.Initial,
            payload: {
              isAuthenticated: true,
              user: account
            }
          })
        } else {
          authService.unsetSession()
          dispatch({
            type: actionTypes.Initial,
            payload: {
              isAuthenticated: false,
              user: null
            }
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: actionTypes.Initial,
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
    const {success, message, user} = await authService.signIn(email, password)
    if (success) {
      dispatch({
        type: actionTypes.SignIn,
        payload: {
          user
        }
      })
    }
    return {success, message: message || 'Server is Unavailable'}
  }
  
  const signUp = async (data) => {
    const {success, message, user} = await authService.signUp(data)
    if (success) {
      dispatch({
        type: actionTypes.SignIn,
        payload: {
          user
        }
      })
    }
    return {success, message: message || 'Server is Unavailable'}
  }
  
  const signOut = async () => {
    authService.unsetSession()
    dispatch({type: actionTypes.Logout})
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
