enum directions {
    lat = "lat",
    lng = "lng"
  }
  export type LatLngLiteral = {
    [key in directions]: number
  }
  
  export type LocationDataType = {
    placeID: string
    latLng: LatLngLiteral
    streetNumber: string
    streetName: string
    suburb: string
    postcode: string
    state: string
    country: string
    formattedAddress: string
  }

export const defaultLocationData: LocationDataType = {
    placeID: "",
    latLng: {
        lat: -33.8688,
        lng: 151.2093,
      },
    streetNumber: "",
    streetName: "",
    suburb: "",
    postcode: "",
    state: "",
    country: "",
    formattedAddress: "",
}