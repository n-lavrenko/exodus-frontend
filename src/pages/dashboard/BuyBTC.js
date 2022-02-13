import {Alert, CircularProgress, FormControl, InputLabel, MenuItem, Select} from '@mui/material'
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
import {plaidService} from '../../services/plaid.service'
import {styles} from './common'


export function BuyBTC() {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  const {isPlaidLinked, updateWallet, walletInfo} = useAccount()
  const [isLoading, setLoading] = useState(true)
  const [plaidAccounts, setPlaidAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState('')
  const [amountBTC, setAmountBTC] = useState(0)
  const [amountUSD, setAmountUSD] = useState(0)
  const [BTCPrice, setBTCPrice] = useState(0)
  const [amountError, setAmountError] = useState('')
  const [accountError, setAccountError] = useState('')
  
  useEffect(() => {
    setLoading(true)
    
    async function fetchWalletInfo() {
      try {
        const walletInfoResponse = await cryptoService.getWalletInfo()
        updateWallet(walletInfoResponse)
        
        const {price} = await cryptoService.getBTCPrice()
        setBTCPrice(price)
        
        const accounts = await plaidService.getPlaidAccounts()
        setPlaidAccounts(accounts)
        
        setLoading(false)
      } catch (e) {
        enqueueSnackbar(e, { variant: 'error' })
      }
    }
    
    fetchWalletInfo()
  }, [])
  
  // here should be used a Formik validation
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const amountBTC = data.get('amountBTC')
    if (!amountBTC || !selectedAccount) {
      enqueueSnackbar('Fill all required fields, please', {variant: 'error'})
      return
    }
    try {
      const {success, balance} = await cryptoService.depositBTCWallet(data.get('amountBTC'))
      success && updateWallet({...walletInfo, balance})
      
      if (!success) {
        return enqueueSnackbar('Transaction was declined', {variant: 'error'})
      }
      
      enqueueSnackbar(`Deposit ${ amountBTC } BTC: success`, {
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
  
  const onAccountSelected = (event) => {
    setSelectedAccount(event.target.value)
    commonHandleChange(amountUSD, event.target.value)
  }
  
  const commonHandleChange = (_amountUSD = amountUSD, _account = selectedAccount) => {
    if (_account) {
      setAccountError('')
    }
    else if (!_account) {
      setAccountError(`Select an account`)
    }
    
    if (_amountUSD && _account) {
      const accountObj = plaidAccounts.find(a => a.account_id === _account)
      const availableBalance = accountObj.balances.available
      if (_amountUSD > availableBalance) {
        setAmountError(`You could buy BTC only on ${availableBalance}`)
      }
      else {
        setAmountError('')
      }
    }
  }
  
  const handleChangeUSD = (event) => {
    if (!event.target.value) {
      setAmountUSD(0)
      setAmountBTC(0)
      return
    }
    setAmountUSD(event.target.value)
    setAmountBTC((event.target.value / BTCPrice).toFixed(8))
    commonHandleChange(event.target.value)
  }
  
  const handleChangeBTC = (event) => {
    if (!event.target.value) {
      setAmountUSD(0)
      setAmountBTC(0)
      return
    }
    setAmountBTC(event.target.value)
    const _amountUSD = (event.target.value * BTCPrice).toFixed(2)
    setAmountUSD(_amountUSD)
    commonHandleChange(_amountUSD)
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
  
  return <div style={ styles } >
    <p>
      BTC Price (CoinMarketCap): {BTCPrice}
    </p>
    <Box component='form' style={{width: '100%'}} onSubmit={ handleSubmit } noValidate sx={ {mt: 1} }>
      <FormControl fullWidth>
        <InputLabel id="Account">Account</InputLabel>
        <Select
          autoWidth={true}
          labelId="Account"
          error={!!accountError}
          value={selectedAccount}
          label="Account"
          onChange={ onAccountSelected }
        >
          {plaidAccounts.map(a => <MenuItem key={a.account_id} value={a.account_id}>
            {a.name + ' #' + a.mask + ' Available: $' + a.balances.available}
          </MenuItem>)}
        </Select>
      </FormControl>
  
      { accountError && <div style={{marginTop: 15}}><Alert severity="error">{accountError}</Alert></div> }
      
      <FormControl fullWidth>
      <TextField
        margin='normal'
        fullWidth
        autoComplete={'off'}
        type='number'
        min='0.00001'
        step='any'
        value={amountBTC}
        onChange={handleChangeBTC}
        error={!!amountError}
        id='amountBTC'
        label='Amount of BTC'
        name='amountBTC'
        autoFocus
      />
      </FormControl>
      
      <h5 style={{textAlign: 'center'}}> -- OR -- </h5>
      
      <FormControl fullWidth>
      <TextField
        margin='normal'
        fullWidth
        autoComplete={'off'}
        type='number'
        min='0.01'
        step='any'
        value={amountUSD}
        onChange={handleChangeUSD}
        error={!!amountError}
        id='amountUSD'
        label='Amount of USD'
        name='amountUSD'
      />
      </FormControl>
  
      { amountError && <Alert severity="error">{amountError}</Alert> }
      
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          type='submit'
          variant='contained'
          disabled={amountUSD == 0 || !!amountError || !!accountError}
          sx={ {mt: 3, mb: 2} }
        >
          Buy BTC
        </Button>
      </div>
    </Box>
  
  </div>
}
