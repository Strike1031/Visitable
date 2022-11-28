import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import stepperStyles from 'styles/Stepper.module.css'
import DetailField from 'components/DetailField'
import AccessibilityCheckbox from 'components/user-account/AccessibilityCheckbox'
import AddressSetter from 'components/AddressSetter'
import { useState, Fragment, useEffect } from 'react'
import { VenueType } from 'types/venue-type'
import { ImageType } from 'types/image-type'
import { defaultLocationData, LocationDataType } from 'types/location-type'
import { createVenueHandler } from 'lib/account-crud'
import { useAuth } from 'config/auth'
import { useRouter } from 'next/router'
import { accessDetails, defaultAccessForm } from 'types/access-details'
import { AccessFormType } from 'types/access-type'
import { v4 as uuidv4 } from 'uuid'
import { defaultDataVenue } from 'sampleDataVenues'
import AccessSetter from 'components/AccessSetter'
import { FileInfoType } from 'types/file-info-type'
import ImagesSetter from 'components/ImagesSetter'
import { handleFileUpload } from 'lib/s3-crud'
import { TextField } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import EditIcon from '@material-ui/icons/Edit'
import {
  defaultVenueSpecialtiesForm,
  venueSpecialtiesDetails,
  VenueSpecialtiesType,
} from 'types/venue-specialty-type'
import Checkbox from '@material-ui/core/Checkbox'

type propTypes = {
  submitNewVenueData: () => void
}

