function path(root, subLink) {
  return `/${ root }${ subLink }`
}


const ROOTS_AUTH = 'auth'
const ROOTS_DASHBOARD = 'dashboard'


export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signup: path(ROOTS_AUTH, '/signup'),
  signin: path(ROOTS_AUTH, '/signin')
}

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  linkBankAccount: path(ROOTS_DASHBOARD, '/link-bank-account'),
  buyBTC: path(ROOTS_DASHBOARD, '/buy-btc'),
  // myWallet: path(ROOTS_DASHBOARD, '/wallet')
}
