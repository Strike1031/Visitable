import React from 'react'
import classNames from 'classnames/bind'
import styles from 'styles/Business.module.css'
const cx = classNames.bind(styles)

export interface EnquiryProps {
  className?: string
}

export const Enquiry: React.FC<EnquiryProps> = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="mx-auto max-w-screen-lg">
        <div className="font-semibold text-center text-3xl lg:text-5xl text-gray-800">
          Business Enquiry
        </div>
        <div className="flex justify-center mt-6">
          <div className={cx('enquiry-division', 'bg-color-primary')}></div>
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:items-start justify-evenly mt-6">
          <div className="max-w-lg px-4 lg:px-8">
            <div className={cx('enquiry-text-2')}>
              Please enter your details in the form and we contact you shortly.
            </div>
            <div className={cx('enquiry-text-3')}>
              Learn more about Visitable and schedule a chat with one of our team to demo what the
              platform can do for you.
              <br />
              <br />
              <ul>
                <li>
                  Discounted pricing models based on number of locations makes Visitable not only
                  right, but financially viable.
                </li>
                <li>
                  Commit to serious corporate social responsibility by demonstrating real change and
                  action.
                </li>
                <li>
                  API integration capabilities will support connectivity between the Visitable
                  platform and your business.
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-lg px-4 lg:px-8">
            <input className={cx('enquiry-input')} placeholder="Name" />
            <input className={cx('enquiry-input')} placeholder="Email" />
            <input className={cx('enquiry-input')} placeholder="Subject" />
            <textarea className={cx('enquiry-text-area')} placeholder="Message" />
            <div className="flex justify-center mt-6">
              <button className={cx('enquiry-button')}>Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
