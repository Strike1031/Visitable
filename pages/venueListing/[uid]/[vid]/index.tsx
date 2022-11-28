import React, { useContext, useEffect, useMemo, useState } from 'react'
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api'
import { VisitorLayout } from 'components/VisitorLayout'
import styles from 'styles/VenueListing.module.css'
import { getAccountHandler, getVenueHandler } from 'lib/account-crud'
import { useRouter } from 'next/router'
import { VenueType } from 'types/venue-type'
import { BusinessType } from 'types/business-type'
import { accessDetails } from 'types/access-details'
import { useAuth } from 'config/auth'
import { GuestAccountContext } from 'components/contexts/GuestAccountContext'
import { AccessFormType } from 'types/access-type'
import classNames from 'classnames/bind'
import { loadComponents } from 'next/dist/next-server/server/load-components'
import { v4 as uuidv4 } from 'uuid'
import { GuestType } from 'types/guest-type'
import buttonStyles from 'styles/Buttons.module.css'
import { BusinessAccountContext } from 'components/contexts/BusinessAccountContext'
import { venueSpecialtiesDetails } from 'types/venue-specialty-type'

const cx = classNames.bind(styles)

const mapContainerStyle = {
  width: '100%',
  maxWidth: '1000px',
  height: '400px',
}

