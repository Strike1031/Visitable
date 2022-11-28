import React, { useState, useEffect, useContext, createContext } from 'react'
import nookies, { parseCookies } from 'nookies'
import { authService } from './firebaseClient'
import firebase from 'firebase/app'
import { faDiceSix } from '@fortawesome/free-solid-svg-icons'
import { customClaimsType } from 'types/custom-claims-type'
import { GuestAccountContext } from 'components/contexts/GuestAccountContext'

// type UserStateProps = authService.User | null;
type ContextType = {
  userState: firebase.User | null
  customClaims: customClaimsType | null
  initialisingUser: boolean
}

const AuthContext = createContext<ContextType>({
  userState: null,
  customClaims: null,
  initialisingUser: true,
})

export const AuthProvider = ({ children }: any) => {
  const [userState, setUserState] = useState<firebase.User | null>(null)
  // Custom claims current includes fields guest, business, guestInit, businessInit
  const [customClaims, setCustomClaims] = useState<customClaimsType | null>(null)
  const [initialisingUser, setInitialisingUser] = useState<boolean>(true)
  const guestCx = useContext(GuestAccountContext)

  useEffect(() => {
    // On initial render, look for existing valid token in cookies.
    // If exists, log in automatically.

    // Adds an observer for changes to the signed-in user's ID token.
    // This includes sign-in, sign-out, and token refresh events.
    return authService.onIdTokenChanged(async (newUserState) => {
      console.log('User state changed due to sign-in or sign-out or token refresh.')
      console.log(`New user state: ${newUserState ? newUserState.uid : null}`)
      // Set AuthContext user state to reflect new user state.
      // firebase.User | null
      setUserState(newUserState)
      const idTokenResult = await newUserState?.getIdTokenResult()
      if (idTokenResult) {
        const accountTypeCustomClaims = {
          guest: idTokenResult.claims.guest ?? false,
          business: idTokenResult.claims.business ?? false,
          guestInit: idTokenResult.claims.guestInit ?? false,
          businessInit: idTokenResult.claims.businessInit ?? false,
        }
        setCustomClaims(accountTypeCustomClaims)
        console.log(`User's account type custom claims: ${JSON.stringify(accountTypeCustomClaims, null, 1)}`)
      } else {
        setCustomClaims(null)
      }
      setInitialisingUser(false)
      // Reminder: After setUserState, userState, still won't be updated until next render. 
      // Use newUserState below, not the "updated" userState bc it hasn't been updated yet.

      if (newUserState) {
        console.log(`User state will be signed in on next render.`)
        console.log(`Getting new token...`)
        const newToken = await newUserState.getIdToken()
        nookies.destroy(null, 'token')
        nookies.set(undefined, 'token', newToken, {})
        // localStorage.setItem('token', JSON.stringify(newToken))
        console.log(`Stored new token in browser.`)
      } else {
        console.log(`User state will be signed out on next render.`)
        nookies.destroy(null, 'token')
        nookies.set(undefined, 'token', '', {})
        // localStorage.removeItem('token')
        console.log(`Removed old token from browser.`)
        return
      }
    })
  }, [])

  // Refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      if (authService.currentUser) {
        // If logged in:
        console.log(`Refreshing token (every 10 minutes) ...`)
        const newToken = await authService.currentUser.getIdToken(true)
        nookies.destroy(null, 'token')
        nookies.set(undefined, 'token', newToken, {})
        // localStorage.setItem('token', JSON.stringify(newToken))
        console.log(`Stored new token in browser.`)
      }
    }, 10 * 60 * 1000)
    return () => clearInterval(handle)
  }, [])

  return (
    <AuthContext.Provider value={{ userState, customClaims, initialisingUser }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
