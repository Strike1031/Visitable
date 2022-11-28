import BusinessAccountLayout from '../../components/business-account/BusinessAccountLayout'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'
import { firebaseAdmin } from '../../config/firebaseAdmin'
import { useAuth } from 'config/auth'
import React, { useEffect, Fragment, useContext, useState } from 'react'
import claimsRedirect from 'lib/claims-redirect'
import { BusinessAccountContext } from 'components/contexts/BusinessAccountContext'
import { BusinessType } from 'types/business-type'
import buttonStyles from 'styles/Buttons.module.css'

export default function BusinessHome() {
  const router = useRouter()
  const auth = useAuth()
  const businessCx = useContext(BusinessAccountContext)
  console.log("In 'Home' business account page. AuthContext state:", { auth })
  console.log("In 'Home' business account page. BusinessAccoutnContext state:", { businessCx })

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
        // businessCx.getData()
      }
    }
  }, [auth.initialisingUser, auth.userState])

  // useEffect(() => {
  //   if (!businessCx.loading && businessCx.data) {
  //     setBusinessData(businessCx.data)
  //   }
  // }, [businessCx.loading, businessCx.data])

  return (
    <BusinessAccountLayout pageName={"home"} businessName={businessCx?.data?.name ?? ''}>
      {auth.initialisingUser ? (
        <div>Logging in...</div>
      ) : auth.userState === null ? (
        <div>Sorry, we are unable to log you into your account at this time.</div>
      ) : businessCx.loading ? (
        <div>Retrieving your business account data...</div>
      ) : businessCx.data === null ? (
        <div>Sorry, we are unable to retrieve your account data at this time.</div>
      ) : (
        <>
          <div className="mt-10 px-6 py-8 flex flex-col lg:flex-row bg-white shadow-xl rounded-xl">
            <div
              className="w-full lg:w-1/2 h-52 bg-cover"
              style={{
                backgroundImage: `url(/garage.jpg)`,
              }}
            />
            <div className="lg:w-1/2 mt-5 lg:ml-8 lg:mt-0 flex flex-col justify-between">
              <div className="flex flex-col">
                <div className="text-3xl">{'Our venues'}</div>
                <div className="mt-2 text-base">
                  {'Create a public listing for your venue.'}
                </div>
                <div className="mt-2 text-base">
                  {'Edit your existing venue listings.'}
                </div>
              </div>
              <div className="mt-12 flex flex-col md:flex-row md:justify-end">
                <button
                  className={buttonStyles.venueCardButton}
                  onClick={() => {
                    router.push('/business-account/venues')
                  }}
                >
                  Our venues
                </button>
              </div>
            </div>
          </div>

        </>
      )}
    </BusinessAccountLayout>
  )
}

// if (auth.initialisingUser) {
//   return <div>Logging in...</div>
// } else {
//   if (auth.userState === null) {
//     return <div>Sorry, we are unable to log you into your account at this time.</div>
//   } else {
//     if (businessCx.loading) {
//       return (
//         <BusinessAccountLayout pageName="home" businessName={''}>
//           <div>Retrieving your business account data...</div>
//         </BusinessAccountLayout>
//       )
//     } else {
//       if (businessCx.data === null) {
//         return (
//           <BusinessAccountLayout pageName="home" businessName={''}>
//             <div>Sorry, we are unable to retrieve your account data at this time.</div>
//           </BusinessAccountLayout>
//         )
//       } else {
//         if (businessData) {
//           return (
//             <BusinessAccountLayout pageName="home" businessName={businessCx.data.name}>
//               <div>Welcome back!</div>
//               <div>Your user id: {auth.userState.uid}</div>
//               <div>Your email: {auth.userState.email}</div>
//               <div>{businessData}</div>
//             </BusinessAccountLayout>
//           )
//         } else {
//           return (
//             <BusinessAccountLayout pageName="home" businessName={''}>
//               <div>Sorry, we are unable to retrieve your account data at this time.</div>
//             </BusinessAccountLayout>
//           )
//         }
//       }
//     }
//   }
// }
