import React, { useState } from 'react'
import styles from '../../styles/Details.module.css'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import DetailField from '../DetailField'
import { BusinessType } from 'types/business-type'

type propTypes = {
  businessData: BusinessType
  submitHandler: (changedBusinessData: any) => void
}

function Details(props: propTypes) {
  const [name, setName] = useState<string | undefined | null>(props.businessData.name)
  const [website, setWebsite] = useState<string | undefined | null>(props.businessData.website)
  const [contactEmail] = useState<string | undefined | null>(props.businessData.contactEmail)
  const [contactName, setContactName] = useState<string | undefined | null>(props.businessData.contactName)
  const [contactNumber, setContactNumber] = useState<string | undefined | null>(props.businessData.contactNumber)

  const [editBasicInfoStatus, setEditBasicInfoStatus] = useState(false)

  const submitBasicInfo = () => {
    const basicInfo = {
      name,
      website,
      contactName,
      contactNumber,
    }
    props.submitHandler(basicInfo)
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
              fieldLabel="Business name"
              fieldValue={name ?? ""}
              editStatus={editBasicInfoStatus}
              handleChange={(e: any) => setName(e.target.value)}
            />
            <DetailField
              fieldLabel="Website link"
              fieldValue={website ?? ""}
              editStatus={editBasicInfoStatus}
              handleChange={(e: any) => setWebsite(e.target.value)}
            />
            <DetailField
              fieldLabel="Contact name"
              fieldValue={contactName ?? ""}
              editStatus={editBasicInfoStatus}
              handleChange={(e) => setContactName(e.target.value)}
            />
            <DetailField
              fieldLabel="Contact email"
              fieldValue={contactEmail ?? ""}
              editStatus={false}
              handleChange={(e) => {}}
            />
            <DetailField
              fieldLabel="Contact number"
              fieldValue={contactNumber ?? ""}
              editStatus={editBasicInfoStatus}
              handleChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Details
