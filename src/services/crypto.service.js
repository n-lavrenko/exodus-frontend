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

const depositBTCWallet = async (amountBTC, accountId) => {
  try {
    const response = await axios.post(endpoints.depositBTCWallet, {amountBTC, accountId})
    const {balance, success, message} = response.data
    return {balance, success, message}
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
const getBTCPrice = async () => {
  try {
    const response = await axios.get(endpoints.getBTCPrice)
    return {success: true, price: response.data.price}
  } catch (e) {
    throw e?.error?.message || e
  }
}


export const cryptoService = {
  createWallet,
  getWalletInfo,
  depositBTCWallet,
  depositAdminWallet,
  getBTCPrice
}
