import { defaultAccessForm } from 'types/access-details'
import { defaultVenueSpecialtiesForm, VenueSpecialtyEnum } from 'types/venue-specialty-type'
import { VenueType } from 'types/venue-type'

export const defaultDataVenue: VenueType = {
  uid: '',
  vid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  name: '',
  hours: '',
  phone: '',
  email: '',
  description: '',
  specialties: defaultVenueSpecialtiesForm,
  coverPhoto: 'https://valyoos.s3.ap-southeast-2.amazonaws.com/placeholder-image.jpg',
  locationData: {
    placeID: '',
    latLng: {
      lat: -33.8688,
      lng: 151.2093,
    },
    streetNumber: '',
    streetName: '',
    suburb: '',
    state: '',
    postcode: '',
    country: '',
    formattedAddress: '',
  },
  accessibilityFeatures: defaultAccessForm,
  accessImages: [],
}

export const dummyVenuesData: VenueType[] = [
  {
    uid: '1',
    vid: '3d2eeb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    name: 'Miso Japanese Teishoku Restaurant',
    hours: 'Mon - Fri 6am until late\nSat - Sun 7am until 12pm',
    phone: '(02) 9331 4800',
    email: 'hello@stjacques.com',
    description:
      'The little red bistro on Pitt Street in Redfern has been serving its loyal clientele for the past nine years a beautiful selection of unpretentious, honest delicacies. Bistro St Jacques is another entry in the “timeless” French bistro experience with lighter finishes to the traditional classic French techniques. Their Southern French-inspired menu means less butter and cream and more olive oil, seafood, and fresh vegetables.',
    specialties: {
      ...defaultVenueSpecialtiesForm,
      restaurant: true,
    },
    coverPhoto: 'https://valyoos.s3.ap-southeast-2.amazonaws.com/placeholder-image.jpg',
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
    accessibilityFeatures: defaultAccessForm,
    accessImages: [
      {
        fileId: 'spoonypic1',
        fileName: 'spoonypic1.jpg',
        fileType: 'image/jpeg',
        title: 'Latte',
        description: 'A light roast coffee.',
      },
      {
        fileId: 'spoonypic4',
        fileName: 'spoonypic4.jpg',
        fileType: 'image/jpeg',
        title: 'Coffee',
        description: 'A light roast coffee.',
      },
      {
        fileId: 'spoonyentrance',
        fileName: 'spoonyentrance.jpg',
        fileType: 'image/jpeg',
        title: 'Storefront',
        description: 'Welcome to the store.',
      },
    ],
  },
  {
    uid: '1',
    vid: '5e1eeb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    name: 'Old Garden Kaffee',
    hours: 'Mon - Fri: 9am-7pm\nSat - Sun: 7am - 12pm',
    phone: '(02) 9331 4800',
    email: 'hello@gardenkaffee.com',
    description:
      'The little red bistro on Pitt Street in Redfern has been serving its loyal clientele for the past nine years a beautiful selection of unpretentious, honest delicacies. Bistro St Jacques is another entry in the “timeless” French bistro experience with lighter finishes to the traditional classic French techniques. Their Southern French-inspired menu means less butter and cream and more olive oil, seafood, and fresh vegetables.',
    specialties: { ...defaultVenueSpecialtiesForm, restaurant: true, cafe: true },
    coverPhoto: 'https://valyoos.s3.ap-southeast-2.amazonaws.com/placeholder-image.jpg',
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
    },
    accessibilityFeatures: defaultAccessForm,
    accessImages: [
      {
        fileId: 'spoonypic1',
        fileName: 'spoonypic1.jpg',
        fileType: 'image/jpeg',
        title: 'Latte',
        description: 'Dark and aromatic.',
      },
      {
        fileId: 'spoonypic4',
        fileName: 'spoonypic4.jpg',
        fileType: 'image/jpeg',
        title: 'Coffee',
        description: 'Freshly ground beans.',
      },
      {
        fileId: 'spoonyentrance',
        fileName: 'spoonyentrance.jpg',
        fileType: 'image/jpeg',
        title: 'Storefront',
        description: 'Newly renovated.',
      },
    ],
  },
]
