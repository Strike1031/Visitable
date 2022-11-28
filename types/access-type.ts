export type AccessOptionType = {
  display: string
  queryGuest: string
  queryBusiness: string
}

export type AccessDetailsType = {
  [k: string]: AccessOptionType
  // "0": AccessOptionType
  // "1": AccessOptionType
  // "2": AccessOptionType
  // "3": AccessOptionType
  // "4": AccessOptionType
  // "5": AccessOptionType
}

export type AccessFormType = {
  [k: string]: boolean
  // "1": boolean
  // "2": boolean
  // "3": boolean
  // "4": boolean
  // "5": boolean
}
