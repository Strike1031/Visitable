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
            <p className="text-2xl md:text-4xl md:mb-2 lg:text-5xl">Evolve your job search</p>
            <p className="text-lg md:text-2xl">Use matching technology to find companies you’ll love to work with.</p>
            <p className="text-sm md:text-lg">
              Visitable matches engineers and developers with great companies based on what matters most to you, not just salary and location.
            </p>
            <button className={styles['button']} onClick={() => router.push('/signup')}>
              Find Jobs
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
