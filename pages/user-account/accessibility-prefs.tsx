import GuestAccountLayout from '../../components/user-account/GuestAccountLayout'
import { useRouter } from 'next/router'
import { dummyDataUsers } from '../../sampleDataUsers'
import AccessSetter from 'components/AccessSetter'
import { useAuth } from 'config/auth'
import { getAccountHandler, updateAccountHandler } from 'lib/account-crud'
import React, { useState, useEffect, useContext } from 'react'
import claimsRedirect from 'lib/claims-redirect'
import { GuestType } from 'types/guest-type'
import { GuestAccountContext } from 'components/contexts/GuestAccountContext'
import { AccessFormType } from 'types/access-type'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'

export default function UserAccessibilityPrefs() {
  const router = useRouter()
  const auth = useAuth()
  const guestCx = useContext(GuestAccountContext)

  const [accessPrefs, setAccessPrefs] = useState<AccessFormType | undefined>(
    guestCx.data?.disabilityProfile ?? undefined,
  )
  const [editStatus, setEditStatus] = useState<boolean>(false)

  const updateAccessPrefs = async (changedAccessPrefs: AccessFormType) => {
    try {
      if (!auth.userState) throw new Error('No current user in firebase client')
      await updateAccountHandler(auth.userState.uid, {
        ...guestCx.data,
        disabilityProfile: changedAccessPrefs,
      })
      guestCx.getData()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!auth.initialisingUser) {
      if (auth.userState === null) {
        // If Auth context is no longer initialisingUser state, yet its userState
        // is still null, then redirect to guest login page.
        router.push({
          pathname: '/login',
        })
      } else {
        claimsRedirect(router, auth.customClaims, router.pathname)
      }
    }
  }, [auth.initialisingUser, auth.userState])

  useEffect(() => {
    if (!guestCx.loading && guestCx.data) {
      setAccessPrefs(guestCx.data.disabilityProfile)
    }
  }, [guestCx.loading, guestCx.data])

  if (auth.initialisingUser) {
    return (
    <GuestAccountLayout pageName={"accessPrefs"} guestName={guestCx?.data?.firstName ?? ""}>
        <div>Logging into account...</div>
      </GuestAccountLayout>
    )
  } else {
    if (auth.userState === null) {
      return (
    <GuestAccountLayout pageName={"accessPrefs"} guestName={guestCx?.data?.firstName ?? ""}>
          <div>Sorry, we were unable to log you into your account. Please try again later.</div>
        </GuestAccountLayout>
      )
    }
  }

  if (guestCx.loading) {
    return (
    <GuestAccountLayout pageName={"accessPrefs"} guestName={guestCx?.data?.firstName ?? ""}>
        <div>Retrieving account data...</div>
      </GuestAccountLayout>
    )
  } else {
    if (guestCx.data === null) {
      return (
    <GuestAccountLayout pageName={"accessPrefs"} guestName={""}>
          <div>Sorry, we are unable to retrieve your details at this time.</div>
        </GuestAccountLayout>
      )
    }
  }

  if (accessPrefs) {
    return (
    <GuestAccountLayout pageName={"accessPrefs"} guestName={guestCx?.data?.firstName ?? ""}>
        <div style={{ maxWidth: '700px', display: 'flex', flexFlow: 'column nowrap' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!editStatus ? (
              <Button
                aria-label="edit-basic-info"
                color="primary"
                onClick={() => setEditStatus(true)}
              >
                <div style={editButtonTextStyles}>Edit</div>
                <EditIcon />
              </Button>
            ) : (
              <Button
                aria-label="save-basic-info"
                color="primary"
                variant="contained"
                onClick={() => {
                  setEditStatus(false)
                  updateAccessPrefs(accessPrefs)
                }}
              >
                <div style={editButtonTextStyles}>Save</div>
                <SaveIcon />
              </Button>
            )}
            </div>
            <AccessSetter
              accessSelections={accessPrefs}
              setAccessSelections={setAccessPrefs}
              disabled={!editStatus}
              accountType={guestCx.data.accountType}
            />
        </div>
      </GuestAccountLayout>
    )
  } else {
    return (
    <GuestAccountLayout pageName={"accessPrefs"} guestName={guestCx?.data?.firstName ?? ""}>
        <div>Account access info could not be retrieved at this time</div>
      </GuestAccountLayout>
    )
  }
}

const editButtonTextStyles = {
  fontSize: 'inherit',
  paddingRight: '6px',
}
