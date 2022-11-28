import { BusinessType } from './types/business-type'

export const defaultDataBusiness: BusinessType = {
  accountType: 'business',
  uid: '',
  bid: '1e6deb4d-3b7d-4bad-9bdd-2bedb79dcb6d',
  name: '',
  website: '',
  contactName: "",
  contactEmail: '',
  contactNumber: "",
  venues: [],
}

export const dummyBusinessData: BusinessType[] = [
  {
    accountType: 'business',
    uid: '1',
    bid: '4e8beb4d-3b7d-4bad-9bdd-2bedb79dcb6d',
    name: 'Bistro St Jacques',
    website: 'https://www.bistrostjacques.com.au/',
    contactName: "",
    contactEmail: '',
    contactNumber: "",  
    venues: ['3d2eeb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', "5e1eeb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"]
  },
]
