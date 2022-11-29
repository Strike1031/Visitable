import searchBoxStyles from 'styles/SearchBox.module.css'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { useCallback, useRef, useState, ChangeEvent, useMemo } from 'react'
import { LocationDataType } from 'types/location-type'
import usePlacesAutocomplete, { getDetails, getGeocode, getLatLng } from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import TextField from '@material-ui/core/TextField'
import { useAuth } from 'config/auth'

const libraries: ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[] = [
  'places',
]
const mapContainerStyle = {
  width: '100%',
  maxWidth: '1000px',
  height: '400px',
}
const mapOptions = {}

// Make sure this is not inside the component.
// If it is, the use useMemo, right?
// const center = {
//   lat: -33.8688,
//   lng: 151.2093,
// }

type propTypes = {
  locationData: LocationDataType
  setLocationData: (locationData: LocationDataType) => void
  disabled: boolean
}

export default function AddressSetter({ locationData, setLocationData, disabled }: propTypes) {
  // The google maps api script has been executed in the html head. See _app.tsx
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  //   libraries,
  // })
  const auth = useAuth()
  const mapRef = useRef<any | null>(null)
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  // This latLng reference is only updated when the location.latLng value
  // actually changes. This is important for preventing the GoogleMap from
  // rerendering every time the locationData is updated.
  const latLngMemo = useMemo(() => {
    return locationData.latLng
  }, [locationData.latLng])

  const panTo = useCallback(({ lat, lng }) => {
    if (mapRef) {
      mapRef.current?.panTo({ lat, lng })
      mapRef.current?.setZoom(15)
    }
  }, [])

  // Note: The Googles Places API is loaded using a script tag in _app.tsx
  // to allow this hook to work.
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => locationData.latLng.lat, lng: () => locationData.latLng.lng },
      radius: 100 * 1000,
    },
  })

  console.log('usePlacesAutocomplete hook:', {
    ready,
    value,
    status,
    data,
    setValue,
    clearSuggestions,
  })

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleMapClick = useCallback(async (e) => {
    if (!disabled) {
      try {
        const results = await getGeocode({ location: { lat: e.latLng.lat(), lng: e.latLng.lng() } })
        // const { lat, lng } = await getLatLng(result)
        // We need to use a value returned from the function, can't just use the
        // state object as it has not been updated yet, not until next render.
        const newLocationDetails = await fetchAndSetDetails(results[0].place_id)
        setValue(newLocationDetails.formattedAddress, false)
      } catch (error) {
        console.log('😱 Error while fetching or setting place details: ', error)
      }
    }
  }, [])

  const handleSelect = async (address: string): Promise<void> => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      // const { lat, lng } = await getLatLng(result)
      await fetchAndSetDetails(results[0].place_id)
    } catch (error) {
      console.log('😱 Error while fetching or setting place details: ', error)
    }
  }

  const fetchAndSetDetails = async (placeID: string): Promise<LocationDataType> => {
    const parameters = {
      placeId: placeID,
      fields: ['place_id', 'address_component', 'geometry', 'formatted_address'],
    }
    const newLocationData = await getDetails(parameters)
    console.log(`Location data retrieved from Place Details API:`, newLocationData)
    const latLng = {
      lat: newLocationData.geometry.location.lat(),
      lng: newLocationData.geometry.location.lng(),
    }
    panTo(latLng)

    type AddressComponent = {
      long_name: string
      short_name: string
      types: Array<string>
    }
    const streetNumberObjs: Array<AddressComponent> = newLocationData.address_components.filter(
      (obj: AddressComponent) => obj.types.includes('street_number'),
    )
    const streetNameObjs: Array<AddressComponent> = newLocationData.address_components.filter(
      (obj: AddressComponent) => obj.types.includes('street_name') || obj.types.includes('route'),
    )
    const suburbObjs: Array<AddressComponent> = newLocationData.address_components.filter(
      (obj: AddressComponent) => obj.types.includes('locality'),
    )
    const postcodeObjs: Array<AddressComponent> = newLocationData.address_components.filter(
      (obj: AddressComponent) => obj.types.includes('postal_code'),
    )
    const stateObjs: Array<AddressComponent> = newLocationData.address_components.filter(
      (obj: AddressComponent) => obj.types.includes('administrative_area_level_1'),
    )
    const countryObjs: Array<AddressComponent> = newLocationData.address_components.filter(
      (obj: AddressComponent) => obj.types.includes('country'),
    )

    const newLocationDetails = {
      placeID: placeID,
      latLng: latLng,
      streetNumber: streetNumberObjs.length > 0 ? streetNumberObjs[0].short_name : '',
      streetName: streetNameObjs.length > 0 ? streetNameObjs[0].short_name : '',
      suburb: suburbObjs.length > 0 ? suburbObjs[0].short_name : '',
      postcode: postcodeObjs.length > 0 ? postcodeObjs[0].short_name : '',
      state: stateObjs.length > 0 ? stateObjs[0].short_name : '',
      country: countryObjs.length > 0 ? countryObjs[0].long_name : '',
      formattedAddress: newLocationData.formatted_address ?? '',
    }
    setLocationData(newLocationDetails)
    return newLocationDetails
  }

  const renderSuggestions = (): JSX.Element => {
    const suggestions = data.map(({ place_id, description }: any) => (
      <ComboboxOption key={place_id} value={description} />
    ))
    return (
      <>
        {suggestions}
        <li className='logo'>
          <img
            src='https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png'
            alt='Powered by Google'
          />
        </li>
      </>
    )
  }

  // if (loadError) return <div>An error occurred will loading the map.</div>
  // if (!isLoaded || !ready) return <div>Map loading...</div>
  if (!ready) {
    return <div>Map loading...</div>
  } else {
    return (
      <div>
        <div className='mb-4 text-sm lg:text-base'>
          Search for your company's address or click on the map to place a marker at company venue.
        </div>
        <div>
          <div className={searchBoxStyles.searchBox}>
            <Combobox onSelect={handleSelect}>
              <ComboboxInput
                style={{
                  width: '100%',
                  padding: '0.4rem',
                  borderRadius: '0.4rem',
                  border: 'solid black 1px',
                }}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                  setValue(e.target.value)
                }}
                disabled={!ready || disabled}
                placeholder={
                  !auth.initialisingUser && auth.userState !== null
                    ? 'Search location...'
                    : 'Enter your current location to search for venues nearby'
                }
              />
              <ComboboxPopover portal={false}>
                <ComboboxList>{status === 'OK' && renderSuggestions()}</ComboboxList>
              </ComboboxPopover>
            </Combobox>
          </div>
        </div>
        <div className='pt-16 pb-8'>
        <div className='flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4'>
            <div style={{ flex: '1 1 auto' }}>
              <TextField
                id='street-number'
                label='Street Number'
                value={locationData.streetNumber}
                InputProps={{
                  readOnly: true,
                }}
                variant='filled'
                fullWidth={true}
                disabled={true}
              />
            </div>
            <div style={{ flex: '3 1 auto' }}>
              <TextField
                id='street-name'
                label='Street Name'
                value={locationData.streetName}
                InputProps={{
                  readOnly: true,
                }}
                variant='filled'
                fullWidth={true}
                disabled={true}
              />
            </div>
          </div>
          <div className='mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
            <div style={{ flex: '3 1 auto', marginTop: '1rem' }}>
              <TextField
                id='suburb'
                label='Suburb'
                value={locationData.suburb}
                InputProps={{
                  readOnly: true,
                }}
                variant='filled'
                fullWidth={true}
                disabled={true}
              />
            </div>
            <div>
              <TextField
                id='postcode'
                label='Postcode'
                value={locationData.postcode}
                InputProps={{
                  readOnly: true,
                }}
                variant='filled'
                fullWidth={true}
                disabled={true}
              />
            </div>
            <div>
              <TextField
                id='state'
                label='State'
                value={locationData.state}
                InputProps={{
                  readOnly: true,
                }}
                variant='filled'
                fullWidth={true}
                disabled={true}
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem', maxWidth: '24rem' }}>
            <TextField
              id='country'
              label='Country'
              value={locationData.country}
              InputProps={{
                readOnly: true,
              }}
              variant='filled'
              fullWidth={true}
              disabled={true}
            />
          </div>
        </div>
        <GoogleMap
          id='map'
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={latLngMemo}
          options={mapOptions}
          onClick={handleMapClick}
          onLoad={onMapLoad}
        >
          {locationData?.latLng && (
            <Marker
              key={`${locationData.latLng.lat}-${locationData.latLng.lng}`}
              position={{ lat: locationData.latLng.lat, lng: locationData.latLng.lng }}
            />
          )}
        </GoogleMap>
      </div>
    )
  }
}