export default function CreateVenueForm(props: propTypes) {
  const router = useRouter()
  const auth = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const [name, setName] = useState<string>('')
  const [hours, setHours] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [specialties, setSpecialties] = useState<VenueSpecialtiesType>(defaultVenueSpecialtiesForm)
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null)

  const [locationData, setLocationData] = useState<LocationDataType>(defaultLocationData)

  const [accessFeatures, setAccessFeatures] = useState<AccessFormType>(defaultAccessForm)

  const [filesInfo, setFilesInfo] = useState<FileInfoType[]>([])

  const handleCreateVenue = async () => {
    if (!auth.userState) throw new Error('No user firebase client')
    const newVid = uuidv4()
    const newVenueData: VenueType = defaultDataVenue
    newVenueData.uid = auth.userState.uid
    newVenueData.vid = newVid
    newVenueData.name = name
    newVenueData.hours = hours
    newVenueData.phone = phone
    newVenueData.email = email
    newVenueData.description = description
    newVenueData.specialties = specialties
    newVenueData.locationData.placeID = locationData.placeID
    newVenueData.locationData.latLng = locationData.latLng
    newVenueData.locationData.streetNumber = locationData.streetNumber
    newVenueData.locationData.streetName = locationData.streetName
    newVenueData.locationData.streetName = locationData.streetName
    newVenueData.locationData.suburb = locationData.suburb
    newVenueData.locationData.postcode = locationData.postcode
    newVenueData.locationData.country = locationData.country
    newVenueData.locationData.state = locationData.state
    newVenueData.locationData.formattedAddress = locationData.formattedAddress
    newVenueData.accessibilityFeatures = accessFeatures
    console.log('Create veneu', process.env.NEXT_PUBLIC_S3_BUCKET_NAME, process.env.NEXT_PUBLIC_S3_REGION)
    if (coverPhotoFile !== null) {
      const newCoverPhotoId = uuidv4()
      await handleFileUpload(newVid, newCoverPhotoId, coverPhotoFile)
      newVenueData.coverPhoto = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${newVid}/${newCoverPhotoId}`
    }

    let newImages: ImageType[] = []
    for (let fileInfo of filesInfo) {
      const newFileId = uuidv4()
      await handleFileUpload(newVid, newFileId, fileInfo.fileObj)
      newImages.push({
        fileId: newFileId,
        fileName: fileInfo.fileObj.name,
        fileType: fileInfo.fileObj.type,
        title: fileInfo.title,
        description: fileInfo.desc,
      })
    }

    newVenueData.accessImages = newImages

    setErrorMsg('')
    setLoading(true)
    try {
      if (auth.userState === null) throw new Error('No user logged in')
      await createVenueHandler(auth.userState.uid, newVenueData)
      props.submitNewVenueData()
    } catch (error) {
      console.error(error)
      setErrorMsg('An error occurred')
    }
    setLoading(false)
  }

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <Fragment>
            <h1 style={{ fontSize: 'x-large' }}>Your venue's details</h1>
            <DetailField
              fieldLabel="Venue name"
              fieldValue={name}
              editStatus={!loading}
              handleChange={(e: any) => setName(e.target.value)}
            />
            <DetailField
              fieldLabel="Opening hours"
              fieldValue={hours}
              editStatus={!loading}
              multiline={true}
              handleChange={(e: any) => setHours(e.target.value)}
            />
            <DetailField
              fieldLabel="Phone"
              fieldValue={phone}
              editStatus={!loading}
              handleChange={(e: any) => setPhone(e.target.value)}
            />
            <DetailField
              fieldLabel="Email"
              fieldValue={email}
              editStatus={!loading}
              handleChange={(e: any) => setEmail(e.target.value)}
            />
            <DetailField
              fieldLabel="About"
              fieldValue={description}
              editStatus={!loading}
              multiline={true}
              handleChange={(e: any) => setDescription(e.target.value)}
            />
            <div className="flex flex-wrap">
              <div style={{ width: '260px' }}>Categories</div>
              <div style={{ minWidth: '260px' }}>
                {Object.entries(venueSpecialtiesDetails).map(([key, specialtyDetail]) => (
                  <div className="flex items-center">
                    <Checkbox
                      checked={specialties[key]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSpecialties({ ...specialties, [key]: e.target.checked })
                      }
                      disabled={loading}
                    />
                    <div className="ml-2">{specialtyDetail.selectLabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        )
      case 1:
        return (
          <>
            <h1 style={{ fontSize: 'x-large' }}>Your venue's location</h1>
            <AddressSetter
              locationData={locationData}
              setLocationData={setLocationData}
              disabled={loading}
            />
          </>
        )
      case 2:
        return (
          <Fragment>
            <h1 style={{ fontSize: 'x-large' }}>Your venue's accessibility features</h1>
            <p>Help us understand more about your venue's accessibility offerings.</p>
            <div className="flex flex-col items-center w-full">
              <AccessSetter
                accessSelections={accessFeatures}
                setAccessSelections={setAccessFeatures}
                disabled={loading}
                accountType={'business'}
              />
            </div>
          </Fragment>
        )
      case 3:
        return (
          <Fragment>
            <h1 style={{ fontSize: 'x-large' }}>Upload a cover photo</h1>
            <p>Give the best first impression of your venue.</p>
            <div className="mt-4 flex flex-col w-full max-w-2xl">
              {coverPhotoFile !== null ? (
                <Fragment>
                  <div style={{ maxHeight: '800px' }}>
                    <img src={URL.createObjectURL(coverPhotoFile)} alt={`Uploaded cover photo`} />
                  </div>
                  <div className="mt-4 flex flex-wrap">
                    <div style={{ flex: '1 0 5rem' }}>{'File name'}</div>
                    <div style={{ flex: '1 0 26rem', color: '#696969' }}>{coverPhotoFile.name}</div>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-end">
                    <div>
                      <input
                        id={`cover-photo-change-button`}
                        style={{ display: 'none' }}
                        accept="image/*"
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files) {
                            setCoverPhotoFile(e.target.files[0])
                          }
                        }}
                      />
                      <label htmlFor={`cover-photo-change-button`}>
                        <Button
                          variant="contained"
                          color="default"
                          component="span"
                          startIcon={<EditIcon />}
                          disabled={loading}
                          >
                          Change image
                        </Button>
                      </label>
                    </div>
                    <div className="ml-4">
                      <Button
                        onClick={() => {
                          setCoverPhotoFile(null)
                        }}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <div className="mt-10 w-full max-w-2xl">
                  <input
                    id="file-upload-button"
                    style={{ display: 'none' }}
                    accept="image/*"
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        setCoverPhotoFile(e.target.files[0])
                      }
                    }}
                  />
                  <div className="ml-4">
                    <label htmlFor="file-upload-button">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        disabled={loading}
                      >
                        Upload image
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* <p>Display images of your venue and its accessibility features.</p>
            <ImagesSetter filesInfo={filesInfo} setFilesInfo={setFilesInfo} disabled={loading} /> */}
          </Fragment>
        )
      default:
        return 'Unknown stepIndex'
    }
  }

  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Details', 'Location', 'Accessibility', 'Cover Photo']

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  useEffect(() => {}, [filesInfo])

  useEffect(() => {
    // Temporarily disallow edits by setting loading
    setLoading(true)
    console.log('In create-business-account; effect executed.')

    if (!auth.initialisingUser) {
      if (auth.userState === null) {
        // If Auth context is no longer initialising userState, yet its userState
        // is still null, then redirect to business page.
        router.push('/business')
      }
    }

    setLoading(false)
  }, [auth.initialisingUser])

  return (
    <>
      {auth.initialisingUser ? (
        <div>Loading...</div>
      ) : auth.userState ? (
        <div className="flex justify-center">
          <div className={stepperStyles.processContainer}>
            <div className={stepperStyles.stepperContainer}>
              <div className={stepperStyles.stepperTitleContainer}>
                <h1 style={{ fontSize: 'xx-large' }}>Create a Venue</h1>
                <p>Let's set up a Visitable listing for your new venue.</p>
              </div>
              <Stepper classes={{ root: stepperStyles.stepper }} activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div style={{ padding: '1.5rem 3rem 2rem', width: '100%' }}>
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
                        variant="contained"
                        color="primary"
                        onClick={handleCreateVenue}
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
                  {errorMsg && <div>{errorMsg}</div>}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Sorry, we were unable to log you into your account. Please try again later.</div>
      )}
    </>
  )
}
