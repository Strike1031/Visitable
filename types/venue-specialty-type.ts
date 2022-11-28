export enum VenueSpecialtyEnum {
  restaurant = 'Restaurant',
  cafe = 'Cafe',
  bar = 'Bar',
  // drink = 'Drink',
  // fastFood = 'Fast Food',
  // food = 'Food',
  // hotel = 'Hotel',
  // sport = 'Sport',
  // other = 'Other',
}


type VenuesSpecialtiesDetailsType = {
  [key: string]: {
    categoryLabel: string;
    selectLabel: string
  }
}

export const venueSpecialtiesDetails: VenuesSpecialtiesDetailsType = {
  restaurant: {
    categoryLabel: "Restaurants",
    selectLabel: "Restaurant"
  },
  cafe: {
    categoryLabel: "Cafés",
    selectLabel: "Café"
  },
  bar: {
    categoryLabel: "Bars",
    selectLabel: "Bar"
  },
}

export type VenueSpecialtiesType = {
  [key: string]: boolean
}

export const defaultVenueSpecialtiesForm: VenueSpecialtiesType = {
  restaurant: false,
  cafe: false,
  bar: false
}