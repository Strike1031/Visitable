// GET /api/get-venues-all
// Expects incoming request to be a GET request
// Retrieves a list of all venues from venuesCollection.

// Returns:
//  - {
// message: string,
// venuesData: VenueType[]
// }

import { MongoClient } from 'mongodb'

export default async function getVenuesData(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_CONNECTION)
      const db = client.db()

      const venuesCollection = db.collection('venuesCollection')

      // match all venue data objs
      const query = {  }
      // Leave out the _id field from each venue data object.
      const options = { projection: { _id: 0 } }
      const cursor = await venuesCollection.find(query, options)
      // Turn the cursor which we need to convert to array.
      const venuesInfo = await cursor.toArray()

      await client.close()

      return res
        .status(200)
        .json({ message: 'Successfully retrieved venues data.', venuesData: venuesInfo })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message:
          'An error occurred while trying to retrieve data from a collection. See server logs for error details.',
      })
    }
  } else {
    res.status(405).json({
      message:
        'This API endpoint only accepts GET requests. Make sure your URI contains a query component with firebase auth UID. For example: /api/get-account?uid=h=Gs78sdFds7Fh4',
    })
  }
}