// Bugged version that calls the hook usePlaceAutocomplete
// in a function called by useEffect

// import searchBoxStyles from 'styles/SearchBox.module.css'
// import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
// import { useCallback, useRef, useState, ChangeEvent, useMemo, useEffect } from 'react'
// import { LocationDataType } from 'types/location-type'
// import usePlacesAutocomplete, { getDetails, getGeocode, getLatLng } from 'use-places-autocomplete'
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from '@reach/combobox'
// import '@reach/combobox/styles.css'
// import TextField from '@material-ui/core/TextField'

// const libraries: ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[] = [
//   'places',
// ]
// const mapContainerStyle = {
//   width: '100%',
//   maxWidth: '1000px',
//   height: '400px',
// }
// const mapOptions = {}

// // Make sure this is not inside the component.
// // If it is, the use useMemo, right?
// // const center = {
// //   lat: -33.8688,
// //   lng: 151.2093,
// // }

// type propTypes = {
//   locationData: LocationDataType
//   setLocationData: (locationData: LocationDataType) => void
//   disabled: boolean
// }

// export default function AddressSetter({ locationData, setLocationData, disabled }: propTypes) {
//   const [loading, setLoading] = useState<boolean>(true)
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
//     libraries,
//   })

//   const [ACready, setACready] = useState<boolean | undefined>(undefined)
//   const [ACvalue, setACvalue] = useState<string | undefined>(undefined)
//   const [ACstatus, setACstatus] = useState<string | undefined>(undefined)
//   const [ACdata, setACdata] = useState<any | undefined>(undefined)
//   const [ACsetValue, setACsetValue] = useState<any | undefined>(undefined)
//   const [ACclearSuggestions, setACclearSuggestions] = useState<any | undefined>(undefined)

