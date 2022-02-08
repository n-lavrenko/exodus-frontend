import useAccount from '../hooks/useAccount'
import useAuth from '../hooks/useAuth'


export function AccountInfo() {
  const {user} = useAuth()
  const {isPlaidLinked} = useAccount()
  return (
    <div>
      <h4>Account info:</h4>
      Your name: { user.fullName }
      <br/>
      Email: { user.email }
      <br/>
      Linked bank account: {isPlaidLinked ? 'YES' : 'NO'}
    </div>
  )
}
