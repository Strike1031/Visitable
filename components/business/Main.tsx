import React from 'react'
import classNames from 'classnames/bind'
import styles from 'styles/Business.module.css'
const cx = classNames.bind(styles)

export interface MainProps {
  className?: string
}

export const Main: React.FC<MainProps> = () => {
  return (
    <>
      <div className="bg-primary flex justify-center">
        <div className={cx('main-container')}>
          <div className={cx('main-text-1', 'text-white')}>Add Your Business</div>
          <div className={cx('main-text-2', 'text-white')}>
            Support change for people with disability and older people
          </div>
          <div className={cx('main-text-3', 'text-white')}>
            Adding your business to Visitable can change the world for people in ways you’d never
            expect
          </div>
          {/* <div>
            <button
              style={{ marginRight: '8px' }}
              className={cx('primary-button', 'primary-button-hover')}
            >
              Subcribe
            </button>
            <button className={cx('primary-button', 'primary-button-hover')}>Questions?</button>
          </div> */}
        </div>
      </div>
      {/* <div className={cx('bg-color-white')}>
        <svg className={cx('bg-color-primary')} viewBox="0 0 2200 114.5">
          <path
            fill="#fff"
            d="M 0 0 L 0 0 c 725.8 128.6 1460.1 129.4 2186.1 2.4 L 2200 0 v 114.5 H 0 V 0 Z"
          ></path>
        </svg>
      </div> */}
    </>
  )
}
