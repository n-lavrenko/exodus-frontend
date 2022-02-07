import useAuth from '../../hooks/useAuth'


export function LinkAccount() {
  const {user} = useAuth()
  return (
    <div>
      User email: { user.email }
      <br/>
      User full name: { user.fullName }
      <br/>
      <h1>Link account page</h1>
    </div>
  )
}
