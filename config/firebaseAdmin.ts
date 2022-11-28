import * as firebaseAdmin from 'firebase-admin'

const projectId = process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID']
const privateKey = process.env['FIREBASE_PRIVATE_KEY']
const clientEmail = process.env['FIREBASE_CLIENT_EMAIL']

if (!privateKey || !clientEmail || !projectId) {
  console.log(
    `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`,
  )
} else {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: privateKey.replace(/\\n/g, '\n'),
        clientEmail,
        projectId,
      }),
      //   databaseURL: `https://${projectId}.firebaseio.com`,
    })
  }
}

export { firebaseAdmin }
