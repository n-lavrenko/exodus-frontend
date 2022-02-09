import axios from '../utils/axios'
import {endpoints} from './endpoints'


const checkAccount = async accessToken => {
  if (!accessToken) {
    return {success: false}
  }
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${ accessToken }`
    const response = await axios.get(endpoints.myProfile)
    return {success: true, account: response.data.user}
  } catch (e) {
    return {success: false}
  }
}

const signIn = async (email, password) => {
  try {
    const response = await axios.post(endpoints.signin, {
      email,
      password
    })
    const {accessToken, user} = response.data
    
    setSession(accessToken, user)
    
    return {success: true, user, accessToken}
  } catch (e) {
    return {success: false, message: e.message}
  }
}

const signUp = async (data) => {
  try {
    const response = await axios.post(endpoints.signup, data)
    const {accessToken, user} = response.data
    
    setSession(accessToken, user)
    
    return {success: true, user, accessToken}
  } catch (e) {
    return {success: false, message: e.message}
  }
}

const setSession = (accessToken, user) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('user', JSON.stringify(user))
    axios.defaults.headers.common.Authorization = `Bearer ${ accessToken }`
  } else {
    unsetSession()
  }
}

const unsetSession = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
  delete axios.defaults.headers.common.Authorization
}

export const authService = {
  checkAccount,
  setSession,
  unsetSession,
  signIn,
  signUp
}
