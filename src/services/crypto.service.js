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

const depositBTCWallet = async (amount) => {
  try {
    const response = await axios.post(endpoints.depositBTCWallet, {amount})
    const {balance, success} = response.data
    return {balance, success}
  } catch (e) {
    throw e?.error?.message || e
  }
}

const depositAdminWallet = async (amount) => {
  try {
    const response = await axios.post(endpoints.depositAdminWallet, {amount})
    const {balance, success} = response.data
    return {balance, success}
  } catch (e) {
    throw e?.error?.message || e
  }
}


export const cryptoService = {
  createWallet,
  getWalletInfo,
  depositBTCWallet,
  depositAdminWallet
}
