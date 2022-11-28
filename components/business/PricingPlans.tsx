import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from 'styles/Business.module.css'
const cx = classNames.bind(styles)

export interface PlansProps {
  className?: string
}

export const PricingPlans: React.FC<PlansProps> = () => {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className={cx('plan-text')}>Pricing Plans</div>
      <div className={cx('plans-container')}>
        <div className={cx('plan-box')} style={{ marginRight: '64px' }}>
          <div className={cx('text-element-container')}>
            <div style={{ marginTop: '20px' }} className={cx('name-text')}>
              Social Impact
            </div>
            <div style={{ marginTop: '8px' }} className={cx('money-text')}>
              $19/month
            </div>
            <div style={{ marginTop: '16px' }}>
              <div className={cx('plan-division')}></div>
            </div>
            <div style={{ marginTop: '25px' }}>
              <div className={cx('list-item')}>
                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck} />
                <div className={cx('item-text')}>Public business listing</div>
              </div>
              <div className={cx('list-item')}>
                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck} />
                <div className={cx('item-text')}>Socials link on your page</div>
              </div>
              <div className={cx('list-item')}>
                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck} />
                <div className={cx('item-text')}>QR code generation</div>
              </div>
              <div className={cx('list-item')}>
                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck} />
                <div className={cx('item-text')}>Advice for your business</div>
              </div>
            </div>
            <div style={{ marginTop: '100px' }} className={cx('plan-desc-text')}>
              Perfect for any single location business wanting to create social change and list
              their accessibility for those who want to know
            </div>
          </div>
          <div style={{ marginTop: '20px' }} className={cx('content-center-box')}>
            <button className={cx('plan-button', 'plan-button:hover')}>Subscribe</button>
          </div>
        </div>
        <div className={cx('plan-box')}>
          <div className={cx('text-element-container')}>
            <div style={{ marginTop: '20px' }} className={cx('name-text')}>
              Enterprise
            </div>
            <div style={{ marginTop: '8px' }} className={cx('money-text')}>
              Get a Quote
            </div>
            <div style={{ marginTop: '16px' }}>
              <div className={cx('plan-division')}></div>
            </div>
            <div style={{ marginTop: '25px' }}>
              <div className={cx('list-item')}>
                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck} />
                <div className={cx('item-text')}>Lead social change</div>
              </div>
              <div className={cx('list-item')}>
                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck} />
                <div className={cx('item-text')}>Multi-location discounts</div>
              </div>
              <div className={cx('list-item')}>
                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck} />
                <div className={cx('item-text')}>Dedicated account manager</div>
              </div>
              <div className={cx('list-item')}>
                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck} />
                <div className={cx('item-text')}>Updates on disability policy</div>
              </div>
              <div className={cx('list-item')}>
                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck} />
                <div className={cx('item-text')}>Visitable accreditation</div>
              </div>
              <div className={cx('list-item')}>
                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck} />
                <div className={cx('item-text')}>User data reporting</div>
              </div>
            </div>
            <div style={{ marginTop: '38px' }} className={cx('plan-desc-text')}>
              Ideal for larger corporate organisations with multiple sites looking to make drastic
              social impact for people with disability
            </div>
          </div>
          <div style={{ marginTop: '20px' }} className={cx('content-center-box')}>
            <button className={cx('plan-button', 'plan-button:hover')}>Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  )
}
