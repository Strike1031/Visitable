import { useRouter } from 'next/router'
import VenueCard from 'components/business-account/VenueCard'
import VenueDetails from 'components/business-account/VenueDetails'
import buttonStyles from 'styles/Buttons.module.css'
import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from 'config/auth'
import { VenueType } from 'types/venue-type'
import {
  getAccountHandler,
  updateAccountHandler,
  getVenuesHandler,
  updateVenueHandler,
} from 'lib/account-crud'
import { dummyVenuesData } from 'sampleDataVenues'
import CreateVenueForm from 'components/business-account/CreateVenueForm'
import claimsRedirect from 'lib/claims-redirect'
import BusinessAccountLayout from 'components/business-account/BusinessAccountLayout'
import { BusinessAccountContext } from 'components/contexts/BusinessAccountContext'

function BusinessVenues() {
  const router = useRouter()
  const auth = useAuth()
  const businessCx = useContext(BusinessAccountContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [venuesData, setVenuesData] = useState<VenueType[]>([])
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null)
  const [createVenue, setCreateVenue] = useState<boolean>(false)

  const getVenueData = async () => {
    setLoading(true)
    try {
      if (!auth.userState) throw new Error('No current user in firebase client')
      const venuesData = await getVenuesHandler(auth.userState.uid)
      console.log(venuesData)
      // setVenuesData([...venuesData, ...dummyVenuesData])
      setVenuesData(venuesData)
    } catch (error) {
      console.error(error)
      setVenuesData([])
    }
    setLoading(false)
  }

  const handleUpdateVenueData = async (partialVenueData: any) => {
    setLoading(true)
    if (selectedVenue !== null && auth.userState) {
      try {
        await updateVenueHandler({
          ...partialVenueData,
          vid: venuesData[selectedVenue].vid,
          uid: auth.userState.uid,
        })
        await getVenueData()
      } catch (error) {
        console.error(error)
      }
    }
    setLoading(false)
  }

  // TODO: handle new venue data passed in from child compeonent
  const handleCreateVenue = async () => {
    setLoading(true)

    // Return to business venues page
    setCreateVenue(false)
    // This should already be null
    setSelectedVenue(null)
    try {
      await getVenueData()
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!auth.initialisingUser) {
      if (auth.userState === null) {
        // If Auth context is no longer initialisingUser state, yet its userState
        // is still null, then redirect to business login page.
        router.push({
          pathname: '/business',
        })
      } else {
        claimsRedirect(router, auth.customClaims, router.pathname)
        getVenueData()
      }
    }
  }, [auth.initialisingUser, auth.userState])

  if (auth.initialisingUser) {
    if (loading) {
      return (
        <BusinessAccountLayout pageName={'venues'} businessName={businessCx?.data?.name ?? ''}>
          <div>Retrieving venue details...</div>
        </BusinessAccountLayout>
      )
    } else {
      return (
        <BusinessAccountLayout pageName={'venues'} businessName={businessCx?.data?.name ?? ''}>
          <div>Logging in account...</div>
        </BusinessAccountLayout>
      )
    }
  } else {
    if (selectedVenue !== null) {
      return (
        <BusinessAccountLayout pageName={'venues'} businessName={businessCx?.data?.name ?? ''}>
          <div className="flex justify-between">
            <button
              className={buttonStyles.toolbarButton}
              onClick={() => {
                setSelectedVenue(null)
              }}
            >
              Back to venues
            </button>
            <button
              className={buttonStyles.venueCardButton}
              onClick={() => {
                if (businessCx?.data?.uid) {
                  router.push({
                    pathname: '/venueListing/[uid]/[vid]',
                    query: { uid: businessCx.data.uid, vid: venuesData[selectedVenue].vid },
                  })
                } else {
                  router.push('/venueListing')
                }
              }}
            >
              View Live Page
            </button>
          </div>
          <VenueDetails
            venueData={venuesData[selectedVenue]}
            submitPartialVenueData={handleUpdateVenueData}
          />
        </BusinessAccountLayout>
      )
    } else if (createVenue) {
      return (
        <BusinessAccountLayout pageName={'venues'} businessName={businessCx?.data?.name ?? ''}>
          <div>
            <button
              className={buttonStyles.toolbarButton}
              onClick={() => {
                setCreateVenue(false)
              }}
            >
              Back to venues
            </button>
          </div>
          <CreateVenueForm submitNewVenueData={handleCreateVenue} />
        </BusinessAccountLayout>
      )
    } else {
      if (loading) {
        return (
          <BusinessAccountLayout pageName={'venues'} businessName={businessCx?.data?.name ?? ''}>
            <div>Retrieving venues...</div>
          </BusinessAccountLayout>
        )
      } else {
        return (
          <BusinessAccountLayout pageName={'venues'} businessName={businessCx?.data?.name ?? ''}>
            <div className="md:px-12 flex flex-col">
              <div className="mb-4 flex justify-end">
                <button className={buttonStyles.toolbarButton} onClick={() => setCreateVenue(true)}>
                  Add Venue
                </button>
              </div>
              {venuesData.map((venueData, idx) => (
                <VenueCard
                  key={idx}
                  uid={auth.userState?.uid ?? ''}
                  vid={venueData?.vid ?? ''}
                  title={venueData?.name ?? ''}
                  address={venueData?.locationData?.formattedAddress ?? ''}
                  imageUrl={venueData?.coverPhoto}
                  toVenueDetails={() => {
                    console.log(idx)

                    setSelectedVenue(idx)
                  }}
                />
              ))}
            </div>
          </BusinessAccountLayout>
        )
      }
    }
  }
}

export default BusinessVenues
