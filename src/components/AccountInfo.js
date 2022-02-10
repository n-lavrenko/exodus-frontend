import useAccount from '../hooks/useAccount'
import useAuth from '../hooks/useAuth'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

export function AccountInfo() {
  const {user} = useAuth()
  const {isPlaidLinked} = useAccount()
  return (
    <div>
      <h4>Account info:</h4>
      Hi, { user.fullName }
      <br/>
      Email: { user.email }
      <br/>
      
      Linked bank account: {isPlaidLinked ?
      <div className={'link-account-status yes'}><CheckCircleOutlinedIcon/></div> :
      <div className={'link-account-status no'}><WarningAmberOutlinedIcon/></div>
    }
    </div>
  )
}
