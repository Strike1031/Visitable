import firebase from 'firebase/app'
import 'firebase/auth'

export const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  // OPTIONAL
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  // storageBucket: 'STORAGE_BUCKET' ?? '',
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
// TODO: create/login with GoogleAuthProvider (it has example)
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const emailAuthProvider = new firebase.auth.EmailAuthProvider()
