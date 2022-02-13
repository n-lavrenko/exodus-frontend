import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import AddLinkIcon from '@mui/icons-material/AddLink'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import {Link, useLocation, useMatch} from 'react-router-dom'
import {PATH_DASHBOARD} from '../routes/paths'


export function MenuItems() {
  const { pathname } = useLocation()
  let match = useMatch({ path: pathname, end: true });
  
  const isSelected = (checkPath) => {
    return match.pathname === checkPath
  }
  return (
    <React.Fragment>
      <ListItemButton selected={ isSelected(PATH_DASHBOARD.linkBankAccount) } component={ Link } to={ PATH_DASHBOARD.linkBankAccount }>
        <ListItemIcon>
          <AddLinkIcon />
        </ListItemIcon>
        <ListItemText primary='Link Bank Account' />
      </ListItemButton>
      <ListItemButton selected={ isSelected(PATH_DASHBOARD.buyBTC)}  component={ Link } to={ PATH_DASHBOARD.buyBTC }>
        <ListItemIcon>
          <CurrencyExchangeIcon />
        </ListItemIcon>
        <ListItemText primary='Buy BTC' />
      </ListItemButton>
      <ListItemButton selected={ isSelected(PATH_DASHBOARD.myWallet) } component={ Link } to={ PATH_DASHBOARD.myWallet }>
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary='My Wallet' />
      </ListItemButton>
    </React.Fragment>
  )
}
