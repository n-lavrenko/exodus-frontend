import axios from './axios'


const checkAccount = async accessToken => {
  if (!accessToken) {
    return { success: false }
  }
  try {
    const account = await axios.get('/api/user/my-account')
    return { success: true, account }
  } catch (e) {
    return { success: false }
  }
}

const setSession = (accessToken, user) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('user', user)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
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
