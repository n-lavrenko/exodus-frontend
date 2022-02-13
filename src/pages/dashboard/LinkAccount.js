import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {LoadingButton} from '@mui/lab'
import * as React from 'react'
import {useEffect, useState} from 'react'
import {PlaidLink} from 'react-plaid-link'
import useAccount from '../../hooks/useAccount'
import {cryptoService} from '../../services/crypto.service'
import {plaidService} from '../../services/plaid.service'
import {styles} from './common'


export function LinkAccount() {
  const {unlinkPlaid, linkPlaid, isPlaidLinked, plaidLink, updateWallet} = useAccount()
  const [isLoading, setLoading] = useState(false)
  const [linkToken, setLinkToken] = useState(null)
  
  useEffect(() => {
    plaidService.createLinkToken((token) => setLinkToken(token))
  }, [])
  
  const unlinkPlaidFn = async () => {
    setLoading(true)
    const isSuccess = await plaidService.unlinkPlaid()
    setLoading(false)
    if (isSuccess) {
      unlinkPlaid()
    }
  }
  
  const onSuccess = async (publicToken, metadata) => {
    console.log(publicToken, metadata)
    const response = await plaidService.exchangePublicToken(publicToken)
    console.log(response)
    if (response.success) {
      delete response.success
      linkPlaid(response)
      const result = await cryptoService.createWallet()
      updateWallet(result)
      console.log(result)
    }
  }
  
  const plaidToken = isPlaidLinked ? <div>
    <div className={ 'link-info' }>
      <code>Item: { plaidLink.itemId }</code>
    </div>
    <div className={ 'link-info' }>
      <code>AccessToken: { plaidLink.accessToken }</code>
    </div>
  </div> : <></>
  
  if (isPlaidLinked) {
    return <div style={ styles }>
      <h4 style={ {marginBottom: 15} }>Your account is linked to Bank Account</h4>
      { plaidToken }
      <LoadingButton
        variant='outlined'
        size='large'
        loading={ isLoading }
        endIcon={ <ArrowForwardIosIcon /> }
        loadingPosition='end'
        onClick={ unlinkPlaidFn }
      >
        Unlink Bank Account
      </LoadingButton>
    </div>
  }
  return (
    <div style={ styles }>
      { plaidToken }
      { linkToken && <PlaidLink
        className='CustomButton'
        style={ {padding: '20px', fontSize: '16px', cursor: 'pointer'} }
        token={ linkToken }
        onSuccess={ onSuccess }
      >
        Link you bank account
      </PlaidLink>
      }
    </div>
  )
}
