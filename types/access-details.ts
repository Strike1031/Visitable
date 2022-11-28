import { AccessFormType, AccessDetailsType } from './access-type'

export enum AccessibilityNeeds {
  wheelchair = 'Wheelchair',
  infants = 'Infants',
  vision = 'Blindness or vision impairment',
  hearing = 'Deafness or hard of hearing',
  mental = 'Mental health conditions',
  intellectual = 'Intellectual disability',
}

// Keys are strings to preserve order.
export const accessDetails: AccessDetailsType = {
  '0': {
    display: 'Clear travel path (flat and un-obstructed) through entrance',
    queryGuest: 'Will you need a clear travel path (flat and un-obstructed) through an entrance?',
    queryBusiness: 'Is there a clear travel path (flat and un-obstructed) through an entrance?',
  },
  '1': {
    display: 'Automated door',
    queryGuest: 'Would you prefer the venue to have an automated door?',
    queryBusiness: 'Is there an automated door?',
  },
  '2': {
    display:
      'Alternative travel path if there are stairs to a key public area (lift, stairlift, ramp)',
    queryGuest: 'Are you comfortable using chairlifts or lifts at the venue if required?',
    queryBusiness:
      'Is there an alternative travel path if there are stairs to a key public area (lift, stairlift, ramp)?',
  },
  '3': {
    display: 'Accessible bathroom',
    queryGuest: 'Does the venue need to have an accessible bathroom?',
    queryBusiness: 'Is there an accessible bathroom?',
  },
  '4': {
    display: 'Clear floor space for a wheelchair, pram or walking frame to turn',
    queryGuest:
      'Do you require enough clear floor space to turn around a wheelchair, pram or walking frame in the venue?',
    queryBusiness:
      'Is there enough clear floor space for a wheelchair, pram or walking frame to turn?',
  },
  '5': {
    display: 'Outdoor seating',
    queryGuest: 'Would you prefer venues with outdoor seating?',
    queryBusiness: 'Is there outdoor seating?',
  },
  '6': {
    display: 'Low/average height tables',
    queryGuest: 'Do you require the venue to have both low and high tables?',
    queryBusiness: 'Are there low/average height tables?',
  },
  '7': {
    display: 'Accessible parking within 50 metres',
    queryGuest: 'Would you prefer accessible parking within 50 metres of the venue?',
    queryBusiness: 'Is there accessible parking within 50 metres of the venue?',
  },
  '8': {
    display:
      'Tactile wayfinding for people with vision impairment, such as raised lettering or braille',
    queryGuest:
      'Do you require venues to have tactile wayfinding provisions such as braille menus or raised lettering?',
    queryBusiness:
      'Is there tactile wayfinding for people with vision impairment, such as raised lettering or braille?',
  },
  '9': {
    display: 'Quiet spaces',
    queryGuest: 'Would you prefer a quiter space at the venue?',
    queryBusiness:
      'Do you have a quiet space (quieter for people who are hearing impaired or people with autism)?',
  },
  // "0": {
  //   display: "Level entry access to the venue",
  //   queryGuest: "Do you require level entry to a venue when you visit?",
  //   queryBusiness: "Does this venue have level entry access to the venue (no stairs to get through the door)?"
  // },
  // "1": {
  //   display: "At least one dedicated wheelchair accessible bathroom",
  //   queryGuest: "Do you only ever want to visit venues with at least one accessible toilet facility?",
  //   queryBusiness: "Does this venue have at least one dedicated wheelchair accessible bathroom?"
  // },
  // "2": {
  //   display: "Accessible parking within 50m of the venue",
  //   queryGuest: "Would you prefer to visit venues located within 50m of accessible parking?",
  //   queryBusiness: "Does this venue have accessible parking within 50m of the venue?"
  // },
  // "3": {
  //   display: "Outside seating",
  //   queryGuest: "Would you prefer a venue to have outside seating?",
  //   queryBusiness: "Does this venue have outside seating?"
  // },
  // "4": {
  //   display: "Low/average height tables and seating",
  //   queryGuest: "Do you require low/average height tables and seating?",
  //   queryBusiness: "Are there low/average height tables and seating?"
  // },
  // "5": {
  //   display: "Tactile wayfinding for people with vision impairment, such as raised lettering or braille",
  //   queryGuest: "Do you require tactile wayfinding for people with vision impairment, such as raised lettering or braille?",
  //   queryBusiness: "Does this venue have tactile wayfinding for people with vision impairment, such as raised lettering or braille?"
  // }
}

export const defaultAccessForm: AccessFormType = {
  '0': false,
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
  '6': false,
  '7': false,
  '8': false,
  '9': false,
}
