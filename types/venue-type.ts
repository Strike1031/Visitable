import { AccessFormType } from "./access-type";
import { ImageType } from "./image-type";
import { LocationDataType } from "./location-type";
import { VenueSpecialtiesType, VenueSpecialtyEnum } from "./venue-specialty-type";

export interface VenueType {
  uid: string // Reference to the business that owns this venue
  vid: string // Venue ID
  // General info
  name: string
  hours: string
  phone: string
  email: string
  description: string
  specialties: VenueSpecialtiesType
  coverPhoto: string
  // Location
  locationData: LocationDataType
  // Access features
  accessibilityFeatures: AccessFormType
  accessImages: ImageType[] // Photos of the venue's accessibility features
}
