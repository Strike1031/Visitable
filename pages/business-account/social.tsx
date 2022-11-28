import BusinessAccountLayout from '../../components/business-account/BusinessAccountLayout'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import claimsRedirect from 'lib/claims-redirect'
import { getVenuesHandler, updateVenueHandler } from 'lib/account-crud'
import { VenueType } from 'types/venue-type'
import { BusinessAccountContext } from 'components/contexts/BusinessAccountContext'
import { useAuth } from 'config/auth'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import buttonStyles from 'styles/Buttons.module.css'
import VenueDetails from 'components/business-account/VenueDetails'
import CreateVenueForm from 'components/business-account/CreateVenueForm'
import VenueCard from 'components/business-account/VenueCard'
import styles from 'styles/NavigationBar.module.css'

type PropTypes = {}

export default function BusinessSocial(props: PropTypes) {
  const router = useRouter()
  const auth = useAuth()
  const businessCx = useContext(BusinessAccountContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [venuesData, setVenuesData] = useState<VenueType[]>([])

  const getVenueData = async () => {
    setLoading(true)
    try {
      if (!auth.userState) throw new Error('No current user in firebase client')
      const venuesData = await getVenuesHandler(auth.userState.uid)
      console.log(venuesData)
      // setVenuesData([...venuesData, ...dummyVenuesData])
      setVenuesData(venuesData)
    } catch (error) {
      console.error(error)
      setVenuesData([])
    }
    setLoading(false)
  }

  // TODO: handle new venue data passed in from child compeonent
  const handleCreateVenue = async () => {
    setLoading(true)

    try {
      await getVenueData()
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!auth.initialisingUser) {
      if (auth.userState === null) {
        // If Auth context is no longer initialisingUser state, yet its userState
        // is still null, then redirect to business login page.
        router.push({
          pathname: '/business',
        })
      } else {
        claimsRedirect(router, auth.customClaims, router.pathname)
        getVenueData()
      }
    }
  }, [auth.initialisingUser, auth.userState])

  if (auth.initialisingUser) {
    if (loading) {
      return (
        <BusinessAccountLayout pageName={'social'} businessName={businessCx?.data?.name ?? ''}>
          <div>Retrieving venue details...</div>
        </BusinessAccountLayout>
      )
    } else {
      return (
        <BusinessAccountLayout pageName={'social'} businessName={businessCx?.data?.name ?? ''}>
          <div>Logging in account...</div>
        </BusinessAccountLayout>
      )
    }
  } else {
    if (loading) {
      return (
        <BusinessAccountLayout pageName={'social'} businessName={businessCx?.data?.name ?? ''}>
          <div>Retrieving venues...</div>
        </BusinessAccountLayout>
      )
    } else {
      return (
        <BusinessAccountLayout pageName={'social'} businessName={businessCx?.data?.name ?? ''}>
          <div className='lg:px-8 flex flex-col'>
            <div className='text-center text-xl text-bold'>
              Share your Visitable page on social media
            </div>
            <div className='text-center'>
              Help your customers find out about your venues accessibility information quicker with a
              social media link.
            </div>
            <div className='text-center'>
              Use a unique URL for each of your venues and add the Visitable icon to your websites
              social media links.
            </div>
            <div className='text-center mt-4'>Icons (right click and save the image as...)</div>
            <div className='flex flex-row self-center my-5 bg-gray-200 px-4 py-4 rounded space-x-6'>
              <img className='h-10 w-10' src='/Visitable-icon-inverted.png' alt='Logo' />
              <img className='h-10 w-10 ml-4' src='/icon_bw.png' alt='Logo' />
            </div>
            {venuesData.map((venueData) => (
              <div className='w-full flex flex-col md:flex-row h-auto bg-white my-4 rounded-lg'>
                <div
                  className='w-full md:w-1/2 h-52 bg-cover'
                  style={{
                    backgroundImage: `url(${venueData?.coverPhoto})`,
                  }}
                />
                <div className='md:w-1/2 flex flex-col my-4'>
                  <div className='text-xl font-bold ml-4'>{venueData.name}</div>
                  <div
                    className='ml-8 mt-2'
                    onClick={() => {
                      if (venueData.uid) {
                        navigator.clipboard.writeText(
                          'www.Visitable.com.au/venueListing/' + venueData.uid + '/' + venueData.vid,
                        )
                      }
                    }}
                  >
                    <div> Click on the File Image below or copy and paste the URL</div>
                    <div className='w-full flex flex-row mt-4 items-center'>
                      <div>
                        <FileCopyIcon className='cursor-pointer' />
                      </div>
                      <div className='w-full overflow-scroll bg-gray-200 mx-4 px-2 py-2 rounded flex flex-row'>
                        <div>URL:</div>
                        <div className='ml-4'>
                          {'www.Visitable.com.au/venueListing/' +
                            venueData.uid +
                            '/' +
                            venueData.vid}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </BusinessAccountLayout>
      )
    }
  }
}
