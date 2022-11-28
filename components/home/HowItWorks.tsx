import React from 'react'
import styles from 'styles/Home.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, A11y, Autoplay } from 'swiper'

export interface HowItWorksProps {
  className?: string
}

// SwiperCore.use([Pagination, A11y, Autoplay])

export const HowItWorks: React.FC<HowItWorksProps> = () => {
  return (
    <section>
      <div id="how-to-container" className={styles['container']}>
        <p className="text-center mb-2 md:mb-4 text-2xl md:text-4xl lg:text-5xl">
          A smarter job board for...
        </p>

          <img
          id="how-to-image"
            alt="banner"
            src="./banner-2.jpg" 
          />

      </div>
    </section>
  )
}
const data = [
  {
    title: 'Search Places',
    description:
      'Search through our listings on Visitable for great accessible venues and hotels or look out for our Tick logo as you discover places online. We’re changing the way business operates within NSW & ACT by introducing our accessibility requirement matching technology. When you see the Tick it will help you access the information that’s important to you.',
    img: 'search-a-place.png',
  },
  {
    title: 'Rate and Review',
    description:
      "As a Visitable personal user you'll be given the option to also rate and review accessibility after you've visited the location. Help inform others based on your own experience, while validating the business' facilities. Start conversations with business owners and affect real change through this community lead initiative.",
    img: 'rate-and-review.png',
  },
  {
    title: 'Create a Profile',
    description:
      'Join Visitable as a personal user to discover accessibility information catered to your personal needs. We understand accessibility requirements aren’t universal which is we match your individual needs and score them against locations across NSW & ACT. Simple to set up, easy to use and free for personal users, a Visitable profile gives you access to tailored information on a number of hospitality and accommodation partner websites.',
    img: 'create-a-profile.png',
  },
]
