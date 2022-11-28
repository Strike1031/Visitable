import { Intro } from 'components/home/Intro'
import { JoinToday } from 'components/home/JoinToday'
import { StayTuned } from 'components/home/StayTuned'
import { StartSearch } from 'components/home/StartSearch'
import { HowItWorks } from 'components/home/HowItWorks'
import { VisitorLayout } from 'components/VisitorLayout'
import { VenueSignup } from 'components/home/VenueSignup'
import { FindUs } from 'components/home/FindUs'
import { useAuth } from 'config/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import claimsRedirect from 'lib/claims-redirect'

export default function Home() {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.initialisingUser) {
      if (auth.userState !== null) {
        claimsRedirect(router, auth.customClaims, router.pathname)
      }
    }
  }, [auth.initialisingUser])

  return (
    <VisitorLayout>
      <div className="w-full text-primary-900">
        <Intro />
        <JoinToday />
        <StartSearch />
        <HowItWorks />
        <FindUs />
        <VenueSignup />
      </div>
    </VisitorLayout>
  )
}
