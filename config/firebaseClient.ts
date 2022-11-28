import firebaseClient from 'firebase/app';
import 'firebase/auth'

const FIREBASE_CLIENT_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
}

// if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
if (!firebaseClient.apps.length) {
  firebaseClient.initializeApp(FIREBASE_CLIENT_CONFIG)
  // firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION)
  // ;(window as any).firebase = firebaseClient
}

export const authService = firebaseClient.auth()
export const googleAuthProvider = new firebaseClient.auth.GoogleAuthProvider()
export const emailAuthProvider = new firebaseClient.auth.EmailAuthProvider()
