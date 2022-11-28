import styles from 'styles/VenueCard.module.css'
import buttonStyles from 'styles/Buttons.module.css'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

type PropTypes = {
  uid: string
  vid: string
  title: string
  address: string
  imageUrl: string
  accessScore?: number // As a decimal
  distance?: number // In metres
  duration?: number // In seconds
}

export default function VenueCard(props: PropTypes) {
  const router = useRouter()
  return (
    <div className="mb-10 px-6 py-8 flex flex-col lg:flex-row bg-white shadow-xl rounded-xl">
      <div
        className="w-full lg:w-1/2 h-52 bg-cover"
        style={{
          backgroundImage: `url(${props.imageUrl})`,
        }}
      />
      <div className="lg:w-1/2 mt-5 lg:ml-8 lg:mt-0 flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="text-3xl">{props.title}</div>
          <div className="mt-2 text-large">{props.address}</div>
          {props.accessScore !== undefined && (
            <Fragment>
              <div className="mt-2 text-large">{`Accessibility score: ${Math.round(
                props.accessScore * 100,
              )}%`}</div>
              <div className="text-sm text-gray-400">{`Calculated based on your selected accessibility preferences.`}</div>
            </Fragment>
          )}
          {props.distance !== undefined && (
            <Fragment>
              <div className="mt-2 text-large">{`Distance: ${
                Math.round(props.distance / 100) / 10
              } km`}</div>
              <div className="text-sm text-gray-400">{`Distance from your selected location.`}</div>
            </Fragment>
          )}
        </div>
        <div className="mt-12 flex flex-col md:flex-row md:justify-end">
          <button
            className={buttonStyles.venueCardButton}
            onClick={() => {
              if (props.uid) {
                router.push({
                  pathname: '/venueListing/[uid]/[vid]',
                  query: { uid: props.uid, vid: props.vid },
                })
              } else {
                router.push('/venueListing')
              }
            }}
          >
            Visit
          </button>
        </div>
      </div>
    </div>
  )
}