export default function VenueListing() {
  const router = useRouter()
  const guestCx = useContext(GuestAccountContext)
  const businessCx = useContext(BusinessAccountContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [businessData, setBusinessData] = useState<BusinessType | null>(null)
  const [venueData, setVenueData] = useState<VenueType | null>(null)
  const [numMatches, setNumMatches] = useState<number | null>(null)
  const [numPrefs, setNumPrefs] = useState<number | null>(null)

  const checkOrCross = (checked: boolean) => {
    if (checked) {
      return (
        <div
          className={styles.checkbox}
          style={{ backgroundImage: 'url(/utility-icons/check.png)' }}
        />
      )
    } else {
      return (
        <div
          className={styles.checkbox}
          style={{ backgroundImage: 'url(/utility-icons/cross.png)' }}
        />
      )
    }
  }

  const renderAccessPrefsMatches = (
    validVenueData: VenueType,
    validGuestData: GuestType,
  ): any[] => {
    // Returns a list of all guest access prefs, styled according to
    // whether or not it is accommodated by this venue.
    let accessPrefsMatches: any[] = [
      <div key={uuidv4()} className={styles.detailsSubtitle}>
        Relevant to me
      </div>,
    ]
    for (let feature in accessDetails) {
      if (validGuestData.disabilityProfile[feature]) {
        // For each access pref that the guest needs:
        const className = cx({
          accContainer: true,
          checkColor: validVenueData.accessibilityFeatures[feature],
          crossColor: !validVenueData.accessibilityFeatures[feature],
        })
        accessPrefsMatches.push(
          <div key={uuidv4()} className={className}>
            <div className={styles.accDetails}>{accessDetails[feature]['display']}</div>
            {checkOrCross(validVenueData.accessibilityFeatures[feature])}
          </div>,
        )
      }
    }
    if (accessPrefsMatches.length == 1) {
      // If guest has no access prefs, an alert is displayed from generateSuitabilityReport
      return []
    } else {
      return accessPrefsMatches
    }
  }

  const renderVenueFeaturesOther = (
    validVenueData: VenueType,
    validGuestData: GuestType,
  ): any[] => {
    // Returns a list of all access features that are not guest access prefs,
    // and that the venue offers.
    let nonPrefFeatures: any[] = [
      <div key={uuidv4()} className={styles.detailsSubtitle}>
        Other Features
      </div>,
    ]
    for (let feature in accessDetails) {
      if (!validGuestData.disabilityProfile[feature]) {
        // For each access pref that the guest doesn't care about:
        if (validVenueData.accessibilityFeatures[feature]) {
          const className = cx({
            accContainer: true,
            checkColor: true,
          })
          nonPrefFeatures.push(
            <div key={uuidv4()} className={className}>
              <div className={styles.accDetails}>{accessDetails[feature]['display']}</div>
              {checkOrCross(validVenueData.accessibilityFeatures[feature])}
            </div>,
          )
        }
      }
    }
    if (nonPrefFeatures.length == 1) {
      // If venue has no features that the guest doesn't care about,
      // display nothing here.
      return []
    } else {
      return nonPrefFeatures
    }
  }

  const renderVenueFeatures = (validVenueData: VenueType) => {
    // Returns a list of all access features that are not guest access prefs,
    // styled according to whether or not the venue offers it.
    let features: any[] = [
      <div key={uuidv4()} className={styles.detailsSubtitle}>
        This venue's features
      </div>,
    ]
    for (let feature in accessDetails) {
      const className = cx({
        accContainer: true,
        checkColor: validVenueData.accessibilityFeatures[feature],
        crossColor: !validVenueData.accessibilityFeatures[feature],
      })
      features.push(
        <div key={uuidv4()} className={className}>
          <div className={styles.accDetails}>{accessDetails[feature]['display']}</div>
          {checkOrCross(validVenueData.accessibilityFeatures[feature])}
        </div>,
      )
    }
    if (features.length == 1) {
      return [<div key={uuidv4()}>This venue does not have any accessibility features.</div>]
    } else {
      return features
    }
  }

  const calculateSuitability = (validVenueData: VenueType, validGuestData: GuestType): void => {
    let matchesCount = 0
    let prefsCount = 0
    for (let feature in accessDetails) {
      if (validGuestData.disabilityProfile[feature]) {
        // For of the guest's selected access prefs:
        prefsCount++
        if (validVenueData.accessibilityFeatures[feature]) {
          matchesCount++
        }
      }
    }
    setNumMatches(matchesCount)
    setNumPrefs(prefsCount)
  }

  const generateSuitabilityReport = (validNumMatches: number, validNumPrefs: number) => {
    if (validNumPrefs === 0) {
      return [
        <div key={uuidv4()}>
          We cannot generate a suitability report for you yet because you have no accessibility
          preferences. You can select your preferences in your account.
        </div>,
      ]
    } else {
      let components = [
        <div key={uuidv4()} className={styles.detailsSubtitle}>
          Suitability Report
        </div>,
      ]
      components.push(
        <div
          key={uuidv4()}
        >{`This venue satisfies ${validNumMatches} out of ${validNumPrefs} of your accessibility preferences.`}</div>,
      )
      return components
    }
  }

  const getBusinessAndVenueData = async () => {
    setLoading(true)
    const uid = router.query.uid
      ? Array.isArray(router.query.uid)
        ? router.query.uid[0]
        : router.query.uid
      : ''
    const vid = router.query.vid
      ? Array.isArray(router.query.vid)
        ? router.query.vid[0]
        : router.query.vid
      : ''
    console.log(uid, vid)
    console.log(router.query.uid, router.query.vid)

    try {
      const returnedBusinessData = await getAccountHandler(uid)
      setBusinessData(returnedBusinessData)
      const returnedVenueData = await getVenueHandler(vid)
      setVenueData(returnedVenueData)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    // Once router path has been updated
    if (router.asPath !== router.route) {
      getBusinessAndVenueData()
    }
  }, [router])

  useEffect(() => {
    if (venueData && guestCx.data) {
      calculateSuitability(venueData, guestCx.data)
    }
  }, [venueData, guestCx.data])

  // This latLng reference is only updated when the location.latLng value
  // actually changes. This is important for preventing the GoogleMap from
  // rerendering every time the locationData is updated (event though in this
  // page the location cannot be updated).
  const latLngMemo = useMemo(() => {
    return (
      venueData?.locationData.latLng ?? {
        lat: -33.88934609897324,
        lng: 151.21495569941987,
      }
    )
  }, [venueData?.locationData.latLng])

  return (
    <VisitorLayout>
      {!(businessData && venueData) ? (
        loading || guestCx?.loading || businessCx?.loading ? (
          <div>Loading...</div>
        ) : (
          <div>Sorry, we are unable to display this venue at the moment.</div>
        )
      ) : (
        <div className="px-6 lg:px-16 my-6 lg:my-8 w-full max-w-screen-lg">
          {businessCx.data ? (
            <div className="mb-4 flex w-full justify-between">
              <button
                className={buttonStyles.toolbarButton}
                onClick={() => router.push('/business-account/venues')}
              >
                Back to venues
              </button>
              <div className="text-gray-400">Preview mode</div>{' '}
            </div>
          ) :
            <div className="mb-4 flex w-full justify-start">
              <button
                className={buttonStyles.toolbarButton}
                onClick={() => router.push('/venues')}
              >
                Back to search
              </button>
            </div>
           }
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="mt-1">
                <div className="text-4xl mt-1">{venueData.name}</div>
                <div className="mt-4 text-blue-600">{venueData.locationData.formattedAddress}</div>
                <div className="mt-2 text-blue-600">{businessData.website}</div>
              </div>
              <div className="mt-2">
                {Object.entries(venueSpecialtiesDetails)
                  .filter(([key, detail]) => venueData.specialties[key] === true)
                  .map(([key, detail]) => detail.selectLabel)
                  .join(' \u{22c5} ')}
              </div>
              <div className="mt-2">
                {/* <div className="mt-1 flex">
                  <div
                    className="w-4 m-1 bg-contain bg-no-repeat"
                    style={{ backgroundImage: 'url(/utility-icons/star.png)' }}
                  />
                  <div className="ml-2">Review rating: 4.38</div>
                </div> */}
                {guestCx.data && numMatches && numPrefs && (
                  <>
                    <div className="mt-1 flex">
                      <div
                        className="w-4 m-1 bg-contain bg-no-repeat"
                        style={{ backgroundImage: 'url(/utility-icons/check.png)' }}
                      />
                      <div className="ml-2">{`Your suitability: ${Math.round(
                        (100 * numMatches) / numPrefs,
                      )}%`}</div>
                    </div>
                    <div className="">{`This venue satisfies ${numMatches} out of ${numPrefs} of your accessibility preferences.`}</div>
                  </>
                )}
              </div>
            </div>
            <div
              className="ml-0 mt-4 lg:mt-0 lg:ml-12 w-full lg:w-1/2 h-52 bg-cover rounded-lg"
              style={{
                backgroundImage: `url(${venueData.coverPhoto})`,
                maxWidth: '500px',
              }}
            ></div>
          </div>
          <div className="h-12 mt-4 py-2 hidden lg:flex flex-row border-b-2">
            <div className="px-8 text-lg">Overview</div>
            <div className="px-8 text-lg">Accesssibility</div>
            <div className="px-8 text-lg">Photos</div>
            <div className="px-8 text-lg">Reviews</div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col flex-grow">
              <div className={styles.section} style={{ marginTop: '1rem' }}>
                <div className={styles.sectionTitle}>Accessibility</div>

                {guestCx.data && numMatches && numPrefs
                  ? [
                      generateSuitabilityReport(numMatches, numPrefs),
                      ...renderAccessPrefsMatches(venueData, guestCx.data),
                      ...renderVenueFeaturesOther(venueData, guestCx.data),
                    ]
                  : renderVenueFeatures(venueData)}
              </div>
              <div className={styles.section}>
                <div className={styles.sectionTitle}>About</div>
                <div>{venueData.description}</div>
              </div>
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Location</div>
                {/* <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}> */}
                <GoogleMap mapContainerStyle={mapContainerStyle} center={latLngMemo} zoom={10}>
                  {/* Child components are markers, info windows, etc. */}
                  {venueData?.locationData.latLng && (
                    <Marker
                      key={`${venueData.locationData.latLng.lat}-${venueData.locationData.latLng.lng}`}
                      position={{
                        lat: venueData.locationData.latLng.lat,
                        lng: venueData.locationData.latLng.lng,
                      }}
                    />
                  )}
                </GoogleMap>
                {/* </LoadScript> */}
              </div>
              {/* <div className={styles.section}>
                <div className={styles.sectionTitle}>Photos</div>
                <div className="flex flex-row flex-wrap">
                  {venueData.accessImages.map((imageInfo, idx) => {
                    return (
                      <div className={styles.photoContainer}>
                        <div
                          className={styles.photo}
                          style={{
                            backgroundImage: `url(https://Visitable.s3.ap-southeast-2.amazonaws.com/${venueData.vid}/${imageInfo.fileId})`,
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div> */}
            </div>
            <div
              className={
                styles.detailsContainer +
                ' flex flex-col mt-8 ml-0 lg:mt-0 lg:ml-8 border-t-2 border-solid lg:border-t-0'
              }
            >
              <div className={styles.detail}>
                <div className={styles.detailsTitle}>Address</div>
                <div>{venueData.locationData.formattedAddress}</div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detailsTitle}>Opening Hours</div>
                {venueData.hours}
              </div>
              <div className={styles.detail}>
                <div className={styles.detailsTitle}>Contact</div>
                <div>{venueData.phone}</div>
                <div>{businessData.website}</div>
                <div>{venueData.email}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </VisitorLayout>
  )
}
