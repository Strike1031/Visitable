// POST /api/get-venue
// Expects incoming request to be a GET request
// Retrieves a single venue object from venuesCollection with matching vid.

// Query string:
//  - vid: string, venue id

// Returns:
//  - {
// message: string,
// venueData: VenueType
// }

import { MongoClient } from 'mongodb'

export default async function getVenueData(req, res) {
  if (req.method === 'GET') {
    try {
      const vid = req.query.vid
      const client = await MongoClient.connect(process.env.MONGODB_CONNECTION)
      const db = client.db()

      const venuesCollection = db.collection('venuesCollection')

      console.log(`Attempting to retrieve document with vid ${vid} from venuesCollection.`)
      const query = { vid: vid }
      const options = { projection: { _id: 0 } }
      const venueInfo = await venuesCollection.findOne(query, options)

      await client.close()

      if (venueInfo) {
        return res
          .status(200)
          .json({ message: 'Successfully retrieved venue data.', venueData: venueInfo })
      } else {
        return res
          .status(502)
          .json({ message: `Could not find venue with vid ${vid} in venuesCollection.` })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message:
          'An error occurred while trying to retrieve data from a collection. See server logs for error details.',
      })
    }
  } else {
    return res.status(405).json({
      message:
        'This API endpoint only accepts GET requests. Make sure your URI contains a query component with firebase auth UID. For example: /api/get-account?vid=h=Gs78sdFds7Fh4',
    })
  }
}
