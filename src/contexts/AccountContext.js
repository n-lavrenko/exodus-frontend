import {createContext, useEffect, useReducer} from 'react'
import {cryptoService} from '../services/crypto.service'
import {paidService} from '../services/plaid.service'


const ActionTypes = {
  Initial: 'INITIALIZE',
  LinkPlaid: 'LINK_PLAID',
  UnlinkPlaid: 'UNLINK_PLAID',
  WalletCreated: 'WALLET_CREATED'
}

const initialState = {
  isPlaidLinked: false,
  plaidLink: null,
  walletInfo: {
    isWalletCreated: false,
    walletAddress: null,
    walletName: null,
    balance: null
  }
}

const AccountReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.Initial:
      return {
        plaidLink: action.payload.plaidLink,
        isPlaidLinked: action.payload.isPlaidLinked,
        walletInfo: action.payload.walletInfo,
      }
    case ActionTypes.LinkPlaid:
      return {
        ...state,
        plaidLink: action.payload.plaidLink,
        isPlaidLinked: true,
      }
    case ActionTypes.UnlinkPlaid:
      return {
        ...state,
        plaidLink: null,
        isPlaidLinked: false,
      }
    case ActionTypes.WalletCreated:
      return {
        ...state,
        walletInfo: action.payload.walletInfo
      }
    
    default:
      return state
  }
}

const AccountContext = createContext(initialState)

function AccountProvider({children}) {
  const [state, dispatch] = useReducer(AccountReducer, initialState)
  
  useEffect(() => {
    const initialize = async () => {
      try {
        const linkedResponse = await paidService.checkIsUserLinked()
        const {isLinked, link} = linkedResponse
  
        const walletCreatedResponse = await cryptoService.getWalletInfo()
        
        dispatch({
          type: ActionTypes.Initial,
          payload: {
            plaidLink: link,
            isPlaidLinked: isLinked,
            walletInfo: walletCreatedResponse
          }
        })
      } catch (err) {
        console.error(err)
        dispatch({type: ActionTypes.UnlinkPlaid})
      }
    }
    
    initialize()
  }, [])
  
  const linkPlaid = async (data) => {
    dispatch({
      type: ActionTypes.LinkPlaid,
      payload: {
        plaidLink: data,
      }
    })
  }
  
  const unlinkPlaid = () => {
    dispatch({type: ActionTypes.UnlinkPlaid})
  }
  
  const createdWallet = data => {
    dispatch({
      type: ActionTypes.WalletCreated,
      payload: {
        walletInfo: data
      }
    })
  }
  
  return (
    <AccountContext.Provider
      value={ {
        ...state,
        linkPlaid,
        unlinkPlaid,
        createdWallet
      } }
    >
      { children }
    </AccountContext.Provider>
  )
}

export {AccountContext, AccountProvider}
