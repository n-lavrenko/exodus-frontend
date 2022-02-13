import {CircularProgress} from '@mui/material'
import Link from '@mui/material/Link'
import * as React from 'react'
import {useEffect, useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import useAccount from '../../hooks/useAccount'
import {PATH_DASHBOARD} from '../../routes/paths'
import {cryptoService} from '../../services/crypto.service'
import {styles} from './common'


export function MyWallet() {
  const {walletInfo: {isWalletCreated}, updateWallet} = useAccount()
  const [isLoading, setLoading] = useState(true)
  const [walletInfoState, setWalletInfo] = useState(null)
  
  useEffect(() => {
    setLoading(true)
    
    async function fetchWalletInfo() {
      const walletInfoResponse = await cryptoService.getWalletInfo()
      updateWallet(walletInfoResponse)
      setWalletInfo(walletInfoResponse)
      setLoading(false)
    }
    
    fetchWalletInfo()
  }, [])
  
  
  if (isLoading) {
    return (
      <div style={ styles }>
        <CircularProgress size={ 50 } />
      </div>
    )
  }
  
  if (!isWalletCreated) {
    return <div style={ styles }>
      <h4>You have to link your bank account on the link account page</h4>
      <Link href variant='body2' to={ PATH_DASHBOARD.linkBankAccount } component={ RouterLink }>
        { 'Link bank account' }
      </Link>
    </div>
  }
  
  const {walletName, walletAddress, balance} = walletInfoState
  
  return <div style={ styles }>
    <div className={ 'wallet-ino' }>
      <div>BTC wallet <b>name</b>: <span>{ walletName }</span></div>
      <div>BTC wallet <b>address</b>: <span>{ walletAddress }</span></div>
      <div>BTC wallet <b>balance</b>: <span>{ balance }</span></div>
    </div>
  </div>
}
