import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {LoadingButton} from '@mui/lab'
import {CircularProgress} from '@mui/material'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import * as React from 'react'
import {useEffect, useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import useAccount from '../../hooks/useAccount'
import {PATH_DASHBOARD} from '../../routes/paths'
import {cryptoService} from '../../services/crypto.service'
import {styles} from './common'


const fullPageStyles = Object.assign({}, styles, {minHeight: '70vh'})

export function BuyCrypto() {
  const {isPlaidLinked} = useAccount()
  const [isLoading, setLoading] = useState(true)
  const [walletInfo, setWalletInfo] = useState(null)
  const [adminBalance, setAdminBalance] = useState(null)
  
  useEffect(() => {
    setLoading(true)
    
    async function fetchWalletInfo() {
      const walletInfo = await cryptoService.getWalletInfo()
      setWalletInfo(walletInfo)
      const {balance} = await cryptoService.getAdminBalance()
      setAdminBalance(balance)
      setLoading(false)
    }
    
    fetchWalletInfo()
  }, [])
  
  const transferBTC = async () => {
    setLoading(true)
    // const isSuccess = await paidService.unlinkPlaid()
    // console.log(isSuccess)
    setLoading(false)
  }
  
  if (isLoading) {
    return (
      <div style={ fullPageStyles }>
        <CircularProgress size={ 50 } />
      </div>
    )
  }
  
  if (!isPlaidLinked) {
    return <div style={styles}>
      <h4>You have to link your bank account on the link account page</h4>
      <Link href variant='body2' to={ PATH_DASHBOARD.linkBankAccount } component={ RouterLink }>
        { 'Link bank account' }
      </Link>
    </div>
  }
  
  const {walletName, walletAddress, balance} = walletInfo
  
  return <div style={fullPageStyles}>
    <div className={ 'wallet-ino' }>
      <div>BTC wallet <b>name</b>: <span>{ walletName }</span></div>
      <div>BTC wallet <b>address</b>: <span>{ walletAddress }</span></div>
      <div>BTC wallet <b>balance</b>: <span>{ balance }</span></div>
      <Divider />
      <div>Available BTC <b>to buy</b>: { adminBalance }</div>
    </div>
    
    
    <LoadingButton
      variant='outlined'
      size='large'
      loading={ isLoading }
      endIcon={ <ArrowForwardIosIcon /> }
      loadingPosition='end'
      onClick={ transferBTC }
    >
      Transfer BTC
    </LoadingButton>
  </div>
}
