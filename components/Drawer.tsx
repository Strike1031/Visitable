import styles from 'styles/Drawer.module.css'
import classNames from 'classnames/bind'
import {useRouter} from 'next/router'

let cx = classNames.bind(styles);

export interface PropTypes {
    show: Boolean;
}

export const Drawer: React.FC<PropTypes> = (props) => {
    const router = useRouter();

    let drawerStyles = cx({
        drawer: true,
        drawerOpen: props.show
    })

    return (
        <nav className={drawerStyles}>
          <div className={styles.drawerContainer}>
            <div className={styles.drawerItem} onClick={() => router.push('/')}>
              Home
            </div>
            <div className={styles.drawerItem} onClick={() => router.push('/venues')}>
              Venues
            </div>
            <div className={styles.drawerItem} onClick={() => router.push('/business')}>
              For Business
            </div>
            <div className={styles.drawerItem} onClick={() => router.push('/login')}>
              Log In
            </div>
            <div className={styles.drawerItem} onClick={() => router.push('/signup')}>
              Sign Up
            </div>
          </div>


        </nav>
    )
}