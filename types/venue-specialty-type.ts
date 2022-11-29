export enum VenueSpecialtyEnum {
  restaurant = 'Office',
  cafe = 'Retail ',
  bar = 'Hospitality',
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
    categoryLabel: "Office",
    selectLabel: "Office"
  },
  cafe: {
    categoryLabel: "Retail",
    selectLabel: "Retail"
  },
  bar: {
    categoryLabel: "Hospitality",
    selectLabel: "Hospitality"
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