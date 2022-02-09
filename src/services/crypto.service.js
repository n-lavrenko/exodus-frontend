import axios from '../utils/axios'
import {endpoints} from './endpoints'


const createWallet = async () => {
  try {
    const response = await axios.post(endpoints.createWallet)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const cryptoService = {
  createWallet,
}
