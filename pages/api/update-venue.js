// POST /api/update-account
// Expects incoming request to be a POST request
// Able to update either customer or business data,
// depending on POST req body params.

// Body params:
//  - idToken: the JSON Web Token (JWT) used to identify the user to a Firebase service
//      Used to authenticate client request.
//  - partialVenueData: An object containing fields to be updated in
//    the database entry. Must contain the following....
//      - uid: Firebase auth uid of the business account whose venue you are trying
//          to update.
//      - vid: vid of venue to update

import { MongoClient } from 'mongodb'
import { firebaseAdmin } from '../../config/firebaseAdmin'

async function updateVenue(req, res) {
  if (req.method === 'POST') {
    try {
      const idToken = req.body.idToken
      const partialVenueData = req.body.partialVenueData
      const uid = partialVenueData.uid
      const vid = partialVenueData.vid

      const client = await MongoClient.connect(process.env.MONGODB_CONNECTION)
      const db = client.db()

      const collectionName = "venuesCollection"
      const collection = db.collection(collectionName)

      let decodedToken
      try {
        // Verify the ID token and decode its payload.
        decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken)
        console.log(`idToken has been successfully decoded.`)
      } catch (error) {
        console.error(error)
        return res.status(401).json({ message: 'Token could not be verified.' })
      }
      try {
        if (decodedToken.sub !== uid) throw new Error("Auth user token uid does not match venue owner uid")
        console.log(`Auth user with uid ${uid} is authorised to update venue data with owner uid ${uid}.`)
      } catch (error) {
        console.error(error)
        return res.status(401).json({ message: `Auth user with uid ${decodedToken.sub} from JWT unauthorised to update venue data with owner uid ${uid}.` })
      }

      console.log(
        `Attempting to update user with uid ${uid}'s existing document with vid ${vid} in collection ${collectionName}. Creates it if does not exist.`,
      )
      const dbRes = await collection.updateOne(
        { vid: vid },
        { $set: partialVenueData },
        { upsert: true },
      )
      console.log('Response from DB: ', dbRes)

      client.close()

      return res.status(201).json({
        message: `Document with vid ${vid} successfully updated or created in collection.`,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: `An error occurred while trying to update or create document with vid ${vid} in collection. See server logs for error info.`,
      })
    }
  } else {
    return res.status(405).json({ message: 'This API endpoint only accepts POST requests.' })
  }
}

export default updateVenue
