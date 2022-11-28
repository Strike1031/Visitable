import React from 'react'
import classNames from 'classnames/bind'
import styles from 'styles/Home.module.css'
import CurveHeader from 'components/CurveHeader'
const cx = classNames.bind(styles)

export interface IntroProps {
  className?: string
}
// className={styles['header-container']}
export const Intro: React.FC<IntroProps> = () => {
  return (
    <section className="text-center text-white">
      <div className="px-4 md:px-12 py-12 md:py-20 lg:py-28 bg-primary">
        <h1 className="text-2xl md:text-4xl md:mb-2 lg:text-5xl font-bold">Engineering jobs in Australia</h1>
        <p className="text-lg md:text-2xl">
          Visitable is a smarter way to find and match with engineering opportunities
        </p>
      </div>
      <CurveHeader />
    </section>
  )
}
