import { authService, googleAuthProvider } from 'config/firebaseClient'
import firebase from 'firebase'
import nookies from 'nookies'

export const AuthUtils = {
  isLogin: () => Boolean(authService.currentUser),
  authWithGoogle: async () => {
    try {
      const userCredential = await authService.signInWithPopup(googleAuthProvider)
      const token = await authService.currentUser?.getIdToken()
      window?.localStorage.setItem('userCredential', JSON.stringify(userCredential))
      window?.localStorage.setItem('token', JSON.stringify(token))
      return {}
    } catch (error: any) {
      return { errorMessage: `Error. code: ${error.code} message: ${error.message}` }
    }
  },
  login: async (email: string, password: string) => {
    try {
      // Context will automatically update localStorage/cookies
      // with token from firebase, and userState in AuthContext.
      await authService.signInWithEmailAndPassword(email, password)
      return {
        error: undefined,
        msgToUser: 'Successfully logged in.',
      }
    } catch (error: any) {
      console.error(error)
      return {
        error: error.code,
        msgToUser: 'Unable to log in.',
      }
    }
  },
  signup: async (email: string, password: string, accountType: string) => {
    // accountType must be either "guest" or "business"
    // Sets custom claim in firebase user
    if (accountType !== 'guest' && accountType !== 'business') {
      return {
        error: 'Invalid account type',
        msgToUser: 'Invalid account type. Must be either guest or business.',
      }
    }

    let result
    try {
      // On successful creation of the user account,
      // user will be signed in to your application.
      // Which is why we can set custom claims right after.
      result = await authService.createUserWithEmailAndPassword(email, password)
    } catch (error: any) {
      console.error(error)
      let msgToUser = 'Unable to create new user credentials.'
      return {
        error: error.code,
        msgToUser,
      }
    }
    try {
      if (result.user) {
        const idToken = await result.user.getIdToken()
        await fetch(`/api/claim-account-type`, {
          method: 'POST',
          body: JSON.stringify({
            idToken,
            accountType,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        // After setting custom claim, get token again with force refresh.
        // The new token claims will contain the additional claims.
        // Note: Ensure the Auth Context state is updated after the user's
        // token is refreshed. This can be achieved using Auth.onIdTokenChanged()
        await authService.currentUser?.getIdToken(true)
      }

      return {
        error: undefined,
        msgToUser: 'Successfully created new user credentials.',
      }
    } catch (error: any) {
      return {
        error: error,
        msgToUser: 'Unable to created new user credentials.',
      }
    }
  },
  forgotPassword: async (email: string) => {
    try {
      await authService.sendPasswordResetEmail(email)
    } catch (error: any) {
      return {
        error: error.code,
        msgToUser: 'Successfully created new user credentials but email is unverified',
      }
    }

    return {
      error: undefined,
      msgToUser: 'Successfully sent reset password',
    }
  },
  resetPassword: async (oldPassword: string, newPassword: string) => {
    try {
      console.log(authService.currentUser)
      authService.currentUser?.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(
          authService.currentUser.email || '',
          oldPassword,
        ),
      )
      await authService.currentUser?.updatePassword(newPassword)
    } catch (error: any) {
      return {
        error: error.code,
        msgToUser: 'Error resetting password.',
      }
    }

    return {
      error: undefined,
      msgToUser: 'Successfully reset password',
    }
  },
  logOut: async () => {
    await authService.signOut()
  },
}

// export const setCookie = (key: string, value: string) => {
//   if (window !== undefined) cookie.set(key, value, { expires: 1 })
// }
// export const removeCookie = (key: string) => {
//   if (window !== undefined) cookie.remove(key)
// }

export const setLocalStorage = (key: string, value: any) => {
  if (window !== undefined) localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorage = (key: string) => {
  if (window !== undefined) localStorage.removeItem(key)
}
