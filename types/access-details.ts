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
    queryGuest: ' Do you offer fully remote work from home 5 days a week?',
    queryBusiness: 'Your company accessibility features ',
  },
  '1': {
    display: 'Automated door',
    queryGuest: 'Does your workspace have level entry? ',
    queryBusiness: 'Help us understand more about your company accessibility offerings.',
  },
  '2': {
    display:
      'Alternative travel path if there are stairs to a key public area (lift, stairlift, ramp)',
    queryGuest: 'Are there any stairs inside your workspace that restrict total access to an employee?',
    queryBusiness:
      'Needs changing to …',
  },
  '3': {
    display: 'Accessible bathroom',
    queryGuest: '  Does your workspace (or building) have at least one accessible bathroom? ',
    queryBusiness: 'Accessibility at your workplace',
  },
  '4': {
    display: 'Clear floor space for a wheelchair, pram or walking frame to turn',
    queryGuest:
      'Is there enough room throughout the office and between desks to manoeuvre a wheelchair or walking frame?',
    queryBusiness:
      'Help us understand more about what it’s like to get around your company.',
  },
  '5': {
    display: 'Outdoor seating',
    queryGuest: 'Can your company provide specialist equipment if required (monitors, desks, keyboards etc) ?',
    queryBusiness: 'Is there outdoor seating?',
  },
  '6': {
    display: 'Low/average height tables',
    queryGuest: 'Is there accessible parking spaces within 50m of the office?',
    queryBusiness: 'Are there low/average height tables?',
  },
  '7': {
    display: 'Accessible parking within 50 metres',
    queryGuest: 'Does your workspace have tactile wayfinding such as braille or raised lettering throughout the building?',
    queryBusiness: 'Is there accessible parking within 50 metres of the venue?',
  },
  '8': {
    display:
      'Tactile wayfinding for people with vision impairment, such as raised lettering or braille',
    queryGuest:
      'Do you have a quiet space / zone in your workspace?',
    queryBusiness:
      'Is there tactile wayfinding for people with vision impairment, such as raised lettering or braille?',
  },
  '9': {
    display: 'Quiet spaces',
    queryGuest: 'Has your company hired people with personal accessibility expectations before?',
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
