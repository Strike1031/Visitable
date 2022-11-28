import { useRouter } from 'next/router'
import styles from 'styles/AccountMenu.module.css'

type propTypes = {
  items: { pagePath: string; menuItemTitle: string; menuItemIcon: any }[]
}

function AccountNavigation(props: propTypes) {
  const router = useRouter()

  return (
    <div className={styles.container}>
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

export default AccountNavigation
