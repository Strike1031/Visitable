import BusinessAccountLayout from '../../components/business-account/BusinessAccountLayout'
import Details from '../../components/business-account/Details'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { GetServerSidePropsContext } from 'next'
import { firebaseAdmin } from '../../config/firebaseAdmin'
import { useAuth } from 'config/auth'
import { useState, useEffect } from 'react'
import { getAccountHandler, updateAccountHandler } from 'lib/account-crud'
import claimsRedirect from 'lib/claims-redirect'
import { BusinessType } from 'types/business-type'

export default function BusinessDetails() {
  const router = useRouter()
  const auth = useAuth()
  const [businessData, setBusinessData] = useState<BusinessType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const getBusinessData = async () => {
    setLoading(true)
    try {
      if (!auth.userState) throw new Error('No current user in firebase client')
      const accountData = await getAccountHandler(auth.userState.uid)
      setBusinessData(accountData)
    } catch (error) {
      console.error(error)
      setBusinessData(null)
    }
    setLoading(false)
  }

  const submitChangedBusinessData = async (changedBusinessData: any) => {
    setLoading(true)
    try {
      if (!auth.userState) throw new Error('No current user in firebase client')
      await updateAccountHandler(auth.userState.uid, changedBusinessData)
      await getBusinessData()
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!auth.initialisingUser) {
      if (auth.userState === null) {
        // If Auth context is no longer initialisingUser state, yet its userState
        // is still null, then redirect to business login page.
        router.push({
          pathname: '/business',
        })
      } else {
        claimsRedirect(router, auth.customClaims, router.pathname)
        getBusinessData()
      }
    }
  }, [auth.initialisingUser, auth.userState])

  return (
    <BusinessAccountLayout pageName={"details"} businessName={businessData?.name ?? ""}>
      {auth.initialisingUser ? (
        <div>Loading...</div>
      ) : auth.userState ? (
        loading ? (
          <div>Retrieving your details...</div>
        ) : businessData ? (
          <Details businessData={businessData} submitHandler={submitChangedBusinessData} />
        ) : (
          <div>Sorry, we are unable to retrieve your details at this time.</div>
        )
      ) : (
        <div>Sorry, we were unable to log you into your account. Please try again later.</div>
      )}
    </BusinessAccountLayout>
  )
}
