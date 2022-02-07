import axios from './axios';


const checkToken = async accessToken => {
  if (!accessToken) {
    return false;
  }
  try {
    const account = await axios.get('/api/user/my-account');
    console.log(account)
    return true
  } catch (e) {
    return false
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    unsetSession();
  }
};

const unsetSession = () => {
  localStorage.removeItem('accessToken');
  delete axios.defaults.headers.common.Authorization;
};

export { checkToken, setSession, unsetSession };
