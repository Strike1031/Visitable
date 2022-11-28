// POST /api/create-account
// Expects incoming request to be a POST request

// POST request body expects:
//  - accountData: Object containing account data. Must container auth uid.
//  - collection: Name of collection ('usersCollection' | 'businessesCollection')

import { MongoClient } from 'mongodb'

async function createAccount(req, res) {
  if (req.method === 'POST') {
    try {
      const accountData = req.body.accountData
      const client = await MongoClient.connect(process.env.MONGODB_CONNECTION)
      const db = client.db()

      const collectionName = req.body.collection
      const collection = db.collection(collectionName)

      // Check whether document with uid exists already.
      const accountDataInDb = await collection.findOne({ uid: accountData.uid })
      if (accountDataInDb) {
        console.log(
          `Attempting to update existing document with uid ${accountData.uid} in collection ${collectionName}.`,
        )

        const dbRes = await collection.updateOne(
          { uid: accountData.uid },
          { $set: accountData },
          { upsert: true },
        )
        console.log('Response from DB: ', dbRes)
        res
          .status(201)
          .json({ message: `Document with uid ${accountData.uid} successfully updated.` })
      } else {
        console.log(`Attempting to create new document in collection ${collectionName}`)
        const dbRes = await collection.insertOne(accountData)
        console.log('Response from DB: ', dbRes)
        res.status(201).json({
          message: `New document successfully inserted into collection ${collectionName}.`,
        })
      }

      client.close()
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: `An error occurred while trying to insert account data into ${collectionName}. See server logs for error info.`,
      })
    }
  } else {
    res.status(405).json({ message: 'This API endpoint only accepts POST requests.' })
  }
}

export default createAccount
