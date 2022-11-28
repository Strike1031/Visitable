import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { VisitorLayout } from 'components/VisitorLayout'
import styles from 'styles/VenueListing.module.css'

const mapContainerStyle = {
  width: '100%',
  maxWidth: '1000px',
  height: '400px',
}

type propTypes = {}

export default function VenueListing(props: propTypes) {
  const location = {
    lat: -33.88934609897324,
    lng: 151.21495569941987,
  }

  return (
    <VisitorLayout>
      <div className="px-16 py-12 w-full max-w-screen-xl">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="text-4xl">The Dolphin</div>
            <div className="text-lg mt-4">
              Buzzing food over 3 levels. Convenient intersection at the edge of the CBD.
            </div>
            <div className="mt-1">
              <div className="mt-1 text-blue-600">509 Pitt St, Sydney NSW 2000</div>
              <div className="mt-1 text-blue-600">dolphincafe.com</div>{' '}
            </div>
            <div className="mt-1">
              <div className="mt-1 flex">
                <div
                  className="w-4 m-1 bg-contain bg-no-repeat"
                  style={{ backgroundImage: 'url(/utility-icons/star.png)' }}
                />
                <div className="ml-2">Review rating: 4.38</div>
              </div>
              <div className="mt-1 flex">
                <div
                  className="w-4 m-1 bg-contain bg-no-repeat"
                  style={{ backgroundImage: 'url(/utility-icons/check.png)' }}
                />
                <div className="ml-2">Your suitability: 95%</div>
              </div>
            </div>
          </div>
          <div
            className="ml-0 mt-4 lg:mt-0 lg:ml-12 w-full lg:w-1/2 h-52 bg-cover rounded-lg"
            style={{
              backgroundImage:
                'url(https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1615696195509x742441150111550600%2Fkings-cross-hotel-rooftop-0219.jpg?w=384&h=216&auto=compress&dpr=1&fit=facearea&facepad=false&q=75)',
              maxWidth: '500px',
            }}
          ></div>
        </div>
        <div className="h-12 mt-4 py-2 hidden lg:flex flex-row border-b-2">
          <div className="px-8 text-lg">Overview</div>
          <div className="px-8 text-lg">Accesssibility</div>
          <div className="px-8 text-lg">Photos</div>
          <div className="px-8 text-lg">Reviews</div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col">
            <div className={styles.section} style={{ marginTop: '1rem' }}>
              <div className={styles.sectionTitle}>About</div>
              <div>
                If more of us valued food and cheer and song above hoarded gold, it would be a
                merrier world. Come join us in the heart of Surry Hills to discover some of the best
                coffee and breakfast imported and grown locally.
                <br />
                Popular, colourful nightclub hosting DJs, dancing and themed events, plus cocktails
                & pub grub. Spacious izakaya with long tables, bar seats & karaoke, plus an array of
                Japanese snacks & sake.
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Location</div>
              <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY ?? ''}>
                <GoogleMap mapContainerStyle={mapContainerStyle} center={location} zoom={10}>
                  {/* Child components, such as markers, info windows, etc. */}
                  <></>
                </GoogleMap>
              </LoadScript>
            </div>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Accessibility</div>
              <div className={styles.accContainer}>
                <div className={styles.accDetails}>
                  Is there level entry access to the venue (no stairs to get through the door)?
                </div>
                <div
                  className={styles.checkbox}
                  style={{ backgroundImage: 'url(/utility-icons/check.png)' }}
                />
              </div>
              <div className={styles.accContainer}>
                <div className={styles.accDetails}>
                  Do you have any chairlift facilities in the venue?
                </div>
                <div
                  className={styles.checkbox}
                  style={{ backgroundImage: 'url(/utility-icons/check.png)' }}
                />
              </div>
              <div className={styles.accContainer}>
                <div className={styles.accDetails}>
                  Are any areas inside the venue only accessible via stairs for the public?
                </div>
                <div
                  className={styles.checkbox}
                  style={{ backgroundImage: 'url(/utility-icons/check.png)' }}
                />
              </div>
              <div className={styles.accContainer}>
                <div className={styles.accDetails}>
                  Do you have at least one dedicated wheelchair accessible bathroom?
                </div>
                <div
                  className={styles.checkbox}
                  style={{ backgroundImage: 'url(/utility-icons/check.png)' }}
                />
              </div>
              <div className={styles.accContainer}>
                <div className={styles.accDetails}>
                  Is there accessible parking within 50m of the venue?
                </div>
                <div
                  className={styles.checkbox}
                  style={{ backgroundImage: 'url(/utility-icons/check.png)' }}
                />
              </div>
              <div className={styles.accContainer}>
                <div className={styles.accDetails}>Does your venue have outside seating?</div>
                <div
                  className={styles.checkbox}
                  style={{ backgroundImage: 'url(/utility-icons/check.png)' }}
                />
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Photos</div>
              <div className="flex flex-row flex-wrap">
                <div className={styles.photoContainer}>
                  <div
                    className={styles.photo}
                    style={{
                      backgroundImage:
                        'url(https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1614665234409x144977634309139140%2FSpoonypic1.png?w=192&h=109&auto=compress&dpr=1&fit=facearea&facepad=false&q=75)',
                    }}
                  />
                </div>
                <div className={styles.photoContainer}>
                  <div
                    className={styles.photo}
                    style={{
                      backgroundImage:
                        'url(https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1614665245509x582249402723528000%2FSpoonypic2.png?w=192&h=90&auto=compress&dpr=1&fit=facearea&facepad=false&q=75)',
                    }}
                  />
                </div>
                <div className={styles.photoContainer}>
                  <div
                    className={styles.photo}
                    style={{
                      backgroundImage:
                        'url(https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1614665254889x384759053213389100%2FSpoonypic3.png?w=192&h=91&auto=compress&dpr=1&fit=facearea&facepad=false&q=75)',
                    }}
                  />
                </div>
                <div className={styles.photoContainer}>
                  <div
                    className={styles.photo}
                    style={{
                      backgroundImage:
                        'url(https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1614665266566x476283287970496100%2FSpoonypic4.png?w=192&h=91&auto=compress&dpr=1&fit=facearea&facepad=false&q=75)',
                    }}
                  />
                </div>
                <div className={styles.photoContainer}>
                  <div
                    className={styles.photo}
                    style={{
                      backgroundImage:
                        'url(https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1614665367576x575878531846321100%2FSpoonyentrace.png?w=192&h=100&auto=compress&dpr=1&fit=facearea&facepad=false&q=75)',
                    }}
                  />
                </div>
                <div className={styles.photoContainer}>
                  <div
                    className={styles.photo}
                    style={{
                      backgroundImage:
                        'url(https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1614665385153x739196961431886700%2Fcuktoilet.jpg?w=192&h=128&auto=compress&dpr=1&fit=facearea&facepad=false&q=75)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              styles.detailsContainer +
              ' flex flex-col mt-8 ml-0 lg:mt-0 lg:ml-8 border-t-2 border-solid lg:border-t-0'
            }
          >
            <div className={styles.detail}>
              <div className={styles.detailsTitle}>Address</div>
              <div>509 Pitt St, Sydney NSW 2000</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.detailsTitle}>Opening Hours</div>
              <div>Mon - Fri 6am until late</div>
              <div>Sat - Sun 7am until 12pm</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.detailsTitle}>Contact</div>
              <div>(02) 9331 4800</div>
              <div>dolphincafe.com</div>
              <div>hello@dolphincafe.com</div>
            </div>
          </div>
        </div>
      </div>
    </VisitorLayout>
  )
}
