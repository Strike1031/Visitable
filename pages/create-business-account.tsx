import { VisitorLayout } from 'components/VisitorLayout'
import React, { Fragment, useEffect, useState } from 'react'
import stepperStyles from 'styles/Stepper.module.css'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DetailField from 'components/DetailField'
import { useRouter } from 'next/router'
import { useAuth } from '../config/auth'
import { BusinessType } from 'types/business-type'
import { createAccountHandler } from 'lib/account-crud'
import firebase from 'firebase/app'
import { defaultDataBusiness } from 'sampleDataBusinesses'
import { v4 as uuidv4 } from 'uuid'


function getSteps() {
  return ['Business Details']
}

export default function CreateUserAccount() {
  const router = useRouter()
  const auth = useAuth()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [name, setName] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [contactName, setContactName] = useState<string>('')
  const [contactNumber, setContactNumber] = useState<string>('')

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <Fragment>
            <h1 style={{ fontSize: 'x-large' }}>Your business details</h1>
            <DetailField
              fieldLabel="Business name"
              fieldValue={name}
              editStatus={!loading}
              handleChange={(e: any) => setName(e.target.value)}
            />
            <DetailField
              fieldLabel="Website link"
              fieldValue={website}
              editStatus={!loading}
              handleChange={(e: any) => setWebsite(e.target.value)}
            />
            <DetailField
              fieldLabel="Contact name"
              fieldValue={contactName}
              editStatus={!loading}
              handleChange={(e: any) => setContactName(e.target.value)}
            />
            <DetailField
              fieldLabel="Contact email"
              fieldValue={auth.userState?.email ?? ""}
              editStatus={false}
              handleChange={(e: any) => {}}
            />
            <DetailField
              fieldLabel="Contact Number"
              fieldValue={contactNumber}
              editStatus={!loading}
              handleChange={(e: any) => setContactNumber(e.target.value)}
            />
          </Fragment>
        )
      case 1:
        return 'This is the bit I really care about!'
      default:
        return 'Unknown stepIndex'
    }
  }

  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleSubmit = async () => {
    // The optional chaining of auth.userState is just to avoid type error.
    // This function is only ever called if auth.userState is not null,
    // as per the turnary operator in the jsx.
    const businessData: BusinessType = defaultDataBusiness

    const newbid= uuidv4()
    businessData.uid = auth.userState?.uid ?? ''
    businessData.bid = newbid
    businessData.name = name
    businessData.website = website
    businessData.contactName = contactName
    businessData.contactEmail = auth.userState?.email ?? ''
    businessData.contactNumber = contactNumber

    setErrorMsg('')
    setLoading(true)
    try {
      await createAccountHandler(businessData)
      // Navigate to user account page route and prevent returning
      // back to this signup page with the back button.
      router.replace('/business-account/home')
    } catch (error) {
      console.error(error)
      setErrorMsg('An error occurred')
    }
    setLoading(false)
  }

  // Check that user has correct claims to be on this page. If not, redirect
  // to appropriate page.
  const checkClaims = async (userStateNotNull: firebase.User) => {
    const idTokenResult = await userStateNotNull.getIdTokenResult()
    console.log(`Custom claims: ${JSON.stringify(idTokenResult.claims, null, 1)}`)
    if (idTokenResult.claims.business) {
      if (idTokenResult.claims.businessInit) {
        // If this is a business account and business data has already been intialised:
        router.push('/business-account/home')
      }
      // Else this is a business account which has yet to initialise business data.
    } else if (idTokenResult.claims.guest) {
      // If this is not a business account but is a guest account:
      if (idTokenResult.claims.guestInit) {
        // If guest data has already been initialised:
        router.push('/user-account/home')
      } else {
        // If guest data has not yet been initialised:
        router.push('/create-user-account')
      }
    }
  }

  useEffect(() => {
    // Temporarily disallow edits by setting loading
    setLoading(true)
    console.log('In create-business-account; effect executed.')

    if (!auth.initialisingUser) {
      if (auth.userState === null) {
        // If Auth context is no longer initialising userState, yet its userState
        // is still null, then redirect to business page.
        router.push('/business')
      } else {
        checkClaims(auth.userState)
      }
    }

    setLoading(false)
  }, [auth.initialisingUser])

  return (
    <VisitorLayout>
      {auth.initialisingUser ? (
        <div>Loading...</div>
      ) : auth.userState ? (
        <div className="w-full px-4 pt-6 sm:px-8 sm:pt-8 pb-12 max-w-screen-lg">
          <div className={stepperStyles.processContainer}>
            <div className={stepperStyles.stepperContainer}>
              <div className={stepperStyles.stepperTitleContainer}>
                <h1 style={{ fontSize: 'xx-large' }}>Welcome to Visitable!</h1>
                <p>Let's set up your new business account.</p>
              </div>
              <Stepper classes={{ root: stepperStyles.stepper }} activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div style={{ padding: '1.5rem 3rem 2rem', maxWidth: '840px' }}>
              {activeStep === steps.length ? (
                <Fragment>
                  <Typography>All steps completed</Typography>
                  <Button onClick={handleReset} disabled={loading}>
                    Reset (tmp btn)
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  {getStepContent(activeStep)}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
                    <Button disabled={activeStep === 0 || loading} onClick={handleBack}>
                      Back
                    </Button>

                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        Finish
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={loading}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </Fragment>
              )}
              {errorMsg && <div>{errorMsg}</div>}
            </div>
          </div>
        </div>
      ) : (
        <div>Sorry, we were unable to log you into your account. Please try again later.</div>
      )}
    </VisitorLayout>
  )
}