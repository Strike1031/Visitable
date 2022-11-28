// POST /api/get-account
// Expects incoming request to be a GET request
// Able to retrieve either customer or business data,
// depending on query string parameter.

// Query string:
//  - uid: string
//  - collection: "usersCollection" | "businessesCollection"

import { MongoClient } from 'mongodb'

async function getUser(req, res) {
  if (req.method === 'GET') {
    try {
      const uid = req.query.uid
      const client = await MongoClient.connect(process.env.MONGODB_CONNECTION)
      const db = client.db()

      // collectionName must be either "usersCollections" or "businessesCollection"
      const collectionName = req.query.collection
      const collection = db.collection(`${collectionName}`)

      console.log(
        `Attempting to retrieve document with uid ${uid} from collection ${collectionName}`,
      )

      const query = { uid: uid }
      const options = { projection: { _id: 0 } }
      const data = await collection.findOne(query, options)

      await client.close()

      if (data) {
        return res.status(200).json({ message: 'Successfully retrieved account data.', accountData: data })
      } else {
        return res.status(502).json({ message: `Could not find account with uid ${uid} in collection.` })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message:
          'An error occurred while trying to retrieve account data from collection. See server logs for error details.',
      })
    }
  } else {
    return res.status(405).json({
      message:
        'This API endpoint only accepts GET requests. Make sure your URI contains a query component with firebase auth UID. For example: /api/get-account?uid=h=Gs78sdFds7Fh4',
    })
  }
}

export default getUser
