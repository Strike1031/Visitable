import React from 'react'
import classNames from 'classnames/bind'
import styles from 'styles/Business.module.css'
const cx = classNames.bind(styles)

export interface DescProps {
  className?: string
}

export const Description: React.FC<DescProps> = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="mx-4 my-6 lg:mx-8 lg:my-12 max-w-screen-md w-auto">
        <div className="text-gray-800 text-center font-medium text-2xl lg:text-4xl mb-4">
          {/* Inclusion is not a choice - it is a right */}
        </div>
        <div className="text-gray-500 font-extralight text-center text-base lg:text-lg">
          Australia has legislation to support the full realisation of human rights and fundamental
          freedoms. This includes making sure all members of society can access the community.
          <br />
          <br />
          The Disability Act 1992 makes it against the law to discriminate (directly or indirectly)
          against a person because disability when providing goods, services, or access to public
          premises.
          <br />
          <br />
          Let's make Australia more accessible and inclusive together.
        </div>
      </div>
    </div>
  )
}
