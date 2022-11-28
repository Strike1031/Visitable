import { useRouter } from 'next/router'
import styles from 'styles/GuestAccountMenu.module.css'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import classNames from 'classnames/bind'

let cx = classNames.bind(styles);

type propTypes = {
  items: { pagePath: string; menuItemTitle: string; menuItemIcon: any }[];
  drawerOpen: boolean;
}

export default function GuestAcccountMenu(props: propTypes) {
  const router = useRouter()

  let containerStyles = cx({
    container: true,
    containerOpen: props.drawerOpen
  })

  return (
    <div className={containerStyles}>
        <MenuList>
          {props.items.map((item, idx) => (
            <MenuItem key={idx}>
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
            </MenuItem>
          ))}
        </MenuList>
    </div>
  )
}
