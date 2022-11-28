import BusinessAccountLayout from '../../components/business-account/BusinessAccountLayout'
import { useRouter } from 'next/router'

type PropTypes = {}

function BusinessDetails(props: PropTypes) {
  const router = useRouter()

  return (
    <BusinessAccountLayout pageName={'messages'} businessName={''}>
      <div>Welcome back!</div>
    </BusinessAccountLayout>
  )
}

export default BusinessDetails
