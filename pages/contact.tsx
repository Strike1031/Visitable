import { VisitorLayout } from 'components/VisitorLayout'
import styles from 'styles/Contact.module.css'

export default function Page() {
  return (
    <VisitorLayout>
      <div className={styles.container + ' ' + 'vflex-container'}>
        <h1>Contact Us</h1>
        <h1>support@Visitable.com.au</h1>
      </div>
    </VisitorLayout>
  )
}