//   const mapRef = useRef<any | null>(null)
//   const onMapLoad = useCallback((map) => {
//     mapRef.current = map
//   }, [])

//   // This latLng reference is only updated when the location.latLng value
//   // actually changes. This is important for preventing the GoogleMap from
//   // rerendering every time the locationData is updated.
//   const latLngMemo = useMemo(() => {
//     return locationData.latLng
//   }, [locationData.latLng])

//   const panTo = useCallback(({ lat, lng }) => {
//     if (mapRef) {
//       mapRef.current?.panTo({ lat, lng })
//       mapRef.current?.setZoom(15)
//     }
//   }, [])

//   console.log(`Status from usePlaceAutocomplete: ${ACstatus}`)
//   console.log(`Data from usePlaceAutocomplete: `, ACdata)

//   // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

//   const handleMapClick = useCallback(async (e) => {
//     if (!disabled) {
//       try {
//         const results = await getGeocode({ location: { lat: e.latLng.lat(), lng: e.latLng.lng() } })
//         // const { lat, lng } = await getLatLng(result)
//         // We need to use a value returned from the function, can't just use the
//         // state object as it has not been updated yet, not until next render.
//         const newLocationDetails = await fetchAndSetDetails(results[0].place_id)
//         ACsetValue(newLocationDetails.formattedAddress, false)
//       } catch (error) {
//         console.log('😱 Error while fetching or setting place details: ', error)
//       }
//     }
//   }, [])

