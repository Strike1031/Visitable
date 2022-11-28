
// POST /api/create-venue
// Expects incoming request to be a POST request.
// Adds an object of type VenueType to database venues collection
// and append the venues's vid to the parent business's `venues` array.

// Body params:
//  - uid: string, uid of the parent business
//  - newVenueData: VenueType

import { MongoClient } from 'mongodb'

export default async function createVenue(req, res) {
  if (req.method === 'POST') {
    try {
      const uid = req.body.uid
      const venueData = req.body.newVenueData
      const client = await MongoClient.connect(process.env.MONGODB_CONNECTION)
      const db = client.db()

      const collectionName = 'venuesCollection'
      const collection = db.collection(collectionName)

      let venueDataUploadResult;
      // Check whether document with vid exists already.
      const venueDataInDb = await collection.findOne({ vid: venueData.vid })
      if (venueDataInDb) {
        console.log(
          `Attempting to update existing document with vid ${venueData.vid} in collection ${collectionName}.`
        )

        const dbRes = await collection.updateOne(
          { vid: venueData.vid },
          { $set: venueData },
          { upsert: true },
        )
        console.log('Response from DB: ', dbRes)
        venueDataUploadResult = `Document with vid ${venueData.vid} successfully updated.`
      } else {
        console.log(`Attempting to create new document in collection ${collectionName}`)
        const dbRes = await collection.insertOne(venueData)
        console.log('Response from DB: ', dbRes)
        venueDataUploadResult =`New document successfully inserted into collection ${collectionName}.`
        
      }

      const usersCollection = db.collection("usersCollection")
      console.log(
        `Attempting to update existing business acc document with uid ${uid} in collection "usersCollection.`,
      )
      const dbRes = await usersCollection.updateOne({ uid: uid }, { $push: { venues: venueData.vid } })
      console.log('Response from DB: ', dbRes)

      client.close()

      return res.status(201).json({
        message: `${venueDataUploadResult} Existing business document with uid ${uid} successfully updated in collection.`,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: `An error occurred while trying to update existing document with vid ${venueData.vid} in collection. See server logs for error info.`,
      })
    }
  } else {
    res.status(405).json({ message: 'This API endpoint only accepts POST requests.' })
  }
}
