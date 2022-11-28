// POST /api/update-account
// Expects incoming request to be a POST request
// Able to update either customer or business data,
// depending on POST req body params.

// Body params:
//  - uid: string
//  - partialAccountData: dict
//  - collection: "usersCollection" | "businessesCollection"

import { MongoClient } from 'mongodb'

async function updateAccount(req, res) {
  if (req.method === 'POST') {
    try {
      const uid = req.body.uid
      const partialAccountData = req.body.partialAccountData
      const client = await MongoClient.connect(process.env.MONGODB_CONNECTION)
      const db = client.db()

      const collectionName = req.body.collection
      const collection = db.collection(collectionName)

      console.log(
        `Attempting to update existing document with uid ${uid} in collection ${collectionName}. Creates it if does not exist.`,
      )
      const dbRes = await collection.updateOne(
        { uid: uid },
        { $set: partialAccountData },
        { upsert: true },
      )
      console.log('Response from DB: ', dbRes)

      client.close()

      res.status(201).json({
        message: `Existing document with uid ${uid} successfully updated in collection.`,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: `An error occurred while trying to update existing document with uid ${uid} in collection. See server logs for error info.`,
      })
    }
  } else {
    res.status(405).json({ message: 'This API endpoint only accepts POST requests.' })
  }
}

export default updateAccount