//   const handleSelect = async (address: string): Promise<void> => {
//     ACsetValue(address, false)
//     ACclearSuggestions()

//     try {
//       const results = await getGeocode({ address })
//       // const { lat, lng } = await getLatLng(result)
//       await fetchAndSetDetails(results[0].place_id)
//     } catch (error) {
//       console.log('😱 Error while fetching or setting place details: ', error)
//     }
//   }

//   const fetchAndSetDetails = async (placeID: string): Promise<LocationDataType> => {
//     const parameters = {
//       placeId: placeID,
//       fields: ['place_id', 'address_component', 'geometry', 'formatted_address'],
//     }
//     const newLocationData = await getDetails(parameters)
//     console.log(`Location data retrieved from Place Details API:`, newLocationData)
//     const latLng = {
//       lat: newLocationData.geometry.location.lat(),
//       lng: newLocationData.geometry.location.lng(),
//     }
//     panTo(latLng)

//     type AddressComponent = {
//       long_name: string
//       short_name: string
//       types: Array<string>
//     }
//     const streetNumberObjs: Array<AddressComponent> = newLocationData.address_components.filter(
//       (obj: AddressComponent) => obj.types.includes('street_number'),
//     )
//     const streetNameObjs: Array<AddressComponent> = newLocationData.address_components.filter(
//       (obj: AddressComponent) => obj.types.includes('street_name') || obj.types.includes('route'),
//     )
//     const suburbObjs: Array<AddressComponent> = newLocationData.address_components.filter(
//       (obj: AddressComponent) => obj.types.includes('locality'),
//     )
//     const postcodeObjs: Array<AddressComponent> = newLocationData.address_components.filter(
//       (obj: AddressComponent) => obj.types.includes('postal_code'),
//     )
//     const stateObjs: Array<AddressComponent> = newLocationData.address_components.filter(
//       (obj: AddressComponent) => obj.types.includes('administrative_area_level_1'),
//     )
//     const countryObjs: Array<AddressComponent> = newLocationData.address_components.filter(
//       (obj: AddressComponent) => obj.types.includes('country'),
//     )

//     const newLocationDetails = {
//       placeID: placeID,
//       latLng: latLng,
//       streetNumber: streetNumberObjs.length > 0 ? streetNumberObjs[0].short_name : '',
//       streetName: streetNameObjs.length > 0 ? streetNameObjs[0].short_name : '',
//       suburb: suburbObjs.length > 0 ? suburbObjs[0].short_name : '',
//       postcode: postcodeObjs.length > 0 ? postcodeObjs[0].short_name : '',
//       state: stateObjs.length > 0 ? stateObjs[0].short_name : '',
//       country: countryObjs.length > 0 ? countryObjs[0].long_name : '',
//       formattedAddress: newLocationData.formatted_address ?? '',
//     }
//     setLocationData(newLocationDetails)
//     return newLocationDetails
//   }

//   const renderSuggestions = (): JSX.Element => {
//     const suggestions = ACdata.map(({ place_id, description }: any) => (
//       <ComboboxOption key={place_id} value={description} />
//     ))
//     return (
//       <>
//         {suggestions}
//         <li className="logo">
//           <img
//             src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
//             alt="Powered by Google"
//           />
//         </li>
//       </>
//     )
//   }

//   const loadPlacesAutocomplete = async () => {
//     setLoading(true)

//     const {
//       ready,
//       value,
//       suggestions: { status, data },
//       setValue,
//       clearSuggestions,
//     } = usePlacesAutocomplete({
//       requestOptions: {
//         location: { lat: () => locationData.latLng.lat, lng: () => locationData.latLng.lng },
//         radius: 100 * 1000,
//       },
//     })
//     setACready(ready)
//     setACvalue(value)
//     setACstatus(status)
//     setACdata(data)
//     setACsetValue(setValue)
//     setACclearSuggestions(clearSuggestions)

