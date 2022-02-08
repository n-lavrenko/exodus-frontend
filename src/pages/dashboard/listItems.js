import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import {Link} from 'react-router-dom'
import {PATH_DASHBOARD} from '../../routes/paths'


export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to={ PATH_DASHBOARD.linkBankAccount }>
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary='Link Bank Account' />
    </ListItemButton>
    <ListItemButton component={Link} to={ PATH_DASHBOARD.accountsList }>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary='Bank Accounts' />
    </ListItemButton>
    <ListItemButton component={Link} to={ PATH_DASHBOARD.buyCrypto }>
      <ListItemIcon>
        <CurrencyExchangeIcon />
      </ListItemIcon>
      <ListItemText primary='Buy Crypto' />
    </ListItemButton>
    <ListItemButton component={Link} to={ PATH_DASHBOARD.myWallet }>
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary='My Wallet' />
    </ListItemButton>
  </React.Fragment>
)

