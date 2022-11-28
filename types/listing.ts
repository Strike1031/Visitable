import { VenueSpecialtyEnum } from './venue-specialty-type'

export type ListingDetail = {
  id: string
  compliance_1980: boolean
  multiple_WC_Bathroom: boolean
  accesibleParking: boolean
  accessible_toilet_image: boolean
  business: string
}

export type Listing = {
  id: string
  name: string
  img: string
  address: string
  businessSpecialty: VenueSpecialtyEnum
}
