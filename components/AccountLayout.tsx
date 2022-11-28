import Head from 'next/head'
import GuestAccountMenu from './user-account/GuestAccountMenu'
import styles from 'styles/GuestAccountLayout.module.css'
import { NavigationBar } from 'components/NavigationBar'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import AccessibleRoundedIcon from '@material-ui/icons/AccessibleRounded'
import StorefrontIcon from '@material-ui/icons/Storefront'
import RateReviewIcon from '@material-ui/icons/RateReview'
import MailIcon from '@material-ui/icons/Mail'
import SettingsIcon from '@material-ui/icons/Settings'
import LinkIcon from '@material-ui/icons/Link'

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!
// //////// No longer in use
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!

type guestMenuItemType = {
  pagePath: string
  pageName: string
  menuItemTitle: string
  menuItemIcon: any
}

const guestMenuItems: guestMenuItemType[] = [
  {
    pagePath: '/user-account/home',
    pageName: 'home',
    menuItemTitle: 'Home',
    menuItemIcon: <HomeIcon />,
  },
  {
    pagePath: '/user-account/details',
    pageName: 'details',
    menuItemTitle: 'My Details',
    menuItemIcon: <PersonIcon />,
  },
  {
    pagePath: '/user-account/accessibility-prefs',
    pageName: 'accessPrefs',
    menuItemTitle: 'Accessibility Preferences',
    menuItemIcon: <AccessibleRoundedIcon />,
  },
  {
    pagePath: '/user-account/venues',
    pageName: 'venues',
    menuItemTitle: 'My Venues',
    menuItemIcon: <StorefrontIcon />,
  },
  {
    pagePath: '/user-account/reviews',
    pageName: 'reviews',
    menuItemTitle: 'My Reviews',
    menuItemIcon: <RateReviewIcon />,
  },
  {
    pagePath: '/user-account/messages',
    pageName: 'messages',
    menuItemTitle: 'Messages',
    menuItemIcon: <MailIcon />,
  },
  {
    pagePath: '/user-account/settings',
    pageName: 'settings',
    menuItemTitle: 'Settings',
    menuItemIcon: <SettingsIcon />,
  },
]

type propTypes = {
  children: any
  pageName: string
  guestName: string
}

function AccountLayout(props: propTypes) {
  let matchingItems = guestMenuItems.filter((item: guestMenuItemType) => {
    return item.pageName === props.pageName
  })

  let currentMenuItem = undefined
  if (matchingItems.length == 1) {
    currentMenuItem = matchingItems[0]
  } else {
    console.error(`Could not find page name ${props.pageName} in business account menu`)
  }

  return (
    <div className="w-full h-full m-0">
      <Head>
        <title>{`${currentMenuItem?.menuItemTitle ?? 'Guest'} | Visitable`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <NavigationBar />
      <div className={styles['main-wrapper']}>
        <GuestAccountMenu drawerOpen={true} items={guestMenuItems} />
        <main className={styles.main}>
          {currentMenuItem?.menuItemTitle && (
            <h1 className={styles.userAccPageTitle}>{currentMenuItem.menuItemTitle}</h1>
          )}
          {props.children}
        </main>
      </div>
    </div>
  )
}

export default AccountLayout
