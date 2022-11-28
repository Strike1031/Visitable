
import { VisitorLayout } from 'components/VisitorLayout'
import React, { Fragment, useEffect, useState } from 'react'
import stepperStyles from 'styles/Stepper.module.css'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DetailField from 'components/DetailField'
import AccessibilityCheckbox from 'components/user-account/AccessibilityCheckbox'
import { AccessibilityNeeds, accessDetails, defaultAccessForm } from 'types/access-details'
import { useRouter } from 'next/router'
import { useAuth } from '../config/auth'
import { GuestType } from 'types/guest-type'
import { createAccountHandler } from 'lib/account-crud'
import firebase from 'firebase/app'
import { defaultDataGuest } from 'sampleDataUsers'
import { AccessFormType } from 'types/access-type'
import claimsRedirect from 'lib/claims-redirect'
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AddressSetter from 'components/AddressSetter'
import { defaultLocationData, LocationDataType } from 'types/location-type'
import detailStyles from 'styles/DetailField.module.css'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
}))

function getSteps() {
  return ['Personal Details', 'Address', 'Accessibility Preferences']
}

export default function CreateUserAccount() {
  const classes = useStyles()

  const router = useRouter()
  const auth = useAuth()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [dob, setDob] = useState<string>('')
  const [mobilePhone, setMobilePhone] = useState<string>('')
  const [guestLocation, setGuestLocation] = useState<LocationDataType>(defaultLocationData)

  const [accessPrefs, setAccessPrefs] = useState<AccessFormType>(defaultAccessForm)

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <Fragment>
            <h1 style={{ fontSize: 'x-large' }}>Your personal details</h1>
            <DetailField
              fieldLabel='Email'
              fieldValue={auth.userState?.email ?? ''}
              editStatus={false}
              handleChange={(e: any) => {}}
            />
            <DetailField
              fieldLabel='First name'
              fieldValue={firstName}
              editStatus={!loading}
              handleChange={(e: any) => setFirstName(e.target.value)}
            />
            <DetailField
              fieldLabel='Last name'
              fieldValue={lastName}
              editStatus={!loading}
              handleChange={(e: any) => setLastName(e.target.value)}
            />
            <div className={detailStyles.fieldContainer}>
              <div className={detailStyles.fieldLabel}>Date of birth</div>
              <div className={detailStyles.fieldValue}>
                <div className='w-full'>
                  <TextField
                    id='dob'
                    type='date'
                    variant='outlined'
                    size='small'
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={dob}
                    onChange={(e: any) => setDob(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
            <DetailField
              fieldLabel='Mobile Phone'
              fieldValue={mobilePhone}
              editStatus={!loading}
              handleChange={(e: any) => setMobilePhone(e.target.value)}
            />
          </Fragment>
        )
      case 1:
        return (
          <AddressSetter
            locationData={guestLocation}
            setLocationData={setGuestLocation}
            disabled={loading}
          />
        )
      case 2:
        return (
          <Fragment>
            <h1 style={{ fontSize: 'x-large' }}>Your accessibility preferences</h1>
            <p>Help us understand your needs so we can find the best venues for you.</p>
            {Object.entries(accessDetails).map(([key, details]) => (
              <AccessibilityCheckbox
                key={uuidv4()}
                checked={accessPrefs[key]}
                handleChange={() => setAccessPrefs({ ...accessPrefs, [key]: !accessPrefs[key] })}
                editStatus={!loading}
              >
                {details['queryGuest']}
              </AccessibilityCheckbox>
            ))}
          </Fragment>
        )
      case 3:
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
    const userData: GuestType = defaultDataGuest
    userData.uid = auth.userState?.uid ?? ''
    userData.firstName = firstName
    userData.lastName = lastName
    userData.email = auth.userState?.email ?? ''
    userData.DOB = dob
    userData.locationData = guestLocation
    userData.mobilePhone = mobilePhone
    userData.disabilityProfile = accessPrefs
    setErrorMsg('')
    setLoading(true)
    try {
      await createAccountHandler(userData)
      // Navigate to user account page route and prevent returning
      // back to this signup page with the back button.
      router.replace('/user-account/home')
    } catch (error) {
      console.error(error)
      setErrorMsg('An error occurred')
    }
    setLoading(false)
  }

  useEffect(() => {
    // Temporarily disallow edits by setting loading
    setLoading(true)
    console.log('In create-user-account; effect executed.')

    if (!auth.initialisingUser) {
      if (auth.userState === null) {
        // If Auth context is no longer initialising userState, yet its userState
        // is still null, then redirect to guest login page.
        router.push('/login')
      } else {
        claimsRedirect(router, auth.customClaims, router.pathname)
      }
    }

    setLoading(false)
  }, [auth.initialisingUser])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [setActiveStep])

  return (
    <VisitorLayout>
      {auth.initialisingUser ? (
        <div>Loading...</div>
      ) : auth.userState ? (
        <div className='w-full px-8 pt-8 pb-12 max-w-screen-lg'>
          <div className={stepperStyles.processContainer}>
            <div className={stepperStyles.stepperContainer}>
              <div className={stepperStyles.stepperTitleContainer}>
                <h1 style={{ fontSize: 'xx-large' }}>Welcome to Visitable!</h1>
                <p>Let's set up your new account.</p>
              </div>
              <Stepper classes={{ root: stepperStyles.stepper }} activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className='py-5 px-6 lg:py-6 lg:px-16' style={{ maxWidth: '840px' }}>
              {activeStep === steps.length ? (
                <Fragment>
                  <Typography>All steps completed</Typography>
                  <Button onClick={handleReset}>Reset (tmp btn)</Button>
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
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        Finish
                      </Button>
                    ) : (
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={handleNext}
                        disabled={loading}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                  {errorMsg && <div>{errorMsg}</div>}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Sorry, we were unable to log you into your account. Please try again later.</div>
      )}
    </VisitorLayout>
  )
}
