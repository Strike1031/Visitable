import { useAuth } from 'config/auth'
import { getAccountHandler } from 'lib/account-crud'
import { createContext, useContext, useEffect, useState } from 'react'
import { GuestType } from 'types/guest-type'

type GuestAccountContextType = {
  data: GuestType | null
  getData: () => void
  loading: boolean
}
export const GuestAccountContext = createContext<GuestAccountContextType>({
  data: null,
  getData: async () => {},
  loading: true,
})

export const GuestAccountProvider = ({ children }: any) => {
  const auth = useAuth()
  const [data, setData] = useState<GuestType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const getGuestData = async () => {
    setLoading(true)
    if (!auth.userState) {
      console.log('No firebase user in auth context. Set guest data to null.')
      setData(null)
    } else if (!auth.customClaims?.guestInit) {
      console.log(
        'Firebase user has not initialised guest account according \
            to firebase custom claims. Set guest data to null.',
      )
      setData(null)
    } else {
      try {
        const accountData = await getAccountHandler(auth.userState.uid)
        console.log(
          `Guest data received. Set GuestAccountProvider data: ${JSON.stringify(
            accountData,
            null,
            1,
          )}`,
        )
        setData(accountData)
      } catch (error) {
        console.log(`An error occurred while attempting to retrieve guest data: ${error}`)
        setData(null)
      }
    }
    setLoading(false)
  }

  // Callback is run after first render and on every change to auth.userState
  useEffect(() => {
    getGuestData()
  }, [auth.userState, auth.customClaims?.guestInit])

  return (
    <GuestAccountContext.Provider value={{ data, getData: getGuestData, loading }}>
      {children}
    </GuestAccountContext.Provider>
  )
}

// To use this context, call useContext React hook
// const guestCx = React.useContext(GuestAccountContext)
// const guestData = guestCx.data
