import GuestAccountLayout from '../../components/user-account/GuestAccountLayout'
import { useRouter } from 'next/router'
import { GuestAccountContext } from 'components/contexts/GuestAccountContext'
import { useContext } from 'react'

type PropTypes = {}

export default function UserMessages(props: PropTypes) {
  const guestCx = useContext(GuestAccountContext)
  const router = useRouter()

  return (
    <GuestAccountLayout pageName={"messages"} guestName={guestCx?.data?.firstName ?? ""}>
      <div>Welcome back!</div>
    </GuestAccountLayout>
  )
}
