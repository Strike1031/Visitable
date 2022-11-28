import BusinessAccountLayout from '../../components/business-account/BusinessAccountLayout'
import { useRouter } from 'next/router'

type PropTypes = {}

export default function BusinessReviews(props: PropTypes) {
  const router = useRouter()

  return (
    <BusinessAccountLayout pageName={'reviews'} businessName={''}>
      <div>Welcome back!</div>
    </BusinessAccountLayout>
  )
}
