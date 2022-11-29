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
            <p className="mb-2 md:mb-4 text-2xl md:text-4xl lg:text-5xl">Find us locally.</p>
            <p className="text-sm md:text-lg lg:text-xl">Matching people with jobs</p>
            <p className="text-sm md:text-lg lg:text-xl">
              Tickable uses your personal preferences to help you discover perfect workplaces. <br/>
              Find job opportunities that meet your needs with our matching software. We work with companies to help them share accessibility information that's relevant to you. 
            </p>
            {/* <button className={styles['button']}>Read More</button> */}
          </Grid>
          <Grid item sm={12} md={6}>
            <div>
              <img alt="" className="rounded-3xl" src="https://assets-global.website-files.com/5ff621612284ed73d44c11f3/5ff621612284ed467c4c182d_5f19a3adb8b71dd520d53699_Blog-featured-images1.png" />
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  )
}
