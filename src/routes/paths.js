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
  accountsList: path(ROOTS_DASHBOARD, '/accounts-list'),
  myWallet: path(ROOTS_DASHBOARD, '/wallet'),
  buyCrypto: path(ROOTS_DASHBOARD, '/buy-crypto')
}
