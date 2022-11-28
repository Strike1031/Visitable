import React from 'react'
import classNames from 'classnames/bind'
import styles from 'styles/Listings.module.css'

const cx = classNames.bind(styles)

import { Listing } from 'types/listing'
import { ListingCard } from './ListingCard'

export interface ListingsProps {
  listings: Listing[]
}
export const Listings: React.FC<ListingsProps> = ({ listings }) => {
  return (
    <section className={cx('listings-container')}>
      {listings.map((l, i) => (
        <ListingCard className={cx('card')} listing={l} key={i} />
      ))}
    </section>
  )
}
