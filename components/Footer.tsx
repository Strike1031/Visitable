import React from 'react'
import Link from 'next/link'
import classNames from 'classnames/bind'
import styles from 'styles/Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import { notImplementedPopMessage } from 'constants/share'
const cx = classNames.bind(styles)

export interface FooterProps {
  className: string
}
const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={className + ' ' + cx('footer')}>
      <img alt="" src="/wave.svg" style={{ width: '100%', height: '110px', marginTop: '0px' }} />

      <div className="vflex-container">
        <img className={cx('logo')} src="/logo.png" alt="Logo" />
        <Link href="/about" children={<a className={cx('text', 'item')}>About Us</a>} />
        <Link href="/contact" children={<a className={cx('text', 'item')}>Contact Us</a>} />
        <Link
          href="/privacy-policy"
          children={<a className={cx('text', 'item')}>Privacy Policy</a>}
        />

        <div className="hflex-container">
          <a
            href="https://www.facebook.com/Valyoos"
            className={cx('icon-container', 'facebook-container')}
          >
            <FontAwesomeIcon className={cx('icon-item', 'facebook')} icon={faFacebookF} />
          </a>
          <a
            href="https://twitter.com/Valyoos"
            className={cx('icon-container', 'twitter-container')}
          >
            <FontAwesomeIcon className={cx('icon-item', 'twitter')} icon={faTwitter} />
          </a>
          <a
            href="https://www.instagram.com/Valyoos/"
            className={cx('icon-container', 'instagram-container')}
          >
            <FontAwesomeIcon className={cx('icon-item', 'instagram')} icon={faInstagram} />
          </a>
          <a
            href="https://www.linkedin.com/company/valyoos/"
            className={cx('icon-container', 'linkedin-container')}
          >
            <FontAwesomeIcon className={cx('icon-item', 'linkedin')} icon={faLinkedinIn} />
          </a>
        </div>
        <p className={cx('text', 'copy-right')}>Copyright 2022 Tickable. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer