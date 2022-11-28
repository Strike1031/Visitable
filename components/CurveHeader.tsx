import React from 'react'
import styles from 'styles/CurveHeader.module.css'

export interface CurveHeaderProps {}
const CurveHeader: React.FC<CurveHeaderProps> = ({ children }) => {
  return (
    <section className={styles.component}>
      <div className={styles.container}>{children}</div>
      <svg viewBox="0 0 348 100" preserveAspectRatio="none" className={styles.bg}>
        <path
          d="M0.75644 0C35.3374 59.7801 99.9718 100 174 100C248.028 100 312.663 59.7801 347.244 0H0.75644Z"
          fill="#68CBF6"
        />
      </svg>
    </section>
  )
}

export default CurveHeader
