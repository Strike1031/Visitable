import GuestAccountLayout from '../../components/user-account/GuestAccountLayout'
import Details from '../../components/user-account/Details'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { GetServerSidePropsContext } from 'next'
import { firebaseAdmin } from '../../config/firebaseAdmin'
import { useAuth } from 'config/auth'
import React, { useState, useEffect, Fragment, useContext } from 'react'
import { getAccountHandler, updateAccountHandler } from 'lib/account-crud'
import { GuestType } from 'types/guest-type'
import claimsRedirect from 'lib/claims-redirect'
import { GuestAccountContext } from 'components/contexts/GuestAccountContext'

// type PropTypes = {
//   token: {
//     uid: string
//     email: string
//   } | null
// }

export default function UserDetails() {
  const router = useRouter()
  const auth = useAuth()
  const guestCx = useContext(GuestAccountContext)

  const submitChangedUserData = async (changedUserData: any) => {
    try {
      if (!auth.userState) throw new Error('No current user in firebase client')
      await updateAccountHandler(auth.userState.uid, changedUserData)
      // This will trigger loading in GuestAccountProvider, which affects
      // what this component renders.
      guestCx.getData()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!auth.initialisingUser) {
      if (auth.userState === null) {
        // If Auth context is no longer initialisingUser state, yet its userState
        // is still null, then redirect to guest login page.
        router.push({
          pathname: '/login',
        })
      } else {
        claimsRedirect(router, auth.customClaims, router.pathname)
      }
    }
  }, [auth.initialisingUser, auth.userState])

  return (
    <GuestAccountLayout pageName={"details"} guestName={guestCx?.data?.firstName ?? ""}>
      {auth.initialisingUser ? (
        <div>Loading...</div>
      ) : auth.userState ? (
        guestCx.loading ? (
          <div>Retrieving your details...</div>
        ) : guestCx.data ? (
          <Details userData={guestCx.data} submitHandler={submitChangedUserData} />
        ) : (
          <div>Sorry, we are unable to retrieve your details at this time.</div>
        )
      ) : (
        <div>Sorry, we were unable to log you into your account. Please try again later.</div>
      )}
    </GuestAccountLayout>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   console.log('Verifying token stored in browser with Firebase Admin SDK...')

//   try {
//     // Parse currently stored token.
//     const currToken = nookies.get(context).token
//     // const currToken = localStorage.getItem('token')
//     if (!currToken) throw "No field with key 'token' in local storage."
//     const token = await firebaseAdmin.auth().verifyIdToken(currToken)

//     console.log('Token in browser has been verified.')

//     // The user has been authenticated!

//     return {
//       props: { token: token },
//     }
//   } catch (err) {
//     console.error(err)
//     console.log('Unable to verify token. Redirecting to login page.')
//     // context.res.writeHead(302, { Location: '/login' })
//     // context.res.end()
//     return {
//       props: {},
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }
// }
