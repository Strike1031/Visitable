import { AccountType } from "./account-type";

export type BusinessType = {
  accountType: AccountType // At runtime this should always be "business"
  uid: string
  bid: string
  name: string
  website: string | null
  contactName: string
  contactEmail: string
  contactNumber: string
  venues: string[]
}