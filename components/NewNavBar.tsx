import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { auth, googleAuthProvider } from 'config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import styles from 'styles/NavigationBar.module.css'
import { AuthModal } from './AuthModal'
import { AuthUtils } from 'lib/AuthUtils'
import { useAuth } from 'config/auth'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

// If guest account logged in, shows guest account specific navbar.
// If business account logged in, shows guest account specific navbar.
// Otherwise, shows a public navbar.

type propTypes = {
  drawerOpen: boolean;
  onClickDrawer: () => void
}

export default function NewNavBar(props: propTypes) {
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

  if (auth.customClaims?.guestInit) {
    return (
      <div className={styles.container}>
        <nav className={styles.navbarContainer}>
          <div className='lg:hidden'>
            <IconButton onClick={props.onClickDrawer}>
              {props.drawerOpen ? <CloseIcon/> : <MenuIcon/>}
            </IconButton>
          </div>
          <div className='flex'>
            <img
              onClick={() => router.push('/')}
              className={styles.logo}
              src="/logo.png"
              alt="Logo"
            />
            <div className="cursor-pointer hidden lg:flex lg:justify-start lg:items-center text-white ml-8" onClick={() => router.push('/venues')}>
              Discover
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
              <MenuItem onClick={() => router.push('/user-account/home')}>Account</MenuItem>
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
  } else if (auth.customClaims?.businessInit) {
    return (
      <div className={styles.container}>
        <nav className={styles.navbarContainer}>
          <div className='sm:hidden'>
            <IconButton onClick={props.onClickDrawer}>
              {props.drawerOpen ? <CloseIcon/> : <MenuIcon/>}
            </IconButton>
          </div>
          <div className='flex'>
            <img
              onClick={() => router.push('/')}
              className={styles.logo}
              src="/logo.png"
              alt="Logo"
              />
            <div className="cursor-pointer hidden sm:flex sm:justify-start sm:items-center text-white ml-8" onClick={() => router.push('/business-account/venues')}>
              Dashboard
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
              <MenuItem onClick={() => router.push('/business-account/home')}>Account</MenuItem>
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
  } else {
    return (
      <div className={styles.container}>
        <nav className={styles.navbarContainer}>
          <img
            onClick={() => router.push('/')}
            className={styles.logo}
            src="/logo.png"
            alt="Logo"
          />
          <div className="hidden sm:flex sm:justify-between sm:items-center">
            <div className={styles.item} onClick={() => router.push('/')}>
              Home
            </div>
            <div className={styles.item} onClick={() => router.push('/venues')}>
              Search Roles
            </div>
            <div className={styles.item} onClick={() => router.push('/business')}>
              For Companies
            </div>
            <div className={styles.item} onClick={() => router.push('/login')}>
              Log In
            </div>
            <div className={styles.item} onClick={() => router.push('/signup')}>
              Sign Up
            </div>
          </div>
          <div className='sm:hidden'>
            <IconButton onClick={props.onClickDrawer}>
              {props.drawerOpen ? <CloseIcon/> : <MenuIcon/>}
            </IconButton>
          </div>
        </nav>
      </div>
    )
  }
}
