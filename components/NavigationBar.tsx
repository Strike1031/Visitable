import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { auth, googleAuthProvider } from 'config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import styles from 'styles/NavigationBar.module.css'
import { AuthModal } from './AuthModal'
import { AuthUtils } from 'lib/AuthUtils'
import { useAuth } from 'config/auth'


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//////// NO LONGER IN USE
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export interface NavigationBarProps {
  className?: string
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ className }) => {
  const router = useRouter()
  const auth = useAuth()

  /* 
  https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth
  user: The firebase.User if logged in, or undefined if not
  loading: A boolean to indicate whether the the authentication state is still being loaded
  error: Any firebase.auth.Error returned by Firebase when trying to load the user, or undefined if there is no error
  */
  // const [user, loading, error] = useAuthState(auth)
  // const [showAuthModal, setShowAuthModal] = useState(false)
  const [authType, setAuthType] = useState<'login' | 'signUp'>('login')

  const isSignedIn = () => Boolean(auth.userState)

  const actions = {
    goVenues: () => router.push('/venues'),
    goBusiness: () => router.push('/business'),
    goDashboard: () => {
      // Note: guest and business are nto mutually exclusive.
      // If both true, prioritise redirect to /user-account/home
      if (auth.customClaims?.guest) {
        router.push('/user-account/home')
      } else if (auth.customClaims?.business) {
        router.push('/business-account/home')
      } else {
        router.push('/')
      }
    },
    logIn: () => {
      // setShowAuthModal(true)
      router.push('/login')
      setAuthType('login')
    },
    signUp: () => {
      // setShowAuthModal(true)
      router.push('/signup')
      setAuthType('signUp')
    },
    // logOut: () => Auth.logOut(),
    logOut: async () => {
      // Context will automatically purge
      // userState and token from cookies
      await AuthUtils.logOut()
      router.push('/login')
    },
  }

  const navItems: { label: string; action: () => void }[] = [
    { label: 'Venues', action: actions.goVenues },
    { label: 'For Business', action: actions.goBusiness },
  ]

  return (
    <div className={className + ' ' + styles.container}>
      <nav className={styles.navbarContainer}>
        {/* <img onClick={() => router.push('/')} className={styles.logo} src="/logo.png" alt="Logo" /> */}
        {navItems.map((item, idx) => (
          <div className={styles.item} key={idx} onClick={() => item.action()}>
            {item.label}
          </div>
        ))}
        {isSignedIn() ? (
          <>
            <div className={styles.item} onClick={() => actions.logOut()} children="Log Out" />
            <div
              className={styles.item}
              onClick={() => actions.goDashboard()}
              children="Dashboard"
            />
          </>
        ) : (
          <>
            <div className={styles.item} onClick={() => actions.logIn()} children="Log In" />
            <div className={styles.item} onClick={() => actions.signUp()} children="Sign Up" />
          </>
        )}
        <AuthModal
          open={false}
          handleClose={() => true}
          authType={authType}
          setAuthType={setAuthType}
        />
      </nav>
    </div>
  )
}
