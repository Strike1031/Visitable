import { authService } from 'config/firebaseClient'
import { VenueType } from 'types/venue-type'

// Async function to make POST request to serverside endpoint "/create-account"
// and then /claim-account-init to update custom claims, then immediately
// fetch updated ID token into clientside.
// Arguments:
//  - newAccountData: Object containing new account data. Expects the
//    account object to have fields labelled uid and accountType.

export const createAccountHandler = async (newAccountData: any) => {
  if (!('uid' in newAccountData)) throw new Error('New account data must contain a uid value')
  if (!('accountType' in newAccountData))
    throw new Error('New account data must contain a accountType value')
  if (!(newAccountData.accountType === 'guest' || newAccountData.accountType === 'business'))
    throw new Error('Invalid account type. Must be either guest or business.')

  if (authService.currentUser) {
    const idToken = await authService.currentUser.getIdToken()

    console.log(`POST request to /api/create-account`)
    let response = await fetch('/api/create-account', {
      method: 'POST',
      body: JSON.stringify({
        collection: 'usersCollection',
        accountData: newAccountData,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    let returnData = await response.json()
    if (!response.ok) {
      throw new Error(`Server response data: ${JSON.stringify(returnData)}`)
    }

    response = await fetch('/api/claim-account-init', {
      method: 'POST',
      body: JSON.stringify({
        idToken,
        accountType: newAccountData.accountType,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    returnData = await response.json()
    if (!response.ok) {
      throw new Error(`Server response data: ${JSON.stringify(returnData)}`)
    }

    await authService.currentUser.getIdToken(true)

    console.log(`Server response data: ${JSON.stringify(returnData)}`)
  }
}

// Async function to make GET request to serverside endpoint "/get-account"
// Returns:
//  - uid: Authentication uid of logged in client
//  - Account data object
export const getAccountHandler = async (uid: string) => {
  if (!uid) throw new Error('No current user in firebase client')

  console.log(`Attempt GET request to /api/get-account`)
  const response = await fetch(`/api/get-account?uid=${uid}&collection=usersCollection`, {
    method: 'GET',
  })
  const returnData = await response.json()
  if (response.ok) {
    console.log(`Account data for user ${uid} received from server.\n
    Server response data: ${JSON.stringify(returnData, null, 1)}`)
    return returnData.accountData
  } else {
    throw new Error(
      `Failed to get account data for uid ${uid} from server. Server response: ${JSON.stringify(
        returnData,
        null,
        1,
      )}`,
    )
  }
}

// Async function to make POST request to serverside endpoint "/update-account"
// Arguments:
//  - uid: Authentication uid of logged in client
//  - partialAccountData: An object containing fields to be updated in
//    the database entry
export const updateAccountHandler = async (uid: string, partialAccountData: any) => {
  console.log(`Attempt POST request to /api/update-account`)
  const response = await fetch('/api/update-account', {
    method: 'POST',
    body: JSON.stringify({
      uid,
      partialAccountData,
      collection: 'usersCollection',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const returnData = await response.json()

  if (response.ok) {
    console.log(
      `POST request to /api/update-account successfully processed. Server response data: ${JSON.stringify(
        returnData,
        null,
        1,
      )}`,
    )
  } else {
    console.log(
      `POST request to /api/update-account failed. Server response data: ${JSON.stringify(
        returnData,
        null,
        1,
      )}`,
    )
  }
}

// Async function to make POST request to serverside endpoint "/insert-branch"
// Arguments:
//  - uid: Authentication uid of logged in client
//  - newBranchData: A BranchType object to be appended to a business
//    account's branches array.
// export const insertBranchHandler = async (uid: string, newBranchData: any) => {
//   console.log(`Attempt POST request to /api/insert-branch`)
//   const response = await fetch('/api/insert-branch', {
//     method: 'POST',
//     body: JSON.stringify({
//       uid,
//       newBranchData,
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//   const returnData = await response.json()

//   if (response.ok) {
//     console.log(
//       `POST request to /api/insert-branch successfully processed. Server response data: ${JSON.stringify(
//         returnData,
//         null,
//         1,
//       )}`,
//     )
//   } else {
//     console.log(
//       `POST request to /api/insert-branch failed. Server response data: ${JSON.stringify(
//         returnData,
//         null,
//         1,
//       )}`,
//     )
//   }
// }

// Async function to make POST request to serverside endpoint "/create-venue"
// Arguments:
//  - uid: Authentication uid of logged in business who is creating this venue
//  - newVenueData: A new VenueType object to be added to the database
export const createVenueHandler = async (uid: string, newVenueData: VenueType) => {
  console.log(`Attempt POST request to /api/create-venue`)
  const response = await fetch('/api/create-venue', {
    method: 'POST',
    body: JSON.stringify({
      uid,
      newVenueData,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const returnData = await response.json()

  if (response.ok) {
    console.log(
      `POST request to /api/create-venue successfully processed. Server response data: ${JSON.stringify(
        returnData,
        null,
        1,
      )}`,
    )
  } else {
    console.log(
      `POST request to /api/create-venue failed. Server response data: ${JSON.stringify(
        returnData,
        null,
        1,
      )}`,
    )
  }
}

// Async function to make GET request to serverside endpoint "/get-venues-by-business"
// Arguments
//  - uid: the firebase uid of the business whose venues we want to retrieve
// Returns:
//  - List of venue data objects: VenueType[]
export const getVenuesHandler = async (uid: string) => {
  if (!uid) throw new Error('No current user in firebase client')

  console.log(`Attempt GET request to /api/get-venues-by-business`)
  const response = await fetch(`/api/get-venues-by-business?uid=${uid}&collection=usersCollection`, {
    method: 'GET',
  })
  const returnData = await response.json()
  if (response.ok) {
    console.log(`Venues data for user ${uid} received from server.\n
    Server response data: ${JSON.stringify(returnData, null, 1)}`)
    return returnData.venuesData
  } else {
    throw new Error(
      `Failed to get venues data for uid ${uid} from server. Server response: ${JSON.stringify(
        returnData,
        null,
        1,
      )}`,
    )
  }
}


// Async function to make GET request to serverside endpoint "/get-venue"
// Arguments
//  - vid: the vid of the venue whose info we want to retrieve
// Returns:
//  - Venue data object: VenueType
export const getVenueHandler = async (vid: string) => {
  if (!vid) throw new Error('Venue ID is undefined or null')

  console.log(`Attempt GET request to /api/get-venue`)
  const response = await fetch(`/api/get-venue?vid=${vid}`, {
    method: 'GET',
  })
  const returnData = await response.json()
  if (response.ok) {
    console.log(`Venues data for user ${vid} received from server.\n
    Server response data: ${JSON.stringify(returnData, null, 1)}`)
    return returnData.venueData
  } else {
    throw new Error(
      `Failed to get venue data for vid ${vid} from server. Server response: ${JSON.stringify(
        returnData,
        null,
        1,
      )}`,
    )
  }
}


// Async function to make POST request to serverside endpoint "/update-venue"
// Arguments:
//  - partialVenueData: An object containing fields to be updated in
//    the database entry. Must contain vid and uid of venue owner, which will be
//      matched with idToken uid to authorise the update.
export const updateVenueHandler = async (partialVenueData: any) => {
  if (!('uid' in partialVenueData)) throw new Error('Partial venue data must claim to have owner with uid.')
  if (!('vid' in partialVenueData)) throw new Error('Partial venue data must have vid value.')
  if (!authService.currentUser) throw new Error('No currently logged in user.')
  
  const idToken = await authService.currentUser.getIdToken()
  
  console.log(`Attempt POST request to /api/update-venue`)
  const response = await fetch('/api/update-venue', {
    method: 'POST',
    body: JSON.stringify({
      idToken,
      partialVenueData,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const returnData = await response.json()

  if (response.ok) {
    console.log(
      `POST request to /api/update-venue successfully processed. Server response data: ${JSON.stringify(
        returnData,
        null,
        1,
      )}`,
    )
  } else {
    console.log(
      `POST request to /api/update-venue failed. Server response data: ${JSON.stringify(
        returnData,
        null,
        1,
      )}`,
    )
  }
}


// Async function to make GET request to serverside endpoint "/get-venues-all"
// Arguments: none
// Returns:
//  - List of venue data objects: VenueType[]
export const getAllVenuesHandler = async () => {
  console.log(`Attempt GET request to /api/get-venues-all`)
  const response = await fetch(`/api/get-venues-all`, {
    method: 'GET',
  })
  const returnData = await response.json()
  if (response.ok) {
    console.log(`Venues data received from server.\n
    Server response data: ${JSON.stringify(returnData, null, 1)}`)
    return returnData.venuesData
  } else {
    throw new Error(
      `Failed to get venues data from server. Server response: ${JSON.stringify(
        returnData,
        null,
        1,
      )}`,
    )
  }
}