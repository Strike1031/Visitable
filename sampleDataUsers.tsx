// See "/types/disability-types.enum.ts" for DisabilityType enum

import { defaultAccessForm } from './types/access-details'
import { GuestType } from './types/guest-type'

export const defaultDataGuest: GuestType = {
  accountType: 'guest',
  uid: '',
  id: '1',
  firstName: '',
  lastName: '',
  email: '',
  DOB: '',
  locationData: {
    placeID: 'ChIJg0Ar1MaxEmsRs0BDCG7LgVU',
    latLng: {
      lat: -33.8688,
      lng: 151.2093,
    },
    streetNumber: '14',
    streetName: 'Ebsworth St',
    suburb: 'Zetland',
    state: 'NSW',
    postcode: '2017',
    country: 'Australia',
    formattedAddress: '14 Ebsworth St, Zetland NSW, Australia',
  },
  mobilePhone: '',
  disabilityProfile: defaultAccessForm,
}

export const dummyDataUsers: GuestType[] = [
  {
    accountType: 'guest',
    uid: '',
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    DOB: '1948-07-23',
    locationData: {
      placeID: 'ChIJqxUNJD2uEmsR6zYX3Q7QuGQ',
      latLng: {
        lat: -33.8688,
        lng: 151.2093,
      },
      streetNumber: '382',
      streetName: 'Pitt St',
      suburb: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'Australia',
      formattedAddress: '382 Pitt St, Sydney NSW 2000, Australia',
    },    mobilePhone: '+61 429 789 730',
    disabilityProfile: {
      '0': true,
      '1': true,
      '2': false,
      '3': false,
      '4': true,
      '5': false,
    },
  },
  {
    accountType: 'guest',
    uid: '',
    id: '2',
    firstName: 'Jane',
    lastName: 'Citizen',
    email: 'johndoe@example.com',
    DOB: '1948-07-23',
    locationData: {
      placeID: 'ChIJqxUNJD2uEmsR6zYX3Q7QuGQ',
      latLng: {
        lat: -33.8688,
        lng: 151.2093,
      },
      streetNumber: '382',
      streetName: 'Pitt St',
      suburb: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'Australia',
      formattedAddress: '382 Pitt St, Sydney NSW 2000, Australia',
    },    mobilePhone: '+61 429 789 730',
    disabilityProfile: {
      '0': true,
      '1': true,
      '2': false,
      '3': false,
      '4': true,
      '5': false,
    },
  },
]
