import useAuth from '../../hooks/useAuth'


export function LinkAccount() {
  const {user} = useAuth()
  return (
    <div>
      <h3>Link account page</h3>
    </div>
  )
}
