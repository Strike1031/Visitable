import React from 'react'
import { VenueSpecialtyEnum } from 'types/venue-specialty-type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUtensils, faWineGlass, faHotel } from '@fortawesome/free-solid-svg-icons'

export interface BusinessTypeIconProps {
  businessType: VenueSpecialtyEnum
  className: string
}
export const BusinessTypeIcon: React.FC<BusinessTypeIconProps> = ({ businessType, className }) => {
  switch (businessType) {
    case VenueSpecialtyEnum.restaurant:
      return <FontAwesomeIcon className={className} icon={faUtensils} />
    case VenueSpecialtyEnum.cafe:
      return <FontAwesomeIcon className={className} icon={faCoffee} />
    case VenueSpecialtyEnum.bar:
      return <FontAwesomeIcon className={className} icon={faWineGlass} />
    default:
      return <FontAwesomeIcon className={className} icon={faWineGlass} />
  }
}
