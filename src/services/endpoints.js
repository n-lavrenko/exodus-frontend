function finalizeEndpoint(entity, path) {
  return `/api/${ entity }/${ path }`
}

const PLAID = 'plaid'
const USER = 'user'

export const endpoints = {
  signin: finalizeEndpoint(USER, 'signin'),
  signup: finalizeEndpoint(USER, 'signup'),
  myProfile: finalizeEndpoint(USER, 'my-profile'),
  createLinkToken: finalizeEndpoint(PLAID, 'create-link-token'),
  exchangePublicToken: finalizeEndpoint(PLAID, 'exchange-public-token'),
  unlinkPlaid: finalizeEndpoint(PLAID, 'unlink-plaid'),
  checkIsUserLinked: finalizeEndpoint(PLAID, 'is-linked')
}
