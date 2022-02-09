import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import AddLinkIcon from '@mui/icons-material/AddLink'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import {Link} from 'react-router-dom'
import {PATH_DASHBOARD} from '../../routes/paths'


export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={ Link } to={ PATH_DASHBOARD.linkBankAccount }>
      <ListItemIcon>
        <AddLinkIcon />
      </ListItemIcon>
      <ListItemText primary='Link Bank Account' />
    </ListItemButton>
    <ListItemButton component={ Link } to={ PATH_DASHBOARD.buyCrypto }>
      <ListItemIcon>
        <CurrencyExchangeIcon />
      </ListItemIcon>
      <ListItemText primary='Buy Crypto' />
    </ListItemButton>
    <ListItemButton component={ Link } to={ PATH_DASHBOARD.myWallet }>
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary='My Wallet' />
    </ListItemButton>
  </React.Fragment>
)

