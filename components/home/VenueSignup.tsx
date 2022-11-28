import React from 'react'
import styles from 'styles/Home.module.css'
import Grid from '@material-ui/core/Grid'
import { useRouter } from 'next/router'

export interface VenueSignupProps {
  className?: string
}

export const VenueSignup: React.FC<VenueSignupProps> = () => {
  const router = useRouter()
  return (
    <section>
      <div className={styles['container']}>
        <div className="flex justify-center items-center flex-col">
          <p className="text-center text-lg md:text-2xl lg:text-3xl font-bold">
            Join the movement and sign up today
          </p>
          <p className="text-sm md:text-lg lg:text-xl text-center my-2 lg:my-6 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto">
            We're trusted by HR and talent acquisition across Australia to showcase exactly what makes working at your company unique. Creating longer lasting employee journeys with more impact in your engineering teams.
          </p>
          <p className="text-sm md:text-lg lg:text-xl text-center my-2 lg:my-6 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto">
            Find candidates that match your values, culture and mission with a smarter approach to sourcing tech talent. Visitable helps attract new candidates to your pipeline through matching their expectations on much more than salary and location. 
          </p>
          <button className={styles['button']} onClick={() => router.push('/business')}>
            Company Sign Up
          </button>
          {/* <button className={styles['button']}>Read More</button> */}
        </div>
      </div>
    </section>
  )
}
