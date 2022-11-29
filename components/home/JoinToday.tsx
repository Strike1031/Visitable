import React from 'react'
import styles from 'styles/Home.module.css'
import Grid from '@material-ui/core/Grid'
import { useRouter } from 'next/router'

export interface JoinTodayProps {
  className?: string
}

export const JoinToday: React.FC<JoinTodayProps> = () => {
  const router = useRouter()
  return (
    <section>
      <div className={styles['container']}>
        <Grid container spacing={3} style={{ justifyContent: 'center' }}>
          <Grid item sm={12} md={6} className="flex-col flex">
            <p className="text-2xl md:text-4xl md:mb-2 lg:text-5xl">Matching Technology</p>
            <p className="text-sm md:text-2xl">
            Your Social Inclusion Platform
            </p>
            <p className="text-sm md:text-lg">
            Tickable helps share your workspace accessibility to people living with disability searching for employment opportunities.
            </p>
            <button className={styles['button']} onClick={() => router.push('/signup')}>
              Join Today
            </button>
            {/* <button className={styles['button']}>Read More</button> */}
          </Grid>
          <Grid item xs={8} md={2}>
            <img src="iphone_1.png" />
          </Grid>
          <Grid item xs={8} md={2}>
            <img src="iphone_2.png" />
          </Grid>
          <Grid item xs={8} md={2}>
            <img src="iphone_3.png" />
          </Grid>
        </Grid>
      </div>
    </section>
  )
}
