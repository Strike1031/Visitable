import { authService, googleAuthProvider } from 'config/firebaseClient'
// import cookie from 'js-cookie'

export const Auth = {
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
      const userCredential = await authService.signInWithEmailAndPassword(email, password)
      const token = await authService.currentUser?.getIdToken()
      window?.localStorage.setItem('userCredential', JSON.stringify(userCredential))
      window?.localStorage.setItem('token', JSON.stringify(token))
      return {}
    } catch (error: any) {
      return { errorMessage: `Error. code: ${error.code} message: ${error.message}` }
    }
  },
  register: async (email: string, password: string) => {
    try {
      const userCredential = await authService.createUserWithEmailAndPassword(email, password)
      const token = await authService.currentUser?.getIdToken()
      console.log({ userCredential, token })
      window?.localStorage.setItem('userCredential', JSON.stringify(userCredential))
      window?.localStorage.setItem('token', JSON.stringify(token))
      return {}
    } catch (error: any) {
      return { errorMessage: `Error. code: ${error.code} message: ${error.message}` }
    }
  },
  logOut: async () => {
    removeLocalStorage('userCredential')
    removeLocalStorage('token')
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
