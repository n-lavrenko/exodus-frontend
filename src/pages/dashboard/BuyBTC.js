import {CircularProgress} from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import {useSnackbar} from 'notistack'
import * as React from 'react'
import {Fragment, useEffect, useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import useAccount from '../../hooks/useAccount'
import {PATH_DASHBOARD} from '../../routes/paths'
import {cryptoService} from '../../services/crypto.service'
import {styles} from './common'


export function BuyBTC() {
  const {isPlaidLinked, updateWallet, walletInfo} = useAccount()
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  const [isLoading, setLoading] = useState(true)
  const [adminBalance, setAdminBalance] = useState(null)
  
  useEffect(() => {
    setLoading(true)
    
    async function fetchWalletInfo() {
      const walletInfoResponse = await cryptoService.getWalletInfo()
      updateWallet(walletInfoResponse)
      
      const {balance} = await cryptoService.getAdminBalance()
      setAdminBalance(balance)
      setLoading(false)
    }
    
    fetchWalletInfo()
  }, [])
  
  // here should be used a Formik validation
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const amount = data.get('amount')
    if (!amount) {
      enqueueSnackbar('Fill all required fields, please', {variant: 'error'})
      return
    }
    try {
      const {success, balance} = await cryptoService.depositBTCWallet(data.get('amount'))
      success && updateWallet({...walletInfo, balance})
      
      if (!success) {
        return enqueueSnackbar('Transaction was declined', {variant: 'error'})
      }
      
      const {balance: adminBalance} = await cryptoService.getAdminBalance()
      setAdminBalance(adminBalance)
      
      
      enqueueSnackbar(`Deposit ${ amount } BTC: success`, {
        variant: 'success',
        action: (key) => (
          <Fragment>
            <Button onClick={ () => closeSnackbar(key) }>
              <span className={ 'white' }>CLOSE</span>
            </Button>
          </Fragment>
        )
      })
    } catch (error) {
      let message = error
      if (typeof error !== 'string') message = 'Transaction was declined'
      enqueueSnackbar(message, {variant: 'error'})
    }
    
  }
  
  if (isLoading) {
    return (
      <div style={ styles }>
        <CircularProgress size={ 50 } />
      </div>
    )
  }
  
  if (!isPlaidLinked) {
    return <div style={ styles }>
      <h4>You have to link your bank account on the link account page</h4>
      <Link href variant='body2' to={ PATH_DASHBOARD.linkBankAccount } component={ RouterLink }>
        { 'Link bank account' }
      </Link>
    </div>
  }
  
  return <div style={ styles }>
    <h4>Available BTC to buy</h4>
    <h3>{ adminBalance }</h3>
    { adminBalance < 1 && <p>Note hack: you could deposit Available BTC on the { ' ' }
      <Link href to={ PATH_DASHBOARD.myWallet } component={ RouterLink }>
        { 'My wallet page' }
      </Link></p> }
    
    <Box component='form' onSubmit={ handleSubmit } noValidate sx={ {mt: 1} }>
      <TextField
        margin='normal'
        required
        fullWidth
        type='number'
        min='0.00001'
        step='any'
        id='amount'
        label='Amount of BTC'
        name='amount'
        autoFocus
      />
      
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={ {mt: 3, mb: 2} }
      >
        Buy BTC
      </Button>
    </Box>
  
  </div>
}
