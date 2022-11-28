import { LatLngLiteral } from 'types/location-type'

type DistanceMatrixElement = {
  distance?: {
    text: string
    value: number
  }
  duration?: {
    text: string
    value: number
  }
}
type ParamsType = { [key: string]: string }
const encodeParamsURI = (p: ParamsType) =>
  Object.entries(p)
    .map((kv) => kv.map(encodeURIComponent).join('='))
    .join('&')

// Get distances between the origin and each destination.
// Args:
//  - origin: placeID (string) of the place to calculate distance from
//  - destinations: a list of placeID (string) of the places to calculate distance to
// Returns:
//  - An array of DistanceMatrixElements for each origin-to-destination pair,
//    in the same initial order as destinations.

export const getDestinationDistances = async (
  origin: string,
  destinations: string[],
): Promise<DistanceMatrixElement[]> => {
  console.log(`POST request to /api/get-dests-dists`)
  console.log(origin, destinations)
  let resp = await fetch('/api/get-dests-dists', {
    method: 'POST',
    body: JSON.stringify({
      origin,
      destinations,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const returnData = await resp.json()
  console.log("Returned data from distance matrix api:", returnData)
  if (!resp.ok) {
    throw new Error(`Server response data: ${JSON.stringify(returnData)}`)
  } else {
    return returnData.data.rows[0].elements
  }
}
