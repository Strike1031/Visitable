import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../../styles/Details.module.css'
import detailStyles from 'styles/DetailField.module.css'
import detailFieldStyles from 'styles/DetailField.module.css'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import DetailField from '../DetailField'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import { DoubleArrow } from '@material-ui/icons'
import { GuestType } from 'types/guest-type'
import { makeStyles, TextField } from '@material-ui/core'
import AddressSetter from 'components/AddressSetter'
import { LocationDataType } from 'types/location-type'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(duration)

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
}))

type propTypes = {
  userData: GuestType
  submitHandler: (changedUserData: any) => void
}

function Details(props: propTypes) {
  const classes = useStyles()

  // function getDurationInYears(start: any, end: any): number {
  //   const years = end.diff(start, 'year')
  //   return years
  // }

  const [firstName, setFirstName] = useState<string>(props.userData.firstName)
  const [lastName, setLastName] = useState<string>(props.userData.lastName)
  const [dob, setDob] = useState<string>(props.userData.DOB)
  // const [age, setAge] = useState<number>(getDurationInYears(props.userData.DOB, dayjs()))

  const [email, setEmail] = useState<string>(props.userData.email)
  const [mobilePhone, setMobilePhone] = useState<string>(props.userData.mobilePhone)

  const [locationData, setLocationData] = useState<LocationDataType>(props.userData.locationData)

  const [editBasicInfoStatus, setEditBasicInfoStatus] = useState(false)
  const [editContactInfoStatus, setEditContactInfoStatus] = useState(false)
  const [editLocationInfoStatus, setEditLocationInfoStatus] = useState(false)

  // const formatDate = (date: string) => {
  //   return dayjs(date, 'YYYY-MM-DD').format('D MMM YYYY')
  // }

  // const handleChangeDob = (newDob: string) => {
  //   setDob(newDob)
  //   setAge(getDurationInYears(newDob, dayjs()))
  // }

  const submitBasicInfo = () => {
    const basicInfo = {
      firstName,
      lastName,
      DOB: dob,
    }
    props.submitHandler(basicInfo)
  }

  const submitContactInfo = () => {
    const contactInfo = {
      mobilePhone,
    }
    props.submitHandler(contactInfo)
  }

  const submitLocationInfo = () => {
    const partialGuestData = { locationData }
    props.submitHandler(partialGuestData)
  }

  return (
    <>
      <div className={styles.basicInfoAndPicContainer}>
        <div className={styles.userDetailsSectionContainer}>
          <div className={styles.userDetailsSectionHeading}>
            <h2>Basic Information</h2>
            {!editBasicInfoStatus ? (
              <Button
                aria-label="edit-basic-info"
                color="primary"
                onClick={() => setEditBasicInfoStatus(true)}
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
                  setEditBasicInfoStatus(false)
                  submitBasicInfo()
                }}
              >
                <div className={styles.editButtonText}>Save</div>
                <SaveIcon />
              </Button>
            )}
          </div>
          <div>
            <DetailField
              fieldLabel="First name"
              fieldValue={firstName}
              editStatus={editBasicInfoStatus}
              handleChange={(e: any) => setFirstName(e.target.value)}
            />
            <DetailField
              fieldLabel="Last name"
              fieldValue={lastName}
              editStatus={editBasicInfoStatus}
              handleChange={(e: any) => setLastName(e.target.value)}
            />
            <div className={detailStyles.fieldContainer}>
              <div className={detailStyles.fieldLabel}>Date of birth</div>
              <div className={detailStyles.fieldValue}>
                <div className='w-full'>
                <TextField
                  id="dob"
                  type="date"
                  variant="outlined"
                  size="small"
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={dob}
                  onChange={(e: any) => setDob(e.target.value)}
                  disabled={!editBasicInfoStatus}
                  />
                  
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
          <h2>Contact Information</h2>
          {!editContactInfoStatus ? (
            <Button
              aria-label="edit-contact-info"
              color="primary"
              onClick={() => setEditContactInfoStatus(true)}
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
                setEditContactInfoStatus(false)
                submitContactInfo()
              }}
            >
              <div className={styles.editButtonText}>Save</div>
              <SaveIcon />
            </Button>
          )}
        </div>
        <DetailField
          fieldLabel="Email"
          fieldValue={email}
          editStatus={false}
          handleChange={(e) => {}}
        />
        <DetailField
          fieldLabel="Mobile phone number"
          fieldValue={mobilePhone}
          editStatus={editContactInfoStatus}
          handleChange={(e) => setMobilePhone(e.target.value)}
        />
      </div>

      <div className={styles.userDetailsSectionContainer}>
        <div className={styles.userDetailsSectionHeading}>
          <h2>Address</h2>
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
                submitLocationInfo()
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
    </>
  )
}

export default Details
