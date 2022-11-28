// POST /api/claim-account-type
// Sets account type custom claims using the firebase admin SDK

// POST request body expects:
//  - idToken: the JSON Web Token (JWT) used to identify the user to a Firebase service
//      Used to authenticate client request.
//  - accountType: the account type which the user wishes to claim
//      Must be either "guest" or "business"

import { firebaseAdmin } from '../../config/firebaseAdmin'

export default async function claimAccountType(req, res) {
  if (req.method === 'POST') {
    // Get the ID token passed.
    const idToken = req.body.idToken
    const accountType = req.body.accountType

    let decodedToken
    try {
      // Verify the ID token and decode its payload.
      decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken)
    } catch (error) {
      res.status(400).json({ message: 'Token could not be verified.' })
    }
    let userRecord
    try {
      // Use decoded token's uid to get UserRecord
      userRecord = await firebaseAdmin.auth().getUser(decodedToken.sub)
    } catch (error) {
      res.status(400).json({ message: 'No corresponding user found for token.' })
    }
    console.log(decodedToken, userRecord)

    // Verify user is eligible for additional privileges.
    if (typeof decodedToken.email !== 'undefined') {
      let customClaims
      if (userRecord.customClaims !== undefined) {
        customClaims = {
          guest: accountType == 'guest' || (userRecord.customClaims['guest'] ?? false),
          business: accountType == 'business' || (userRecord.customClaims['business'] ?? false),
          guestInit: userRecord.customClaims['guestInit'] ?? false,
          businessInit: userRecord.customClaims['businessInit'] ?? false,
        }
      } else {
        customClaims = {
          guest: accountType == 'guest',
          business: accountType == 'business',
          guestInit: false,
          businessInit: false,
        }
      }
      // Add custom claims for additional privileges.
      // Confusingly, claims.sub just refers to the uid corresponding
      // to the user who the ID token belonged to
      await firebaseAdmin.auth().setCustomUserClaims(decodedToken.sub, customClaims)

      // Tell client to refresh token on user.
      res.status(200).json({ message: `Custom claim "${accountType}" has been set true for user.` })
    } else {
      // Return nothing.
      res.status(405).json({ message: `This user is ineligible for custom claim ${accountType}.` })
    }
  } else {
    res.status(405).json({ message: 'This API endpoint only accepts POST requests.' })
  }
}
