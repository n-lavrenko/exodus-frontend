import {CircularProgress} from '@mui/material'
import Button from '@mui/material/Button'
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
  const [adminBalance, setAdminBalance] = useState(null)
  
  useEffect(() => {
    setLoading(true)
    
    async function fetchWalletInfo() {
      const walletInfoResponse = await cryptoService.getWalletInfo()
      setWalletInfo(walletInfoResponse)
      updateWallet(walletInfoResponse)
      const {balance} = await cryptoService.getAdminBalance()
      setAdminBalance(balance)
      setLoading(false)
    }
    
    fetchWalletInfo()
  }, [])
  
  const depositAdminWallet = async () => {
    const {success, balance} = await cryptoService.depositAdminWallet()
    success && setAdminBalance(balance)
  }
  
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
    <h4>Available BTC to buy</h4>
    <h3>{ adminBalance }</h3>
    
    <span>Hack: deposit admin wallet from mining wallet by 40 BTC</span>
    
    <Button
      type='button'
      variant='outlined'
      size={ 'small' }
      sx={ {mt: 3, mb: 2} }
      onClick={ depositAdminWallet }
    >
      Deposit Admin Wallet
    </Button>
    
    <hr style={ {width: '100%'} } />
    
    <div className={ 'wallet-ino' }>
      <div>BTC wallet <b>name</b>: <span>{ walletName }</span></div>
      <div>BTC wallet <b>address</b>: <span>{ walletAddress }</span></div>
      <div>BTC wallet <b>balance</b>: <span>{ balance }</span></div>
    </div>
  </div>
}
