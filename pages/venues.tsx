import React, { useContext, useEffect, useState } from 'react'
import { listings } from 'components/mock-listings'
import { Listings } from 'components/Listings'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { Regions, Categories } from '../constants/ListingFilterOptions'
import { VisitorLayout } from 'components/VisitorLayout'
import PublicVenueCard from 'components/venue-listing/PublicVenueCard'
import { VenueType } from 'types/venue-type'
import { useAuth } from 'config/auth'
import { getAllVenuesHandler } from 'lib/account-crud'
import { AccessFormType } from 'types/access-type'
import { accessDetails, defaultAccessForm } from 'types/access-details'
import { GuestAccountContext } from 'components/contexts/GuestAccountContext'
import { defaultLocationData, LatLngLiteral, LocationDataType } from 'types/location-type'
import { getDestinationDistances } from 'lib/venue-crud'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { GuestType } from 'types/guest-type'
import buttonStyles from 'styles/Buttons.module.css'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import AccessSetter from 'components/AccessSetter'
import { KeyboardArrowRight } from '@material-ui/icons'
import AddressSetter from 'components/AddressSetter'
import { venueSpecialtiesDetails } from 'types/venue-specialty-type'

interface SearchVenueType extends VenueType {
  accessScore?: number
  distance?: number // In metres
  duration?: number // In seconds
  display?: boolean
}

