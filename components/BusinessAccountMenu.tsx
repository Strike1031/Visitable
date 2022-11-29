import { useRouter } from 'next/router'
import styles from 'styles/BusinessAccountMenu.module.css'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';


type propTypes = {
  items: { pagePath: string; menuItemTitle: string; menuItemIcon: any }[];
  drawerOpen: boolean;
  onClickDrawer: () => void;
}

export default function BusinessAccountMenu(props: propTypes) {
  const router = useRouter()

  let containerStyles = cx({
    container: true,
    drawerOpen: props.drawerOpen
  })

  return (
    <div className={containerStyles}>
      <div className='pt-8 pr-6 pl-8 flex justify-between items-center'>
        {/* <img className='w-full' onClick={() => router.push('/business-account/venues')} src="/logo.png" alt="Logo" /> */}
        {props.drawerOpen && <div className='sm:hidden ml-4'><IconButton onClick={props.onClickDrawer}><CloseIcon/></IconButton></div>}

      </div>

      <nav className={styles.menuContainer}>
        {props.items.map((item, idx) => (
          <div
            className={styles.menuItem}
            key={idx}
            onClick={() =>
              router.push({
                pathname: item.pagePath,
                query: {},
              })
            }
          >
            <div className={styles.menuItemIcon}>{item.menuItemIcon}</div>
            <div className={styles.menuItemTitle}>{item.menuItemTitle}</div>
          </div>
        ))}
      </nav>
    </div>
  )
}
