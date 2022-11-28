// CSS
import 'swiper/swiper-bundle.css'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
import 'styles/globals.css'
import { AuthProvider } from '../config/auth'
import { GuestAccountProvider } from 'components/contexts/GuestAccountContext'
import { BusinessAccountProvider } from 'components/contexts/BusinessAccountContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <>
      <Head>
      <link rel="icon" href="/valioos-icon.png"/>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        ></script>
      </Head>
      <AuthProvider>
        <GuestAccountProvider>
          <BusinessAccountProvider>
            <Component {...pageProps} />
          </BusinessAccountProvider>
        </GuestAccountProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
