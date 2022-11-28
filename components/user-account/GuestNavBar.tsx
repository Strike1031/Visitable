import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { auth, googleAuthProvider } from 'config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import styles from 'styles/NavigationBar.module.css'
import { AuthModal } from '../AuthModal'
import { AuthUtils } from 'lib/AuthUtils'
import { useAuth } from 'config/auth'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

type propTypes = {
  guestName: string
}

export default function GuestNavBar(props: propTypes) {
  const router = useRouter()
  const auth = useAuth()

  /* 
  https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth
  user: The firebase.User if logged in, or undefined if not
  loading: A boolean to indicate whether the the authentication state is still being loaded
  error: Any firebase.auth.Error returned by Firebase when trying to load the user, or undefined if there is no error
  */
  // const [user, loading, error] = useAuthState(auth)
  // const [showAuthModal, setShowAuthModal] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toAccount = (): void => {
    // Note: guest and business are nto mutually exclusive.
    // If both true, prioritise redirect to /user-account/home
    if (auth.customClaims?.guest) {
      router.push('/user-account/home')
    } else if (auth.customClaims?.business) {
      router.push('/business-account/home')
    } else {
      router.push('/')
    }
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbarContainer}>
        <div className="flex justify-start items-center">
          <img
            onClick={() => router.push('/')}
            className={styles.logo}
            src="/logo.png"
            alt="Logo"
          />
          <div className={styles.item} onClick={() => router.push('/venues')}>
            Discover
          </div>
          <div className={styles.item} onClick={() => router.push('/venues')}>
            My venues
          </div>
        </div>
        <div>
          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={toAccount}>Account</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose()
                AuthUtils.logOut()
              }}
            >
              Log out
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </div>
  )
}