export default function Venues() {
  const guestCx = useContext(GuestAccountContext)
  const [guestData, setGuestData] = useState<GuestType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchedVenues, setFetchedVenues] = useState<SearchVenueType[]>([])
  const [displayVenues, setDisplayVenues] = useState<SearchVenueType[]>([])

  const [onMenu, setOnMenu] = useState<boolean>(true)
  const [searchOption, setSearchOption] = useState<'access' | 'location' | 'all' | null>(null)

  // Accessibility preferences to search and order displayed venues by.
  const [searchAccess, setSearchAccess] = useState<AccessFormType>(defaultAccessForm)
  // The location around which to search for venus. Default is Sydney.
  const [searchLocation, setSearchLocation] = useState<LocationDataType>(defaultLocationData)

  const [regionFilter, setRegionFilter] = useState<string | undefined>(undefined)
  const [specialtyFilter, setSpecialtyFilter] = useState<string | undefined>(undefined)

  const getVenuesData = async () => {
    setLoading(true)
    const returnedVenuesData = await getAllVenuesHandler()
    const validReturnedVenuesData = returnedVenuesData.filter((venue: VenueType) => venue.locationData.placeID !== "")
    console.log(validReturnedVenuesData)
    setFetchedVenues([...validReturnedVenuesData])
    setDisplayVenues([...validReturnedVenuesData])
    setLoading(false)
  }

  const calculateAccessScore = (
    venueAccessFeatures: AccessFormType,
    guestAccessPrefs: AccessFormType,
  ): number => {
    let matchesCount = 0
    let prefsCount = 0
    for (let feature in accessDetails) {
      if (guestAccessPrefs[feature]) {
        // For of the guest's selected access prefs:
        prefsCount++
        if (venueAccessFeatures[feature]) {
          matchesCount++
        }
      }
    }
    return matchesCount / prefsCount
  }

  const setDisplayVenuesByAccess = (accessPrefs: AccessFormType) => {
    let newDisplayVenues: SearchVenueType[] = []
    for (let searchVenue of fetchedVenues) {
      newDisplayVenues.push({
        ...searchVenue,
        accessScore: calculateAccessScore(searchVenue.accessibilityFeatures, accessPrefs),
        display: true,
      })
    }

    // In-place sort by accessScore ratings, which should all be not null here.
    // Suppose v1 more suitable than v2. Then v2.accessScore - v1.accessScore < 0
    // so a is placed before b.
    newDisplayVenues.sort((v1, v2) => (v2.accessScore ?? 0) - (v1.accessScore ?? 0))
    setDisplayVenues(newDisplayVenues)
  }

  const setDisplayVenuesByLocation = async (origin: string) => {
    const distsAndDurs = await getDestinationDistances(
      origin,
      fetchedVenues.map((searchVenue) => searchVenue.locationData.placeID),
    )

    let newDisplayVenues: SearchVenueType[] = []
    // Assumes returned distances in corresponding order to destinations.
    fetchedVenues.forEach((searchVenue, idx) =>
      newDisplayVenues.push({
        ...searchVenue,
        distance: distsAndDurs[idx].distance?.value ?? undefined,
        duration: distsAndDurs[idx].duration?.value ?? undefined,
        display: true,
      }),
    )

    // In-place sort by distance, which may or may not be not null here
    // depending on what the googe api did.
    // Suppose v1 more distant than v2. Then v1.accessScore - v2.accessScore > 0
    // so v2 is placed before v1 (v2 is nearer).
    newDisplayVenues.sort((v1, v2) => (v1.distance ?? 0) - (v2.distance ?? 0))
    setDisplayVenues(newDisplayVenues)
  }

  const setDisplayVenuesByCategory = () => {
    // setDisplayVenues([])
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [setOnMenu])

  const getHeader = (searchOption: 'access' | 'location' | 'all' | null) => {
    if (searchOption === 'access') {
      return (
        <div className="mt-2">
          <div>
            Showing venues by accessibility features, with venues that offer more of your
            accessibility preferences at the top.
          </div>
        </div>
      )
    } else if (searchOption === 'location') {
      return (
        <div className="mt-2">
          <div>Showing venues by location, with nearest venues at the top.</div>
        </div>
      )
    } else if (searchOption === 'all') {
      return (
        <div className="mt-2">
          <div>Showing venues by category</div>
        </div>
      )
    }
  }

  useEffect(() => {
    getVenuesData()
  }, [])

  useEffect(() => {
    if (!guestCx.loading && guestCx.data !== null) {
      setGuestData(guestCx.data)
    }
  }, [guestCx.loading, guestCx.data])

  useEffect(() => {
    // map method returns a new array, so no need to use spread syntax
    let newDisplayVenues = displayVenues.map((venue) => ({
      ...venue,
      display:
        (regionFilter === undefined ? true : venue.locationData.state === regionFilter) &&
        (specialtyFilter === undefined ? true : venue.specialties[specialtyFilter] === true),
    }))
    setDisplayVenues(newDisplayVenues)
  }, [regionFilter, specialtyFilter])

  if (loading) {
    return (
      <VisitorLayout>
        <div className="mt-4">Loading...</div>
      </VisitorLayout>
    )
  } else if (onMenu) {
    return (
      <VisitorLayout>
        <div className="px-6 lg:px-16 my-6 lg:my-8 w-full max-w-screen-lg">
          <div className="text-3xl lg:text-4xl">Discover venues</div>
          <div className="my-6 lg:px-8 lg:py-10 flex flex-col lg:bg-white lg:shadow-xl lg:rounded-xl">
            <div className="text-xl lg:text-3xl">Find venues by accessibility</div>
            {guestData !== null && (
              <button
                className={buttonStyles.primaryCardAction}
                onClick={() => {
                  setDisplayVenuesByAccess(guestData.disabilityProfile)
                  setSearchOption('access')
                  setOnMenu(false)
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col flex-grow items-start">
                    <div className="font-bold text-left text-lg lg:text-2xl">
                      Recommended for me
                    </div>
                    <div className="text-gray-200 text-sm text-left">
                      Find the most suitable Visitable-listed venues for me based on my accessibility
                      preferences.
                    </div>
                  </div>
                  <div>
                    <KeyboardArrowRightIcon />
                  </div>
                </div>
              </button>
            )}
            <button
              className={buttonStyles.secondaryCardAction}
              onClick={() => {
                if (searchOption === 'access') {
                  setSearchOption(null)
                } else {
                  setSearchOption('access')
                }
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col flex-grow items-start">
                  <div className="font-bold text-left text-lg lg:text-2xl">
                    Search by accessibility features
                  </div>
                  <div className="text-gray-600 text-sm text-left ">
                    Search Visitable-listed venues by selecting your accessibility preferences.
                  </div>
                </div>
                <div>
                  {searchOption === 'access' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
              </div>
            </button>
            {searchOption === 'access' && (
              <div className="mt-2 lg:mt-4 px-4 flex justify-center">
                <div className="flex flex-col items-end">
                  <AccessSetter
                    accessSelections={searchAccess}
                    setAccessSelections={setSearchAccess}
                    disabled={loading}
                    accountType={'guest'}
                  />
                    <button
                      className={buttonStyles.primaryButton}
                      onClick={() => {
                        setDisplayVenuesByAccess(searchAccess)
                        setSearchOption('access')
                        setOnMenu(false)
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>Search</div>
                        <KeyboardArrowRightIcon />
                      </div>
                    </button>
                </div>
              </div>
            )}
          </div>
          <div className="my-6 lg:px-8 lg:py-10 flex flex-col lg:bg-white lg:shadow-xl lg:rounded-xl">
            <div className="text-xl lg:text-3xl">Find venues by location</div>
            {guestData !== null && (
              <button
                className={buttonStyles.primaryCardAction}
                onClick={() => {
                  setDisplayVenuesByLocation(guestData.locationData.placeID)
                  setSearchOption('location')
                  setOnMenu(false)
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col flex-grow items-start">
                    <div className="font-bold text-left text-lg lg:text-2xl">Near me</div>
                    <div className="text-gray-200 text-sm text-left">
                      Find the nearest Visitable-listed venues based on my home location.
                    </div>
                  </div>
                  <div>
                    <KeyboardArrowRightIcon />
                  </div>
                </div>
              </button>
            )}
            <button
              className={buttonStyles.secondaryCardAction}
              onClick={() => {
                if (searchOption === 'location') {
                  setSearchOption(null)
                } else {
                  setSearchOption('location')
                }
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col flex-grow items-start">
                  <div className="font-bold text-left text-lg lg:text-2xl">Search by location</div>
                  <div className="text-gray-600 text-sm text-left">
                    Search Visitable-listed venues by selecting a location to search around.
                  </div>
                </div>
                <div>
                  {searchOption === 'location' ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </div>
              </div>
            </button>
            {searchOption === 'location' && (
              <div className="mt-2 lg:mt-4 px-4 flex justify-center">
                <div className="flex flex-col items-end">
                  <AddressSetter
                    locationData={searchLocation}
                    setLocationData={setSearchLocation}
                    disabled={loading}
                  />
                  <div className="mt-2">
                    <button
                      className={buttonStyles.primaryButton}
                      onClick={() => {
                        setDisplayVenuesByLocation(searchLocation.placeID)
                        setSearchOption('location')
                        setOnMenu(false)
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>Search</div>
                        <KeyboardArrowRightIcon />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </VisitorLayout>
    )
  } else if (searchOption === null) {
    setOnMenu(true)
  } else {
    window.scrollTo(0, 0)
    return (
      <VisitorLayout>
        <div className="px-6 lg:px-16 my-6 lg:my-8 w-full max-w-screen-lg">
            <h1 className="text-3xl lg:text-4xl">Venues</h1>
            <div className="flex justify-between items-center">
              <button
                className={buttonStyles.secondaryButton}
                onClick={() => {
                  setSearchOption('all')
                  setOnMenu(true)
                }}
              >
                <div className="flex justify-between items-center">
                  <KeyboardArrowLeftIcon />
                  <div className="hidden sm:block text-sm lg:text-base">Back to search</div>
                </div>
              </button>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="">
                <Select
                  style={{ width: "100%"}}
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value as string)}
                  displayEmpty
                  >
                  <MenuItem value={undefined}>{'All states'}</MenuItem>
                  {Regions.map((op, idx) => (
                    <MenuItem key={idx} value={op.value}>
                      {op.label}
                    </MenuItem>
                  ))}
                </Select>
                  
                                  </div>
                                  <div className="">
                <Select
                  style={{ width: "100%"}}
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value as string)}
                  displayEmpty
                  >
                  <MenuItem value={undefined}>{'All categories'}</MenuItem>
                  {Object.entries(venueSpecialtiesDetails).map(([specialty, details], idx) => (
                    <MenuItem key={idx} value={specialty}>
                      {details.categoryLabel}
                    </MenuItem>
                  ))}
                </Select>
                  
                  </div>
              </div>
            </div>
            {getHeader(searchOption)}

            <div className="mt-6 w-full">
              {displayVenues.some((venue: SearchVenueType) => venue.display === true) ? (
                displayVenues.map(
                  (displayVenue, idx) =>
                    displayVenue.display && (
                      <PublicVenueCard
                        key={idx}
                        uid={displayVenue.uid}
                        vid={displayVenue.vid}
                        title={displayVenue.name}
                        address={displayVenue.locationData.formattedAddress}
                        imageUrl={displayVenue.coverPhoto}
                        accessScore={displayVenue.accessScore ?? undefined}
                        distance={displayVenue.distance ?? undefined}
                      />
                    ),
                )
              ) : (
                <div className="text-lg">No venues to show</div>
              )}
            </div>
          </div>
      </VisitorLayout>
    )
  }
}
