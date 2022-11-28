import GuestAccountLayout from '../../components/user-account/GuestAccountLayout'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
//import nookies from 'nookies'
//import { firebaseAdmin } from '../../config/firebaseAdmin'
import { useAuth } from 'config/auth'
import { useEffect, Fragment, useContext } from 'react'
//import firebase from 'firebase/app'
import claimsRedirect from 'lib/claims-redirect'
import { GuestAccountContext } from 'components/contexts/GuestAccountContext'
import buttonStyles from 'styles/Buttons.module.css'

// type PropTypes = {
//   token: {
//     uid: string
//     email: string
//   } | null
// }

function UserHome() {
  const router = useRouter()
  const auth = useAuth()
  const guestCx = useContext(GuestAccountContext)
  console.log("In 'Home' user account page. AuthContext state:", { auth })

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
    <GuestAccountLayout pageName={'home'} guestName={guestCx?.data?.firstName ?? ''}>
      {auth.initialisingUser ? (
        <div>Loading...</div>
      ) : auth.userState ? (
        <Fragment>
          <div className="px-6 py-8 flex flex-col lg:flex-row bg-white shadow-xl rounded-xl">
            <div
              className="w-full lg:w-1/2 h-52 bg-cover"
              style={{
                backgroundImage: `url(/appetiser.jpg)`,
              }}
            />
            <div className="lg:w-1/2 mt-5 lg:ml-8 lg:mt-0 flex flex-col justify-between">
              <div className="flex flex-col">
                <div className="text-3xl">{'Discover'}</div>
                <div className="mt-2 text-base">
                  {'Search for venues from a selection of the finest restaurants, cafés and bars.'}
                </div>
                <div className="mt-2 text-base">
                  {'Get personalised recommendations that suit your accessibility preferences.'}
                </div>
                <div className="mt-2 text-base">
                  {'Find Visitable-listed venues closest to home.'}
                </div>
              </div>
              <div className="mt-12 flex flex-col md:flex-row md:justify-end">
                <button
                  className={buttonStyles.venueCardButton}
                  onClick={() => {
                    router.push('/venues')
                  }}
                >
                  Discover new venues
                </button>
              </div>
            </div>
          </div>
        </Fragment>
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

export default UserHome
