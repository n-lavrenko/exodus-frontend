import {createContext, useEffect, useReducer} from 'react'
import {paidService} from '../services/plaid.service'


const ActionTypes = {
  Initial: 'INITIALIZE',
  LinkPlaid: 'LINK_PLAID',
  UnlinkPlaid: 'UNLINK_PLAID'
}

const initialState = {
  isPlaidLinked: false,
  plaidLink: null,
}

const AccountReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.Initial:
      return {
        plaidLink: action.payload.plaidLink,
        isPlaidLinked: action.payload.isPlaidLinked,
      }
    case ActionTypes.LinkPlaid:
      return {
        plaidLink: action.payload.plaidLink,
        isPlaidLinked: true,
      }
    case ActionTypes.UnlinkPlaid:
      return {
        plaidLink: null,
        isPlaidLinked: false,
      }
    
    default:
      return state
  }
}

const AccountContext = createContext(null)

function AccountProvider({children}) {
  const [state, dispatch] = useReducer(AccountReducer, initialState)
  
  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await paidService.checkIsUserLinked()
        const {isLinked, message, link} = response
        console.log(message)
        if (isLinked) {
          dispatch({
            type: ActionTypes.Initial,
            payload: {
              plaidLink: link,
              isPlaidLinked: isLinked
            }
          })
        } else {
          dispatch({type: ActionTypes.UnlinkPlaid})
        }
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
  
  return (
    <AccountContext.Provider
      value={ {
        ...state,
        linkPlaid,
        unlinkPlaid
      } }
    >
      { children }
    </AccountContext.Provider>
  )
}

export {AccountContext, AccountProvider}
