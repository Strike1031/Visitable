import { ReactNode } from 'react'

type Option = {
  value: string
  label: string | ReactNode
}

type Options = Option[]

export const Regions: Options = [
  { value: 'NSW', label: 'NSW' },
  { value: 'VIC', label: 'VIC' },
  { value: 'ACT', label: 'ACT' },
  { value: 'WA', label: 'WA' },
  { value: 'QLD', label: 'QLD' },
  { value: 'SA', label: 'SA' },
  { value: 'NT', label: 'NT' },
  { value: 'TAS', label: 'TAS' },
]

export const Categories: Options = [
  { value: 'cafe', label: 'cafe' },
  { value: 'drink', label: 'drink' },
  { value: 'food', label: 'food' },
]