//     setLoading(false)
//   }

//   useEffect(() => {
//     // loadPlacesAutocomplete()
//   }, [])

//   if (loadError) return <div>An error occurred will loading the map.</div>
//   if (!isLoaded || !ACready || loading) return <div>Map loading...</div>
//   return (
//     <div>
//       <div className="mb-6">
//         Search for your venue's address or click on the map to place a marker at your venue.
//       </div>
//       <div>
//         <div className={searchBoxStyles.searchBox}>
//           <Combobox onSelect={handleSelect}>
//             <ComboboxInput
//               style={{
//                 width: '100%',
//                 padding: '0.4rem',
//                 borderRadius: '0.4rem',
//                 border: 'solid black 1px',
//               }}
//               value={ACvalue}
//               onChange={(e: ChangeEvent<HTMLInputElement>): void => {
//                 ACsetValue(e.target.value)
//               }}
//               disabled={!ACready || disabled}
//               placeholder="Search location..."
//             />
//             <ComboboxPopover portal={false}>
//               <ComboboxList>{status === 'OK' && renderSuggestions()}</ComboboxList>
//             </ComboboxPopover>
//           </Combobox>
//         </div>
//       </div>
//       <div className="pt-16 pb-12">
//         <div className="flex justify-between">
//           <div style={{ flex: '1 1 auto' }}>
//             <TextField
//               id="street-number"
//               label="Street Number"
//               value={locationData.streetNumber}
//               InputProps={{
//                 readOnly: true,
//               }}
//               variant="filled"
//               fullWidth={true}
//               disabled={true}
//             />
//           </div>
//           <div style={{ marginLeft: '1rem', flex: '3 1 auto' }}>
//             <TextField
//               id="street-name"
//               label="Street Name"
//               value={locationData.streetName}
//               InputProps={{
//                 readOnly: true,
//               }}
//               variant="filled"
//               fullWidth={true}
//               disabled={true}
//             />
//           </div>
//         </div>
//         <div style={{ display: 'flex' }}>
//           <div style={{ flex: '3 1 auto', marginTop: '1rem' }}>
//             <TextField
//               id="suburb"
//               label="Suburb"
//               value={locationData.suburb}
//               InputProps={{
//                 readOnly: true,
//               }}
//               variant="filled"
//               fullWidth={true}
//               disabled={true}
//             />
//           </div>
//           <div style={{ marginLeft: '1rem', flex: '1 1 auto', marginTop: '1rem' }}>
//             <TextField
//               id="postcode"
//               label="Postcode"
//               value={locationData.postcode}
//               InputProps={{
//                 readOnly: true,
//               }}
//               variant="filled"
//               fullWidth={true}
//               disabled={true}
//             />
//           </div>
//           <div style={{ marginLeft: '1rem', flex: '1 1 auto', marginTop: '1rem' }}>
//             <TextField
//               id="state"
//               label="State"
//               value={locationData.state}
//               InputProps={{
//                 readOnly: true,
//               }}
//               variant="filled"
//               fullWidth={true}
//               disabled={true}
//             />
//           </div>
//         </div>
//         <div style={{ marginTop: '1rem', maxWidth: '24rem' }}>
//           <TextField
//             id="country"
//             label="Country"
//             value={locationData.country}
//             InputProps={{
//               readOnly: true,
//             }}
//             variant="filled"
//             fullWidth={true}
//             disabled={true}
//           />
//         </div>
//       </div>
//       <GoogleMap
//         id="map"
//         mapContainerStyle={mapContainerStyle}
//         zoom={10}
//         center={latLngMemo}
//         options={mapOptions}
//         onClick={handleMapClick}
//         onLoad={onMapLoad}
//       >
//         {locationData?.latLng && (
//           <Marker
//             key={`${locationData.latLng.lat}-${locationData.latLng.lng}`}
//             position={{ lat: locationData.latLng.lat, lng: locationData.latLng.lng }}
//           />
//         )}
//       </GoogleMap>
//     </div>
//   )
// }
