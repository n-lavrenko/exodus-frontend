import {endpoints} from '../services/endpoints'
import axios from './axios'


const checkAccount = async accessToken => {
  if (!accessToken) {
    return { success: false }
  }
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${ accessToken }`
    const response = await axios.get(endpoints.myProfile)
    return { success: true, account: response.data.user }
  } catch (e) {
    return { success: false }
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

export { checkAccount, setSession, unsetSession }
