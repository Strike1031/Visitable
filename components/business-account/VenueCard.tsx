import styles from 'styles/VenueCard.module.css'
import buttonStyles from 'styles/Buttons.module.css'
import { useRouter } from 'next/router'

type PropTypes = {
  uid: string
  vid: string
  title: string
  address: string
  imageUrl: string
  toVenueDetails: () => void
}

export default function VenueCard(props: PropTypes) {
  const router = useRouter()
  return (
    <div className='mt-10 px-6 py-8 flex flex-col lg:flex-row bg-white shadow-xl rounded-xl flex-grow'>
      <div
        className='w-full lg:w-1/2 h-52 bg-cover'
        style={{
          backgroundImage: `url(${props.imageUrl})`,
        }}
      />
      <div className='lg:w-1/2 mt-5 lg:ml-8 lg:mt-0 flex flex-col justify-between'>
        <div className='flex flex-col'>
          <div className='text-3xl'>{props.title}</div>
          <div className='text-large'>{props.address}</div>
        </div>
        <div className='mt-12 flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-end'>
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
            View Live Page
          </button>
          <button
            className={buttonStyles.venueCardButton}
            onClick={() => {
              props.toVenueDetails()
            }}
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  )
}
