import React from 'react'
import classNames from 'classnames/bind'
import styles from 'styles/ListingCard.module.css'
const cx = classNames.bind(styles)
import { Listing } from 'types/listing'
import { BusinessTypeIcon } from './BusinessTypeIcon'

export interface ListingCardProps {
  className: string
  listing: Listing
}
export const ListingCard: React.FC<ListingCardProps> = ({ listing, className }) => {
  return (
    <div className={classNames(className, cx('card'))}>
      <img src={listing.img}></img>
      <div className={cx('box')}>
        <div className={cx('title', 'item')}>{listing.name}</div>
        <div className={cx('address', 'item')}>{listing.address}</div>
        <div className={cx('h-box')}>
          <div className={cx('icon-box', 'item')}>
            <BusinessTypeIcon className={cx('icon')} businessType={listing.businessSpecialty} />
          </div>
          <div className={cx('suitable', 'item')}>100% Suitable</div>
        </div>
      </div>
    </div>
  )
}
