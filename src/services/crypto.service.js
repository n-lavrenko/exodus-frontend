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

const getWalletInfo = async () => {
  try {
    const response = await axios.get(endpoints.walletInfo)
    return response.data
  } catch (e) {
    console.error(e)
  }
}
const getAdminBalance = async () => {
  try {
    const response = await axios.get(endpoints.adminBalance)
    const {balance, success} = response.data
    return {balance, success}
  } catch (e) {
    console.error(e)
  }
}


export const cryptoService = {
  createWallet,
  getWalletInfo,
  getAdminBalance
}
