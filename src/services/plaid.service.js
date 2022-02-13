import axios from '../utils/axios'
import {endpoints} from './endpoints'


const createLinkToken = async (callback) => {
  try {
    const response = await axios.post(endpoints.createLinkToken)
    callback(response.data.link_token)
  } catch (e) {
    console.error(e)
  }
}

const exchangePublicToken = async (publicToken) => {
  try {
    const response = await axios.post(endpoints.exchangePublicToken, {publicToken})
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const unlinkPlaid = async () => {
  try {
    await axios.post(endpoints.unlinkPlaid)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}


const checkIsUserLinked = async () => {
  try {
    const response = await axios.get(endpoints.checkIsUserLinked)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getPlaidAccounts = async () => {
  try {
    const response = await axios.get(endpoints.plaidAccounts)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const paidService = {
  createLinkToken,
  exchangePublicToken,
  unlinkPlaid,
  checkIsUserLinked,
  getPlaidAccounts
}
