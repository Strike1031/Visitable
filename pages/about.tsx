import styles from 'styles/About.module.css'
import Link from 'next/link'
import { VisitorLayout } from 'components/VisitorLayout'

export default function Page() {
  return (
    <VisitorLayout>
      <div className={'vflex-container' + ' ' + styles.container}>
        {/* <Link href="/npc_land">
          <button className={styles.item + ' ' + styles.button} style={{ width: '200px' }}>
            NFC Link
          </button>
        </Link> */}
        <h3 className={styles.title}>Our Mission</h3>
        <p className={styles.item}>
        Visitable is on a mission: we want to change the way people with accessible needs
          experience the world for the better. We want to support people with disability, older
          people and families with young children to access the community with ease. We are doing
          this by providing hospitality and accommodation businesses with the tools to make it
          easier to create a more inclusive Australia.
        </p>
        <h3 className={styles.title}>The Visitable Story </h3>
        <p className={styles.item}>
          We love travel and all the amazing places Australia has to offer. We are also a family who
          understands what it is like to try and organise outings with accessibility requirements.
        </p>
        <p className={styles.item}>
          After experiencing a pandemic lifestyle where borders were closed and it was even harder
          to book for social outings, we decided it was time to share the knowledge we have of
          accessible venues. Even better - we want to raise awareness of the business need and
          benefit in making services and facilities accessible.
        </p>
        <h3 className={styles.title}>What are we supporting?</h3>
        <p className={styles.item}>
          We want to support Australia’s ratification of the UN Convention on the Rights of Persons
          with Disabilities and build a more accessible Australia. This will not only benefit people
          with disability, older people and families with young children, but the rest of Australian
          society.
        </p>
      </div>
    </VisitorLayout>
  )
}
