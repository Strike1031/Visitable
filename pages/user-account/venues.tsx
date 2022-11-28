import GuestAccountLayout from '../../components/user-account/GuestAccountLayout'
import { useRouter } from 'next/router'
import { GuestAccountContext } from 'components/contexts/GuestAccountContext'
import { useContext } from 'react'

type PropTypes = {}

function UserVenues(props: PropTypes) {
  const guestCx = useContext(GuestAccountContext)
  const router = useRouter()

  return (
    <GuestAccountLayout pageName={"venues"} guestName={guestCx?.data?.firstName ?? ""}>
      <div>Welcome back!</div>
    </GuestAccountLayout>
  )
}

export default UserVenues
