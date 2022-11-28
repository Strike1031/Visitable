import React from 'react'
import styles from 'styles/Home.module.css'
import Grid from '@material-ui/core/Grid'
import { useRouter } from 'next/router'

export interface FindUsProps {
  className?: string
}

export const FindUs: React.FC<FindUsProps> = () => {
  const router = useRouter()
  return (
    <section>
      <div className={styles['container']}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6} className="flex-col flex">
            <p className="mb-2 md:mb-4 text-2xl md:text-4xl lg:text-5xl">Match on Valyoo. <br />Not just Salary.</p>
            <p className="text-sm md:text-lg lg:text-xl">Visitable uses matching technology to help you discover a workplace with more.</p>
            <p className="text-sm md:text-lg lg:text-xl">
              Find out if your expectations can be matched across the likes of ESOP, s
              continuous deployment, team social outings, working from home, microservice architecture, language exposure and so much more.
            </p>
            {/* <button className={styles['button']}>Read More</button> */}
          </Grid>
          <Grid item sm={12} md={6}>
            <div>
              <img alt="" className="rounded-3xl" src="glass-logo.webp" />
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  )
}
