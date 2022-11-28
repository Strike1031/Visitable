// POST /api/get-dests-dists
// Uses the Google distance matrix API to calculate distances between the origin
// and each destination.
// Body params:
//  - origin: placeID (string) of the place to calculate distance from
//  - destinations: a list of placeID (string) of the places to calculate distance to
import { LatLngLiteral } from 'types/location-type'

const encodeParamsURI = (p) =>
  Object.entries(p)
    .map((kv) => kv.map(encodeURIComponent).join('='))
    .join('&')

export default async function getDestinationDistances(req, res) {
  const origin = req.body.origin
  const destinations = req.body.destinations
  const params = {
    origins: 'place_id:' + origin,
    destinations: destinations
      .map((placeId) => 'place_id:'+placeId)
      .join('|'),
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  }
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${encodeParamsURI(params)}`
  try {
    const response = await fetch(url, {
      method: 'GET',
    })
    const returnData = await response.json()
    return res.status(200).json({ data: returnData })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error })
  }
}
