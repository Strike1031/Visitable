import Head from 'next/head'
import BusinessAccountMenu from 'components/BusinessAccountMenu'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import AccessibleRoundedIcon from '@material-ui/icons/AccessibleRounded'
import StorefrontIcon from '@material-ui/icons/Storefront'
import RateReviewIcon from '@material-ui/icons/RateReview'
import MailIcon from '@material-ui/icons/Mail'
import SettingsIcon from '@material-ui/icons/Settings'
import LinkIcon from '@material-ui/icons/Link'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import styles from 'styles/BusinessAccountLayout.module.css'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { AuthUtils } from 'lib/AuthUtils'
import classNames from 'classnames/bind'

let cx = classNames.bind(styles)

type businessMenuItemType = {
  pagePath: string
  pageName: string
  menuItemTitle: string
  menuItemIcon: any
}

const businessMenuItems: businessMenuItemType[] = [
  {
    pagePath: '/business-account/home',
    pageName: 'home',
    menuItemTitle: 'Home',
    menuItemIcon: <HomeIcon />,
  },
  {
    pagePath: '/business-account/details',
    pageName: 'Contact Details',
    menuItemTitle: 'Contact Details',
    menuItemIcon: <PersonIcon />,
  },
  {
    pagePath: '/business-account/venues',
    pageName: 'Accessibility Details',
    menuItemTitle: 'Accessibility Details',
    menuItemIcon: <StorefrontIcon />,
  },
  {
    pagePath: '/business-account/social',
    pageName: 'Create Sharing Links',
    menuItemTitle: 'Sharing Links',
    menuItemIcon: <LinkIcon />,
  },
  {
    pagePath: '/business-account/reviews',
    pageName: 'reviews',
    menuItemTitle: 'Reviews',
    menuItemIcon: <RateReviewIcon />,
  },
  {
    pagePath: '/business-account/messages',
    pageName: 'Recruitment Partners',
    menuItemTitle: 'Recruitment Partners',
    menuItemIcon: <MailIcon />,
  },
  {
    pagePath: '/business-account/settings',
    pageName: 'settings',
    menuItemTitle: 'Settings',
    menuItemIcon: <SettingsIcon />,
  },
]

type propTypes = {
  children: any
  pageName: string
  businessName: string
}

export default function BusinessAccountLayout(props: propTypes) {
  const router = useRouter()

  let matchingItems = businessMenuItems.filter((item: businessMenuItemType) => {
    return item.pageName === props.pageName
  })

  let currentMenuItem = undefined
  if (matchingItems.length == 1) {
    currentMenuItem = matchingItems[0]
  } else {
    console.error(`Could not find page name ${props.pageName} in business account menu`)
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [drawerOpen, setDrawerOpen] = useState(false)

  const drawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }
  const backdropClickHandler = () => {
    setDrawerOpen(false)
  }

  let backdropStyles = cx({
    backdrop: true,
    backdropActive: drawerOpen,
  })

  const backdrop = <div className={backdropStyles} onClick={backdropClickHandler}></div>

  return (
    <div className="w-full h-full m-0">
      <Head>
        <title>{`${currentMenuItem?.menuItemTitle ?? 'Business'} | Visitable`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <div className={styles.all}>
        {backdrop}
        <BusinessAccountMenu drawerOpen={drawerOpen} onClickDrawer={drawerToggle} items={businessMenuItems} />
        <div className={styles.main}>
          <div className="flex justify-between sm:justify-end items-center">
            <div className="flex justify-end">
              <div className="sm:hidden">
                <IconButton onClick={drawerToggle}>
                  {drawerOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </div>
              <div className="hidden sm:block text-xl">{props.businessName}</div>
            </div>
            <div className="ml-2">
              {/* <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              ></Button> */}
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
                <MenuItem
                  onClick={() => {
                    handleClose()
                    router.push('/business-account/venues')
                  }}
                >
                  Account
                </MenuItem>
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
          </div>
          <main className="mt-3">
            {currentMenuItem?.menuItemTitle && (
              <h1 className="mb-6 text-4xl">{currentMenuItem.menuItemTitle ?? 'Business'}</h1>
            )}
            {props.children}
          </main>
        </div>
      </div>
    </div>
  )
}
