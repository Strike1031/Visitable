import BusinessAccountLayout from '../../components/business-account/BusinessAccountLayout'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import { AuthUtils } from '../../lib/AuthUtils'

type PropTypes = {}

export default function BusinessSettings(props: PropTypes) {
  const router = useRouter()
  const [reset, setReset] = useState<boolean>(false)
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [notif, setNotif] = useState<string>('')

  const deleteUser = async () => {
    // Delete user data in database
    // Delete firebase user
    // Log out for the last time
  }

  const resetPassword = async () => {}

  return (
    <BusinessAccountLayout pageName={'settings'} businessName={''}>
      <div>Welcome back!</div>
      <Button color='primary' onClick={() => setReset(true)}>
        Reset password
      </Button>
      {reset && (
        <>
          <input
            className='h-10 w-full p-3 mt-3 bg-white rounded'
            name='password'
            type='password'
            placeholder='Current Password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            className='h-10 w-full p-3 mt-3 bg-white rounded'
            name='password'
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            color='primary'
            onClick={async () => {
              const result = await AuthUtils.resetPassword(oldPassword, newPassword)
              setNotif(result.msgToUser)
              console.log(result.msgToUser)
              console.log(result.error)
              setReset(false)
            }}
          >
            Submit
          </Button>
        </>
      )}
      {notif && (
        <div
          className={notif === 'Successfully reset password' ? 'text-green-600' : 'text-red-600'}
        >
          {notif ?? ''}
        </div>
      )}
      {/* <Button color="secondary" onClick={deleteUser}>
        Delete Account
      </Button> */}
    </BusinessAccountLayout>
  )
}
