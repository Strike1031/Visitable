import React, { useEffect, useState } from 'react'
import styles from '../../styles/VenueDetails.module.css'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import DetailField from '../DetailField'
import { defaultDataVenue } from 'sampleDataVenues'
import { AccessFormType } from 'types/access-type'
import { defaultAccessForm } from 'types/access-details'
import { VenueType } from 'types/venue-type'
import { ImageType } from 'types/image-type'
import { LocationDataType } from 'types/location-type'
import { updateVenueHandler } from 'lib/account-crud'
import { auth } from 'config/firebase'
import claimsRedirect from 'lib/claims-redirect'
import router from 'next/router'
import AddressSetter from '../AddressSetter'
import AccessSetter from 'components/AccessSetter'
import DeleteIcon from '@material-ui/icons/Delete'
import { TextField } from '@material-ui/core'
import { handleFileUpload } from 'lib/s3-crud'
import { v4 as uuidv4 } from 'uuid'
import { FileInfoType } from 'types/file-info-type'
import ImagesSetter from 'components/ImagesSetter'
import Checkbox from '@material-ui/core/Checkbox'
import { venueSpecialtiesDetails, VenueSpecialtiesType } from 'types/venue-specialty-type'

type propTypes = {
  venueData: VenueType
  submitPartialVenueData: (partialVenueData: any) => void
}

