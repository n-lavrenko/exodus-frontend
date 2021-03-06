import {createContext, useEffect, useReducer} from 'react'
import {cryptoService} from '../services/crypto.service'
import {plaidService} from '../services/plaid.service'


const ActionTypes = {
  Initial: 'INITIALIZE_ACCOUNT',
  LinkPlaid: 'LINK_PLAID',
  UnlinkPlaid: 'UNLINK_PLAID',
  WalletUpdated: 'WALLET_UPDATED'
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
        walletInfo: action.payload.walletInfo
      }
    case ActionTypes.LinkPlaid:
      return {
        ...state,
        plaidLink: action.payload.plaidLink,
        isPlaidLinked: true
      }
    case ActionTypes.UnlinkPlaid:
      return {
        ...state,
        plaidLink: null,
        isPlaidLinked: false
      }
    case ActionTypes.WalletUpdated:
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
        const linkedResponse = await plaidService.checkIsUserLinked()
        const {isLinked, link} = linkedResponse
        
        const walletCreatedResponse = await cryptoService.getWalletInfo()
        const {success} = walletCreatedResponse
  
        if (success) {
          dispatch({
            type: ActionTypes.Initial,
            payload: {
              plaidLink: link,
              isPlaidLinked: isLinked,
              walletInfo: walletCreatedResponse
            }
          })
        }
        else {
          dispatch({
            type: ActionTypes.Initial,
            payload: initialState
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: ActionTypes.Initial,
          payload: initialState
        })
      }
    }
    
    initialize()
  }, [])
  
  const linkPlaid = async (data) => {
    dispatch({
      type: ActionTypes.LinkPlaid,
      payload: {
        plaidLink: data
      }
    })
  }
  
  const unlinkPlaid = () => {
    dispatch({type: ActionTypes.UnlinkPlaid})
  }
  
  const updateWallet = data => {
    dispatch({
      type: ActionTypes.WalletUpdated,
      payload: {
        walletInfo: data || initialState
      }
    })
  }
  
  return (
    <AccountContext.Provider
      value={ {
        ...state,
        linkPlaid,
        unlinkPlaid,
        updateWallet
      } }
    >
      { children }
    </AccountContext.Provider>
  )
}

export {AccountContext, AccountProvider}
