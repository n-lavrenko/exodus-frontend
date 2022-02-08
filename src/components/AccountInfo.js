import useAuth from '../hooks/useAuth'


export function AccountInfo() {
  const {user} = useAuth()
  return (
    <div>
      <h4>Account info:</h4>
      Your name: { user.fullName }
      <br/>
      Email: { user.email }
      <br/>
      Linked bank account: {user.isBankAccountLinked ? 'YES' : 'NO'}
    </div>
  )
}