export default function VenueDetails(props: propTypes) {
  const [name, setName] = useState<string>(props.venueData.name)
  const [hours, setHours] = useState<string>(props.venueData.hours)
  const [phone, setPhone] = useState<string>(props.venueData.phone)
  const [email, setEmail] = useState<string>(props.venueData.email)
  const [description, setDescription] = useState<string>(props.venueData.description)
  const [specialties, setSpecialties] = useState<VenueSpecialtiesType>(props.venueData.specialties)
  const [coverPhoto, setCoverPhoto] = useState<string>(props.venueData.coverPhoto)
  // For uploading a new cover photo to replace the previous
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null)

  const [locationData, setLocationData] = useState<LocationDataType>({
    placeID: props.venueData.locationData.placeID,
    latLng: props.venueData.locationData.latLng,
    streetNumber: props.venueData.locationData.streetNumber,
    streetName: props.venueData.locationData.streetName,
    suburb: props.venueData.locationData.suburb,
    postcode: props.venueData.locationData.postcode,
    state: props.venueData.locationData.state,
    country: props.venueData.locationData.country,
    formattedAddress: props.venueData.locationData.formattedAddress,
  })

  const [accessFeatures, setAccessFeatures] = useState<AccessFormType>(
    props.venueData.accessibilityFeatures,
  )

  // Existing files
  const [accessImages, setAccessImages] = useState<ImageType[]>(props.venueData.accessImages)
  // New file uploads
  const [filesInfo, setFilesInfo] = useState<FileInfoType[]>([])

  const [editGeneralInfoStatus, setEditGeneralInfoStatus] = useState(false)
  const [editLocationInfoStatus, setEditLocationInfoStatus] = useState(false)
  const [editAccessInfoStatus, setEditAccessInfoStatus] = useState(false)
  const [editAccessImagesStatus, setEditAccessImagesStatus] = useState(false)

  // const submitGeneralInfo = async () => {
  //   const generalInfo = {
  //     name,
  //     hours,
  //     phone,
  //     email,
  //     description,
  //   }
  //   await updateVenueHandler({ ...generalInfo, vid: props.venueID, uid: props.userID })
  // }

  // const submitLocationInfo = async () => {
  //   await updateVenueHandler({ ...locationData, vid: props.venueID, uid: props.userID })
  // }

  // const submitAccessInfo = async () => {
  //   const accessInfo = {
  //     accessFeatures,
  //     accessImages,
  //   }
  //   await updateVenueHandler({ ...accessInfo, vid: props.venueID, uid: props.userID })
  // }
  console.log('Veneu details', process.env.NEXT_PUBLIC_S3_BUCKET_NAME, process.env.NEXT_PUBLIC_S3_REGION)

  const handleUpdateGeneralInfo = async () => {
    let newCoverPhoto = coverPhoto
    if (coverPhotoFile !== null) {
      // If there is a new cover photo to upload:
      const newCoverPhotoId = uuidv4()
      await handleFileUpload(props.venueData.vid, newCoverPhotoId, coverPhotoFile)
      newCoverPhoto = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${props.venueData.vid}/${newCoverPhotoId}`
    }
    props.submitPartialVenueData({
      name,
      hours,
      phone,
      email,
      description,
      specialties,
      coverPhoto: newCoverPhoto,
    })
  }

  // Uploads new images, if any, and updates existing image info.
  const handleUpdateImages = async () => {
    let newImages: ImageType[] = []
    for (let fileInfo of filesInfo) {
      const newFileId = uuidv4()
      await handleFileUpload(props.venueData.vid, newFileId, fileInfo.fileObj)
      newImages.push({
        fileId: newFileId,
        fileName: fileInfo.fileObj.name,
        fileType: fileInfo.fileObj.type,
        title: fileInfo.title,
        description: fileInfo.desc,
      })
    }
    setFilesInfo([])
    const newAccessImagesState = [...accessImages, ...newImages]
    setAccessImages(newAccessImagesState)
    // This function will automatically reset accessImages state to include
    // newly uploaded images in S3
    props.submitPartialVenueData({ accessImages: newAccessImagesState })
  }

  return (
    <>
      <div className={styles.basicInfoAndPicContainer}>
        <div className={styles.userDetailsSectionContainer}>
          <div className={styles.userDetailsSectionHeading}>
            <h2>General Information</h2>
            {!editGeneralInfoStatus ? (
              <Button
                aria-label="edit-basic-info"
                color="primary"
                onClick={() => setEditGeneralInfoStatus(true)}
              >
                <div className={styles.editButtonText}>Edit</div>
                <EditIcon />
              </Button>
            ) : (
              <Button
                aria-label="save-basic-info"
                color="primary"
                variant="contained"
                onClick={() => {
                  setEditGeneralInfoStatus(false)
                  handleUpdateGeneralInfo()
                }}
              >
                <div className={styles.editButtonText}>Save</div>
                <SaveIcon />
              </Button>
            )}
          </div>
          <div>
            <DetailField
              fieldLabel="Venue name"
              fieldValue={name}
              editStatus={editGeneralInfoStatus}
              handleChange={(e: any) => setName(e.target.value)}
            />
            <DetailField
              fieldLabel="Opening hours"
              fieldValue={hours}
              editStatus={editGeneralInfoStatus}
              multiline={true}
              handleChange={(e: any) => setHours(e.target.value)}
            />
            <DetailField
              fieldLabel="Phone"
              fieldValue={phone}
              editStatus={editGeneralInfoStatus}
              handleChange={(e: any) => setPhone(e.target.value)}
            />
            <DetailField
              fieldLabel="Email"
              fieldValue={email}
              editStatus={editGeneralInfoStatus}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <DetailField
              fieldLabel="About"
              fieldValue={description}
              editStatus={editGeneralInfoStatus}
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
                      disabled={!editGeneralInfoStatus}
                    />
                    <div className="ml-2">{specialtyDetail.selectLabel}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex flex-col w-full max-w-2xl">
              <div>Cover photo</div>
              <div style={{ maxHeight: '800px' }}>
                {coverPhotoFile ? (
                  <div>
                    <img src={URL.createObjectURL(coverPhotoFile)} alt={`Uploaded cover photo`} />
                  </div>
                ) : (
                  <img
                    src={coverPhoto}
                    alt={'Cover photo of venue'}
                  />
                )}
              </div>
              <div className="mt-4 flex flex-wrap justify-end">
                <div>
                  <input
                    id={`cover-photo-change-button`}
                    style={{ display: 'none' }}
                    accept="image/*"
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) setCoverPhotoFile(e.target.files[0])
                    }}
                  />
                  <label htmlFor={`cover-photo-change-button`}>
                    <Button
                      variant="contained"
                      color="default"
                      component="span"
                      startIcon={<EditIcon />}
                      disabled={!editGeneralInfoStatus}
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
                    disabled={!editGeneralInfoStatus}
                    startIcon={<DeleteIcon />}
                  >
                    Revert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles.profilePicContainer}>
          <img></img>
          <Image src="/avatar-placeholder.png" alt="Profile picture" width={160} height={160} />
          <h3>Profile Picture</h3>
        </div> */}
      </div>

      <div className={styles.userDetailsSectionContainer}>
        <div className={styles.userDetailsSectionHeading}>
          <h2>Location Information</h2>
          {!editLocationInfoStatus ? (
            <Button
              aria-label="edit-contact-info"
              color="primary"
              onClick={() => setEditLocationInfoStatus(true)}
            >
              <div className={styles.editButtonText}>Edit</div>
              <EditIcon />
            </Button>
          ) : (
            <Button
              aria-label="save-contact-info"
              color="primary"
              variant="contained"
              onClick={() => {
                setEditLocationInfoStatus(false)
                props.submitPartialVenueData({ locationData })
              }}
            >
              <div className={styles.editButtonText}>Save</div>
              <SaveIcon />
            </Button>
          )}
        </div>
        <AddressSetter
          locationData={locationData}
          setLocationData={setLocationData}
          disabled={!editLocationInfoStatus}
        />
      </div>

      <div className={styles.userDetailsSectionContainer}>
        <div className={styles.userDetailsSectionHeading}>
          <h2>Accessibility Features</h2>
          {!editAccessInfoStatus ? (
            <Button
              aria-label="edit-contact-info"
              color="primary"
              onClick={() => setEditAccessInfoStatus(true)}
            >
              <div className={styles.editButtonText}>Edit</div>
              <EditIcon />
            </Button>
          ) : (
            <Button
              aria-label="save-contact-info"
              color="primary"
              variant="contained"
              onClick={() => {
                setEditAccessInfoStatus(false)
                props.submitPartialVenueData({ accessibilityFeatures: accessFeatures })
              }}
            >
              <div className={styles.editButtonText}>Save</div>
              <SaveIcon />
            </Button>
          )}
        </div>
        <AccessSetter
          accessSelections={accessFeatures}
          setAccessSelections={setAccessFeatures}
          disabled={!editAccessInfoStatus}
          accountType={'business'}
        />
      </div>

      {/* <div className={styles.userDetailsSectionContainer}>
        <div className={styles.userDetailsSectionHeading}>
          <h2>Images</h2>
        </div>
        <div className="flex flex-col items-center w-full">
          {accessImages.map((imageInfo, idx) => {
            return (
              <div key={idx} className="mt-10 flex flex-col w-full max-w-2xl">
                <div style={{ maxHeight: '800px' }}>
                  <img
                    src={`https://Visitable.s3.ap-southeast-2.amazonaws.com/${props.venueData.vid}/${imageInfo.fileId}`}
                    alt={'Image of venue'}
                  />
                </div>
                <div className="mt-4 flex flex-wrap">
                  <div style={{ flex: '1 0 5rem' }}>{'Title'}</div>
                  <div style={{ flex: '1 0 26rem' }}>
                    <TextField
                      defaultValue={imageInfo.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let newImagesInfo = [...accessImages]
                        newImagesInfo[idx] = { ...accessImages[idx], title: e.target.value }
                        setAccessImages(newImagesInfo)
                      }}
                      variant="outlined"
                      size="small"
                      fullWidth
                      disabled={!editAccessImagesStatus}
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap">
                  <div style={{ flex: '1 0 5rem' }}>{'Description'}</div>
                  <div style={{ flex: '1 0 26rem' }}>
                    <TextField
                      defaultValue={imageInfo.description}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let newImagesInfo = [...accessImages]
                        newImagesInfo[idx] = { ...accessImages[idx], description: e.target.value }
                        setAccessImages(newImagesInfo)
                      }}
                      variant="outlined"
                      size="small"
                      fullWidth
                      disabled={!editAccessImagesStatus}
                      multiline={true}
                      rows={3} // Only displays multiple rows when multiline is true
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap justify-end">
                  <div className="ml-4">
                    <Button
                      onClick={() => {
                        let newImagesInfo = [...accessImages]
                        newImagesInfo.splice(idx, 1)
                        setAccessImages(newImagesInfo)
                      }}
                      variant="contained"
                      color="secondary"
                      disabled={!editAccessImagesStatus}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <ImagesSetter
          filesInfo={filesInfo}
          setFilesInfo={setFilesInfo}
          disabled={!editAccessImagesStatus}
        />
        <div className="mt-3 flex justify-end">
          {!editAccessImagesStatus ? (
            <Button
              aria-label="edit-access-images"
              color="primary"
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setEditAccessImagesStatus(true)}
            >
              Edit Images
            </Button>
          ) : (
            <Button
              aria-label="save-access-images"
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => {
                setEditAccessImagesStatus(false)
                handleUpdateImages()
              }}
            >
              Save Images
            </Button>
          )}
        </div>
      </div> */}
    </>
  )
}
