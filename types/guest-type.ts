import { AccessFormType } from "./access-type";
import { LocationDataType } from "./location-type";
import {AccountType} from 'types/account-type'

export type GuestType = {
  accountType: AccountType // At runtime this should always be "guest"
  uid: string
  id: string
  firstName: string
  lastName: string
  email: string
  DOB: string // YYYY-MM-DD
  locationData: LocationDataType
  mobilePhone: string
  disabilityProfile: AccessFormType
}
