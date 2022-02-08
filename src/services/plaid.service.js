import axios from '../utils/axios'
import {endpoints} from './endpoints'


export const createLinkToken = async (callback) => {
  try {
    const response = await axios.post(endpoints.createLinkToken)
    callback(response.data.link_token)
  } catch (e) {
    console.error(e)
  }
}

export const exchangePublicToken = async (publicToken) => {
  try {
    const response = await axios.post(endpoints.exchangePublicToken, {publicToken})
    return response.data
  } catch (e) {
    console.error(e)
  }
}
