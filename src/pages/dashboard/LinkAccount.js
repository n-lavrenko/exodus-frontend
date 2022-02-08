import * as React from 'react'
import {useEffect, useState} from 'react'
import {PlaidLink} from 'react-plaid-link'
import useAuth from '../../hooks/useAuth'
import {createLinkToken, exchangePublicToken} from '../../services/plaid.service'


const styles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 208
}

export function LinkAccount() {
  const {user} = useAuth()
  const [linkToken, setLinkToken] = useState(null)
  const [itemIds, setItemIds] = useState([])
  const isBankAccountLinked = user.isBankAccountLinked
  
  useEffect(() => {
    createLinkToken((token) => setLinkToken(token))
  }, [])
  
  const onSuccess = async (publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log(publicToken, metadata)
    const result = await exchangePublicToken(publicToken)
    console.log(result)
    setItemIds(itemIds => [...itemIds, result]);
  }
  
  const onEvent = (eventName, metadata) => {
    // log onEvent callbacks from Link
    // https://plaid.com/docs/link/web/#onevent
    console.log(eventName, metadata)
  }
  
  const onExit = (error, metadata) => {
    // log onExit callbacks from Link, handle errors
    // https://plaid.com/docs/link/web/#onexit
    console.log(error, metadata)
  }
  
  if (isBankAccountLinked) {
    return <div style={ styles }>
      <h4>Your account is linked to Bank Account</h4>
    </div>
  }
  return (
    <div style={ styles }>
      { itemIds.length > 0 &&
        <ul>
          {itemIds.map(i => <li key={i.itemId}>{i}</li>)}
        </ul>
      }
      { linkToken && <PlaidLink
        className='CustomButton'
        style={ {padding: '20px', fontSize: '16px', cursor: 'pointer'} }
        token={ linkToken }
        onSuccess={ onSuccess }
        onEvent={ onEvent }
        onExit={ onExit }
      >
        Link you bank account
      </PlaidLink>
      }
    </div>
  )
}
