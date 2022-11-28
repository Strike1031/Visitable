import React, { useState } from 'react'
import { listings } from 'components/mock-listings'
import { Listings } from 'components/Listings'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { VenuesConst } from '../constants/venues.const'
import { Regions } from '../constants/ListingFilterOptions'
import { VisitorLayout } from 'components/VisitorLayout'

export default function Page() {
  const [region, setRegion] = useState<string | undefined>(undefined)
  console.log({ region })

  return (
    <VisitorLayout>
      <div style={{ padding: '0 100px' }}>
        <div style={{ marginLeft: '20px' }}>
          <h1 style={{ fontSize: '56px' }}>Hotels</h1>
          <Select
            style={{ width: 200, margin: '5px' }}
            value={region}
            onChange={(e) => setRegion(e.target.value as string)}
            displayEmpty
          >
            <MenuItem value={undefined}>{VenuesConst.RegionsPlaceHolder}</MenuItem>
            {Regions.map((op) => (
              <MenuItem value={op.value}>{op.label}</MenuItem>
            ))}
          </Select>
        </div>
        <Listings listings={listings} />
      </div>
    </VisitorLayout>
  )
}
