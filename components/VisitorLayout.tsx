import Head from 'next/head'
import Footer from 'components/Footer'
import styles from 'styles/VisitorLayout.module.css'
import NewNavBar from 'components/NewNavBar'
import {Drawer} from 'components/Drawer'
import { useState } from 'react'
import classNames from 'classnames/bind'

let cx = classNames.bind(styles);

export interface LayoutProps {
  title?: string
}
export const VisitorLayout: React.FC<LayoutProps> = ({ children, title }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const drawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }
  const backdropClickHandler = () => {
    setDrawerOpen(false)
  }


  let backdropStyles = cx({
    backdrop: true,
    backdropActive: drawerOpen
  })
  
  const backdrop = <div className={backdropStyles} onClick={backdropClickHandler}></div>;


  return (
    <div className={styles.container}>
    <Head>
      <title>{title ?? 'Visitable'}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <div className={styles['main-wrapper']}>
      {/* {drawerOpen && backdrop } */}
      {backdrop}
      <Drawer show={drawerOpen}/>
      <NewNavBar drawerOpen={drawerOpen} onClickDrawer={drawerToggle}/>
      <main className={styles.main}>{children}</main>
    </div>
    <Footer className={styles.footer} />
  </div>
      
    )
}
