import React from 'react'
import styles from 'styles/Home.module.css'
import Grid from '@material-ui/core/Grid'

export interface StayTunedProps {
  className?: string
}

export const StayTuned: React.FC<StayTunedProps> = () => {
  return (
    <section className={styles['stay-tuned']}>
      <div className={styles['div1']}>
        <p className={styles['p1']}>Stay Tuned</p>
        <div className={styles['enquiry-division'] + ' ' + styles['bg-color-primary']}></div>

        <p className={styles['p2']}>Want to hear updates about Visitable or have any</p>
        <p className={styles['p2']}>feedback on accessible places?</p>
      </div>
      <div className={styles['div2']}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <input className={styles['enquiry-input']} placeholder="Name" />
            <input className={styles['enquiry-input']} placeholder="Email" />
            <input className={styles['enquiry-input']} placeholder="Subject" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <textarea
              draggable={false}
              className={styles['enquiry-text-area']}
              placeholder="Message"
            />
          </Grid>
        </Grid>
      </div>
      <button className={styles['button'] + ' ' + styles['center']}>Send</button>
    </section>
  )
}
